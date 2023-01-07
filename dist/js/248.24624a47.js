"use strict";(self["webpackChunkportal"]=self["webpackChunkportal"]||[]).push([[248],{1248:function(e,t,i){i.r(t),i.d(t,{default:function(){return W}});var a=i(6252),n=i(9963),l=i(3577);const s=e=>((0,a.dD)("data-v-767cce3c"),e=e(),(0,a.Cn)(),e),c={class:"card"},o={class:"table-tabs"},d={class:"mt16 pb32 pr16 pl16"},r={class:"fg-wrapper pl16"},m={class:"row mt8"},u=s((()=>(0,a._)("label",{for:"client-cli-llpin",class:"labels c1"},"CIN/LLPIN",-1))),p={id:"i1",class:"row mt8"},h=s((()=>(0,a._)("label",{for:"client-name",class:"labels c1"},"name",-1))),f={id:"i3",class:"row mt8"},b=s((()=>(0,a._)("label",{for:"client-type",class:"labels c1"},"type",-1))),_=["value"],y={id:"i5",class:"row mt8"},v=s((()=>(0,a._)("label",{for:"firm-name",class:"labels c1"},"firm-name",-1))),N={id:"i6",class:"row mt8"},w=s((()=>(0,a._)("label",{for:"address",class:"labels c1"},"address",-1))),g={id:"i7",class:"row mt8"},k=s((()=>(0,a._)("label",{for:"PAN",class:"labels c1"},"PAN",-1))),E={id:"i8",class:"row mt8"},x=s((()=>(0,a._)("label",{for:"ca-email",class:"labels c1"},"email",-1))),T={class:"fg-wrapper pl16"},C={class:"row mt8"},P=s((()=>(0,a._)("label",{for:"contact-name",class:"labels c1"},"name",-1))),I={class:"row mt8"},$=s((()=>(0,a._)("label",{for:"contact-email",class:"labels c1"},"email",-1))),A={class:"row mt8"},L=s((()=>(0,a._)("label",{for:"contact-phone",class:"labels c1"},"phone",-1))),U=["disabled"],V=["disabled"];function D(e,t,i,s,D,Z){return(0,a.wg)(),(0,a.iD)("div",c,[(0,a._)("div",o,[(0,a._)("button",{onClick:t[0]||(t[0]=e=>Z.openTab(e,"client")),ref:"defaultTab"+i.uk,class:"button neutral tab"},"client detail",512),(0,a._)("button",{onClick:t[1]||(t[1]=e=>Z.openTab(e,"ca")),class:"button neutral tab"},"ca details"),(0,a._)("button",{onClick:t[2]||(t[2]=e=>Z.openTab(e,"contact")),class:"button neutral tab"},"contact")]),(0,a._)("form",d,[(0,a._)("div",r,[(0,a._)("div",{class:"hide fg",ref:"client"+i.uk},[(0,a._)("div",m,[u,(0,a.wy)((0,a._)("input",{ref:"client"+i.uk+"focus","onUpdate:modelValue":t[3]||(t[3]=e=>D.cin=e),type:"text",id:"client-cli-llpin"},null,512),[[n.nr,D.cin]])]),(0,a._)("div",p,[h,(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":t[4]||(t[4]=e=>D.clientName=e),id:"client-name",type:"text"},null,512),[[n.nr,D.clientName]])]),(0,a._)("div",f,[b,(0,a.wy)((0,a._)("select",{"onUpdate:modelValue":t[5]||(t[5]=e=>D.clientTypeId=e),id:"client-type"},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(Z.clientTypes,((e,t)=>((0,a.wg)(),(0,a.iD)("option",{key:t,value:e.id},(0,l.zw)(e.type),9,_)))),128))],512),[[n.bM,D.clientTypeId]])])],512),(0,a._)("div",{class:"hide fg",ref:"ca"+i.uk},[(0,a._)("div",y,[v,(0,a.wy)((0,a._)("input",{ref:"ca"+i.uk+"focus","onUpdate:modelValue":t[6]||(t[6]=e=>D.firmName=e),type:"text",id:"firm-name"},null,512),[[n.nr,D.firmName]])]),(0,a._)("div",N,[w,(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":t[7]||(t[7]=e=>D.firmAddress=e),type:"text",id:"address"},null,512),[[n.nr,D.firmAddress]])]),(0,a._)("div",g,[k,(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":t[8]||(t[8]=e=>D.caPan=e),type:"text",id:"PAN"},null,512),[[n.nr,D.caPan]])]),(0,a._)("div",E,[x,(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":t[9]||(t[9]=e=>D.caEmail=e),type:"text",id:"ca-email"},null,512),[[n.nr,D.caEmail]])])],512)]),(0,a._)("div",T,[(0,a._)("div",{class:"hide fg",ref:"contact"+i.uk},[(0,a._)("div",C,[P,(0,a.wy)((0,a._)("input",{ref:"contact"+i.uk+"focus","onUpdate:modelValue":t[10]||(t[10]=e=>D.conName=e),type:"text",id:"contact-name"},null,512),[[n.nr,D.conName]])]),(0,a._)("div",I,[$,(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":t[11]||(t[11]=e=>D.conEmail=e),type:"text",id:"contact-email"},null,512),[[n.nr,D.conEmail]])]),(0,a._)("div",A,[L,(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":t[12]||(t[12]=e=>D.conPhone=e),type:"text",id:"contact-phone"},null,512),[[n.nr,D.conPhone]])])],512)]),(0,a._)("button",{disabled:!0===D.disabled,onClick:t[13]||(t[13]=(0,n.iM)((e=>Z.proceed()),["prevent"])),class:"green mt16 ml16 button"},"save",8,U),(0,a._)("button",{disabled:!0===D.disabled,onClick:t[14]||(t[14]=(0,n.iM)((e=>Z.canceled()),["prevent"])),class:"neutral ml8 mt16 button"},"cancel",8,V)])])}var Z=i(9235),F=i(4802),S=i(3262),O={name:"ClientCreate",props:["clientData","uk"],data(){return{cin:"",clientName:"",clientTypeId:"",firmName:"",firmAddress:"",caPan:"",caEmail:"",conName:"",conEmail:"",conPhone:"",editing:!1,editClientId:"",disabled:!1}},computed:{clientTypes(){return this.$store.getters["clients/getAllTypesList"]}},methods:{openTab(e,t){var i=e.target.parentElement.getElementsByClassName("tab");let a=[...i].find((e=>1==e?.classList?.contains("tab-open")));a?.classList?.remove("tab-open"),e?.target?.classList?.add("tab-open"),this.$refs["client"+this.uk]?.classList?.add("hide"),this.$refs["ca"+this.uk]?.classList?.add("hide"),this.$refs["contact"+this.uk]?.classList?.add("hide"),this.$refs[t+this.uk]?.classList?.remove("hide"),this.$refs[t+this.uk+"focus"].focus()},canceled(){1==this.editing&&this.$emit("editingCompleted"),this.$router.push("/u/clients/list")},proceed(){this.disabled=!0;const e={clientId:this.editClientId,clientName:this.clientName,clientTypeId:this.clientTypeId,cin:this.cin,firmName:this.firmName,firmAddress:this.firmAddress,caEmail:this.caEmail,caPan:this.caPan,conName:this.conName,conEmail:this.conEmail,conPhone:this.conPhone};void 0!=e.clientId&&""!=e.clientId?(0,F.Z)({text:e.clientName,mutationFnName:"clients/refetch",promise:Z.yj.edit(e),context:this}):(0,S.Z)({text:e.clientName,url:"/u/clients/list",promise:Z.yj.create(e),mutationFnName:"clients/RESET_STATE",mutationArgs:{},context:this})}},mounted(){if(this.$refs["defaultTab"+this.uk].click(),void 0!=this.clientData&&(this.editing=!0),0!=this.editing){const{id:e,typeId:t,name:i,cin:a,caFirmName:n,caAddress:l,caPan:s,caEmail:c,conName:o,conEmail:d,conPhone:r}=JSON.parse(this.clientData);this.editClientId=e,this.clientName=i,this.cin=a,this.clientTypeId=t,this.firmName=n,this.firmAddress=l,this.caPan=s,this.caEmail=c,this.conName=o,this.conEmail=d,this.conPhone=r}}},M=i(3744);const j=(0,M.Z)(O,[["render",D],["__scopeId","data-v-767cce3c"]]);var W=j},3262:function(e,t,i){i.d(t,{Z:function(){return l}});var a=i(6737),n=i.n(a);function l({text:e,url:t,mutationFnName:i,mutationArgs:a,promise:l,context:s}){let c=a;void 0==c&&(c={}),l.then((()=>n()({title:"Success",text:`Created "${e}"`,icon:"success",button:"ok"}))).then((()=>{s.$store.commit(i,c),setTimeout((()=>s.$router.push(t)),1)})).catch((e=>{null!=e&&n()("Oops!",`We can't perform this action right now please try again\n\n details: ${e}`)})).finally((()=>{s.disabled=!1}))}},4802:function(e,t,i){i.d(t,{Z:function(){return s}});var a=i(4907),n=i(6737),l=i.n(n);function s({text:e,mutationFnName:t,mutationArgs:i,promise:n,context:s}){n.then((()=>(t&&a.Z.commit(t,i),s.$emit("editingCompleted",{}),l()({title:"Success",text:`Edited "${e}"`,icon:"success",button:"Ok"})))).catch((e=>{if(null!=e)return l()("Oops!",`We can't perform this action right now please try again\n\n details: ${e}`)})).finally((()=>{s.disabled=!1}))}}}]);
//# sourceMappingURL=248.24624a47.js.map