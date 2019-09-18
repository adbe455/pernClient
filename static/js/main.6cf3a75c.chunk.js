(window.webpackJsonpclient=window.webpackJsonpclient||[]).push([[0],{13:function(e,t,a){},26:function(e,t,a){e.exports=a(37)},31:function(e,t,a){},37:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(21),l=a.n(c),o=(a(31),a(7)),s=(a(13),a(38)),u=a(39),m=a(40),i=a(41),d=a(10),E=function(e){return r.a.createElement(d.b,{to:"/",className:"nav-item",onClick:e.logout},"Logout")},f=function(e){return r.a.createElement(s.a,{className:"red",light:!0,expand:"md"},r.a.createElement(u.a,{href:"/"},"Game Critic"),e.token?r.a.createElement(m.a,{className:"ml-auto",navbar:!0},r.a.createElement(i.a,null,r.a.createElement(E,null))):r.a.createElement(m.a,{className:"ml-auto",navbar:!0},r.a.createElement(i.a,null,r.a.createElement(d.b,{to:"/login",className:"nav-item"},"Log In")),r.a.createElement(i.a,null,r.a.createElement(d.b,{to:"/signup",className:"nav-item"},"Sign Up")),r.a.createElement(i.a,null,r.a.createElement(d.b,{to:"/search",className:"nav-item"},"Search"))))},p=a(45),h=a(46),g=a(42),b=a(43),v=a(50),j=a(44),O=function(){var e=Object(n.useState)(""),t=Object(o.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(0),s=Object(o.a)(l,2),u=s[0],m=(s[1],Object(n.useState)(1)),i=Object(o.a)(m,2);i[0],i[1];return r.a.createElement(g.a,{className:"search-bar justify-content-center"},r.a.createElement(b.a,{className:"col-4",onChange:function(e){return c(e.target.value)}}),r.a.createElement(v.a,{addonType:"append"},r.a.createElement(j.a,{onClick:function(e){return e.preventDefault(),void fetch("https://api-v3.igdb.com/games",{method:"POST",headers:{"user-key":"cc5441053548ed186c2e6a3add7af2f1",Accept:"application/json"},body:JSON.stringify("\n                search ".concat(a,";\n                offset ").concat(u,";\n                fields name, first_release_date, genres, cover.*;\n                where themes != 42;\n                limit 50;\n            "))}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))}},"Find game")))},k=function(){return r.a.createElement("div",{className:"darkred"},r.a.createElement(p.a,{id:"jumbotron",fluid:!0},r.a.createElement(h.a,{fluid:!0},r.a.createElement("h1",{className:"display-3 d-flex justify-content-center"},"Game Critic"),r.a.createElement("p",{className:"lead d-flex justify-content-center"},"Community reviews and info on your favorite games"))),r.a.createElement(O,null))},w=a(47),y=a(48),S=a(49),N=a(12),C=function(e){var t=Object(n.useState)(""),a=Object(o.a)(t,2),c=a[0],l=a[1],s=Object(n.useState)(""),u=Object(o.a)(s,2),m=u[0],i=u[1],d=Object(n.useState)(!0),E=Object(o.a)(d,2),f=E[0],p=E[1],h=Object(n.useState)(!1),O=Object(o.a)(h,2),k=O[0],C=O[1];return r.a.createElement(w.a,{style:{marginTop:"10vh"},className:"mx-auto col-lg-4"},r.a.createElement(y.a,null,r.a.createElement(S.a,{for:"username"},"Username"),r.a.createElement(b.a,{onChange:function(e){return l(e.target.value)}})),r.a.createElement(y.a,null,r.a.createElement(S.a,{for:"password"},"Password"),r.a.createElement(g.a,null,r.a.createElement(b.a,{onChange:function(e){return i(e.target.value)},type:f?"password":""}),r.a.createElement(v.a,{addonType:"append"},r.a.createElement(j.a,{onClick:function(e){e.preventDefault(),p(!f)}},f?"Show":"Hide"),k?r.a.createElement(N.a,{to:"/"}):null))),r.a.createElement(y.a,{className:"text-center"},r.a.createElement(j.a,{onClick:function(t){return t.preventDefault(),void fetch("http://localhost:3000/user/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user:{username:c,password:m}})}).then((function(e){return e.json()})).then((function(t){e.tokenHandler(t.sessionToken),console.log("Session token: "+t.sessionToken),C(!0)}))}},"Login")))},T=function(e){var t=Object(n.useState)(""),a=Object(o.a)(t,2),c=a[0],l=a[1],s=Object(n.useState)(""),u=Object(o.a)(s,2),m=u[0],i=u[1],d=Object(n.useState)(!0),E=Object(o.a)(d,2),f=E[0],p=E[1];return r.a.createElement(w.a,{style:{marginTop:"10vh"},className:"mx-auto col-lg-4"},r.a.createElement(y.a,null,r.a.createElement(S.a,{for:"username"},"Username"),r.a.createElement(b.a,{onChange:function(e){return l(e.target.value)}})),r.a.createElement(y.a,null,r.a.createElement(S.a,{for:"password"},"Password"),r.a.createElement(g.a,null,r.a.createElement(b.a,{onChange:function(e){return i(e.target.value)},type:f?"password":""}),r.a.createElement(v.a,{addonType:"append"},r.a.createElement(j.a,{onClick:function(e){e.preventDefault(),p(!f)}},f?"Show":"Hide")))),r.a.createElement(y.a,{className:"text-center"},r.a.createElement(j.a,{onClick:function(t){return t.preventDefault(),void fetch("http://localhost:3000/user/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:c,password:m})}).then((function(e){return e.json()})).then((function(t){e.tokenHandler(t.sessionToken),console.log("Session token: "+t.sessionToken)}))}},"Login")))},x=function(){return r.a.createElement("div",null,r.a.createElement(O,null))},H=function(){var e=Object(n.useState)(!1),t=Object(o.a)(e,2),a=t[0],c=t[1],l=function(e){c(e)};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"main"},r.a.createElement(d.a,null,r.a.createElement(f,{token:a}),r.a.createElement(N.d,null,r.a.createElement(N.b,{exact:!0,path:"/",component:k}),r.a.createElement(N.b,{exact:!0,path:"/login",render:function(e){return r.a.createElement(C,Object.assign({},e,{tokenHandler:l}))}}),r.a.createElement(N.b,{exact:!0,path:"/signup",render:function(e){return r.a.createElement(T,Object.assign({},e,{tokenHandler:l}))}}),r.a.createElement(N.b,{exact:!0,path:"/search",component:x})))))},D=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(H,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(36);l.a.render(r.a.createElement(D,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[26,1,2]]]);
//# sourceMappingURL=main.6cf3a75c.chunk.js.map