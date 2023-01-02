"use strict";(self["webpackChunkportal"]=self["webpackChunkportal"]||[]).push([[562,884],{1562:function(t,e,a){a.r(e),a.d(e,{default:function(){return j}});var s=a(6252),r=a(9963),i=a(3577);const o=t=>((0,s.dD)("data-v-3dbbe271"),t=t(),(0,s.Cn)(),t),l={class:"table-heading"},n={class:"flex"},d={class:"floating-container"},c={class:"flex"},u={class:"floating-container"},g={class:"flex"},h={class:"floating-container"},p={class:"flex"},m={class:"floating-container"},f=o((()=>(0,s._)("th",null,"status",-1))),k=o((()=>(0,s._)("div",null,null,-1))),y=["onChange","onUpdate:modelValue"],b=["value"];function w(t,e,a,o,w,_){const P=(0,s.up)("table-sort"),C=(0,s.up)("table-pagination"),v=(0,s.up)("table-main"),T=(0,s.Q2)("debounce");return(0,s.wg)(),(0,s.iD)("div",null,[(0,s.Wm)(v,null,{thead:(0,s.w5)((()=>[(0,s._)("tr",l,[(0,s._)("th",null,[(0,s._)("div",n,[((0,s.wg)(),(0,s.j4)(P,{key:w.i,onClicked:e[0]||(e[0]=t=>{w.j=!w.j,w.k=!w.k,w.l=!w.l,w.p=!w.p}),sortType:"string",sortBy:"title",storeName:"myTasks"})),(0,s._)("div",d,[(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":e[1]||(e[1]=t=>w.filterFor[0]=t),ref:"taskH",class:"header p0",type:"text",required:""},null,512),[[T,_.sort,"700ms",{lock:!0}],[r.nr,w.filterFor[0]]]),(0,s._)("span",{onClick:e[2]||(e[2]=e=>t.$refs["taskH"].focus()),class:"floating-label"},"task")])])]),(0,s._)("th",null,[(0,s._)("div",c,[((0,s.wg)(),(0,s.j4)(P,{key:w.l,onClicked:e[3]||(e[3]=t=>{w.i=!w.i,w.j=!w.j,w.k=!w.k,w.p=!w.p}),sortType:"string",sortBy:"client",storeName:"myTasks"})),(0,s._)("div",u,[(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":e[4]||(e[4]=t=>w.filterFor[2]=t),ref:"clientH",class:"header p0",type:"text",required:""},null,512),[[T,_.sort,"700ms",{lock:!0}],[r.nr,w.filterFor[2]]]),(0,s._)("span",{onClick:e[5]||(e[5]=e=>t.$refs["clientH"].focus()),class:"floating-label"},"client")])])]),(0,s._)("th",null,[(0,s._)("div",g,[((0,s.wg)(),(0,s.j4)(P,{key:w.j,onClicked:e[6]||(e[6]=t=>{w.i=!w.i,w.k=!w.k,w.l=!w.l,w.p=!w.p}),sortType:"string",sortBy:"desc",storeName:"myTasks"})),(0,s._)("div",h,[(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":e[7]||(e[7]=t=>w.filterFor[1]=t),ref:"descH",class:"header p0",type:"text",required:""},null,512),[[T,_.sort,"700ms",{lock:!0}],[r.nr,w.filterFor[1]]]),(0,s._)("span",{onClick:e[8]||(e[8]=e=>t.$refs["descH"].focus()),class:"floating-label"},"description")])])]),(0,s._)("th",null,[(0,s._)("div",p,[((0,s.wg)(),(0,s.j4)(P,{key:w.k,onClicked:e[9]||(e[9]=t=>{w.i=!w.i,w.j=!w.k,w.l=!w.l,w.p=!w.p}),sortType:"string",sortBy:"deadline",storeName:"myTasks"})),(0,s._)("div",m,[(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":e[10]||(e[10]=t=>w.filterFor[3]=t),ref:"deadlineH",class:"header p0",type:"text",required:""},null,512),[[T,_.sort,"700ms",{lock:!0}],[r.nr,w.filterFor[3]]]),(0,s._)("span",{onClick:e[11]||(e[11]=e=>t.$refs["deadlineH"].focus()),class:"floating-label"},"deadline")])])]),f,k])])),tbody:(0,s.w5)((()=>[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(w.myTasksList,((t,e)=>((0,s.wg)(),(0,s.iD)("tr",{class:"tr",key:e},[(0,s._)("td",null,(0,i.zw)(t.title),1),(0,s._)("td",null,(0,i.zw)(t.client),1),(0,s._)("td",null,(0,i.zw)(t.description),1),(0,s._)("td",null,(0,i.zw)(t.deadline),1),(0,s._)("td",null,[(0,s.wy)((0,s._)("select",{onChange:e=>_.changeStatus(t.taskId,t.id,t.statusId,t.title),"onUpdate:modelValue":e=>t.statusId=e,name:"",id:""},[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(w.subTaskStatuses,(t=>((0,s.wg)(),(0,s.iD)("option",{value:t.id,key:t.id},(0,i.zw)(t.status),9,b)))),128))],40,y),[[r.bM,t.statusId]])])])))),128))])),default:(0,s.w5)((()=>[((0,s.wg)(),(0,s.j4)(C,{key:w.p,filters:w.filterFor,onTableData:e[12]||(e[12]=t=>w.myTasksList=t),tableName:"myTasks"},null,8,["filters"]))])),_:1})])}var _=a(9235),P=a(4802),C=a(2177),v=a(5884),T=a(1049),$={components:{TableMain:C.Z,TablePagination:v["default"],TableSort:T.Z},name:"MyTasksList",data(){return{subTaskStatuses:[{id:1,status:"hold"},{id:2,status:"to do"},{id:3,status:"in progress"},{id:4,status:"pending for approval"},{id:5,status:"done"},{id:6,status:"cancel"},{id:7,status:"pending with client"},{id:8,status:"pending with signed documents"},{id:9,status:"pending with DSC"}],myTasksList:[],i:0,j:0,k:0,l:0,p:0,filterFor:["","",""]}},methods:{changeStatus(t,e,a,s){(0,P.Z)({text:s,mutationFnName:"tasks/RESET_STATE",mutationArgs:{isMaster:!1},promise:()=>_.dT.changeStatus({taskId:t,subTaskId:e,statusId:a}),context:this})},sort(){this.p=!this.p}}},N=a(3744);const D=(0,N.Z)($,[["render",w],["__scopeId","data-v-3dbbe271"]]);var j=D},5884:function(t,e,a){a.r(e),a.d(e,{default:function(){return v}});var s=a(6252),r=a(9963),i=a(3577);const o=t=>((0,s.dD)("data-v-a142ede8"),t=t(),(0,s.Cn)(),t),l={class:"flex"},n={class:"recordsPerPage"},d=o((()=>(0,s._)("label",{for:"recordsPerPage"},"entries",-1))),c=o((()=>(0,s._)("option",{value:10},"10",-1))),u=o((()=>(0,s._)("option",{value:20},"20",-1))),g=o((()=>(0,s._)("option",{value:50},"50",-1))),h=o((()=>(0,s._)("option",{value:100},"100",-1))),p=[c,u,g,h],m={class:"neutral"},f=["onClick"],k={class:"neutral"};function y(t,e,a,o,c,u){return(0,s.wg)(),(0,s.iD)("div",l,[(0,s._)("div",n,[d,(0,s.wy)((0,s._)("select",{onChange:e[0]||(e[0]=t=>u.getPageData()),id:"recordsPerPage","onUpdate:modelValue":e[1]||(e[1]=t=>c.recordsPerPage=t),class:"ml8"},p,544),[[r.bM,c.recordsPerPage]])]),(0,s._)("ul",null,[(0,s._)("li",m,[(0,s._)("a",{href:"#",onClick:e[2]||(e[2]=t=>u.pageChange(1))},"<")]),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(u.showPage(),(t=>((0,s.wg)(),(0,s.iD)("li",{class:"neutral",key:t},[(0,s._)("a",{href:"#",class:(0,i.C_)(t==c.currentPage?"green":""),onClick:e=>u.pageChange(t)},(0,i.zw)(t),11,f)])))),128)),(0,s._)("li",k,[(0,s._)("a",{href:"#",onClick:e[3]||(e[3]=t=>u.pageChange(c.pageCount))},">")])])])}var b=a(9669),w=a.n(b),_={name:"TablePagination",data(){return{pageData:"",currentPage:1,recordsPerPage:10,pageCount:""}},computed:{totalRecords(){return this.$store.getters[`${this.tableName}/${this.tableName}CountGet`]}},props:{tableName:String,sortBy:String,sortOrder:Number,filters:Array},methods:{showPage(){if(isNaN(this.pageCount))return 0;{let t=5;t=Math.min(t,this.pageCount);let e=this.currentPage-Math.floor(t/2);return e=Math.max(e,1),e=Math.min(e,this.pageCount-t+1),[...Array(t)].map(((t,a)=>a+e))}},pageChange(t){this.currentPage=t,this.$store.commit(`${this.tableName}/currentPageSet`,{index:t}),this.getPageData()},getPageData(){this.pageCount=Math.ceil(this.totalRecords/this.recordsPerPage);const{sortBy:t,sortOrder:e}=this.$store.getters[`${this.tableName}/sortGet`];let a=this.$store.getters[`${this.tableName}/${this.tableName}ListGet`]?.(this.currentPage,t,e,this.filters);void 0==a||0==a?.length||a?.length<this.recordsPerPage&&a?.length>=10?w().get(`/u/api/${this.tableName}`,{params:{from:(this.currentPage-1)*this.recordsPerPage,recordsPerPage:this.recordsPerPage,sortBy:t,sortOrder:e,filters:this.filters},withCredentials:!0}).then((a=>{this.$store.commit(`${this.tableName}/${this.tableName}List`,{index:this.currentPage,sortBy:t,sortOrder:e,filters:this.filters,data:a.data[this.tableName+"List"]}),this.$emit("tableData",a.data[this.tableName+"List"])})):this.$emit("tableData",a)}},created(){this.$store.commit(`${this.tableName}/currentPageSet`,{index:this.currentPage}),""==this.totalRecords?w().get(`/u/api/${this.tableName}/count`,{withCredentials:!0}).then((t=>{this.$store.commit(`${this.tableName}/${this.tableName}CountSet`,t?.data?.count),this.getPageData()})):this.getPageData()}},P=a(3744);const C=(0,P.Z)(_,[["render",y],["__scopeId","data-v-a142ede8"]]);var v=C},1049:function(t,e,a){a.d(e,{Z:function(){return d}});var s=a(6252),r=a(9963);function i(t,e,a,i,o,l){const n=(0,s.up)("font-awesome-icon");return(0,s.wg)(),(0,s.iD)("div",{class:"sort mr8",onClick:e[0]||(e[0]=(...t)=>l.rotateImg&&l.rotateImg(...t)),onKeyup:e[1]||(e[1]=(0,r.D2)(((...t)=>l.rotateImg&&l.rotateImg(...t)),["enter"]))},["string"==a.sortType?((0,s.wg)(),(0,s.iD)(s.HY,{key:0},[1==o.sortOrder?((0,s.wg)(),(0,s.j4)(n,{key:0,class:"sort-btn",icon:"fa-solid fa-arrow-down-a-z"})):((0,s.wg)(),(0,s.j4)(n,{key:1,class:"sort-btn",icon:"fa-solid fa-arrow-up-a-z"}))],64)):"number"==a.sortType?((0,s.wg)(),(0,s.iD)(s.HY,{key:1},[1==o.sortOrder?((0,s.wg)(),(0,s.j4)(n,{key:0,class:"sort-btn",icon:"fa-solid fa-arrow-down-1-9"})):((0,s.wg)(),(0,s.j4)(n,{key:1,class:"sort-btn",icon:"fa-solid fa-arrow-up-1-9"}))],64)):(0,s.kq)("",!0)],32)}var o={name:"TableSort",props:["sortBy","storeName","sortType"],data(){return{sortOrder:0}},methods:{rotateImg(){1===this.sortOrder?this.sortOrder=0:this.sortOrder=1,this.$emit("clicked"),this.$store.commit(`${this.storeName}/sortSet`,{sortBy:this.sortBy,sortOrder:this.sortOrder})}},updated(){console.log("updated")}},l=a(3744);const n=(0,l.Z)(o,[["render",i],["__scopeId","data-v-8a032ec6"]]);var d=n}}]);
//# sourceMappingURL=562.413f4250.js.map