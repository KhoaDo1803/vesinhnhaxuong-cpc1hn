export type Chemical={id:string;name:string;concentration:string;group:string;purpose:string;expiryDays:number|null;residue:string;needsEthanolWipe:boolean};
export type Area={code:string;name:string;grade:string;risk:"Thấp"|"Cao";program:"1"|"2"|"Riêng"|"NA";rule?:string};
export const chemicals:Chemical[]=[
 {id:"ethanol70",name:"Ethanol",concentration:"70%",group:"Alcohol",purpose:"Sát khuẩn tay; vệ sinh bề mặt phòng và bề mặt ngoài thiết bị",expiryDays:7,residue:"Không quy định",needsEthanolWipe:false},
 {id:"lph04",name:"LPH/Nước",concentration:"0,4%",group:"Phenolics",purpose:"Vệ sinh bề mặt phòng và bề mặt ngoài thiết bị",expiryDays:7,residue:"10 ppm",needsEthanolWipe:true},
 {id:"vesphene08",name:"Vesphene II se Cleaner/Nước",concentration:"0,8%",group:"Phenolics",purpose:"Vệ sinh bề mặt phòng và bề mặt ngoài thiết bị",expiryDays:7,residue:"10 ppm",needsEthanolWipe:true},
 {id:"h2o2_3",name:"H₂O₂",concentration:"3%",group:"Hydrogen peroxide",purpose:"Vệ sinh bề mặt phòng và bề mặt ngoài thiết bị",expiryDays:7,residue:"Không quy định",needsEthanolWipe:false},
 {id:"h2o2_5",name:"H₂O₂",concentration:"5%",group:"Hydrogen peroxide",purpose:"Vệ sinh bề mặt phòng và bề mặt ngoài thiết bị",expiryDays:7,residue:"Không quy định",needsEthanolWipe:false},
 {id:"ipa70",name:"QA 70 IPA",concentration:"70%",group:"Alcohol",purpose:"Vệ sinh bề mặt ngoài thiết bị",expiryDays:7,residue:"Không quy định",needsEthanolWipe:false},
 {id:"sporklenz",name:"Spor-Klenz RTU",concentration:"H₂O₂ 1,00% / PAA 0,08%",group:"Hydrogen peroxide",purpose:"Vệ sinh bề mặt phòng và bề mặt ngoài thiết bị",expiryDays:7,residue:"Không quy định",needsEthanolWipe:false},
 {id:"h2o2_35",name:"H₂O₂",concentration:"35%",group:"Hydrogen peroxide",purpose:"Tiệt khuẩn bề mặt trong isolator",expiryDays:null,residue:"Không quy định",needsEthanolWipe:false},
 {id:"cloramin1",name:"Cloramin B",concentration:"1%",group:"Hoạt chất chứa Clo",purpose:"Sát khuẩn bề mặt phòng khu vực CNC",expiryDays:null,residue:"Không quy định",needsEthanolWipe:false},
];
export const areas:Area[]=[
 {code:"C1",name:"Phân xưởng BFS",grade:"C & D",risk:"Thấp",program:"1"},{code:"C2",name:"Phân xưởng sản phẩm dạng uống",grade:"D",risk:"Thấp",program:"1"},{code:"C3",name:"Phân xưởng sản phẩm không vô trùng",grade:"D",risk:"Thấp",program:"2"},{code:"C4",name:"Phân xưởng sản phẩm vô trùng",grade:"C & D",risk:"Thấp",program:"1"},{code:"C5",name:"Hoàn thiện xưởng hóa dược",grade:"CNC",risk:"Thấp",program:"Riêng",rule:"Ethanol 70% hàng ngày; H₂O₂ 3% hàng tháng; Cloramin B hàng quý"},{code:"F2",name:"Xưởng thạch",grade:"D",risk:"Cao",program:"2"},{code:"B1",name:"Xưởng sinh phẩm",grade:"D",risk:"Cao",program:"2"},{code:"B2",name:"Xưởng sinh phẩm",grade:"D",risk:"Cao",program:"2"},{code:"B3",name:"Thành phẩm sinh phẩm",grade:"D",risk:"Cao",program:"2"},{code:"A1",name:"Cân chung",grade:"D",risk:"Thấp",program:"1"},{code:"A2",name:"Lấy mẫu nguyên liệu",grade:"D",risk:"Thấp",program:"1"},{code:"E1",name:"Phụ trợ cơ điện",grade:"CNC",risk:"Thấp",program:"Riêng",rule:"Ethanol 70% hàng ngày"},{code:"Q1",name:"Hóa lý",grade:"CNC",risk:"Thấp",program:"Riêng",rule:"Ethanol 70% hàng ngày"},{code:"Q2",name:"Vi sinh",grade:"D & B",risk:"Cao",program:"2"},{code:"Q3",name:"Mediafill",grade:"CNC",risk:"Thấp",program:"Riêng",rule:"Ethanol 70% hàng ngày"},{code:"Q4",name:"Chung",grade:"CNC",risk:"Thấp",program:"Riêng",rule:"Ethanol 70% hàng ngày"},{code:"S1",name:"Kho thành phẩm 3000",grade:"CNC",risk:"Thấp",program:"Riêng",rule:"Ethanol 70% hàng ngày"},{code:"S2",name:"Kho nguyên liệu",grade:"CNC",risk:"Thấp",program:"Riêng",rule:"Ethanol 70% hàng ngày; H₂O₂ 3% hàng tháng"},{code:"S3",name:"Kho phụ liệu ngoài",grade:"CNC",risk:"Thấp",program:"NA"},{code:"S4",name:"Kho lạnh sinh phẩm",grade:"CNC",risk:"Cao",program:"Riêng",rule:"Ethanol 70% hàng ngày; H₂O₂ 3% hàng tháng"},{code:"S5",name:"Kho 600",grade:"CNC",risk:"Thấp",program:"NA"},{code:"S6",name:"Kho Upharma",grade:"CNC",risk:"Thấp",program:"NA"},{code:"S7",name:"Kho QC",grade:"CNC",risk:"Thấp",program:"NA"},{code:"S8",name:"Kho QA",grade:"CNC",risk:"Thấp",program:"NA"},{code:"S9",name:"Kho RD",grade:"CNC",risk:"Thấp",program:"NA"},
];
export const programs=[
 {id:"1",name:"Chương trình 1",applies:"Khu vực rủi ro thấp thuộc chương trình 1",rows:[
  {frequency:"Tuần 1 và 3",months:"Tất cả các tháng",chemical:"Vesphene II se Cleaner/Nước 0,8%"},
  {frequency:"Tuần 2 và 4",months:"Tất cả các tháng",chemical:"LPH/Nước 0,4%"},
  {frequency:"Tổng vệ sinh cuối tháng",months:"1, 3, 5, 7, 9, 11",chemical:"H₂O₂ 3%"},
  {frequency:"Tổng vệ sinh cuối tháng",months:"2, 4, 6, 8, 10, 12",chemical:"Spor-Klenz RTU"},
  {frequency:"Hàng ngày",months:"Tất cả các tháng",chemical:"Ethanol 70%"}]},
 {id:"2",name:"Chương trình 2",applies:"Khu vực chương trình 2; tần suất tổng vệ sinh tăng theo rủi ro",rows:[
  {frequency:"Tuần 1 và 3",months:"Tất cả các tháng",chemical:"Vesphene II se Cleaner/Nước 0,8%"},
  {frequency:"Tuần 2 và 4",months:"Tất cả các tháng",chemical:"LPH/Nước 0,4%"},
  {frequency:"Tổng vệ sinh mỗi 2 tuần hoặc hàng tuần theo mức rủi ro",months:"1, 3, 5, 7, 9, 11",chemical:"H₂O₂ 3%"},
  {frequency:"Tổng vệ sinh mỗi 2 tuần hoặc hàng tuần theo mức rủi ro",months:"2, 4, 6, 8, 10, 12",chemical:"Spor-Klenz RTU"},
  {frequency:"Hàng ngày",months:"Tất cả các tháng",chemical:"Ethanol 70%"}]},
 {id:"special",name:"Chương trình riêng",applies:"Khu vực CNC và kho có tần suất riêng trong PL02",rows:[
  {frequency:"Hàng ngày",months:"Tất cả các tháng",chemical:"Ethanol 70%"},
  {frequency:"Hàng tháng",months:"Theo ma trận từng khu vực",chemical:"H₂O₂ 3%"},
  {frequency:"Hàng quý",months:"Riêng C5",chemical:"Cloramin B 1%"}]},
];
export function recommendation(area:Area,date:Date,frequency:"routine"|"periodic"){
 const month=date.getMonth()+1,week=Math.ceil(date.getDate()/7),oddMonth=month%2===1;
 if(area.program==="NA")return {chemical:null,reason:"SOP chưa quy định chương trình cho khu vực này; cần QA xác nhận trước khi thực hiện."};
 if(area.program==="Riêng"){
  if(frequency==="routine")return {chemical:chemicals[0],reason:area.rule||"Ethanol 70% hàng ngày"};
  return {chemical:chemicals[3],reason:area.rule||"H₂O₂ 3% theo tần suất khu vực"};
 }
 if(frequency==="routine")return week===1||week===3?{chemical:chemicals[2],reason:`Chương trình ${area.program}: tuần ${week} dùng Vesphene 0,8%`}:{chemical:chemicals[1],reason:`Chương trình ${area.program}: tuần ${week} dùng LPH 0,4%`};
 return oddMonth?{chemical:chemicals[3],reason:`Chương trình ${area.program}: tháng lẻ dùng H₂O₂ 3%`}:{chemical:chemicals[6],reason:`Chương trình ${area.program}: tháng chẵn dùng Spor-Klenz RTU`};
}
export function preparationRule(grade:string){const high=/A|B|C/.test(grade)&&!grade.includes("CNC");return high?{solvent:"Nước cất/WFI",area:"Cấp C trở lên (phòng/LAF/isolator)",treatment:"Lọc vô khuẩn 0,2 µm",utensil:"Tiệt trùng ≥121°C/20 phút"}:{solvent:"Nước tinh khiết",area:"Cấp D",treatment:"Không",utensil:"Thanh trùng ≥80°C/20 phút"}}

