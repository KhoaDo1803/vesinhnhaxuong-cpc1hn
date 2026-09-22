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
 const body:any=await request.json(),email=String(body.email||"").trim().toLowerCase(),password=String(body.password||""),fullName=String(body.full_name||"").trim(),role=String(body.role||""),departmentCode=role==="admin"?"ADMIN":String(body.department_code||""),areaCodes=role==="admin"?[]:Array.isArray(body.area_codes)?body.area_codes.map(String):[];
 if(!email||!fullName||!roles.includes(role as typeof roles[number]))return NextResponse.json({error:"Thiếu email, họ tên hoặc vai trò hợp lệ."},{status:400});
 if(password.length<8)return NextResponse.json({error:"Mật khẩu ban đầu phải có ít nhất 8 ký tự."},{status:400});
 const department=departments.find(d=>d.code===departmentCode);
 if(role!=="admin"&&!department)return NextResponse.json({error:"Phòng ban không hợp lệ."},{status:400});
 if(role==="factory_staff"&&!areaCodes.length)return NextResponse.json({error:"Nhân viên xưởng phải được gán ít nhất một khu vực."},{status:400});
 if(department&&areaCodes.some((code:string)=>!(department.areas as readonly string[]).includes(code)))return NextResponse.json({error:"Khu vực không thuộc phòng ban đã chọn."},{status:400});
 let accountId:string|undefined;
 const {data:created,error:createError}=await admin.auth.admin.createUser({email,password,email_confirm:true,user_metadata:{full_name:fullName}});
 if(!createError)accountId=created.user?.id;
 else if(/already|registered|exists/i.test(createError.message)){const {data:list,error:listError}=await admin.auth.admin.listUsers({page:1,perPage:1000});if(listError)return NextResponse.json({error:listError.message},{status:400});const existing=list.users.find(u=>u.email?.toLowerCase()===email);if(!existing)return NextResponse.json({error:createError.message},{status:400});const {data:updated,error:updateError}=await admin.auth.admin.updateUserById(existing.id,{password,email_confirm:true,user_metadata:{...existing.user_metadata,full_name:fullName}});if(updateError)return NextResponse.json({error:updateError.message},{status:400});accountId=updated.user.id}else return NextResponse.json({error:createError.message},{status:400});
 if(!accountId)return NextResponse.json({error:"Supabase không trả về tài khoản vừa tạo."},{status:500});
 const {error:profileError}=await admin.from("profiles").upsert({id:accountId,full_name:fullName,role,department_code:departmentCode,area_codes:areaCodes},{onConflict:"id"});
 if(profileError)return NextResponse.json({error:`Đã tạo tài khoản nhưng chưa lưu được phân quyền: ${profileError.message}`},{status:500});
 const resendKey=process.env.RESEND_API_KEY,emailFrom=process.env.EMAIL_FROM,siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||request.nextUrl.origin).replace(/\/$/,"");
 if(!resendKey||!emailFrom)return NextResponse.json({error:`Đã tạo tài khoản ${email} nhưng máy chủ chưa cấu hình RESEND_API_KEY hoặc EMAIL_FROM để gửi thông báo.`},{status:500});
 const roleName=role==="admin"?"Quản trị QA":role==="ipc"?"Nhân viên IPC":"Nhân viên xưởng",scope=role==="admin"?"Toàn hệ thống":`${departments.find(d=>d.code===departmentCode)?.name||departmentCode}${areaCodes.length?` · Khu vực ${areaCodes.join(", ")}`:" · Toàn phòng ban"}`;
 const mail=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${resendKey}`,"Content-Type":"application/json"},body:JSON.stringify({from:emailFrom,to:[email],subject:"Tài khoản hệ thống vệ sinh nhà máy đã được tạo",html:`<div style="font-family:Arial,sans-serif;line-height:1.6;color:#17231e"><h2>Tài khoản của bạn đã được tạo</h2><p>Xin chào <strong>${escapeHtml(fullName)}</strong>,</p><p>Quản trị viên đã tạo tài khoản sử dụng hệ thống quản lý vệ sinh nhà máy.</p><ul><li>Email: <strong>${escapeHtml(email)}</strong></li><li>Vai trò: <strong>${roleName}</strong></li><li>Phạm vi: <strong>${escapeHtml(scope)}</strong></li></ul><p>Mật khẩu ban đầu được quản trị viên cung cấp trực tiếp. Sau khi đăng nhập, hãy sử dụng mục <strong>Đổi mật khẩu</strong>.</p><p><a href="${siteUrl}" style="display:inline-block;background:#0a6849;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none">Mở hệ thống</a></p><p>Nếu bạn không yêu cầu tài khoản này, vui lòng liên hệ quản trị viên.</p></div>`})});
 if(!mail.ok){const detail=await mail.text();return NextResponse.json({error:`Đã tạo tài khoản ${email} nhưng gửi email thất bại: ${detail}`},{status:502})}
 return NextResponse.json({message:`Đã tạo tài khoản và gửi email thông báo đến ${email}.`});
}

function escapeHtml(value:string){return value.replace(/[&<>'"]/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]!))}
