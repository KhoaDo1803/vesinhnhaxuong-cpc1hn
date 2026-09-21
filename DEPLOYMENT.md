# Triển khai Supabase GitHub Netlify

## 1 Supabase

1. Tạo project Supabase.
2. Chạy `supabase/migrations/001_initial_schema.sql` trong SQL Editor.
3. Tạo người dùng trong Authentication Users.
4. Gán vai trò và khu vực trong SQL Editor:

```sql
update public.profiles
set full_name = 'Nguyễn Văn A',
    role = 'factory_staff',
    area_codes = array['C1','C2']
where id = '<user-uuid>';

update public.profiles
set full_name = 'IPC Nguyễn Văn B',
    role = 'ipc',
    area_codes = '{}'
where id = '<user-uuid>';
```

Vai trò hỗ trợ: `factory_staff`, `ipc`, `admin`. Nhân viên xưởng chỉ đọc và ghi dữ liệu thuộc `area_codes`; IPC và admin xem toàn nhà máy, chỉ IPC/admin được xác nhận BM02.

## 2 GitHub

Tạo repository mới rồi đẩy toàn bộ thư mục dự án lên nhánh `main`. Không commit file `.env`.

## 3 Netlify

1. Chọn Add new project rồi Import an existing project từ GitHub.
2. Netlify nhận cấu hình từ `netlify.toml`; build command là `npm run build`.
3. Thêm hai biến môi trường:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
4. Deploy project. Mỗi lần push GitHub sau đó sẽ tự động triển khai.

Không đặt Supabase secret key/service role key trong trình duyệt hoặc repository. Phân quyền thực tế được bảo vệ bằng RLS trong Supabase; Netlify chỉ chạy và phân phối giao diện.
