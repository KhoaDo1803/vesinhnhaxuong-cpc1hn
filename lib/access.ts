export const departments=[
 {code:"SAN_XUAT",name:"Khối sản xuất",areas:["C1","C2","C3","C4","C5","F2","B1","B2","B3","A1","A2"]},
 {code:"KY_THUAT",name:"Kỹ thuật - Cơ điện",areas:["E1"]},
 {code:"QC",name:"Kiểm tra chất lượng",areas:["Q1","Q2","Q3","Q4"]},
 {code:"KHO",name:"Khối kho",areas:["S1","S2","S3","S4","S5","S6","S7","S8","S9"]},
] as const;

export function departmentName(code:string){return departments.find(x=>x.code===code)?.name||"Chưa phân phòng ban"}
