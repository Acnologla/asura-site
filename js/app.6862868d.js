(function(t){function e(e){for(var s,r,o=e[0],c=e[1],l=e[2],u=0,d=[];u<o.length;u++)r=o[u],Object.prototype.hasOwnProperty.call(n,r)&&n[r]&&d.push(n[r][0]),n[r]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);f&&f(e);while(d.length)d.shift()();return i.push.apply(i,l||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],s=!0,r=1;r<a.length;r++){var o=a[r];0!==n[o]&&(s=!1)}s&&(i.splice(e--,1),t=c(c.s=a[0]))}return t}var s={},r={app:0},n={app:0},i=[];function o(t){return c.p+"js/"+({}[t]||t)+"."+{"chunk-17a1b120":"0752da7d"}[t]+".js"}function c(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.e=function(t){var e=[],a={"chunk-17a1b120":1};r[t]?e.push(r[t]):0!==r[t]&&a[t]&&e.push(r[t]=new Promise((function(e,a){for(var s="css/"+({}[t]||t)+"."+{"chunk-17a1b120":"9f1e91ea"}[t]+".css",n=c.p+s,i=document.getElementsByTagName("link"),o=0;o<i.length;o++){var l=i[o],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===s||u===n))return e()}var d=document.getElementsByTagName("style");for(o=0;o<d.length;o++){l=d[o],u=l.getAttribute("data-href");if(u===s||u===n)return e()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=e,f.onerror=function(e){var s=e&&e.target&&e.target.src||n,i=new Error("Loading CSS chunk "+t+" failed.\n("+s+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=s,delete r[t],f.parentNode.removeChild(f),a(i)},f.href=n;var m=document.getElementsByTagName("head")[0];m.appendChild(f)})).then((function(){r[t]=0})));var s=n[t];if(0!==s)if(s)e.push(s[2]);else{var i=new Promise((function(e,a){s=n[t]=[e,a]}));e.push(s[2]=i);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=o(t);var d=new Error;l=function(e){u.onerror=u.onload=null,clearTimeout(f);var a=n[t];if(0!==a){if(a){var s=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+s+": "+r+")",d.name="ChunkLoadError",d.type=s,d.request=r,a[1](d)}n[t]=void 0}};var f=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(e)},c.m=t,c.c=s,c.d=function(t,e,a){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)c.d(a,s,function(e){return t[e]}.bind(null,s));return a},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/asura-site/",c.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=e,l=l.slice();for(var d=0;d<l.length;d++)e(l[d]);var f=u;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";a("85ec")},"0b3d":function(t,e,a){},"0cb9":function(t,e,a){},"2ed4":function(t,e,a){"use strict";a("0b3d")},"2f32":function(t,e,a){"use strict";a("450f")},"3ce8":function(t,e,a){"use strict";a("0cb9")},"3ddd":function(t,e,a){},"450f":function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var s=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("Nav"),a("router-view",{staticStyle:{"margin-top":"70px"}})],1)},n=[],i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-navbar",{staticClass:"nav",staticStyle:{"box-shadow":"0px 0px 20px rgba(0,0,0,0.1)a"},attrs:{type:t.dark?"is-dark":"","fixed-top":""},scopedSlots:t._u([{key:"brand",fn:function(){return[a("b-navbar-item",{staticStyle:{"margin-left":"30px"},attrs:{tag:"router-link",to:{name:"Home"}}},[a("span",{staticClass:"navTitle"},[t._v("Asura Bot")])])]},proxy:!0},{key:"end",fn:function(){return[a("b-navbar-item",{staticClass:"navItem",attrs:{tag:"router-link",to:{name:"Home"}}},[t._v(" Home ")]),a("b-navbar-item",{staticClass:"navItem",attrs:{href:"#about"},on:{click:t.about}},[t._v(" Sobre ")]),a("b-navbar-item",{staticClass:"navItem",attrs:{tag:"router-link",to:{name:"Galos"}}},[t._v(" Galos ")]),a("b-navbar-item",{staticClass:"navItem",attrs:{tag:"router-link",to:{name:"Donate"}}},[t._v(" Doaçoes ")]),a("b-navbar-item",{staticClass:"navItem",on:{click:t.changeTheme}},[a("i",{staticClass:"fas",attrs:{id:"themeIcon"}})]),a("b-navbar-item",{staticStyle:{"margin-right":"30px"},attrs:{tag:"div",id:"add"}},[a("div",[a("a",{staticClass:"button is-primary",attrs:{target:"_blank",href:"https://discordapp.com/oauth2/authorize?client_id=470684281102925844&scope=bot&permissions=8Discord"}},[a("strong",[t._v("Me adicione")])])])])]},proxy:!0},{key:"burger",fn:function(t){t.isOpened;var e=t.toggleActive;return[a("a",{staticClass:"navbar-burger burger",staticStyle:{"margin-top":"5px","margin-right":"30px"},attrs:{role:"button","aria-label":"menu"},on:{click:e}},[a("span",{attrs:{"aria-hidden":"true"}}),a("span",{attrs:{"aria-hidden":"true"}}),a("span",{attrs:{"aria-hidden":"true"}})])]}}])})},o=[],c=(a("b0c0"),{name:"Nav",data:function(){return{dark:document.body.hasAttribute("theme")}},mounted:function(){"dark"===localStorage.getItem("theme")&&(this.dark=!0),this.applyTheme()},methods:{about:function(){"Home"!==this.$route.name&&(this.$router.push({name:"Home"}),document.getElementById("about").scrollIntoView())},changeTheme:function(){this.dark?localStorage.removeItem("theme"):localStorage.setItem("theme","dark"),this.dark=!this.dark,this.applyTheme()},applyTheme:function(){this.dark?(themeIcon.classList.remove("fa-moon"),themeIcon.classList.add("fa-sun"),document.body.setAttribute("data-theme","dark")):(themeIcon.classList.remove("fa-sun"),themeIcon.classList.add("fa-moon"),document.body.removeAttribute("data-theme"))}}}),l=c,u=(a("5b49"),a("2877")),d=Object(u["a"])(l,i,o,!1,null,null,null),f=d.exports,m={components:{Nav:f}},p=m,h=(a("034f"),Object(u["a"])(p,r,n,!1,null,null,null)),v=h.exports,g=(a("d3b7"),a("8c4f")),b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Galos",{on:{change:t.change}}),a("center",[a("h1",{staticStyle:{"margin-top":"-90px","font-family":"Roboto","font-size":"32px"}},[t._v(t._s(this.classes[this.current+1].name))]),a("br"),a("div",{staticClass:"columns is-variable is-centered",staticStyle:{"margin-left":"30px","margin-right":"30px"}},[a("card",{staticClass:"column is-three-quarters-mobile is-half-tablet is-one-third",attrs:{type:"Bom contra",galos:t.findGood(this.current)}}),a("card",{staticClass:"column is-three-quarters-mobile is-half-tablet is-one-third",attrs:{type:"Ruim contra",galos:t.findBad(this.current)}})],1),a("h1",{staticStyle:{"margin-bottom":"20px","font-family":"Roboto","font-size":"32px"}},[t._v("Habilidades")]),a("br"),a("div",{staticClass:"columns is-multiline",staticStyle:{"margin-left":"30px","margin-right":"30px"}},t._l(t.skills,(function(t,e){return a("Skill",{key:e,staticClass:"column is-three-quarters-mobile is-half-tablet is-one-third-desktop is-one-quarter-widescreen is-one-quarter-fullhd",attrs:{skill:t}})})),1)])],1)},C=[],_=(a("4de4"),a("4160"),a("caad"),a("d81d"),a("2532"),a("159b"),a("96cf"),a("1da1")),y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("center",[a("b-carousel",{staticClass:"galos",attrs:{arrow:"",arrowHover:!1,indicator:!1,"pause-info":!1,repeat:!1,autoplay:!1,"indicator-inside":!1},on:{change:function(e){return t.change(e)}},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},t._l(t.sprites,(function(t,e){return a("b-carousel-item",{key:e},[a("span",{staticClass:"image"},[a("img",{staticStyle:{height:"200px"},attrs:{src:t}})])])})),1)],1)},k=[],x=a("bc3a"),w=a.n(x),S={name:"galos",data:function(){return{sprites:[],selected:0}},methods:{change:function(t){this.$emit("change",t)}},created:function(){var t=this;this.$route.query.galo&&(this.selected=parseInt(this.$route.query.galo)),w.a.get("https://raw.githubusercontent.com/Acnologla/asura/master/resources/galo/sprites.json").then((function(e){t.sprites=e.data[0]}))}},j=S,E=(a("68b7"),Object(u["a"])(j,y,k,!1,null,null,null)),A=E.exports,O=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card",staticStyle:{"margin-bottom":"30px"}},[a("header",{staticClass:"card-header"},[a("p",{staticClass:"card-header-title",staticStyle:{color:"#552fbc"}},[t._v(" "+t._s(t.skill.name)+" ")])]),a("div",{staticClass:"card-content"},[a("div",{staticClass:"content",staticStyle:{"text-align":"left"}},[t._v(" Dano minimo: "+t._s(t.skill.damage[0])+" "),a("br"),t._v(" Dano maximo: "+t._s(t.skill.damage[1]-1)+" "),t.skill.effect?a("div",[a("hr"),t.effect?a("p",{staticStyle:{cursor:"pointer"},on:{click:t.changeEffect}},[a("span",{staticStyle:{color:"#552fbc"}},[t._v(t._s(t.skill.effect.effect.name)+" ")]),a("br"),t._v(" Chance: "+t._s(100*t.skill.effect.chance)+"% "),a("br"),t._v(" Turnos: "+t._s(t.skill.effect.effect.turns)+" "),a("br"),1===t.skill.effect.effect.type?a("span",[t._v(" Dano minimo: "+t._s(t.skill.effect.effect.range[0])+" "),a("br"),t._v(" Dano maximo: "+t._s(t.skill.effect.effect.range[1]-1)+" ")]):t._e(),2===t.skill.effect.effect.type?a("span",[t._v(" Cura minima: "+t._s(t.skill.effect.effect.range[0])+" "),a("br"),t._v(" Cura maxima: "+t._s(t.skill.effect.effect.range[1])+" ")]):t._e(),3===t.skill.effect.effect.type?a("span",[t._v("Stun: 1 turno")]):t._e(),4===t.skill.effect.effect.type?a("span",[t._v("Dano reduzido: "+t._s(t.skill.effect.effect.range[0])+"%")]):t._e(),5===t.skill.effect.effect.type?a("span",[t._v("Refletir o proximo ataque")]):t._e(),6===t.skill.effect.effect.type?a("span",[t._v("Fragilidade: "+t._s(t.skill.effect.effect.range[0])+"%")]):t._e()]):a("b-button",{attrs:{type:"is-primary is-light"},on:{click:t.changeEffect}},[t._v("Efeito")])],1):t._e()])]),a("footer",{staticClass:"card-footer"},[a("p",{staticClass:"card-footer-item",staticStyle:{color:"#552fbc"}},[t._v("Level "+t._s(t.skill.level))])])])},L=[],T={name:"Skill",data:function(){return{effect:!1}},methods:{changeEffect:function(){this.effect=!this.effect}},props:{skill:Object},watch:{skill:{deep:!0,handler:function(){this.effect=!1}}}},$=T,q=(a("2ed4"),Object(u["a"])($,O,L,!1,null,"79c26ba8",null)),D=q.exports,I=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card",staticStyle:{"margin-bottom":"30px"}},[a("header",{staticClass:"card-header"},[a("p",{staticClass:"card-header-title",staticStyle:{color:"#552fbc"}},[t._v(" "+t._s(t.type)+" ")])]),a("div",{staticClass:"card-content"},[a("div",{staticClass:"content",staticStyle:{"text-align":"left"}},[0===t.galos.length?a("span",[t._v(" Nenhum ")]):t._e(),t._l(t.galos,(function(e,s){return a("span",{key:s},[t._v(" "+t._s(e.name)+" "),a("br")])}))],2)])])},M=[],B={name:"Card",props:{galos:Array,type:String}},P=B,H=Object(u["a"])(P,I,M,!1,null,null,null),z=H.exports,R={name:"Home",data:function(){return{skills:[],current:0,classes:[,{}],effects:[]}},methods:{change:function(t){this.current=t,this.$router.push({query:{galo:t}}),this.updateSkills()},findBad:function(t){var e=this;return this.classes[t+1].disadvantages?this.classes[t+1].disadvantages.map((function(t){return e.classes[t]})):[]},findGood:function(t){return this.classes.filter((function(e){return!!e.disadvantages&&e.disadvantages.includes(t+1)}))},updateSkills:function(){var t=this,e=this.classes[this.current+1];w.a.get("https://raw.githubusercontent.com/Acnologla/asura/master/resources/galo/attacks/".concat(e.name,".json")).then((function(e){e.data.filter((function(t){return t.effect})).forEach((function(e){e.effect={chance:e.effect[0],effect:t.effects[e.effect[1]]}})),t.skills=e.data}))}},created:function(){var t=this;return Object(_["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,w.a.get("https://raw.githubusercontent.com/Acnologla/asura/master/resources/galo/class.json").then((function(e){t.classes=e.data}));case 2:return e.next=4,w.a.get("https://raw.githubusercontent.com/Acnologla/asura/master/resources/galo/effects.json").then((function(e){t.effects=e.data}));case 4:t.$route.query.galo&&(t.current=parseInt(t.$route.query.galo)),t.updateSkills();case 6:case"end":return e.stop()}}),e)})))()},components:{Galos:A,Skill:D,Card:z}},N=R,G=Object(u["a"])(N,b,C,!1,null,null,null),V=G.exports,F=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("main",[a("div",{staticClass:"text"},[a("h1",{staticClass:"title"},[t._v("Se divirta no seu Servidor de Discord com o Asura")]),a("h2",{staticClass:"subtitle"},[t._v(" Batalhe com outros galos, veja avatares antigos, jogue uno e muito mais ")]),a("div",[a("b-button",{staticClass:"invite",staticStyle:{"margin-right":"30px",width:"180px"},attrs:{type:"is-primary"}},[a("a",{staticStyle:{color:"#ECEFF4"},attrs:{href:" https://discordapp.com/oauth2/authorize?client_id=470684281102925844&scope=bot&permissions=8",target:"_blank"}},[t._v("Me adicione")])]),a("b-button",{staticStyle:{width:"180px"},attrs:{type:"is-primary is-light"}},[a("a",{attrs:{href:"https://discord.gg/tdVWQGV",target:"_blank"}},[t._v("Servidor de suporte")])])],1)]),t._m(0)]),a("section",[a("div",{attrs:{id:"about"}},t._l(t.cards,(function(t,e){return a("AboutCard",{key:e,attrs:{title:t.title,image:t.image,reverse:e%2!==0,description:t.description}})})),1)])])},W=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a",{staticClass:"arrow",attrs:{href:"#about"}},[a("i",{staticClass:"fas fa-chevron-down"})])}],J=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.reverse?t._e():a("svg",{staticStyle:{width:"100%"},attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1440 320"}},[a("path",{staticClass:"wave",attrs:{fill:"#f3f4f5","fill-opacity":"1",d:"M0,192L48,181.3C96,171,192,149,288,128C384,107,480,85,576,106.7C672,128,768,192,864,202.7C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"}})]),a("div",{class:"bg"+(t.reverse?"":" reverseBg"),staticStyle:{width:"100%"}},[a("div",{staticClass:"cardContent"},[a("div",{staticClass:"columns is-vcentered"},[a("div",{staticClass:"column is-full-mobile is-full-tablet is-half"},[t.reverse||t.width<=768?a("div",[a("img",{staticClass:"aboutImage",attrs:{src:t.image}})]):a("div",{staticClass:"aboutCardText"},[a("h2",{staticClass:"aboutTitle"},[t._v(" "+t._s(t.title)+" ")]),a("br"),a("p",{staticClass:"aboutDescription",domProps:{innerHTML:t._s(t.description)}})])]),a("div",{staticClass:"column is-full-mobile is-full-tablet is-half"},[!t.reverse&&t.width>768?a("div",[a("img",{staticClass:"aboutImage",attrs:{src:t.image}})]):a("div",{staticClass:"aboutCardText"},[a("h2",{staticClass:"aboutTitle"},[t._v(" "+t._s(t.title)+" ")]),a("br"),a("p",{staticClass:"aboutDescription",domProps:{innerHTML:t._s(t.description)}})])])])])]),t.reverse?t._e():a("svg",{staticClass:"rotate",staticStyle:{width:"100%"},attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1440 320"}},[a("path",{staticClass:"wave",attrs:{fill:"#f3f4f5","fill-opacity":"1",d:"M0,192L48,181.3C96,171,192,149,288,128C384,107,480,85,576,106.7C672,128,768,192,864,202.7C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"}})])])},Z=[],K=(a("845f"),{name:"AboutCard",data:function(){return{width:window.innerWidth}},props:{title:String,description:String,image:String,reverse:Boolean},mounted:function(){var t=this;window.addEventListener("resize",(function(){t.width=window.innerWidth}))}}),Q=K,U=(a("e71d"),Object(u["a"])(Q,J,Z,!1,null,null,null)),X=U.exports,Y={name:"Home",components:{AboutCard:X},data:function(){return{cards:[{title:"Rinha de galo",description:"Voce pode batalhar com seu galo, upar de nivel, desbloquear novos galos, enfrentar uma terrivel dungeon e matar inumeros chefes.   <a href='/asura-site/tutorial'>Clique aqui para ver o tutorial</a>",image:"https://cdn.discordapp.com/attachments/397528821307539486/805554148912398346/unknown.png"},{title:"Avatares antigos",description:"Com o asura em seu servidor voce podera ver os antigos avatares dos seus membros.",image:"https://cdn.discordapp.com/attachments/736504238565359637/805566514521964574/unknown.png"},{title:"Minijogos",description:"Voce pode jogar uno, 2048, jogo da velha, connect4 e xadrez.",image:"https://cdn.discordapp.com/attachments/736504238565359637/805567136365543465/unknown.png"},{title:"Manipulação de imagens",description:'Voce pode manipular imagens, colocando elas em uma lixeira, ou até mesmo no "morre praga". ',image:"https://cdn.discordapp.com/attachments/736504238565359637/805565135255109662/unknown.png"}]}}},tt=Y,et=(a("cccb"),Object(u["a"])(tt,F,W,!1,null,null,null)),at=et.exports,st=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("article",[t._m(0),a("br"),a("br"),a("hr",{staticStyle:{"margin-left":"20vw","margin-right":"20vw","background-color":"#552fbc"}}),a("center",[a("div",{staticStyle:{"text-align":"center"}},[a("h2",{staticClass:"donateTitle"},[t._v("Premio por doar")])]),a("br"),a("div",{staticClass:"columns is-centered",staticStyle:{"max-width":"500px"},attrs:{id:"donateCards"}},[a("div",{staticClass:"column is-three-quarters-mobile is-half"},[a("DonateCard",{attrs:{price:"R$ 15 a cada 400 moedas",description:"Comprar dinheiro avulsamente na sua conta.",title:"Compra de dinheiro"}})],1),a("div",{staticClass:"column is-three-quarters-mobile is-half"},[a("DonateCard",{attrs:{price:"R$ 40 reais mensalmente",description:"Background exclusivo.  <br>Xp extra por partida. <br>Badge exclusiva.",title:"Vip"}})],1)])])],1)},rt=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticStyle:{"justify-content":"center","margin-left":"20px","margin-right":"20px"}},[a("div",{staticClass:"columns is-vcentered is-centered"},[a("div",{staticClass:"column is-full-mobile is-full-tablet is-two-fifths"},[a("img",{attrs:{src:"https://cdn.discordapp.com/avatars/470684281102925844/e1dfb36e69e5b83f081f8ee3ba1adbd3.webp?size=512",alt:"Asura image"}})]),a("div",{staticClass:"column is-full-mobile is-full-tablet is-half",staticStyle:{"text-align":"left"}},[a("h1",{staticClass:"title"},[t._v("Por que doar para o asura?")]),a("p",{staticClass:"aboutDescription"},[t._v(" Atualmente é preciso gastar 20 dolares mensalmente (cerca de 110 reais) para hospedar o asura. "),a("br"),t._v(" Doar ajuda o bot a se manter online, faz a qualidade do bot aumentar, fique mais divertido, e ajuda o dono do bot. ")])])])])}],nt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card"},[a("header",{staticClass:"card-header"},[a("p",{staticClass:"card-header-title",staticStyle:{color:"#552fbc"}},[t._v(" "+t._s(t.title)+" ")])]),a("div",{staticClass:"card-content"},[a("div",{staticClass:"content",staticStyle:{"text-align":"left"},domProps:{innerHTML:t._s(t.description)}}),a("p",[a("b",[t._v(t._s(t.price))])])]),a("footer",{staticClass:"card-footer",staticStyle:{"justify-content":"center"}},[a("b-button",{staticStyle:{"margin-bottom":"5px"},attrs:{label:"Comprar",type:"is-success",outlined:"",size:"is-medium"},on:{click:function(e){t.isComponentModalActive=!0}}}),a("b-modal",{attrs:{"has-modal-card":"","trap-focus":"","destroy-on-hide":!1,"aria-role":"dialog","aria-label":"Example Modal","aria-modal":""},model:{value:t.isComponentModalActive,callback:function(e){t.isComponentModalActive=e},expression:"isComponentModalActive"}},[[a("div",{staticClass:"card"},[a("header",{staticClass:"card-header"},[a("p",{staticClass:"card-header-title",staticStyle:{color:"#552fbc"}},[t._v(" Atualmente doaçoes devem ser feitas no privado do acnologia#8486 ")])])])]],2)],1)])},it=[],ot={name:"DonateCard",props:{description:String,title:String,price:String},data:function(){return{isComponentModalActive:!1}}},ct=ot,lt=(a("2f32"),Object(u["a"])(ct,nt,it,!1,null,"9cc0d548",null)),ut=lt.exports,dt={name:"Donate",components:{DonateCard:ut}},ft=dt,mt=(a("3ce8"),Object(u["a"])(ft,st,rt,!1,null,null,null)),pt=mt.exports,ht=function(){return a.e("chunk-17a1b120").then(a.bind(null,"2857"))};s["a"].use(g["a"]);var vt=[{path:"/",name:"Home",component:at},{path:"/galos",name:"Galos",component:V},{path:"/donate",name:"Donate",component:pt},{path:"/tutorial",name:"RinhaTutorial",component:ht}],gt=new g["a"]({mode:"history",base:"/asura-site",routes:vt,scrollBehavior:function(){return{x:0,y:0}}}),bt=gt,Ct=a("289d");a("5abe"),a("15f5"),a("7051");s["a"].config.productionTip=!1,s["a"].use(Ct["a"]),new s["a"]({router:bt,render:function(t){return t(v)}}).$mount("#app")},"58de":function(t,e,a){},"5b49":function(t,e,a){"use strict";a("58de")},"5ced":function(t,e,a){},"68b7":function(t,e,a){"use strict";a("ea10")},"845f":function(t,e,a){},"85ec":function(t,e,a){},cccb:function(t,e,a){"use strict";a("5ced")},e71d:function(t,e,a){"use strict";a("3ddd")},ea10:function(t,e,a){}});