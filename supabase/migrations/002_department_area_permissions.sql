-- Nâng cấp database hiện có: phân quyền theo vai trò, phòng ban và khu vực.
alter table public.profiles add column if not exists department_code text not null default 'UNASSIGNED';
alter table public.preparation_batches add column if not exists department_code text;
alter table public.cleaning_records add column if not exists department_code text;

update public.profiles set department_code=case
 when role='admin' then 'ADMIN'
 when area_codes[1] ~ '^(C|F|B|A)' then 'SAN_XUAT'
 when area_codes[1] ~ '^E' then 'KY_THUAT'
 when area_codes[1] ~ '^Q' then 'QC'
 when area_codes[1] ~ '^S' then 'KHO'
 else department_code end
where department_code='UNASSIGNED';

update public.preparation_batches b set department_code=p.department_code from public.profiles p where b.prepared_by=p.id and b.department_code is null;
update public.cleaning_records r set department_code=case
 when r.area_code ~ '^(C|F|B|A)' then 'SAN_XUAT'
 when r.area_code ~ '^E' then 'KY_THUAT'
 when r.area_code ~ '^Q' then 'QC'
 when r.area_code ~ '^S' then 'KHO'
 else p.department_code end
from public.profiles p where r.operator_id=p.id and r.department_code is null;

alter table public.preparation_batches alter column department_code set not null;
alter table public.cleaning_records alter column department_code set not null;

drop policy if exists "read batches by assigned area" on public.preparation_batches;
drop policy if exists "factory creates batches for assigned area" on public.preparation_batches;
drop policy if exists "read records by role and area" on public.cleaning_records;
drop policy if exists "factory creates records" on public.cleaning_records;
drop policy if exists "ipc reviews records" on public.cleaning_records;
drop policy if exists "read batches by department and area" on public.preparation_batches;
drop policy if exists "factory creates batches in scope" on public.preparation_batches;
drop policy if exists "read records by department and area" on public.cleaning_records;
drop policy if exists "factory creates records in scope" on public.cleaning_records;
drop policy if exists "ipc reviews records in scope" on public.cleaning_records;

create policy "read batches by department and area" on public.preparation_batches for select to authenticated using((select role from public.my_profile())='admin' or (department_code=(select department_code from public.my_profile()) and (((select role from public.my_profile())='ipc' and (cardinality((select area_codes from public.my_profile()))=0 or target_area_codes && (select area_codes from public.my_profile()))) or ((select role from public.my_profile())='factory_staff' and target_area_codes && (select area_codes from public.my_profile())))));
create policy "factory creates batches in scope" on public.preparation_batches for insert to authenticated with check(prepared_by=auth.uid() and department_code=(select department_code from public.my_profile()) and target_area_codes <@ (select area_codes from public.my_profile()));
create policy "read records by department and area" on public.cleaning_records for select to authenticated using((select role from public.my_profile())='admin' or (department_code=(select department_code from public.my_profile()) and (((select role from public.my_profile())='ipc' and (cardinality((select area_codes from public.my_profile()))=0 or area_code in (select unnest(area_codes) from public.my_profile()))) or ((select role from public.my_profile())='factory_staff' and area_code in (select unnest(area_codes) from public.my_profile())))));
create policy "factory creates records in scope" on public.cleaning_records for insert to authenticated with check(operator_id=auth.uid() and department_code=(select department_code from public.my_profile()) and area_code in (select unnest(area_codes) from public.my_profile()));
create policy "ipc reviews records in scope" on public.cleaning_records for update to authenticated using((select role from public.my_profile())='admin' or ((select role from public.my_profile())='ipc' and department_code=(select department_code from public.my_profile()) and (cardinality((select area_codes from public.my_profile()))=0 or area_code in (select unnest(area_codes) from public.my_profile())))) with check((select role from public.my_profile()) in ('ipc','admin'));

grant update on public.profiles to authenticated;

create index if not exists idx_profiles_department on public.profiles(department_code);
create index if not exists idx_batches_department on public.preparation_batches(department_code);
create index if not exists idx_records_department_area on public.cleaning_records(department_code,area_code,used_at desc);