export type MonthlyRequirement={label:string;chemical:string;count:number};
export function monthlyRequirements(area:Area,year:number,month:number):MonthlyRequirement[]{
 const odd=month%2===1;
 if(area.program==="NA")return[];
 if(area.program==="Riêng"){
  const rows:MonthlyRequirement[]=[];
  if(area.rule?.includes("H₂O₂ 3% hàng tháng"))rows.push({label:"Hàng tháng",chemical:"H₂O₂ 3%",count:1});
  if(area.rule?.includes("Cloramin B hàng quý")&&[3,6,9,12].includes(month))rows.push({label:"Hàng quý",chemical:"Cloramin B 1%",count:1});
  return rows;
 }
 const rows:MonthlyRequirement[]=[
  {label:"Tuần 1 và 3",chemical:"Vesphene II se Cleaner/Nước 0,8%",count:2},
  {label:"Tuần 2 và 4",chemical:"LPH/Nước 0,4%",count:2},
 ];
 const periodicCount=area.program==="1"?1:area.risk==="Cao"?4:2;
 rows.push({label:area.program==="1"?"Cuối tháng":area.risk==="Cao"?"Hàng tuần":"Mỗi 2 tuần",chemical:odd?"H₂O₂ 3%":"Spor-Klenz RTU",count:periodicCount});
 return rows;
}
export function isChemicalCorrect(area:Area,chemicalName:string,usedAt:string){
 const date=new Date(usedAt),month=date.getMonth()+1,week=Math.ceil(date.getDate()/7),name=chemicalName.toLowerCase();
 if(area.program==="NA")return false;
 if(name.includes("ethanol")||name.includes("cồn"))return true;
 if(area.program==="Riêng"){
  if(name.includes("h₂o₂")||name.includes("h2o2"))return area.rule?.includes("H₂O₂ 3%")??false;
  if(name.includes("cloramin"))return area.rule?.includes("Cloramin B")??false;
  return false;
 }
 if(name.includes("vesphene"))return week===1||week===3;
 if(name.includes("lph"))return week===2||week===4;
 if(name.includes("spor-klenz"))return month%2===0;
 if(name.includes("h₂o₂")||name.includes("h2o2"))return month%2===1;
 return false;
}
