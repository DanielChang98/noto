(this["webpackJsonpfirebase-react-auth"]=this["webpackJsonpfirebase-react-auth"]||[]).push([[0],{154:function(e,t,a){},253:function(e,t,a){e.exports=a(445)},269:function(e,t,a){},444:function(e,t,a){},445:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(24),c=a.n(l),o=a(21),s=a(200),i=a.n(s),u=(a(258),a(260),i.a.initializeApp({apiKey:"AIzaSyANHN64tf8qlSHgrr6U8nSr2aZPx2ihGoU",authDomain:"noto-13.firebaseapp.com",databaseURL:"https://noto-13.firebaseio.com",projectId:"noto-13",storageBucket:"noto-13.appspot.com",messagingSenderId:"1093198433828",appId:"1:1093198433828:web:9a021bad9e842db21112b1"})),m=u.auth(),d=(u.database(),u),p=r.a.createContext();function f(){return Object(n.useContext)(p)}function h(e){var t=e.children,a=Object(n.useState)(),l=Object(o.a)(a,2),c=l[0],s=l[1],i=Object(n.useState)(!0),u=Object(o.a)(i,2),d=u[0],f=u[1];Object(n.useEffect)((function(){return m.onAuthStateChanged((function(e){s(e),f(!1)}))}),[]);var h={currentUser:c,login:function(e,t){return m.signInWithEmailAndPassword(e,t)},signup:function(e,t){return m.createUserWithEmailAndPassword(e,t)},logout:function(){return m.signOut()},resetPassword:function(e){return m.sendPasswordResetEmail(e)},updateProfile:function(e){return c.updateProfile({displayName:e})},updatePassword:function(e){return c.updatePassword(e)}};return r.a.createElement(p.Provider,{value:h},!d&&t)}var E=a(22),v=a(17),b=a(221);function y(e){var t=e.component,a=Object(b.a)(e,["component"]),n=f().currentUser;return r.a.createElement(v.b,Object.assign({},a,{render:function(e){return n?r.a.createElement(t,e):r.a.createElement(v.a,{to:"/login"})}}))}var g=a(27),w=a.n(g),j=a(41),k=a(469),O=a(499),N=a(498),S=a(495),T=a(470);a(152);function x(){Object(n.useRef)();var e=Object(n.useRef)(),t=Object(n.useRef)(),a=Object(n.useRef)(),l=f(),c=l.signup,s=(l.updateProfile,Object(n.useState)("")),i=Object(o.a)(s,2),u=i[0],m=i[1],d=Object(n.useState)(!1),p=Object(o.a)(d,2),h=p[0],b=p[1],y=Object(v.g)();function g(){return(g=Object(j.a)(w.a.mark((function n(r){var l;return w.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(r.preventDefault(),t.current.value===a.current.value){n.next=3;break}return n.abrupt("return",m("Passwords do not match"));case 3:return l=[],m(""),b(!0),n.prev=6,n.next=9,c(e.current.value,t.current.value);case 9:n.next=14;break;case 11:n.prev=11,n.t0=n.catch(6),m("Failed to create an account");case 14:Promise.all(l).then((function(){y.push("/")})).catch((function(){m("Failed to update account")})).finally((function(){b(!1),y.push("/")})),b(!1);case 16:case"end":return n.stop()}}),n,null,[[6,11]])})))).apply(this,arguments)}return r.a.createElement(r.a.Fragment,null,r.a.createElement(k.a,{className:"d-flex align-items-center justify-content-center",style:{minHeight:"100vh"}},r.a.createElement("div",{className:"w-100",style:{maxWidth:"400px"}},r.a.createElement(O.a,null,r.a.createElement(O.a.Body,null,r.a.createElement("h2",{className:"text-center mb-4"},"Sign Up"),u&&r.a.createElement(N.a,{variant:"danger"},u),r.a.createElement(S.a,{onSubmit:function(e){return g.apply(this,arguments)}},r.a.createElement(S.a.Group,{id:"email"},r.a.createElement(S.a.Control,{type:"email",ref:e,placeholder:"Enter your email",required:!0})),r.a.createElement(S.a.Group,{id:"password"},r.a.createElement(S.a.Control,{type:"password",ref:t,placeholder:"Enter your password",required:!0})),r.a.createElement(S.a.Group,{id:"password-confirm"},r.a.createElement(S.a.Control,{type:"password",ref:a,placeholder:"Repeat your password",required:!0})),r.a.createElement(T.a,{disabled:h,className:"w-100",type:"submit"},"Sign Up")))),r.a.createElement("div",{className:"w-100 text-center mt-2"},"Already have an account? ",r.a.createElement(E.b,{to:"/login"},"Log In"),r.a.createElement("br",null),r.a.createElement(E.b,{to:"/"},"Back to Home")))))}function P(){var e=Object(n.useRef)(),t=Object(n.useRef)(),a=f().login,l=Object(n.useState)(""),c=Object(o.a)(l,2),s=c[0],i=c[1],u=Object(n.useState)(!1),m=Object(o.a)(u,2),d=m[0],p=m[1],h=Object(v.g)();function b(){return(b=Object(j.a)(w.a.mark((function n(r){return w.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r.preventDefault(),n.prev=1,i(""),p(!0),n.next=6,a(e.current.value,t.current.value);case 6:h.push("/"),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(1),i("Failed to log in");case 12:p(!1);case 13:case"end":return n.stop()}}),n,null,[[1,9]])})))).apply(this,arguments)}return r.a.createElement(r.a.Fragment,null,r.a.createElement(k.a,{className:"d-flex align-items-center justify-content-center",style:{minHeight:"100vh"}},r.a.createElement("div",{className:"w-100",style:{maxWidth:"400px"}},r.a.createElement(O.a,null,r.a.createElement(O.a.Body,null,r.a.createElement("h2",{className:"text-center mb-4"},"Login"),s&&r.a.createElement(N.a,{variant:"danger"},s),r.a.createElement(S.a,{onSubmit:function(e){return b.apply(this,arguments)}},r.a.createElement(S.a.Group,{id:"email"},r.a.createElement(S.a.Label,null,"Email address"),r.a.createElement("br",null),r.a.createElement(S.a.Control,{type:"email",placeholder:"Enter your email address",ref:e,required:!0})),r.a.createElement(S.a.Group,{id:"password"},r.a.createElement(S.a.Label,null,"Password"),r.a.createElement("br",null),r.a.createElement(S.a.Control,{type:"password",placeholder:"Enter your password",ref:t,required:!0})),r.a.createElement(T.a,{disabled:d,className:"w-100",type:"submit"},"Log In")),r.a.createElement("div",{className:"w-100 text-center mt-3"},r.a.createElement(E.b,{to:"/forgot-password"},"Forgot Password?")))),r.a.createElement("div",{className:"w-100 text-center mt-2"},"Need an account? ",r.a.createElement(E.b,{to:"/signup"},"Sign Up"),r.a.createElement("br",null),r.a.createElement(E.b,{to:"/"},"Back to Home")))))}function C(){var e=Object(n.useRef)(),t=f().resetPassword,a=Object(n.useState)(""),l=Object(o.a)(a,2),c=l[0],s=l[1],i=Object(n.useState)(""),u=Object(o.a)(i,2),m=u[0],d=u[1],p=Object(n.useState)(!1),h=Object(o.a)(p,2),v=h[0],b=h[1];function y(){return(y=Object(j.a)(w.a.mark((function a(n){return w.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n.preventDefault(),a.prev=1,d(""),s(""),b(!0),a.next=7,t(e.current.value);case 7:d("Check your inbox for further instructions"),a.next=13;break;case 10:a.prev=10,a.t0=a.catch(1),s("Failed to reset password");case 13:b(!1);case 14:case"end":return a.stop()}}),a,null,[[1,10]])})))).apply(this,arguments)}return r.a.createElement(r.a.Fragment,null,r.a.createElement(k.a,{className:"d-flex align-items-center justify-content-center",style:{minHeight:"100vh"}},r.a.createElement("div",{className:"w-100",style:{maxWidth:"400px"}},r.a.createElement(O.a,null,r.a.createElement(O.a.Body,null,r.a.createElement("h2",{className:"text-center mb-4"},"Password Reset"),c&&r.a.createElement(N.a,{variant:"danger"},c),m&&r.a.createElement(N.a,{variant:"success"},m),r.a.createElement(S.a,{onSubmit:function(e){return y.apply(this,arguments)}},r.a.createElement(S.a.Group,{id:"email"},r.a.createElement(S.a.Label,null,"Email address"),r.a.createElement(S.a.Control,{type:"email",placeholder:"Enter your email address",ref:e,required:!0})),r.a.createElement(T.a,{disabled:v,className:"w-100",type:"submit"},"Reset Password")),r.a.createElement("div",{className:"w-100 text-center mt-3"},r.a.createElement(E.b,{to:"/login"},"Cancel")))))))}var F=a(203),I=["hours","userTimerReport"];var A=a(500),R=a(471),B=a(472),L=a(473),D=a(501),U=a(474),G=a(475);function H(){var e=f(),t=(e.currentUser,e.logout),a=Object(v.g)();function n(){return(n=Object(j.a)(w.a.mark((function e(){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t();case 3:a.push("/login"),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log("Failed to log out");case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}return function(){var e=new Date,t=!0,a=d.database(),n=d.auth().currentUser,r=n.uid,l=new Date(e).toISOString().slice(0,10);I.map((function(e){var c=a.ref(e+"/");c.once("value").then((function(a){a.forEach((function(e){e.key===n.uid&&(t=!1)})),1==t&&("hours"==e?c.child(r).set(Object(F.a)({},r,{hour:0,date:l})):"userTimerReport"==e&&c.child(r).set({hoursFocused:0,daysAccessed:1,daysStreak:0})),t=!0}))}))}(),r.a.createElement(r.a.Fragment,null,r.a.createElement(A.a,{id:"navbar"},r.a.createElement(R.a,{id:"navflex"},"Noto",r.a.createElement(B.a,{id:"navlink"},[{title:"Dashboard",path:"/"},{title:"Tasks",path:"/"},{title:"Board",path:"/"},{title:"Timer",path:"/timer"},{title:"TimerReport",path:"/timer-report"},{title:"Account",path:"/edit-profile"}].map((function(e){var t=e.title,a=e.path;return r.a.createElement("a",{href:a,key:t},r.a.createElement(L.a,null,r.a.createElement(D.a,{primary:t})))}))),r.a.createElement(B.a,null,r.a.createElement(L.a,null,r.a.createElement(U.a,{color:"inherit",onClick:function(){return n.apply(this,arguments)}},r.a.createElement(G.a,null)))))))}function q(){var e=Object(n.useRef)(),t=Object(n.useRef)(),a=Object(n.useRef)(),l=f(),c=l.currentUser,s=l.updatePassword,i=l.updateProfile,u=Object(n.useState)(""),m=Object(o.a)(u,2),d=m[0],p=m[1],h=Object(n.useState)(!1),b=Object(o.a)(h,2),y=b[0],g=b[1],w=Object(v.g)();return r.a.createElement(r.a.Fragment,null,r.a.createElement(k.a,{className:"d-flex align-items-center justify-content-center",style:{minHeight:"100vh"}},r.a.createElement("div",{className:"w-100",style:{maxWidth:"400px"}},r.a.createElement(O.a,null,r.a.createElement(O.a.Body,null,r.a.createElement("h2",{className:"text-center mb-4"},"Edit Profile"),d&&r.a.createElement(N.a,{variant:"danger"},d),d&&r.a.createElement(N.a,{variant:"danger"},d),r.a.createElement(S.a,{onSubmit:function(n){if(n.preventDefault(),t.current.value!==a.current.value)return p("Passwords do not match");var r=[];g(!0),p(""),e.current.value!==c.displayName&&r.push(i(e.current.value)),t.current.value&&r.push(s(t.current.value)),Promise.all(r).then((function(){w.push("/")})).catch((function(){p("Failed to update account")})).finally((function(){g(!1)}))}},r.a.createElement(S.a.Group,{id:"name"},r.a.createElement(S.a.Label,null,"Name"),r.a.createElement("br",null),r.a.createElement(S.a.Control,{type:"text",ref:e,required:!0,defaultValue:c.displayName})),r.a.createElement(S.a.Group,{id:"password"},r.a.createElement(S.a.Label,null,"Password"),r.a.createElement("br",null),r.a.createElement(S.a.Control,{type:"password",ref:t,placeholder:"Leave blank to remain unchanged"})),r.a.createElement(S.a.Group,{id:"password-confirm"},r.a.createElement(S.a.Label,null,"Password Confirmation"),r.a.createElement("br",null),r.a.createElement(S.a.Control,{type:"password",ref:a,placeholder:"Leave blank to remain unchanged"})),r.a.createElement(T.a,{disabled:y,className:"w-100",type:"submit"},"Update")))),r.a.createElement("div",{className:"w-100 text-center mt-2"},r.a.createElement(E.b,{to:"/"},"Cancel")))))}var W=a(94),M=a(95),z=a(37),K=a(99),J=a(98),_=a(101),V=a(447),Z=a(207),Q=a.n(Z),X=(a(268),a(269),function(e){Object(K.a)(a,e);var t=Object(J.a)(a);function a(){var e;return Object(W.a)(this,a),(e=t.call(this)).state={time:0,play:!1,timeType:0,title:"",estimated:!1},e.setTimeForCode=e.setTime.bind(Object(z.a)(e),1500),e.setTimeForSocial=e.setTime.bind(Object(z.a)(e),300),e.setTimeForCoffee=e.setTime.bind(Object(z.a)(e),900),e.reset=e.reset.bind(Object(z.a)(e)),e.play=e.play.bind(Object(z.a)(e)),e.elapseTime=e.elapseTime.bind(Object(z.a)(e)),e}return Object(M.a)(a,[{key:"componentDidMount",value:function(){this.setDefaultTime(),Notification.requestPermission()}},{key:"elapseTime",value:function(){if(0===this.state.time&&(this.reset(0),this.alert()),!0===this.state.play){var e=this.state.time-1;this.setState({time:e,title:this.getTitle(e)})}}},{key:"format",value:function(e){var t=Math.floor(e%3600/60),a=Math.floor(e%3600%60);return(t<10?"0":"")+t+":"+(a<10?"0":"")+a}},{key:"getFormatTypes",value:function(){return[{type:"code",time:1500},{type:"social",time:300},{type:"coffee",time:900}]}},{key:"formatType",value:function(e){for(var t=this.getFormatTypes(),a=0;a<t.length;a++){var n=t[a];if(n.time===e)return n.type}return null}},{key:"restartInterval",value:function(){clearInterval(this.interval),this.interval=setInterval(this.elapseTime,1e3)}},{key:"play",value:function(){!0!==this.state.play&&(this.restartInterval(),this.setState({play:!0}))}},{key:"reset",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.state.time;clearInterval(this.interval);this.format(e);this.setState({play:!1})}},{key:"togglePlay",value:function(){return!0===this.state.play?this.reset():this.play()}},{key:"setTime",value:function(e){this.restartInterval(),this.setState({time:e,timeType:e,title:this.getTitle(e),play:!0,estimated:!1})}},{key:"setDefaultTime",value:function(){this.setState({time:1500,timeType:1500,title:this.getTitle(1500),play:!1,estimated:!1})}},{key:"getTitle",value:function(e){return e="undefined"===typeof e?this.state.time:e,this.format(e)+" | Pomodoro timer"}},{key:"toggleMode",value:function(e){for(var t=this.getFormatTypes(),a=-1,n=0;n<t.length;n++)if(t[n].time===this.state.timeType){a=n;break}if(-1!==a){var r=t[a+e];r&&this.setTime(r.time)}}},{key:"_setLocalStorage",value:function(e,t){var a=t.target.checked;localStorage.setItem("react-pomodoro-"+e,a)}},{key:"_getLocalStorage",value:function(e){return"true"==localStorage.getItem("react-pomodoro-"+e)}},{key:"alert",value:function(){if(this.refs.vibrate.checked&&window.navigator.vibrate(1e3),this.refs.audio.checked){var e=new Audio("songs/alarm.mp3");e.play(),setTimeout((function(){return e.pause()}),1400)}if(this.refs.notification.checked)if(1500===this.state.timeType)new Notification("Relax :)",{icon:"img/coffee.png",lang:"en",body:"Go talk or drink a coffee."});else new Notification("The time is over!",{icon:"img/code.png",lang:"en",body:"Hey, back to code!"})}},{key:"estimatedTime",value:function(){new Date;console.log("hi")}},{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("div",null,r.a.createElement(H,null)),r.a.createElement("div",{className:"reportButtonContainer"},r.a.createElement(V.a,{variant:"outlined",startIcon:r.a.createElement(Q.a,null)},"Report")),r.a.createElement("div",{className:"timerContainer"},r.a.createElement("div",{className:"timerMain"},r.a.createElement("div",{className:"timerControlButton"},r.a.createElement(_.AwesomeButton,{type:"secondary",onPress:this.setTimeForCode},"Pomodoro"),r.a.createElement(_.AwesomeButton,{type:"secondary",onPress:this.setTimeForSocial},"Short Break"),r.a.createElement(_.AwesomeButton,{type:"secondary",onPress:this.setTimeForCoffee},"Long Break")),r.a.createElement("div",{className:"timerCountdown"},r.a.createElement("span",{className:"time"},this.format(this.state.time))),r.a.createElement("div",{className:"timerEstimated"},r.a.createElement("h5",null))),r.a.createElement("div",{className:"timerCenter"},r.a.createElement("button",{className:"startButton",onClick:this.play},"START"),r.a.createElement("button",{className:"stopButton",onClick:this.reset},"STOP"))))}}]),a}(r.a.Component)),Y=a(208),$=a.n(Y),ee=a(209),te=a.n(ee),ae=a(210),ne=a.n(ae);a(154);function re(e){var t=e.icon,a=e.label,n=e.bottomLabel;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"componentContainer"},r.a.createElement("div",{className:"componentContainerTop"},r.a.createElement("div",{className:"componentContainerTopIcon"},"AccessTimeIcon"==t?r.a.createElement($.a,{style:{fontSize:70}}):"DateRangeIcon"==t?r.a.createElement(te.a,{style:{fontSize:70}}):r.a.createElement(ne.a,{style:{fontSize:70}})),r.a.createElement("h1",{className:"componentContainerTopLabel"},a)),r.a.createElement("div",{className:"componentContainerBottom"},r.a.createElement("p",{className:"componentContainerBottomLabel"},n)))))}var le=a(494),ce=a(38),oe=[{name:"Page A",uv:4e3,pv:2400,amt:2400},{name:"Page B",uv:3e3,pv:1398,amt:2210},{name:"Page C",uv:2e3,pv:9800,amt:2290},{name:"Page D",uv:2780,pv:3908,amt:2e3},{name:"Page E",uv:1890,pv:4800,amt:2181},{name:"Page F",uv:2390,pv:3800,amt:2500},{name:"Page G",uv:3490,pv:4300,amt:2100}],se=[],ie=function(e){Object(K.a)(a,e);var t=Object(J.a)(a);function a(){var e;return Object(W.a)(this,a),(e=t.call(this)).state={hoursFocused:0,daysAccessed:0,daysStreak:0,infoArray:[]},e}return Object(M.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=d.database().ref("userTimerReport/"),a=d.auth().currentUser;t.on("value",(function(t){t.forEach((function(t){if(t.key===a.uid){var n=t.val();e.setState({hoursFocused:n.hoursFocused,daysAccessed:n.daysAccessed,daysStreak:n.daysStreak})}}))})),d.database().ref("hours/").on("value",(function(t){t.forEach((function(t){t.key===a.uid&&t.forEach((function(t){console.log(t.val()),e.state.infoArray.push(t.val()),se.push(t.val())}))}))})),console.log(oe),console.log(se),console.log(this.state.infoArray)}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"bar"},r.a.createElement("div",{className:"barInnerContainer"},r.a.createElement(re,{icon:"AccessTimeIcon",label:this.state.hoursFocused,bottomLabel:"hours focused"}),r.a.createElement(re,{icon:"DateRangeIcon",label:this.state.daysAccessed,bottomLabel:"days accessed"}),r.a.createElement(re,{icon:"WhatshotIcon",label:this.state.daysStreak,bottomLabel:"days streak"}))),r.a.createElement("div",{className:"focusHourBar"},r.a.createElement("p",{className:"focusHourFont"},"Focus Hours"),r.a.createElement(le.a,{color:"primary","aria-label":"outlined primary button group"},r.a.createElement(V.a,null,"Today"),r.a.createElement(V.a,null,"This Week"))),r.a.createElement("div",null,r.a.createElement(ce.b,{width:500,height:300,data:oe,margin:{top:5,right:30,left:20,bottom:5}},r.a.createElement(ce.c,{strokeDasharray:"3 3"}),r.a.createElement(ce.f,{dataKey:"name"}),r.a.createElement(ce.g,null),r.a.createElement(ce.e,null),r.a.createElement(ce.d,null),r.a.createElement(ce.a,{dataKey:"pv",fill:"#8884d8"}),r.a.createElement(ce.a,{dataKey:"uv",fill:"#82ca9d"}))))}}]),a}(r.a.Component);var ue=function(){return r.a.createElement(E.a,null,r.a.createElement(h,null,r.a.createElement(v.d,null,r.a.createElement(y,{exact:!0,path:"/",component:H}),r.a.createElement(y,{path:"/edit-profile",component:q}),r.a.createElement(y,{path:"/timer",component:X}),r.a.createElement(y,{path:"/timer-report",component:ie}),r.a.createElement(v.b,{path:"/signup",component:x}),r.a.createElement(v.b,{path:"/login",component:P}),r.a.createElement(v.b,{path:"/forgot-password",component:C}))))};a(444);c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ue,null)),document.getElementById("root"))}},[[253,1,2]]]);
//# sourceMappingURL=main.f9c148bc.chunk.js.map