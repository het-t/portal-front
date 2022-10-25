"use strict";(self["webpackChunkportal"]=self["webpackChunkportal"]||[]).push([[346],{150:function(A,a,t){t.d(a,{Z:function(){return M}});var g=t(6252),o=t(9963),e=t(3577);const i=A=>((0,g.dD)("data-v-31ccc1da"),A=A(),(0,g.Cn)(),A),l={class:"flex"},B={class:"recordsPerPage"},E=i((()=>(0,g._)("label",{for:"recordsPerPage"},"entries",-1))),T=i((()=>(0,g._)("option",{value:"10"},"10",-1))),s=i((()=>(0,g._)("option",{value:"20"},"20",-1))),r=i((()=>(0,g._)("option",{value:"50"},"50",-1))),n=i((()=>(0,g._)("option",{value:"100"},"100",-1))),d=[T,s,r,n],I={class:"neutral"},q=["onClick"],C={class:"neutral"};function c(A,a,t,i,T,s){return(0,g.wg)(),(0,g.iD)("div",l,[(0,g._)("div",B,[E,(0,g.wy)((0,g._)("select",{onChange:a[0]||(a[0]=A=>s.getPageData()),id:"recordsPerPage","onUpdate:modelValue":a[1]||(a[1]=A=>T.recordsPerPage=A),type:"number",class:"ml8"},d,544),[[o.bM,T.recordsPerPage]])]),(0,g._)("ul",null,[(0,g._)("li",I,[(0,g._)("a",{href:"#",onClick:a[2]||(a[2]=A=>s.pageChange(1))},"<<")]),((0,g.wg)(!0),(0,g.iD)(g.HY,null,(0,g.Ko)(s.showPage,(A=>((0,g.wg)(),(0,g.iD)("li",{class:"neutral",key:A},[(0,g._)("a",{href:"#",class:(0,e.C_)(A==T.currentPage?"green":""),onClick:a=>s.pageChange(A)},(0,e.zw)(A),11,q)])))),128)),(0,g._)("li",C,[(0,g._)("a",{href:"#",onClick:a[3]||(a[3]=A=>s.pageChange(T.pageCount))},">>")])])])}var N=t(9669),u=t.n(N),y={name:"TablePagination",data(){return{pageData:"",totalRecords:"",currentPage:1,recordsPerPage:10,pageCount:""}},computed:{showPage(){let A=5;A=Math.min(A,this.pageCount);let a=this.currentPage-Math.floor(A/2);return a=Math.max(a,1),a=Math.min(a,this.pageCount-A+1),[...Array(A)].map(((A,t)=>t+a))}},props:{tableName:String},methods:{pageChange(A){this.currentPage=A,this.getPageData()},getPageData(){this.pageCount=Math.ceil(this.totalRecords/this.recordsPerPage),u().get(`/u/api/${this.tableName}`,{params:{from:(this.currentPage-1)*this.recordsPerPage,records_per_page:this.recordsPerPage},withCredentials:!0}).then((A=>{this.$emit("tableData",A.data),console.log("table data",A.data)}))}},created(){u().get(`/u/api/${this.tableName}/count`,{withCredentials:!0}).then((A=>{this.totalRecords=A.data[0].count,this.pageCount=Math.ceil(this.totalRecords/this.recordsPerPage),console.log("total records: ",this.totalRecords),console.log("page count:",this.pageCount)})),this.getPageData()}},h=t(3744);const p=(0,h.Z)(y,[["render",c],["__scopeId","data-v-31ccc1da"]]);var M=p},8614:function(A,a,t){t.d(a,{Z:function(){return s}});var g=t(6252),o=t(9963),e="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA9QAAAKOCAQAAADtv5kqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAAGAAAABgAPBrQs8AAAAHdElNRQflAxoRETHtugfXAAAKo0lEQVR42u3YsU0DQQBE0V10BVABCQWQUYODo0AoA7cBNZ0DIwJLF+8P3qtgsi/N3I8BAETNIdQAkPW0egAAcE6oASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBs+1m9AAA4NY/VCwCAU65vAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAI276O1RMAai7jZa7eAHdzCDXAg+/xIdREuL4BIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBMqAEgTKgBIEyoASBs+1y9ACDnbfUA+DeP1QsAgFOubwAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACNt+j9UT4O55vM7VGwBq5hBqIvZxFWqAB65vAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAIE2oACBNqAAgTagAI2/bVC+DP++oBAEE3F7QTfWtA0LUAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDMtMjVUMjA6MDg6MzMrMDA6MDBbWVBtAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE2LTA0LTE2VDA3OjI5OjUwKzAwOjAw1WCIgQAAAABJRU5ErkJggg==";const i={class:"sort ml24"};function l(A,a,t,l,B,E){return(0,g.wg)(),(0,g.iD)("div",i,[(0,g._)("button",null,[(0,g._)("img",{onClick:a[0]||(a[0]=(0,o.iM)(((...A)=>E.rotateImg&&E.rotateImg(...A)),["prevent"])),ref:"sortImg",src:e,alt:"",class:"sorting-img"},null,512)])])}var B={name:"TableSort",data(){return{sortStatus:!1,sortedData:[]}},props:{tableData:JSON,keyToSort:String},methods:{rotateImg(){console.log("rotating"),this.sort=!this.sort,this.sort?this.$refs.sortImg.classList.add("tr-th-rotated"):this.$refs.sortImg.classList.remove("tr-th-rotated"),this.$emit("sorted",this.sortData().reverse()),this.sortedData=this.tableData},sortData(){this.sortedData=this.tableData;for(let A=1;A!=this.tableData.length;A++){let a,t=this.tableData[A];for(a=A-1;a>=0;a--){if(!(this.tableData[a]>this.tableData[A]))break;this.sortedData[a+1]=this.tableData[a]}this.sortedData[a+1]=t}return this.sortedData}}},E=t(3744);const T=(0,E.Z)(B,[["render",l],["__scopeId","data-v-8446d356"]]);var s=T},1346:function(A,a,t){t.r(a),t.d(a,{default:function(){return Y}});var g=t(6252),o=t(3577);const e=A=>((0,g.dD)("data-v-1394ddda"),A=A(),(0,g.Cn)(),A),i={class:"card"},l=e((()=>(0,g._)("div",{class:"card-head m0 pb16 pt16 pr16 pl16"},[(0,g._)("h5",{class:"table-head m0"},"activity")],-1))),B={class:"mt16 ml16 mr16"},E={class:"tr-th"},T=(0,g.Uk)(" id "),s=e((()=>(0,g._)("th",null,[(0,g._)("div",{class:"tr-th"}," user ")],-1))),r=e((()=>(0,g._)("th",null," activity ",-1))),n=e((()=>(0,g._)("th",null," table ",-1))),d=e((()=>(0,g._)("th",null," key ",-1))),I=e((()=>(0,g._)("th",null,"details",-1))),q={class:"w"},C={class:"tr-th"},c=(0,g.Uk)(" time "),N={class:"w"},u={class:"pagination mr16 ml16"};function y(A,a,t,e,y,h){const p=(0,g.up)("FullFilter"),M=(0,g.up)("TableSort"),S=(0,g.up)("TablePagination");return(0,g.wg)(),(0,g.iD)("div",null,[(0,g._)("div",i,[l,(0,g.Wm)(p,{tableData:y.activityData,dataFields:y.filterFields,onFiltered:a[0]||(a[0]=A=>y.filteredActivities=A),clear:y.clear,class:"mr16 ml16 mt16 actions"},null,8,["tableData","dataFields","clear"]),(0,g._)("div",B,[(0,g._)("table",null,[(0,g._)("tr",null,[(0,g._)("th",null,[(0,g._)("div",E,[T,(0,g.Wm)(M,{onSorted:a[1]||(a[1]=A=>y.activityData=A),tableData:y.activityData,keyToSort:"id"},null,8,["tableData"])])]),s,r,n,d,I,(0,g._)("th",q,[(0,g._)("div",C,[c,(0,g.Wm)(M,{onSorted:a[2]||(a[2]=A=>y.activityData=A),tableData:y.activityData,keyToSort:"datestamp"},null,8,["tableData"])])])]),((0,g.wg)(!0),(0,g.iD)(g.HY,null,(0,g.Ko)(h.activitiesToDisplay,(A=>((0,g.wg)(),(0,g.iD)("tr",{class:"tr",key:A?.id},[(0,g._)("td",null,(0,o.zw)(A?.id),1),(0,g._)("td",null,(0,o.zw)(A?.email),1),(0,g._)("td",null,(0,o.zw)(A?.activity),1),(0,g._)("td",null,(0,o.zw)(A?.reference_table),1),(0,g._)("td",null,(0,o.zw)(A?.reference_table_pk_id),1),(0,g._)("td",null,(0,o.zw)(A?.detail),1),(0,g._)("td",N,(0,o.zw)(new Date(A?.datestamp).toLocaleString()),1)])))),128))])]),(0,g._)("div",u,[(0,g.Wm)(S,{onTableData:a[3]||(a[3]=A=>h.tablePagination(A)),tableName:"activity"})])])])}var h=t(150),p=t(8614),M=t(9963);const S=A=>((0,g.dD)("data-v-36ac00e8"),A=A(),(0,g.Cn)(),A),m={class:"actions"},v=S((()=>(0,g._)("label",{for:"search",class:"mr8"},"search",-1))),D=S((()=>(0,g._)("option",{value:"",selected:""},"none",-1))),K=["value"],_={key:0},f={key:0,id:"filter-select"},b=["value"],F={key:1,id:"filter-inputs"},w=["type"],P={key:0,class:"mr8 ml8"},k=["type"];function V(A,a,t,e,i,l){return(0,g.wg)(),(0,g.iD)("div",m,[v,(0,g.wy)((0,g._)("select",{onChange:a[0]||(a[0]=(...A)=>l.filter&&l.filter(...A)),"onUpdate:modelValue":a[1]||(a[1]=A=>i.dataToFind=A),id:"search",class:"mr24"},[D,((0,g.wg)(!0),(0,g.iD)(g.HY,null,(0,g.Ko)(t.dataFields,(A=>((0,g.wg)(),(0,g.iD)("option",{value:[A.name,A.relation,A.type,A?.values].join("/"),key:A.name},(0,o.zw)(A.name),9,K)))),128))],544),[[M.bM,i.dataToFind]]),""!=i.dataToFind?((0,g.wg)(),(0,g.iD)("div",_,["select"==l.dataTypeToFind?((0,g.wg)(),(0,g.iD)("div",f,[(0,g.wy)((0,g._)("select",{"onUpdate:modelValue":a[2]||(a[2]=A=>i.dataValueToFind1=A),onChange:a[3]||(a[3]=(...A)=>l.filter&&l.filter(...A)),name:"filter",id:"filter-select-values"},[((0,g.wg)(!0),(0,g.iD)(g.HY,null,(0,g.Ko)(l.dataValuesToFind,(A=>((0,g.wg)(),(0,g.iD)("option",{value:A,key:A},(0,o.zw)(A),9,b)))),128))],544),[[M.bM,i.dataValueToFind1]])])):((0,g.wg)(),(0,g.iD)("div",F,[(0,g.wy)((0,g._)("input",{onInput:a[4]||(a[4]=(...A)=>l.filter&&l.filter(...A)),type:l.dataTypeToFind,"onUpdate:modelValue":a[5]||(a[5]=A=>i.dataValueToFind1=A)},null,40,w),[[M.YZ,i.dataValueToFind1]]),"date"==l.dataTypeToFind?((0,g.wg)(),(0,g.iD)("span",P," to ")):(0,g.kq)("",!0),"date"==l.dataTypeToFind?(0,g.wy)(((0,g.wg)(),(0,g.iD)("input",{key:1,onInput:a[6]||(a[6]=(...A)=>l.filter&&l.filter(...A)),type:l.dataTypeToFind,"onUpdate:modelValue":a[7]||(a[7]=A=>i.dataValueToFind2=A)},null,40,k)),[[M.YZ,i.dataValueToFind2]]):(0,g.kq)("",!0)]))])):(0,g.kq)("",!0)])}var U={name:"FullFilter",data(){return{dataToFind:"",dataValueToFind1:"",dataValueToFind2:""}},computed:{dataValuesToFind(){return this.dataToFind?.split("/")[3].split(",")},dataTypeToFind(){return this.dataToFind?.split("/")[2]},dataRealtionToFind(){return this.dataToFind?.split("/")[1]}},props:{tableData:String,dataFields:JSON,clear:Boolean},methods:{filter(){console.log(this.dataToFind);let A=[],a=this.dataToFind.split("/")[0],t=this.dataToFind.split("/")[1];if(console.log(this.dataValueToFind1,this.dataValueToFind2),""==this.dataToFind||""==this.dataValueToFind1&&""==this.dataValueToFind2)this.$emit("filtered",this.tableData);else for(let g of this.tableData){switch(t){case"exact":1==g[a].toString().includes(this.dataValueToFind1)&&A.push(g);break;case"inequality":g[a]>=this.dataValueToFind1&&g[a]<=this.dataValueToFind2&&A.push(g);break}this.$emit("filtered",A)}}},created(){console.log(this.dataFields)}},R=t(3744);const Q=(0,R.Z)(U,[["render",V],["__scopeId","data-v-36ac00e8"]]);var Z=Q,z={name:"UserActivity",data(){return{activityData:"",filterFields:[{name:"id",relation:"exact",type:"number"},{name:"datestamp",relation:"inequality",type:"date"},{name:"email",relation:"exact",type:"text"},{name:"activity",relation:"exact",type:"select",values:["login","activities"]},{name:"detail",relation:"exact",type:"select",values:["success","error"]}],filteredActivities:void 0,clear:!1}},computed:{activitiesToDisplay(){return void 0!=this.filteredActivities?this.filteredActivities:this.activityData}},methods:{tablePagination(A){this.activityData=A,this.filteredActivities=void 0,this.clear=!0}},components:{TablePagination:h.Z,TableSort:p.Z,FullFilter:Z}};const O=(0,R.Z)(z,[["render",y],["__scopeId","data-v-1394ddda"]]);var Y=O}}]);
//# sourceMappingURL=346.8c01b102.js.map