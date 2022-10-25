(function(){"use strict";var e={3099:function(e,t,n){var r=n(9963),o=n(6252);function a(e,t){const n=(0,o.up)("router-view");return(0,o.wg)(),(0,o.j4)(n)}var i=n(3744);const s={},c=(0,i.Z)(s,[["render",a]]);var l=c,u=n(2201);function m(e,t){const n=(0,o.up)("router-view");return(0,o.wg)(),(0,o.j4)(n)}const d={},p=(0,i.Z)(d,[["render",m]]);var f=p,h=n(3907),g=(0,h.MT)({state:{rights:[],persistant:!1,message:{display:!1,msg:"",title:""}},getters:{getRights(e){return e.rights},getMessageVisiblity(e){return e.message.display},getMessageData(e){return{msg:e.message.msg,title:e.message.title}}},mutations:{setRights(e,t){var n=[];t.forEach((e=>{n.push(e.code_name)})),console.log("mutaions setRights ",n),e.rights=n},showMessage(e,{msg:t,title:n}){e.message.display=!0,e.message.msg=t,e.message.title=n},hideMessage(e){e.message.display=!1,e.message.title="",e.message.msg=""}},actions:{rights(e,t){console.log("actions rights ",t),e.commit("setRights",t),this.state.persistant=!0},promptMessage(e,{msg:t,title:n}){new Promise((r=>{e.commit("showMessage",{msg:t,title:n}),setTimeout((()=>{r()}),5e3)})).then((()=>{e.commit("hideMessage")}))}},modules:{}});const b=[{path:"/",alias:"/portal-deploy",name:"main",component:f,children:[{path:"/",alias:"/login",name:"login",component:()=>Promise.all([n.e(669),n.e(429)]).then(n.bind(n,9429))}]},{path:"/u",name:"u",component:()=>Promise.all([n.e(669),n.e(238)]).then(n.bind(n,2270)),children:[{path:"/no-access",name:"no_access",component:()=>n.e(978).then(n.bind(n,5978))},{path:"users",alias:"users",name:"users",component:()=>n.e(99).then(n.bind(n,1099)),children:[{path:"create-user",name:"create_user",meta:{protected:!0},component:()=>Promise.all([n.e(669),n.e(838)]).then(n.bind(n,3838))},{path:"list",alias:"",name:"users_list",component:()=>Promise.all([n.e(669),n.e(749)]).then(n.bind(n,1749))},{path:"edit/:editUserId",name:"edit_user",meta:{protected:!0},component:()=>Promise.all([n.e(669),n.e(838)]).then(n.bind(n,3838)),props:!0}]},{path:"roles",name:"roles",component:()=>n.e(931).then(n.bind(n,3931)),children:[{path:"create-role",name:"create_role",meta:{protected:!0},component:()=>Promise.all([n.e(669),n.e(216)]).then(n.bind(n,6216))},{path:"list",alias:"",name:"roles_list",component:()=>Promise.all([n.e(669),n.e(863)]).then(n.bind(n,5863))},{path:"edit/:editRoleName",name:"edit_role",meta:{protected:!0},component:()=>Promise.all([n.e(669),n.e(216)]).then(n.bind(n,6216)),props:!0}]},{path:"projects",component:()=>n.e(233).then(n.bind(n,9233)),children:[{path:"list",alias:"",name:"projects_list",component:()=>n.e(363).then(n.bind(n,1363))},{path:"create",name:"create_project",component:()=>n.e(398).then(n.bind(n,8398))}]},{path:"clients",name:"clients_list",component:()=>n.e(424).then(n.bind(n,3424)),children:[{path:"list",alias:"",name:"clients_list",component:()=>n.e(598).then(n.bind(n,2598))},{path:"create-client",name:"create_client",component:()=>n.e(913).then(n.bind(n,6913))}]},{path:"tasks",name:"tasks",component:()=>n.e(212).then(n.bind(n,8212)),children:[{path:"list",alias:"",component:()=>n.e(6).then(n.bind(n,3006))},{path:"create-task",name:"create_task",component:()=>n.e(64).then(n.bind(n,3248))},{path:"edit-task",name:"edit_task",component:()=>n.e(64).then(n.bind(n,3248)),props:!0}]},{path:"my-tasks",name:"my_tasks",component:()=>n.e(906).then(n.bind(n,7906)),children:[{path:"list",alias:"",name:"my_tasks_list",component:()=>n.e(582).then(n.bind(n,4582))}]},{path:"activity",name:"activity",meta:{protected:!0},component:()=>Promise.all([n.e(669),n.e(346)]).then(n.bind(n,1346))}]}],v=(0,u.p7)({history:(0,u.PO)("/portal-front/"),routes:b});v.beforeEach((e=>{if(e?.meta.protected){console.log(e?.name,e?.meta),console.log(e?.meta.protected,g.state.rights);const t=g.state.rights.some((t=>t==e.name));if(!t)return{name:"no_access"}}}));var y=v,_=n(6123),k=n.n(_);(0,r.ri)(l).use(k()).use(g).use(y).mount("#app")}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,n),a.exports}n.m=e,function(){var e=[];n.O=function(t,r,o,a){if(!r){var i=1/0;for(u=0;u<e.length;u++){r=e[u][0],o=e[u][1],a=e[u][2];for(var s=!0,c=0;c<r.length;c++)(!1&a||i>=a)&&Object.keys(n.O).every((function(e){return n.O[e](r[c])}))?r.splice(c--,1):(s=!1,a<i&&(i=a));if(s){e.splice(u--,1);var l=o();void 0!==l&&(t=l)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[r,o,a]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{6:"8ef3c7ba",64:"6b77851d",99:"9c057359",212:"c8993b7a",216:"f0597eea",233:"103a6e4e",238:"174f0260",346:"8c01b102",363:"688991fd",398:"b01d6f3a",424:"01231c8c",429:"74f8958f",582:"01f1c0b1",598:"a3a990df",669:"e28ca159",749:"c11341e6",838:"d0998895",863:"c7152383",906:"6d11f8cf",913:"4d7b4b8c",931:"be90af2b",978:"59282860"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{6:"d0b4d10f",64:"126402e7",216:"21a0bab2",238:"46639ac9",346:"123b064d",363:"fc5f2f19",398:"f37e07f5",429:"d6ac9159",582:"8beac853",598:"8dd077b2",749:"686157f8",838:"b02c2137",863:"3fc0ff4a",913:"1c5fd40b"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="portal:";n.l=function(r,o,a,i){if(e[r])e[r].push(o);else{var s,c;if(void 0!==a)for(var l=document.getElementsByTagName("script"),u=0;u<l.length;u++){var m=l[u];if(m.getAttribute("src")==r||m.getAttribute("data-webpack")==t+a){s=m;break}}s||(c=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+a),s.src=r),e[r]=[o];var d=function(t,n){s.onerror=s.onload=null,clearTimeout(p);var o=e[r];if(delete e[r],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach((function(e){return e(n)})),t)return t(n)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=d.bind(null,s.onerror),s.onload=d.bind(null,s.onload),c&&document.head.appendChild(s)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/portal-front/"}(),function(){var e=function(e,t,n,r){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var a=function(a){if(o.onerror=o.onload=null,"load"===a.type)n();else{var i=a&&("load"===a.type?"missing":a.type),s=a&&a.target&&a.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=i,c.request=s,o.parentNode.removeChild(o),r(c)}};return o.onerror=o.onload=a,o.href=t,document.head.appendChild(o),o},t=function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=n[r],a=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(a===e||a===t))return o}var i=document.getElementsByTagName("style");for(r=0;r<i.length;r++){o=i[r],a=o.getAttribute("data-href");if(a===e||a===t)return o}},r=function(r){return new Promise((function(o,a){var i=n.miniCssF(r),s=n.p+i;if(t(i,s))return o();e(r,s,o,a)}))},o={143:0};n.f.miniCss=function(e,t){var n={6:1,64:1,216:1,238:1,346:1,363:1,398:1,429:1,582:1,598:1,749:1,838:1,863:1,913:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=r(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,r){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var a=new Promise((function(n,r){o=e[t]=[n,r]}));r.push(o[2]=a);var i=n.p+n.u(t),s=new Error,c=function(r){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var a=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;s.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",s.name="ChunkLoadError",s.type=a,s.request=i,o[1](s)}};n.l(i,c,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,a,i=r[0],s=r[1],c=r[2],l=0;if(i.some((function(t){return 0!==e[t]}))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(c)var u=c(n)}for(t&&t(r);l<i.length;l++)a=i[l],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(u)},r=self["webpackChunkportal"]=self["webpackChunkportal"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(3099)}));r=n.O(r)})();
//# sourceMappingURL=app.9b55ebc1.js.map