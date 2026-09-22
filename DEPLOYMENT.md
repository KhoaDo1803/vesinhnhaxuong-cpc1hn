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
    department_code = 'SAN_XUAT',
    area_codes = array['C1','C2']
where id = '<user-uuid>';

update public.profiles
set full_name = 'IPC Nguyễn Văn B',
    role = 'ipc',
    department_code = 'SAN_XUAT',
    area_codes = '{}'
where id = '<user-uuid>';
```

Mã phòng ban hỗ trợ: `SAN_XUAT`, `KY_THUAT`, `QC`, `KHO`. Vai trò hỗ trợ: `factory_staff`, `ipc`, `admin`. Nhân viên xưởng chỉ đọc/ghi đúng phòng ban và `area_codes`; IPC chỉ duyệt đúng phòng ban, để trống `area_codes` nghĩa là toàn phòng ban; admin có quyền toàn hệ thống.

Nếu database đã chạy migration 001 trước đây, chạy tiếp `supabase/migrations/002_department_area_permissions.sql` trong SQL Editor.

## 2 GitHub

Tạo repository mới rồi đẩy toàn bộ thư mục dự án lên nhánh `main`. Không commit file `.env`.

## 3 Netlify

1. Chọn Add new project rồi Import an existing project từ GitHub.
2. Netlify nhận cấu hình từ `netlify.toml`; build command là `npm run build`.
3. Thêm hai biến môi trường:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SECRET_KEY` (secret key mới của Supabase, chỉ dùng phía server)
   - `NEXT_PUBLIC_SITE_URL` (URL production, ví dụ `https://your-project.vercel.app`)
4. Deploy project. Mỗi lần push GitHub sau đó sẽ tự động triển khai.

## 4 Lời mời tài khoản Supabase

1. Trong Supabase, mở Authentication > URL Configuration.
2. Đặt Site URL là URL production, ví dụ `https://your-project.vercel.app`.
3. Thêm Redirect URLs:
   - `https://your-project.vercel.app/**`
   - `http://localhost:3000/**`
4. Trang nhận lời mời của ứng dụng là `/auth/setup-password`. Có thể đặt Site URL trực tiếp thành `https://your-project.vercel.app/auth/setup-password`; ứng dụng cũng tự chuyển link mời từ trang gốc sang trang này.
5. Sau khi đổi URL, gửi lại lời mời mới; link cũ đã hết hạn không thể tái sử dụng.

Không đặt Supabase secret key/service role key trong trình duyệt hoặc repository. Phân quyền thực tế được bảo vệ bằng RLS trong Supabase; Netlify chỉ chạy và phân phối giao diện.
