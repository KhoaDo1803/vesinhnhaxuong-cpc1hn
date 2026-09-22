import {NextRequest,NextResponse} from "next/server";
import {createClient} from "@supabase/supabase-js";
import {departments} from "@/lib/access";

const roles=["factory_staff","ipc","admin"] as const;

export async function POST(request:NextRequest){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,secret=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key||!secret)return NextResponse.json({error:"Máy chủ chưa cấu hình Supabase secret key."},{status:500});
 const token=request.headers.get("authorization")?.replace(/^Bearer\s+/i,"");
 if(!token)return NextResponse.json({error:"Phiên đăng nhập không hợp lệ."},{status:401});
 const authClient=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}}),admin=createClient(url,secret,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data:{user},error:userError}=await authClient.auth.getUser(token);
 if(userError||!user)return NextResponse.json({error:"Phiên đăng nhập đã hết hạn."},{status:401});
 const {data:requester}=await admin.from("profiles").select("role").eq("id",user.id).single();
 if(requester?.role!=="admin")return NextResponse.json({error:"Chỉ Quản trị QA được thêm tài khoản."},{status:403});
 const body:any=await request.json(),email=String(body.email||"").trim().toLowerCase(),fullName=String(body.full_name||"").trim(),role=String(body.role||""),departmentCode=role==="admin"?"ADMIN":String(body.department_code||""),areaCodes=role==="admin"?[]:Array.isArray(body.area_codes)?body.area_codes.map(String):[];
 if(!email||!fullName||!roles.includes(role as typeof roles[number]))return NextResponse.json({error:"Thiếu email, họ tên hoặc vai trò hợp lệ."},{status:400});
 const department=departments.find(d=>d.code===departmentCode);
 if(role!=="admin"&&!department)return NextResponse.json({error:"Phòng ban không hợp lệ."},{status:400});
 if(role==="factory_staff"&&!areaCodes.length)return NextResponse.json({error:"Nhân viên xưởng phải được gán ít nhất một khu vực."},{status:400});
 if(department&&areaCodes.some((code:string)=>!(department.areas as readonly string[]).includes(code)))return NextResponse.json({error:"Khu vực không thuộc phòng ban đã chọn."},{status:400});
 const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||request.nextUrl.origin).replace(/\/$/,"");
 const {data:invited,error:inviteError}=await admin.auth.admin.inviteUserByEmail(email,{redirectTo:`${siteUrl}/auth/setup-password`,data:{full_name:fullName}});
 if(inviteError)return NextResponse.json({error:inviteError.message},{status:400});
 if(!invited.user)return NextResponse.json({error:"Supabase không trả về tài khoản vừa mời."},{status:500});
 const {error:profileError}=await admin.from("profiles").upsert({id:invited.user.id,full_name:fullName,role,department_code:departmentCode,area_codes:areaCodes},{onConflict:"id"});
 if(profileError)return NextResponse.json({error:`Đã gửi lời mời nhưng chưa lưu được phân quyền: ${profileError.message}`},{status:500});
 return NextResponse.json({message:`Đã gửi lời mời đến ${email}.`});
}
