"use strict";(self["webpackChunkportal"]=self["webpackChunkportal"]||[]).push([[100],{5100:function(n,a,e){e.r(a),e.d(a,{default:function(){return _}});var l=e(6252),t=e(9963);const i=n=>((0,l.dD)("data-v-6df31728"),n=n(),(0,l.Cn)(),n),o={class:"login"},r={class:"login-main"},d=i((()=>(0,l._)("p",{id:"banner"},"Login",-1))),s=i((()=>(0,l._)("br",null,null,-1))),u=i((()=>(0,l._)("br",null,null,-1)));function p(n,a,e,i,p,c){return(0,l.wg)(),(0,l.iD)("div",o,[(0,l._)("div",r,[(0,l._)("form",null,[d,(0,l.wy)((0,l._)("input",{"onUpdate:modelValue":a[0]||(a[0]=n=>p.email=n),placeholder:"E-Mail",id:"email",type:"text",name:"email"},null,512),[[t.nr,p.email]]),s,(0,l.wy)((0,l._)("input",{"onUpdate:modelValue":a[1]||(a[1]=n=>p.pwd=n),placeholder:"Password",id:"pwd",type:"password",name:"password"},null,512),[[t.nr,p.pwd]]),u,(0,l._)("button",{class:"green button",onClick:a[2]||(a[2]=(0,t.iM)((n=>(c.login(),c.clear())),["prevent"]))},"login")])])])}var c=e(9669),m=e.n(c),h=e(3907),w={name:"LogIn",data(){return{email:"",pwd:""}},methods:{...(0,h.nv)(["rights"]),login(){m().post("api/login",{email:this.email,password:this.pwd},{withCredentials:!0}).then((n=>{console.log("login() LogIn.vue ",n?.data,1==n?.data),1==n?.data?this.$router.push({name:"u"}):this.$router.push({name:"login"})}))},clear(){this.email="",this.pwd=""}}},g=e(3744);const v=(0,g.Z)(w,[["render",p],["__scopeId","data-v-6df31728"]]);var _=v}}]);
//# sourceMappingURL=100.5f62f96d.js.map