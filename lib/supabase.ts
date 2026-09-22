import {createClient,type SupabaseClient} from "@supabase/supabase-js";

let client:SupabaseClient|null=null;
const localUser={id:"local-admin",email:"admin@local.test"};
const seed={
 profiles:[{id:"local-admin",full_name:"Quản trị viên cục bộ",role:"admin",department_code:"ADMIN",area_codes:[]}],
 preparation_batches:[],
 cleaning_records:[],
};

function readStore(){
 if(typeof window==="undefined")return seed;
 const raw=window.localStorage.getItem("sop-chemical-demo");
 if(raw)return JSON.parse(raw);
 window.localStorage.setItem("sop-chemical-demo",JSON.stringify(seed));
 return structuredClone(seed);
}
function writeStore(data:unknown){if(typeof window!=="undefined")window.localStorage.setItem("sop-chemical-demo",JSON.stringify(data))}

class LocalQuery{
 private operation:"select"|"insert"|"update"="select";private payload:any;private filters:Array<[string,any]>=[];private sort?:[string,boolean];
 constructor(private table:string){}
 select(){this.operation="select";return this}
 insert(value:any){this.operation="insert";this.payload=Array.isArray(value)?value:[value];return this}
 update(value:any){this.operation="update";this.payload=value;return this}
 eq(column:string,value:any){this.filters.push([column,value]);return this}
 order(column:string,options?:{ascending?:boolean}){this.sort=[column,options?.ascending!==false];return this}
 async single(){const result=await this.execute();return{...result,data:Array.isArray(result.data)?result.data[0]??null:result.data}}
 then(resolve:(value:any)=>void,reject:(reason:any)=>void){return this.execute().then(resolve,reject)}
 private async execute(){
  const store:any=readStore(),rows:any[]=store[this.table]??[];
  if(this.operation==="insert"){
   const created=this.payload.map((item:any)=>({...item,id:item.id??(rows.reduce((m:number,r:any)=>Math.max(m,Number(r.id)||0),0)+1),created_at:new Date().toISOString()}));
   store[this.table]=[...rows,...created];writeStore(store);return{data:created,error:null};
  }
  if(this.operation==="update"){
   store[this.table]=rows.map(row=>this.filters.every(([k,v])=>row[k]===v)?{...row,...this.payload}:row);writeStore(store);return{data:store[this.table].filter((row:any)=>this.filters.every(([k,v])=>row[k]===v)),error:null};
  }
  let data=rows.filter(row=>this.filters.every(([k,v])=>row[k]===v));
  if(this.sort){const [key,asc]=this.sort;data=[...data].sort((a,b)=>(a[key]>b[key]?1:-1)*(asc?1:-1))}
  return{data,error:null};
 }
}

function localClient(){return{
 auth:{getUser:async()=>({data:{user:localUser},error:null}),signInWithPassword:async()=>({data:{user:localUser},error:null}),signOut:async()=>({error:null})},
 from:(table:string)=>new LocalQuery(table),
}}

export function isLocalDemo(){return!process.env.NEXT_PUBLIC_SUPABASE_URL||!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY}
export function getSupabase():any{
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
 if(!url||!key)return localClient();
 if(!client)client=createClient(url,key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
 return client;
}
