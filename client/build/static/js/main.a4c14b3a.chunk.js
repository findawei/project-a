(this.webpackJsonptardy=this.webpackJsonptardy||[]).push([[6],{120:function(e,t,n){},127:function(e,t,n){},128:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(37),o=n.n(l),c=n(1),i=n(14),u=n(35),s=n(84),m=n(25),d=n(21),E={events:[],current:[],loading:!1},p={msg:{},status:null,id:null},j={token:localStorage.getItem("token"),isAuthenticated:null,isLoading:!1,user:null},f=Object(u.c)({event:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_EVENTS":case"GET_EVENT":return Object(d.a)({},e,{events:t.payload,loading:!1});case"ADD_EVENT":return Object(d.a)({},e,{events:[t.payload].concat(Object(m.a)(e.events)),loading:!1});case"DELETE_EVENT":return Object(d.a)({},e,{events:e.events.filter((function(e){return e._id!==t.payload})),loading:!1});case"UPDATE_EVENT":case"LOG_ARRIVAL":return Object(d.a)({},e,{events:e.events.map((function(e){return e._id===t.payload._id?t.payload:e}))});case"SET_CURRENT":return Object(d.a)({},e,{current:t.payload});case"CLEAR_CURRENT":return Object(d.a)({},e,{current:null});case"EVENTS_LOADING":return Object(d.a)({},e,{loading:!0});default:return e}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"USER_LOADING":return Object(d.a)({},e,{isLoading:!0});case"USER_LOADED":return Object(d.a)({},e,{isAuthenticated:!0,isLoading:!1,user:t.payload});case"LOGIN_SUCCESS":case"REGISTER_SUCCESS":return localStorage.setItem("token",t.payload.token),Object(d.a)({},e,{},t.payload,{isAuthenticated:!0,isLoading:!1});case"AUTH_ERROR":case"LOGIN_FAIL":case"LOGOUT_SUCCESS":case"REGISTER_FAIL":return localStorage.removeItem("token"),Object(d.a)({},e,{token:null,user:null,isAuthenticated:!1,isLoading:!1});default:return e}},error:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ERRORS":return{msg:t.payload.msg,status:t.payload.status,id:t.payload.id};case"CLEAR_ERRORS":return{msg:{},status:null,id:null};default:return e}}}),b=[s.a],y=Object(u.e)(f,{},Object(u.d)(u.a.apply(void 0,b))),v=n(30),O=n.n(v),h=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return{type:"GET_ERRORS",payload:{msg:e,status:t,id:n}}},g=function(){return{type:"CLEAR_ERRORS"}},_=function(e){var t=e().auth.token,n={headers:{"Content-type":"application/json"}};return t&&(n.headers["x-auth-token"]=t),n},S=(n(70),n(3)),C=Object(i.b)((function(e){return{isAuthenticated:e.auth.isAuthenticated,error:e.error}}),{login:function(e){var t=e.email,n=e.password;return function(e){var a=JSON.stringify({email:t,password:n});O.a.post("/api/auth/login",a,{headers:{"Content-Type":"application/json"}}).then((function(t){return e({type:"LOGIN_SUCCESS",payload:t.data})})).catch((function(t){e(h(t.response.data,t.response.status,"LOGIN_FAIL")),e({type:"LOGIN_FAIL"})}))}},clearErrors:g})((function(e){var t=e.isAuthenticated,n=e.error,l=e.login,o=(e.clearErrors,Object(a.useState)("")),i=Object(S.a)(o,2),u=i[0],s=i[1],m=Object(a.useState)(""),d=Object(S.a)(m,2),E=d[0],p=d[1],j=Object(a.useState)(),f=Object(S.a)(j,2),b=f[0],y=f[1],v=Object(a.useState)(!1),O=Object(S.a)(v,2),h=O[0],g=O[1];return Object(a.useEffect)((function(){"LOGIN_FAIL"===n.id&&(y(n.msg.msg),g(!0))}),[n,t]),r.a.createElement("div",null,r.a.createElement(c.B,{position:"top",isOpen:h,onDidDismiss:function(){return g(!1)},message:b,duration:1e3}),r.a.createElement("form",null,r.a.createElement(c.o,null,r.a.createElement(c.n,{type:"email",name:"email",id:"email",placeholder:"Email",onIonChange:function(e){return s(e.detail.value)}})),r.a.createElement(c.o,null,r.a.createElement(c.n,{type:"password",name:"password",id:"password",placeholder:"Password",className:"mb-3",onIonChange:function(e){return p(e.detail.value)}})),r.a.createElement(c.d,{onClick:function(e){e.preventDefault(),l({email:u,password:E})}},"Login")))})),D=Object(i.b)((function(e){return{isAuthenticated:e.auth.isAuthenticated,error:e.error}}),{register:function(e){var t=e.name,n=e.email,a=e.password;return function(e){var r=JSON.stringify({name:t,email:n,password:a});O.a.post("/api/auth/register",r,{headers:{"Content-Type":"application/json"}}).then((function(t){return e({type:"REGISTER_SUCCESS",payload:t.data})})).catch((function(t){e(h(t.response.data,t.response.status,"REGISTER_FAIL")),e({type:"REGISTER_FAIL"})}))}},clearErrors:g})((function(e){var t=e.isAuthenticated,n=e.error,l=e.register,o=e.clearErrors,i=Object(a.useState)(!1),u=Object(S.a)(i,2),s=u[0],m=u[1],d=Object(a.useState)(""),E=Object(S.a)(d,2),p=E[0],j=E[1],f=Object(a.useState)(""),b=Object(S.a)(f,2),y=b[0],v=b[1],O=Object(a.useState)(""),h=Object(S.a)(O,2),g=h[0],_=h[1],C=Object(a.useState)(),D=Object(S.a)(C,2),A=D[0],T=D[1],k=Object(a.useState)(!1),R=Object(S.a)(k,2),I=R[0],L=R[1],N=Object(a.useCallback)((function(){o(),m(!s)}),[o,s]);return Object(a.useEffect)((function(){"REGISTER_FAIL"===n.id&&(T(n.msg.msg),L(!0)),s&&t&&N()}),[n,N,t,s]),r.a.createElement("div",null,r.a.createElement(c.d,{onClick:N},"Register"),r.a.createElement(c.t,{isOpen:s,onDidDismiss:function(){return m(!1)}},r.a.createElement(c.j,null,r.a.createElement(c.B,{position:"top",isOpen:I,onDidDismiss:function(){return L(!1)},message:A,duration:1e3}),r.a.createElement("form",null,r.a.createElement(c.l,null,r.a.createElement(c.C,null,r.a.createElement(c.e,{slot:"start"},r.a.createElement(c.d,{onClick:function(){return m(!1)}},"Cancel")),r.a.createElement(c.A,null,r.a.createElement("div",{className:"ion-text-center"},"Register")))),r.a.createElement(c.o,null,r.a.createElement(c.n,{required:!0,type:"text",name:"name",id:"name",placeholder:"Name",className:"mb-3",onIonChange:function(e){return j(e.detail.value)}})),r.a.createElement(c.o,null,r.a.createElement(c.n,{required:!0,type:"email",name:"email",id:"email",placeholder:"Email",className:"mb-3",onIonChange:function(e){return v(e.detail.value)}})),r.a.createElement(c.o,null,r.a.createElement(c.n,{type:"password",name:"password",id:"password",placeholder:"Password",className:"mb-3",onIonChange:function(e){return _(e.detail.value)}})),r.a.createElement(c.d,{onClick:function(e){e.preventDefault(),l({name:p,email:y,password:g})}},"Register")))))})),A=(n(120),function(){return function(e,t){e(T()),O.a.get("/api/events",_(t)).then((function(t){return e({type:"GET_EVENTS",payload:t.data})}))}}),T=function(){return{type:"EVENTS_LOADING"}},k=n(16),R=n(213),I=Object(i.b)(null,{deleteEvent:function(e){return function(t,n){O.a.delete("/api/events/".concat(e),_(n)).then((function(n){return t({type:"DELETE_EVENT",payload:e})})).catch((function(e){return t(h(e.response.data,e.response.status))}))}},setCurrent:function(e){return{type:"SET_CURRENT",payload:e}}})((function(e){var t=e.event,n=e.deleteEvent,a=e.setCurrent;return r.a.createElement("div",null,r.a.createElement(c.o,{onClick:function(){return function(e){a(e)}(t)}},r.a.createElement(c.q,null,r.a.createElement("h3",null,t.title),r.a.createElement("p",null,Object(R.a)(new Date(t.dateStart),"MMM d', 'h:mm aaa"),"\u2014\xa0",Object(R.a)(new Date(t.dateEnd),"MMM d', 'h:mm aaa"),r.a.createElement("br",null),t.location,r.a.createElement("br",null),t.attendee)),r.a.createElement(c.d,{routerLink:"/event/log/".concat(t._id),color:"success"},"Log"),r.a.createElement(c.d,{routerLink:"/event/".concat(t._id)},"Edit"),r.a.createElement(c.m,{icon:k.i,slot:"end",className:"remove-btn",color:"danger",onClick:function(){return e=t._id,void n(e);var e}})))})),L=Object(i.b)((function(e){return{event:e.event}}),{getEvents:A})((function(e){var t=e.getEvents,n=e.event;Object(a.useEffect)((function(){t()}),[t]);var l=n.events;return r.a.createElement(c.j,null,r.a.createElement(c.s,null,l.map((function(e){return r.a.createElement(I,{event:e,key:e._id})}))))})),N=(n(71),n(72),n(73),n(74),n(75),n(76),n(77),n(78),n(79),n(80),n(211)),w=n(212),M=function(){var e=Object(a.useState)(!1),t=Object(S.a)(e,2),n=t[0],l=t[1],o=Object(a.useState)(""),i=Object(S.a)(o,2),u=i[0],s=i[1],m=Object(a.useCallback)((function(){l(!n)}),[n]);return r.a.createElement("div",null,r.a.createElement(c.o,{onClick:m},"Invitee"),r.a.createElement(c.t,{isOpen:n,onDidDismiss:function(){return l(!1)}},r.a.createElement(c.j,null,r.a.createElement("form",null,r.a.createElement(c.l,null,r.a.createElement(c.C,null,r.a.createElement(c.e,{slot:"start"},r.a.createElement(c.d,{onClick:function(){return l(!1)}},"Cancel")),r.a.createElement(c.A,null,r.a.createElement("div",{className:"ion-text-center"},"Invitee")))),r.a.createElement(c.o,null,r.a.createElement(c.w,{value:u,onIonChange:function(e){return s(e.detail.value)}}))))))},x=Object(i.b)((function(e){return{event:e.event}}),{addEvent:function(e){return function(t,n){O.a.post("/api/events",e,_(n)).then((function(e){return t({type:"ADD_EVENT",payload:e.data})})).catch((function(e){return t(h(e.response.data,e.response.status))}))}}})((function(e){var t=e.addEvent,n=e.onDismissModal,l=Object(N.a)(new Date,{nearestTo:5}).toString(),o=Object(w.a)(new Date,30),i=Object(N.a)(o,{nearestTo:5}).toString(),u=Object(a.useState)(""),s=Object(S.a)(u,2),m=s[0],d=s[1],E=Object(a.useState)(""),p=Object(S.a)(E,2),j=p[0],f=p[1],b=Object(a.useState)(l),y=Object(S.a)(b,2),v=y[0],O=y[1],h=Object(a.useState)(i),g=Object(S.a)(h,2),_=g[0],C=g[1],D=Object(a.useState)(""),A=Object(S.a)(D,2),T=A[0],k=A[1];return r.a.createElement(c.j,{fullscreen:!0},r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),t({title:m,location:j,dateStart:v,dateEnd:_,attendee:T})}},r.a.createElement(c.l,null,r.a.createElement(c.C,null,r.a.createElement(c.e,{slot:"start"},r.a.createElement(c.d,{onClick:n},"Cancel")),r.a.createElement(c.A,null,r.a.createElement("div",{className:"ion-text-center"},"New Event")),r.a.createElement(c.e,{slot:"end"},r.a.createElement(c.d,{type:"submit",onClick:n},"Add")))),r.a.createElement(c.o,null,r.a.createElement(c.n,{placeholder:"Title",type:"text",onIonChange:function(e){return d(e.detail.value)},name:"title"})),r.a.createElement(c.o,null,r.a.createElement(c.n,{placeholder:"Location",type:"text",onIonChange:function(e){return f(e.detail.value)},name:"location"})),r.a.createElement(c.p,{color:"light"}),r.a.createElement(c.o,null,r.a.createElement(c.q,null,"Starts"),r.a.createElement(c.k,{value:v,name:"dateStart",onIonChange:function(e){return O(e.detail.value)},displayFormat:"MMM DD, h:mm A",minuteValues:"0,5,10,15,20,25,30,35,40,45,50,55"})),r.a.createElement(c.o,null,r.a.createElement(c.q,null,"Ends"),r.a.createElement(c.k,{value:_,name:"dateEnd",onIonChange:function(e){return C(e.detail.value)},displayFormat:"MMM DD, h:mm A",minuteValues:"0,5,10,15,20,25,30,35,40,45,50,55"})),r.a.createElement(c.p,{color:"light"}),r.a.createElement(c.o,null,r.a.createElement(c.n,{placeholder:"Invitee",type:"text",onIonChange:function(e){return k(e.detail.value)},name:"attendee"})),r.a.createElement(c.o,null,r.a.createElement(M,null))))})),G=function(){var e=Object(a.useState)(!1),t=Object(S.a)(e,2),n=t[0],l=t[1];return r.a.createElement(c.u,null,r.a.createElement(c.l,null,r.a.createElement(c.C,null,r.a.createElement(c.A,null,r.a.createElement("div",{className:"ion-text-center"},"Calendar")),r.a.createElement(c.m,{icon:k.a,slot:"end",size:"large",onClick:function(){return l(!0)}}))),r.a.createElement(c.j,null,r.a.createElement(L,null),r.a.createElement(c.t,{isOpen:n,onDidDismiss:function(){return l(!1)},swipeToClose:!0,cssClass:"session-list-filter"},r.a.createElement(x,{onDismissModal:function(){return l(!1)}}))))},U=n(20),q=n(85),F=Object(i.b)((function(e){return{event:e.event}}),{getEvents:A})((function(e){var t=e.getEvents,n=e.event;Object(a.useEffect)((function(){t()}),[t]);var l=n.events,o=l.filter((function(e){return null!=e.arrivalTime})).length,i=l.filter((function(e){return e.arrivalTime<e.dateStart})).length,u=Math.round(i/o*100);return r.a.createElement(c.j,null,r.a.createElement(c.f,null,r.a.createElement(c.h,null,r.a.createElement(c.i,null,"My Stats")),r.a.createElement(c.g,null,r.a.createElement(c.q,null,"On Time: ",u,"%"),r.a.createElement("br",null),r.a.createElement(c.q,null,"Total Meetings Attended: ",o),r.a.createElement("br",null),r.a.createElement(c.q,null,"Rewards Earned:"))),r.a.createElement(c.s,null,l.map((function(e){var t=e._id,n=e.title,a=e.arrivalTime;return r.a.createElement(c.o,{key:t},n,a)}))))})),V=function(){return r.a.createElement(c.u,null,r.a.createElement(F,null))},H=Object(i.b)(null,{logout:function(){return{type:"LOGOUT_SUCCESS"}}})((function(e){var t=e.logout;return r.a.createElement(c.j,null,r.a.createElement(c.q,null),r.a.createElement(c.d,{onClick:t,expand:"block"},"Logout"))})),P=function(){return r.a.createElement(c.u,null,r.a.createElement(c.l,null,r.a.createElement(c.C,null,r.a.createElement(c.A,null,"Settings"))),r.a.createElement(c.j,null,r.a.createElement(H,null)))},B=Object(i.b)((function(e){return{current:e.event.current}}),{updateEvent:function(e){return function(t,n){O.a.put("/api/events/".concat(e._id),e,_(n)).then((function(e){return t({type:"UPDATE_EVENT",payload:e.data})}))}}})((function(e){var t=e.current,n=e.updateEvent,l=Object(a.useState)(""),o=Object(S.a)(l,2),i=o[0],u=o[1],s=Object(a.useState)(""),m=Object(S.a)(s,2),d=m[0],E=m[1],p=Object(a.useState)(""),j=Object(S.a)(p,2),f=j[0],b=j[1],y=Object(a.useState)(""),v=Object(S.a)(y,2),O=v[0],h=v[1],g=Object(a.useState)(""),_=Object(S.a)(g,2),C=_[0],D=_[1];Object(a.useEffect)((function(){t&&(u(t.title),E(t.location),b(t.dateStart),h(t.dateEnd),D(t.attendee))}),[t]);return r.a.createElement(c.u,null,r.a.createElement(c.j,null,r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var a={_id:t._id,title:i,location:d,dateStart:f,dateEnd:O,attendee:C};n(a),u(""),E(""),b(""),h(""),D("")}},r.a.createElement(c.l,null,r.a.createElement(c.C,null,r.a.createElement(c.e,{slot:"start"},r.a.createElement(c.c,{defaultHref:"/",text:"Cancel",icon:""})),r.a.createElement(c.A,null,r.a.createElement("div",{className:"ion-text-center"},"Update Event")),r.a.createElement(c.e,{slot:"end"},r.a.createElement(c.d,{type:"submit",routerLink:"/tab1"},"Done")))),r.a.createElement(c.o,null,r.a.createElement(c.n,{placeholder:"Title",type:"text",value:i,onIonChange:function(e){return u(e.detail.value)},name:"title"})),r.a.createElement(c.o,null,r.a.createElement(c.n,{placeholder:"Location",type:"text",onIonChange:function(e){return E(e.detail.value)},name:"location",value:d})),r.a.createElement(c.p,{color:"light"}),r.a.createElement(c.o,null,r.a.createElement(c.q,null,"Starts"),r.a.createElement(c.k,{value:f,name:"dateStart",onIonChange:function(e){return b(e.detail.value)},displayFormat:"MMM DD, h:mm A",minuteValues:"0,5,10,15,20,25,30,35,40,45,50,55"})),r.a.createElement(c.o,null,r.a.createElement(c.q,null,"Ends"),r.a.createElement(c.k,{value:O,name:"dateEnd",onIonChange:function(e){return h(e.detail.value)},displayFormat:"MMM DD, h:mm A",minuteValues:"0,5,10,15,20,25,30,35,40,45,50,55"})),r.a.createElement(c.p,{color:"light"}),r.a.createElement(c.o,null,r.a.createElement(c.n,{placeholder:"Invitees",type:"text",value:C,onIonChange:function(e){return D(e.detail.value)},name:"attendee"})))))})),J=n(87),Y=n.n(J),z=Object(i.b)((function(e){return{current:e.event.current}}),{logArrival:function(e){return function(t,n){O.a.put("/api/events/log/".concat(e._id),e,_(n)).then((function(e){return t({type:"LOG_ARRIVAL",payload:e.data})}))}}})((function(e){var t=e.current,n=e.logArrival,l=Object(a.useState)(""),o=Object(S.a)(l,2),i=(o[0],o[1]),u=Object(a.useState)(""),s=Object(S.a)(u,2),m=(s[0],s[1]),d=Object(a.useState)(""),E=Object(S.a)(d,2),p=(E[0],E[1]),j=Object(a.useState)(""),f=Object(S.a)(j,2),b=(f[0],f[1]),y=Object(a.useState)(""),v=Object(S.a)(y,2),O=(v[0],v[1]),h=Object(a.useState)(""),g=Object(S.a)(h,2),_=g[0],C=g[1];Object(a.useEffect)((function(){t&&(i(t.title),m(t.location),p(t.dateStart),b(t.dateEnd),O(t.attendee),C(t.arrivalTime))}),[t]);Object(a.useEffect)((function(){var e={_id:t._id,title:t.title,location:t.title,dateStart:t.title,dateEnd:t.title,attendee:t.title,arrivalTime:_};n(e),i(""),m(""),p(""),b(""),O("")}),[_]);var D,A=new Date(t.dateStart),T=new Date(Date.parse(_));return D=A>T?"You have arrived on time!":A<T?"You're late!":"You have not arrived yet.",r.a.createElement(c.u,null,r.a.createElement(c.l,null,r.a.createElement(c.C,null,r.a.createElement(c.e,{slot:"start"},r.a.createElement(c.c,{defaultHref:"/"})),r.a.createElement(c.A,null,r.a.createElement("div",{className:"ion-text-center"},"Log")))),r.a.createElement(c.j,null,r.a.createElement(c.o,null,t.title,r.a.createElement("br",null),t.location),r.a.createElement(c.o,null,r.a.createElement(c.q,null,"Scheduled Time:"),r.a.createElement(c.k,{value:t.dateStart,readonly:!0,displayFormat:"MMM DD, h:mm A"}),r.a.createElement(c.k,{value:t.dateEnd,readonly:!0,displayFormat:"MMM DD, h:mm A"})),r.a.createElement(c.o,{color:"success"},r.a.createElement(c.q,null,"Time now"),r.a.createElement(Y.a,{format:"HH:mm:ss A",ticking:!0,timezone:""})),r.a.createElement(c.o,null,r.a.createElement(c.q,null,"You"),r.a.createElement(c.k,{placeholder:_,value:_,readonly:!0,displayFormat:"MMM DD, h:mm A"})),r.a.createElement(c.o,null,r.a.createElement(c.q,null,r.a.createElement("div",{className:"ion-text-center"},D))),r.a.createElement(c.d,{type:"submit",expand:"block",onClick:function(){C(Date())},disabled:!!_},"Log")))})),W=Object(i.b)((function(e){return{auth:e.auth}}),null)((function(e){var t=e.auth,n=r.a.createElement(q.a,null,r.a.createElement(c.z,null,r.a.createElement(c.v,null,r.a.createElement(U.c,{path:"/",render:function(){return r.a.createElement(U.b,{to:"/tab1"})},exact:!0}),r.a.createElement(U.c,{path:"/tab1",component:G}),r.a.createElement(U.c,{path:"/tab2",component:V}),r.a.createElement(U.c,{path:"/tab3",component:P}),r.a.createElement(U.c,{path:"/event/:_id",component:B,exact:!0}),r.a.createElement(U.c,{path:"/event/log/:_id",component:z,exact:!0})),r.a.createElement(c.x,{slot:"bottom"},r.a.createElement(c.y,{tab:"tab1",href:"/tab1"},r.a.createElement(c.m,{icon:k.c}),r.a.createElement(c.q,null,"Calendar")),r.a.createElement(c.y,{tab:"tab2",href:"/tab2"},r.a.createElement(c.m,{icon:k.e}),r.a.createElement(c.q,null,"Log")),r.a.createElement(c.y,{tab:"tab3",href:"/tab3"},r.a.createElement(c.m,{icon:k.k}),r.a.createElement(c.q,null,"Settings"))))),a=r.a.createElement(c.u,null,r.a.createElement(c.j,null,r.a.createElement(c.f,null,r.a.createElement(c.o,null,r.a.createElement(c.A,null,r.a.createElement("div",{className:"ion-text-center"},"Welcome to Tardy"))),r.a.createElement(c.g,null,r.a.createElement(C,null),r.a.createElement(D,null)))));return r.a.createElement("div",null,t&&t.isAuthenticated?n:a)})),$=(n(127),function(){return Object(a.useEffect)((function(){y.dispatch((function(e,t){e({type:"USER_LOADING"}),O.a.get("/api/auth/user",_(t)).then((function(t){return e({type:"USER_LOADED",payload:t.data})})).catch((function(t){e(h(t.response.data,t.response.status)),e({type:"AUTH_ERROR"})}))}))}),[]),r.a.createElement(i.a,{store:y},r.a.createElement(c.b,null,r.a.createElement(W,null)))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var K=function(){o.a.render(r.a.createElement($,null),document.getElementById("root"))};window.cordova?document.addEventListener("deviceready",(function(){K()}),!1):K(),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},70:function(e,t,n){},91:function(e,t,n){e.exports=n(128)},97:function(e,t,n){var a={"./ion-action-sheet-ios.entry.js":[129,67],"./ion-action-sheet-md.entry.js":[130,68],"./ion-alert-ios.entry.js":[131,59],"./ion-alert-md.entry.js":[132,60],"./ion-app_8-ios.entry.js":[133,53],"./ion-app_8-md.entry.js":[134,54],"./ion-avatar_3-ios.entry.js":[135,8],"./ion-avatar_3-md.entry.js":[136,9],"./ion-back-button-ios.entry.js":[137,10],"./ion-back-button-md.entry.js":[138,11],"./ion-backdrop-ios.entry.js":[139,12],"./ion-backdrop-md.entry.js":[140,13],"./ion-button_2-ios.entry.js":[141,69],"./ion-button_2-md.entry.js":[142,70],"./ion-card_5-ios.entry.js":[143,14],"./ion-card_5-md.entry.js":[144,15],"./ion-checkbox-ios.entry.js":[145,16],"./ion-checkbox-md.entry.js":[146,17],"./ion-chip-ios.entry.js":[147,18],"./ion-chip-md.entry.js":[148,19],"./ion-col_3.entry.js":[149,20],"./ion-datetime_3-ios.entry.js":[150,57],"./ion-datetime_3-md.entry.js":[151,58],"./ion-fab_3-ios.entry.js":[152,21],"./ion-fab_3-md.entry.js":[153,22],"./ion-img.entry.js":[154,23],"./ion-infinite-scroll_2-ios.entry.js":[155,24],"./ion-infinite-scroll_2-md.entry.js":[156,25],"./ion-input-ios.entry.js":[157,26],"./ion-input-md.entry.js":[158,27],"./ion-item-option_3-ios.entry.js":[159,71],"./ion-item-option_3-md.entry.js":[160,72],"./ion-item_8-ios.entry.js":[161,73],"./ion-item_8-md.entry.js":[162,74],"./ion-loading-ios.entry.js":[163,28],"./ion-loading-md.entry.js":[164,29],"./ion-menu_3-ios.entry.js":[165,75],"./ion-menu_3-md.entry.js":[166,76],"./ion-modal-ios.entry.js":[167,55],"./ion-modal-md.entry.js":[168,56],"./ion-nav_2.entry.js":[169,66],"./ion-popover-ios.entry.js":[170,30],"./ion-popover-md.entry.js":[171,31],"./ion-progress-bar-ios.entry.js":[172,32],"./ion-progress-bar-md.entry.js":[173,33],"./ion-radio_2-ios.entry.js":[174,34],"./ion-radio_2-md.entry.js":[175,35],"./ion-range-ios.entry.js":[176,77],"./ion-range-md.entry.js":[177,78],"./ion-refresher_2-ios.entry.js":[178,61],"./ion-refresher_2-md.entry.js":[179,62],"./ion-reorder_2-ios.entry.js":[180,36],"./ion-reorder_2-md.entry.js":[181,37],"./ion-ripple-effect.entry.js":[182,38],"./ion-route_4.entry.js":[183,79],"./ion-searchbar-ios.entry.js":[184,80],"./ion-searchbar-md.entry.js":[185,81],"./ion-segment_2-ios.entry.js":[186,82],"./ion-segment_2-md.entry.js":[187,83],"./ion-select_3-ios.entry.js":[188,84],"./ion-select_3-md.entry.js":[189,85],"./ion-slide_2-ios.entry.js":[190,86],"./ion-slide_2-md.entry.js":[191,87],"./ion-spinner.entry.js":[192,39],"./ion-split-pane-ios.entry.js":[193,40],"./ion-split-pane-md.entry.js":[194,41],"./ion-tab-bar_2-ios.entry.js":[195,42],"./ion-tab-bar_2-md.entry.js":[196,43],"./ion-tab_2.entry.js":[197,44],"./ion-text.entry.js":[198,45],"./ion-textarea-ios.entry.js":[199,46],"./ion-textarea-md.entry.js":[200,47],"./ion-toast-ios.entry.js":[201,63],"./ion-toast-md.entry.js":[202,64],"./ion-toggle-ios.entry.js":[203,48],"./ion-toggle-md.entry.js":[204,49],"./ion-virtual-scroll.entry.js":[205,50]};function r(e){if(!n.o(a,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],r=t[0];return n.e(t[1]).then((function(){return n(r)}))}r.keys=function(){return Object.keys(a)},r.id=97,e.exports=r},99:function(e,t,n){var a={"./ion-icon.entry.js":[209,90]};function r(e){if(!n.o(a,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],r=t[0];return n.e(t[1]).then((function(){return n(r)}))}r.keys=function(){return Object.keys(a)},r.id=99,e.exports=r}},[[91,7,51]]]);
//# sourceMappingURL=main.a4c14b3a.chunk.js.map