(function(t){function e(e){for(var s,o,n=e[0],c=e[1],l=e[2],d=0,m=[];d<n.length;d++)o=n[d],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&m.push(i[o][0]),i[o]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);u&&u(e);while(m.length)m.shift()();return r.push.apply(r,l||[]),a()}function a(){for(var t,e=0;e<r.length;e++){for(var a=r[e],s=!0,n=1;n<a.length;n++){var c=a[n];0!==i[c]&&(s=!1)}s&&(r.splice(e--,1),t=o(o.s=a[0]))}return t}var s={},i={app:0},r=[];function o(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=s,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(a,s,function(e){return t[e]}.bind(null,s));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/asura-site/";var n=window["webpackJsonp"]=window["webpackJsonp"]||[],c=n.push.bind(n);n.push=e,n=n.slice();for(var l=0;l<n.length;l++)e(n[l]);var u=c;r.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";a("85ec")},"05cc":function(t,e,a){"use strict";a("71ee")},"0cb9":function(t,e,a){},"2cc4":function(t,e,a){"use strict";a("c180")},"2f32":function(t,e,a){"use strict";a("450f")},"3ce8":function(t,e,a){"use strict";a("0cb9")},"3ddd":function(t,e,a){},"450f":function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var s=a("2b0e"),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("Nav"),a("router-view",{staticStyle:{"margin-top":"70px"}})],1)},r=[],o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-navbar",{staticClass:"nav",staticStyle:{"box-shadow":"0px 0px 20px rgba(0,0,0,0.1)a"},attrs:{"fixed-top":""},scopedSlots:t._u([{key:"brand",fn:function(){return[a("b-navbar-item",{staticStyle:{"margin-left":"30px"},attrs:{tag:"router-link",to:{name:"Home"}}},[a("span",{staticClass:"navTitle"},[t._v("Asura Bot")])])]},proxy:!0},{key:"end",fn:function(){return[a("b-navbar-item",{staticClass:"navItem",attrs:{tag:"router-link",to:{name:"Home"}}},[t._v(" Home ")]),a("b-navbar-item",{staticClass:"navItem",attrs:{href:"#about"},on:{click:t.about}},[t._v(" Sobre ")]),a("b-navbar-item",{staticClass:"navItem",attrs:{tag:"router-link",to:{name:"Galos"}}},[t._v(" Galos ")]),a("b-navbar-item",{staticClass:"navItem",attrs:{tag:"router-link",to:{name:"Donate"}}},[t._v(" Doaçoes ")]),a("b-navbar-item",{staticStyle:{"margin-right":"30px"},attrs:{tag:"div",id:"add"}},[a("div",[a("a",{staticClass:"button is-primary",attrs:{target:"_blank",href:"https://discordapp.com/oauth2/authorize?client_id=470684281102925844&scope=bot&permissions=8Discord"}},[a("strong",[t._v("Me adicione")])])])])]},proxy:!0},{key:"burger",fn:function(t){t.isOpened;var e=t.toggleActive;return[a("a",{staticClass:"navbar-burger burger",staticStyle:{"margin-top":"5px","margin-right":"30px"},attrs:{role:"button","aria-label":"menu"},on:{click:e}},[a("span",{attrs:{"aria-hidden":"true"}}),a("span",{attrs:{"aria-hidden":"true"}}),a("span",{attrs:{"aria-hidden":"true"}})])]}}])})},n=[],c=(a("b0c0"),{name:"Nav",methods:{about:function(){"Home"!==this.$route.name&&(this.$router.push({name:"Home"}),document.getElementById("about").scrollIntoView())}}}),l=c,u=(a("5b49"),a("2877")),d=Object(u["a"])(l,o,n,!1,null,null,null),m=d.exports,f={components:{Nav:m}},p=f,v=(a("034f"),Object(u["a"])(p,i,r,!1,null,null,null)),h=v.exports,g=a("8c4f"),b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Galos",{on:{change:t.change}}),a("center",[a("h1",{staticStyle:{"margin-top":"-90px","font-family":"Roboto","font-size":"32px"}},[t._v(t._s(this.classes[this.current+1].name))]),a("br"),a("div",{staticClass:"columns is-variable is-centered",staticStyle:{"margin-left":"30px","margin-right":"30px"}},[a("card",{staticClass:"column is-three-quarters-mobile is-half-tablet is-one-third",attrs:{type:"Bom contra",galos:t.findGood(this.current)}}),a("card",{staticClass:"column is-three-quarters-mobile is-half-tablet is-one-third",attrs:{type:"Ruim contra",galos:t.findBad(this.current)}})],1),a("h1",{staticStyle:{"margin-bottom":"20px","font-family":"Roboto","font-size":"32px"}},[t._v("Habilidades")]),a("br"),a("div",{staticClass:"columns is-multiline",staticStyle:{"margin-left":"30px","margin-right":"30px"}},t._l(t.skills,(function(t,e){return a("Skill",{key:e,staticClass:"column is-three-quarters-mobile is-half-tablet is-one-third-desktop is-one-quarter-widescreen is-one-quarter-fullhd",attrs:{skill:t}})})),1)])],1)},_=[],C=(a("4de4"),a("4160"),a("caad"),a("d81d"),a("2532"),a("159b"),a("96cf"),a("1da1")),y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("center",[a("b-carousel",{staticClass:"galos",attrs:{arrow:"",arrowHover:!1,indicator:!1,"pause-info":!1,repeat:!1,autoplay:!1,"indicator-inside":!1},on:{change:function(e){return t.change(e)}},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},t._l(t.sprites,(function(t,e){return a("b-carousel-item",{key:e},[a("span",{staticClass:"image"},[a("img",{staticStyle:{height:"200px"},attrs:{src:t}})])])})),1)],1)},x=[],k=a("bc3a"),w=a.n(k),S={name:"galos",data:function(){return{sprites:[],selected:0}},methods:{change:function(t){this.$emit("change",t)}},created:function(){var t=this;this.$route.query.galo&&(this.selected=parseInt(this.$route.query.galo)),w.a.get("https://raw.githubusercontent.com/Acnologla/asura/master/resources/galo/sprites.json").then((function(e){t.sprites=e.data[0]}))}},j=S,q=(a("68b7"),Object(u["a"])(j,y,x,!1,null,null,null)),E=q.exports,$=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card",staticStyle:{"margin-bottom":"30px"}},[a("header",{staticClass:"card-header"},[a("p",{staticClass:"card-header-title",staticStyle:{color:"#552fbc"}},[t._v(" "+t._s(t.skill.name)+" ")])]),a("div",{staticClass:"card-content"},[a("div",{staticClass:"content",staticStyle:{"text-align":"left"}},[t._v(" Dano minimo: "+t._s(t.skill.damage[0])+" "),a("br"),t._v(" Dano maximo: "+t._s(t.skill.damage[1]-1)+" "),t.skill.effect?a("div",[a("hr"),t.effect?a("p",{staticStyle:{cursor:"pointer"},on:{click:t.changeEffect}},[a("span",{staticStyle:{color:"#552fbc"}},[t._v(t._s(t.skill.effect.effect.name)+" ")]),a("br"),t._v(" Chance: "+t._s(100*t.skill.effect.chance)+"% "),a("br"),t._v(" Turnos: "+t._s(t.skill.effect.effect.turns)+" "),a("br"),1===t.skill.effect.effect.type?a("span",[t._v(" Dano minimo: "+t._s(t.skill.effect.effect.range[0])+" "),a("br"),t._v(" Dano maximo: "+t._s(t.skill.effect.effect.range[1]-1)+" ")]):t._e(),2===t.skill.effect.effect.type?a("span",[t._v(" Cura minima: "+t._s(t.skill.effect.effect.range[0])+" "),a("br"),t._v(" Cura maxima: "+t._s(t.skill.effect.effect.range[1])+" ")]):t._e(),3===t.skill.effect.effect.type?a("span",[t._v("Stun: 1 turno")]):t._e(),4===t.skill.effect.effect.type?a("span",[t._v("Dano reduzido: "+t._s(t.skill.effect.effect.range[0])+"%")]):t._e(),5===t.skill.effect.effect.type?a("span",[t._v("Refletir o proximo ataque")]):t._e(),6===t.skill.effect.effect.type?a("span",[t._v("Fragilidade: "+t._s(t.skill.effect.effect.range[0])+"%")]):t._e()]):a("b-button",{attrs:{type:"is-primary is-light"},on:{click:t.changeEffect}},[t._v("Efeito")])],1):t._e()])]),a("footer",{staticClass:"card-footer"},[a("p",{staticClass:"card-footer-item",staticStyle:{color:"#552fbc"}},[t._v("Level "+t._s(t.skill.level))])])])},A=[],D={name:"Skill",data:function(){return{effect:!1}},methods:{changeEffect:function(){this.effect=!this.effect}},props:{skill:Object},watch:{skill:{deep:!0,handler:function(){this.effect=!1}}}},O=D,M=(a("05cc"),Object(u["a"])(O,$,A,!1,null,"ce3e76cc",null)),L=M.exports,T=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card",staticStyle:{"margin-bottom":"30px"}},[a("header",{staticClass:"card-header"},[a("p",{staticClass:"card-header-title",staticStyle:{color:"#552fbc"}},[t._v(" "+t._s(t.type)+" ")])]),a("div",{staticClass:"card-content"},[a("div",{staticClass:"content",staticStyle:{"text-align":"left"}},[0===t.galos.length?a("span",[t._v(" Nenhum ")]):t._e(),t._l(t.galos,(function(e,s){return a("span",{key:s},[t._v(" "+t._s(e.name)+" "),a("br")])}))],2)])])},H=[],G={name:"Card",props:{galos:Array,type:String}},P=G,z=Object(u["a"])(P,T,H,!1,null,null,null),I=z.exports,B={name:"Home",data:function(){return{skills:[],current:0,classes:[,{}],effects:[]}},methods:{change:function(t){this.current=t,this.$router.push({query:{galo:t}}),this.updateSkills()},findBad:function(t){var e=this;return this.classes[t+1].disadvantages?this.classes[t+1].disadvantages.map((function(t){return e.classes[t]})):[]},findGood:function(t){return this.classes.filter((function(e){return!!e.disadvantages&&e.disadvantages.includes(t+1)}))},updateSkills:function(){var t=this,e=this.classes[this.current+1];w.a.get("https://raw.githubusercontent.com/Acnologla/asura/master/resources/galo/attacks/".concat(e.name,".json")).then((function(e){e.data.filter((function(t){return t.effect})).forEach((function(e){e.effect={chance:e.effect[0],effect:t.effects[e.effect[1]]}})),t.skills=e.data}))}},created:function(){var t=this;return Object(C["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,w.a.get("https://raw.githubusercontent.com/Acnologla/asura/master/resources/galo/class.json").then((function(e){t.classes=e.data}));case 2:return e.next=4,w.a.get("https://raw.githubusercontent.com/Acnologla/asura/master/resources/galo/effects.json").then((function(e){t.effects=e.data}));case 4:t.$route.query.galo&&(t.current=parseInt(t.$route.query.galo)),t.updateSkills();case 6:case"end":return e.stop()}}),e)})))()},components:{Galos:E,Skill:L,Card:I}},R=B,V=Object(u["a"])(R,b,_,!1,null,null,null),N=V.exports,Q=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("main",[a("div",{staticClass:"text"},[a("h1",{staticClass:"title"},[t._v("Se divirta no seu Servidor de Discord com o Asura")]),a("h2",{staticClass:"subtitle"},[t._v(" Batalhe com outros galos, veja avatares antigos, jogue uno e muito mais ")]),a("div",[a("b-button",{staticClass:"invite",staticStyle:{"margin-right":"30px",width:"180px"},attrs:{type:"is-primary"}},[a("a",{staticStyle:{color:"white"},attrs:{href:" https://discordapp.com/oauth2/authorize?client_id=470684281102925844&scope=bot&permissions=8",target:"_blank"}},[t._v("Me adicione")])]),a("b-button",{staticStyle:{width:"180px"},attrs:{type:"is-primary is-light"}},[a("a",{attrs:{href:"https://discord.gg/tdVWQGV",target:"_blank"}},[t._v("Servidor de suporte")])])],1)]),t._m(0)]),a("section",[a("div",{attrs:{id:"about"}},t._l(t.cards,(function(t,e){return a("AboutCard",{key:e,attrs:{title:t.title,image:t.image,reverse:e%2!==0,description:t.description}})})),1)])])},W=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a",{staticClass:"arrow",attrs:{href:"#about"}},[a("i",{staticClass:"fas fa-chevron-down"})])}],J=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.reverse?t._e():a("svg",{staticStyle:{width:"100%"},attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1440 320"}},[a("path",{attrs:{fill:"#f3f4f5","fill-opacity":"1",d:"M0,192L48,181.3C96,171,192,149,288,128C384,107,480,85,576,106.7C672,128,768,192,864,202.7C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"}})]),a("div",{staticClass:"bg",style:(t.reverse?"":"background-color: #f3f4f5;")+"width: 100%"},[a("div",{staticClass:"cardContent"},[a("div",{staticClass:"columns is-vcentered"},[a("div",{staticClass:"column is-full-mobile is-full-tablet is-half"},[t.reverse||t.width<=768?a("div",[a("img",{staticClass:"aboutImage",attrs:{src:t.image}})]):a("div",{staticClass:"aboutCardText"},[a("h2",{staticClass:"aboutTitle"},[t._v(" "+t._s(t.title)+" ")]),a("br"),a("p",{staticClass:"aboutDescription",domProps:{innerHTML:t._s(t.description)}})])]),a("div",{staticClass:"column is-full-mobile is-full-tablet is-half"},[!t.reverse&&t.width>768?a("div",[a("img",{staticClass:"aboutImage",attrs:{src:t.image}})]):a("div",{staticClass:"aboutCardText"},[a("h2",{staticClass:"aboutTitle"},[t._v(" "+t._s(t.title)+" ")]),a("br"),a("p",{staticClass:"aboutDescription",domProps:{innerHTML:t._s(t.description)}})])])])])]),t.reverse?t._e():a("svg",{staticClass:"rotate",staticStyle:{width:"100%"},attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1440 320"}},[a("path",{attrs:{fill:"#f3f4f5","fill-opacity":"1",d:"M0,192L48,181.3C96,171,192,149,288,128C384,107,480,85,576,106.7C672,128,768,192,864,202.7C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"}})])])},X=[],Z=(a("845f"),{name:"AboutCard",data:function(){return{width:window.innerWidth}},props:{title:String,description:String,image:String,reverse:Boolean},mounted:function(){var t=this;window.addEventListener("resize",(function(){t.width=window.innerWidth}))}}),F=Z,U=(a("e71d"),Object(u["a"])(F,J,X,!1,null,null,null)),K=U.exports,Y={name:"Home",components:{AboutCard:K},data:function(){return{cards:[{title:"Rinha de galo",description:"Voce pode batalhar com seu galo, upar de nivel, desbloquear novos galos, enfrentar uma terrivel dungeon e matar inumeros chefes.   <a href='/asura-site/tutorial'>Clique aqui para ver o tutorial</a>",image:"https://cdn.discordapp.com/attachments/397528821307539486/805554148912398346/unknown.png"},{title:"Avatares antigos",description:"Com o asura em seu servidor voce podera ver os antigos avatares dos seus membros.",image:"https://cdn.discordapp.com/attachments/736504238565359637/805566514521964574/unknown.png"},{title:"Minijogos",description:"Voce pode jogar uno, 2048, jogo da velha, connect4 e xadrez.",image:"https://cdn.discordapp.com/attachments/736504238565359637/805567136365543465/unknown.png"},{title:"Manipulação de imagens",description:'Voce pode manipular imagens, colocando elas em uma lixeira, ou até mesmo no "morre praga". ',image:"https://cdn.discordapp.com/attachments/736504238565359637/805565135255109662/unknown.png"}]}}},tt=Y,et=(a("cccb"),Object(u["a"])(tt,Q,W,!1,null,null,null)),at=et.exports,st=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("article",[t._m(0),a("br"),a("br"),a("hr",{staticStyle:{"margin-left":"20vw","margin-right":"20vw","background-color":"#552fbc"}}),a("center",[a("div",{staticStyle:{"text-align":"center"}},[a("h2",{staticClass:"donateTitle"},[t._v("Premio por doar")])]),a("div",{staticClass:"columns is-centered",staticStyle:{"max-width":"500px"}},[a("div",{staticClass:"column is-three-quarters-mobile is-half"},[a("DonateCard",{attrs:{price:"R$ 15 a cada 400 moedas",description:"Comprar dinheiro avulsamente na sua conta",title:"Compra de dinheiro"}})],1),a("div",{staticClass:"column is-three-quarters-mobile is-half"},[a("DonateCard",{attrs:{price:"R$ X reais mensalmente",description:"Beneficios: <br>  -Galo exclusivo  <br> -Xp extra por partida",title:"Vip"}})],1)])])],1)},it=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticStyle:{"justify-content":"center","margin-left":"20px","margin-right":"20px"}},[a("div",{staticClass:"columns is-vcentered is-centered"},[a("div",{staticClass:"column is-full-mobile is-full-tablet is-two-fifths"},[a("img",{attrs:{src:"https://cdn.discordapp.com/avatars/470684281102925844/e1dfb36e69e5b83f081f8ee3ba1adbd3.webp?size=512",alt:"Asura image"}})]),a("div",{staticClass:"column is-full-mobile is-full-tablet is-half",staticStyle:{"text-align":"left"}},[a("h1",{staticClass:"title"},[t._v("Por que doar para o asura?")]),a("p",{staticClass:"aboutDescription"},[t._v(" Atualmente é preciso gastar 20 dolares mensalmente (cerca de 110 reais) para hospedar o asura. "),a("br"),t._v(" Doar ajuda o bot a se manter online, faz a qualidade do bot aumentar, fique mais divertido, e ajuda o dono do bot. ")])])])])}],rt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card"},[a("header",{staticClass:"card-header"},[a("p",{staticClass:"card-header-title",staticStyle:{color:"#552fbc"}},[t._v(" "+t._s(t.title)+" ")])]),a("div",{staticClass:"card-content"},[a("div",{staticClass:"content",staticStyle:{"text-align":"left"},domProps:{innerHTML:t._s(t.description)}}),a("p",[a("b",[t._v(t._s(t.price))])])]),a("footer",{staticClass:"card-footer",staticStyle:{"justify-content":"center"}},[a("b-button",{staticStyle:{"margin-bottom":"5px"},attrs:{label:"Comprar",type:"is-success",outlined:"",size:"is-medium"},on:{click:function(e){t.isComponentModalActive=!0}}}),a("b-modal",{attrs:{"has-modal-card":"","trap-focus":"","destroy-on-hide":!1,"aria-role":"dialog","aria-label":"Example Modal","aria-modal":""},model:{value:t.isComponentModalActive,callback:function(e){t.isComponentModalActive=e},expression:"isComponentModalActive"}},[[a("div",{staticClass:"card"},[a("header",{staticClass:"card-header"},[a("p",{staticClass:"card-header-title",staticStyle:{color:"#552fbc"}},[t._v(" Atualmente doaçoes devem ser feitas no privado do acnologia#8486 ")])])])]],2)],1)])},ot=[],nt={name:"DonateCard",props:{description:String,title:String,price:String},data:function(){return{isComponentModalActive:!1}}},ct=nt,lt=(a("2f32"),Object(u["a"])(ct,rt,ot,!1,null,"9cc0d548",null)),ut=lt.exports,dt={name:"Donate",components:{DonateCard:ut}},mt=dt,ft=(a("3ce8"),Object(u["a"])(mt,st,it,!1,null,null,null)),pt=ft.exports,vt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("article",[a("section",[a("h2",{staticClass:"title"},[t._v("Como jogar")]),a("p",{staticClass:"aboutDescription"},[t._v(" Primeiro use o comando "),a("span",{staticClass:"bold"},[t._v("j!galo")]),t._v(" para ver o tipo do seu galo, existem 4 raridades de galo (comum, raro, epico, lendario) voce ira começar com um galo comum aleatorio, "),a("router-link",{attrs:{target:"_blank",to:{name:"Galos"}}},[t._v("Veja aqui a lista de galos e habilidades.")]),t._v(" Apos isso use o comando "),a("span",{staticClass:"bold"},[t._v("j!missoes")]),t._v(" para ver suas missoes diarias, voce ira começar com 3 e elas voltaram uma a cada dia. Use "),a("span",{staticClass:"bold"},[t._v("j!train")]),t._v(" para batalhar contra um galo aleatorio sem valer nada, apenas para completar as suas missoes diarias ou use "),a("span",{staticClass:"bold"},[t._v("j!rinha @usuario")]),t._v(" para batalhar com algum amigo, caso vença voce ira ganhar 5 de dinheiro e xp baseado no nivel do seu adversario (tambem completa missoes diarias). ")],1)]),a("hr",{staticStyle:{"margin-left":"10vw","margin-right":"10vw","background-color":"#552fbc"}}),t._m(0),a("hr",{staticStyle:{"margin-left":"10vw","margin-right":"10vw","background-color":"#552fbc"}}),t._m(1),a("hr",{staticStyle:{"margin-left":"10vw","margin-right":"10vw","background-color":"#552fbc"}}),t._m(2),a("hr",{staticStyle:{"margin-left":"10vw","margin-right":"10vw","background-color":"#552fbc"}}),t._m(3),a("hr",{staticStyle:{"margin-left":"10vw","margin-right":"10vw","background-color":"#552fbc"}}),t._m(4)])},ht=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("h2",{staticClass:"title"},[t._v("Habilidades")]),a("p",{staticClass:"aboutDescription"},[t._v(" A cada nivel seu galo ganha 3 de vida e pode ou não ganhar uma habilidade, seu galo ira desbloquear a ultima habilidade no nivel 30. Seu galo ira "),a("span",{staticClass:"bold"},[t._v("Automaticamente")]),t._v(" usar as 5 ultimas habilidades que voce desbloqueou, se voce quiser usar alguma habilidade antiga voce podera usar o comando "),a("span",{staticClass:"bold"},[t._v("j!skills")]),t._v(" para equipa-las. Mesmo que voce equipe só uma habilidade o seu galo ira continuar usando 5 habilidades, a que voce equipou + as suas 4 ultimas, e assim consecutivamente. caso queria usar 5 habilidades especificas voce tera que equipar 5 habilidades especificas. ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("h2",{staticClass:"title"},[t._v("Economia")]),a("p",{staticClass:"aboutDescription"},[t._v(" A cada rinha contra um amigo ganha, ou a cada missão concluida voce vai ganhar dinheiro. Dinheiro pode user usado para mudar o nome do seu galo usando "),a("span",{staticClass:"bold"},[t._v("j!changename novoNome")]),t._v(" (ira custar 100 de dinheiro), ou pode ser usado para comprar lootboxs usando "),a("span",{staticClass:"bold"},[t._v("j!lootbox")]),t._v(". Existem 3 tipos de lootbox (comum, normal e rara) quando voce abrir uma delas voce ira ganhar um galo de uma das 4 raridades, quanto maior o nivel da caixa mais a sua chance de pegar galos mais raros. Apos abrir uma lootbox use "),a("span",{staticClass:"bold"},[t._v("j!equip")]),t._v(" para ver e quipar o galo que voce ganhou, caso queira equipar seu galo use "),a("span",{staticClass:"bold"},[t._v("j!equip numerodoGalo")]),t._v(" ou caso queira vender ele para ganhar mais dinheiro use "),a("span",{staticClass:"bold"},[t._v("j!equip numeroDoGalo remove")]),t._v(". ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("h2",{staticClass:"title"},[t._v("Itens e dungeon")]),a("p",{staticClass:"aboutDescription"},[t._v(" Quando seu galo estiver forte voce pode começar a fazer a dungeon usando "),a("span",{staticClass:"bold"},[t._v("j!dungeon")]),t._v(" para enfrentar um chefe, a cada andar da dungeon voce ira ganhar lootboxs ou algum iten. Existem 4 raridades de itens (comum, raro, epico, lendario) e quanto mais alto for o andar da dungeon maior sua chance de conseguir um item de raridade mais alta. Apos receber seu primeiro item use "),a("span",{staticClass:"bold"},[t._v("j!item")]),t._v(" para equipar ele. "),a("br"),t._v(" Itens "),a("span",{staticClass:"bold"},[t._v("NÃO")]),t._v(" funcionam na dungeon, apenas em batalhas de treino ou contra outra pessoa. ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("h2",{staticClass:"title"},[t._v("Clãs")]),a("p",{staticClass:"aboutDescription"},[t._v(" Voce pode criar um clan usando "),a("span",{staticClass:"bold"},[t._v("j!clan create nome")]),t._v(" (ira custar 1000 de dinheiro), ou voce pode entrar em algum clan caso seja convidado por algum usuario que ja esteja em um. Cada clan tem um numero maximo de membros de até 15 pessoas (20 pessoas caso seu clan chegue até ao nivel 3), cada rinha contra um amigo ganha faz voce ganhar 1 de xp para o seu clan. Quanto mais alto o nivel do seu clan mais vantagens os membros do clan terão, sendo o nivel 5 o maximo de nivel para um clan. ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h2",{staticClass:"title"},[t._v("Ainda tem alguma duvida? não hesite em entrar no meu "),a("a",{attrs:{href:"https://discord.gg/tdVWQGV",target:"_blank"}},[t._v("Servidor de suporte")]),t._v(".")])}],gt={name:"RinhaTutorial"},bt=gt,_t=(a("2cc4"),Object(u["a"])(bt,vt,ht,!1,null,"9a2c8ed0",null)),Ct=_t.exports;s["a"].use(g["a"]);var yt=[{path:"/",name:"Home",component:at},{path:"/galos",name:"Galos",component:N},{path:"/donate",name:"Donate",component:pt},{path:"/tutorial",name:"RinhaTutorial",component:Ct}],xt=new g["a"]({mode:"history",base:"/asura-site",routes:yt,scrollBehavior:function(){return{x:0,y:0}}}),kt=xt,wt=a("289d");a("5abe"),a("15f5"),a("7051");s["a"].config.productionTip=!1,s["a"].use(wt["a"]),new s["a"]({router:kt,render:function(t){return t(h)}}).$mount("#app")},"58de":function(t,e,a){},"5b49":function(t,e,a){"use strict";a("58de")},"5ced":function(t,e,a){},"68b7":function(t,e,a){"use strict";a("ea10")},"71ee":function(t,e,a){},"845f":function(t,e,a){},"85ec":function(t,e,a){},c180:function(t,e,a){},cccb:function(t,e,a){"use strict";a("5ced")},e71d:function(t,e,a){"use strict";a("3ddd")},ea10:function(t,e,a){}});
//# sourceMappingURL=app.684c6f69.js.map