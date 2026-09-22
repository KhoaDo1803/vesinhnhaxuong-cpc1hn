-- Cho phép Quản trị QA thực hiện nghiệp vụ thử nghiệm/vận hành trên toàn hệ thống.
-- Nhân viên xưởng vẫn bị giới hạn đúng phòng ban và khu vực được phân công.

drop policy if exists "factory creates batches in scope" on public.preparation_batches;
create policy "factory creates batches in scope"
on public.preparation_batches for insert to authenticated
with check (
  prepared_by=auth.uid()
  and (
    (select role from public.my_profile())='admin'
    or (
      (select role from public.my_profile())='factory_staff'
      and department_code=(select department_code from public.my_profile())
      and target_area_codes <@ (select area_codes from public.my_profile())
    )
  )
);

drop policy if exists "factory creates records in scope" on public.cleaning_records;
create policy "factory creates records in scope"
on public.cleaning_records for insert to authenticated
with check (
  operator_id=auth.uid()
  and (
    (select role from public.my_profile())='admin'
    or (
      (select role from public.my_profile())='factory_staff'
      and department_code=(select department_code from public.my_profile())
      and area_code in (select unnest(area_codes) from public.my_profile())
    )
  )
);
