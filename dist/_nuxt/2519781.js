(window.webpackJsonp=window.webpackJsonp||[]).push([[3,2],{292:function(e,t,n){var content=n(295);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(38).default)("32ffe008",content,!0,{sourceMap:!1})},293:function(e,t,n){"use strict";n.r(t);var o=n(0).a.extend({name:"Button",props:{primary:{type:Boolean,required:!1},icon:{type:Array,required:!1,default:null},pulse:{type:Boolean,required:!1}},computed:{classList:function(){var e=["button"];return this.primary&&e.push("button--primary"),this.icon&&e.push("button--with-icon"),e}}}),r=(n(294),n(26)),component=Object(r.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",{class:e.classList},[e.icon?n("font-awesome-icon",{staticClass:"button__icon",attrs:{icon:e.icon,pulse:!!e.pulse&&e.pulse}}):e._e(),n("span",{staticClass:"button__text"},[e._t("default",(function(){return[e._v("Button")]}))],2)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Button:n(293).default})},294:function(e,t,n){"use strict";n(292)},295:function(e,t,n){var o=n(37)(!1);o.push([e.i,".button{display:inline-block;vertical-align:middle;color:#000;font-size:.88889rem;letter-spacing:.04rem;line-height:1.77778rem;height:1.77778rem;text-decoration:none;font-weight:700;margin:0;padding:0 .6rem;border:0;background-color:#eee;border-radius:3px;box-sizing:border-box;cursor:pointer;text-align:center;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.button:focus{outline:none}.button:hover{background-color:#ddd}.button--primary{background-color:#000;color:#fff}.button--primary:hover{background-color:#ddd;color:#000}.button--with-icon{padding:0 .6rem 0 0}.button__text{text-transform:uppercase}.button__icon{vertical-align:-.3rem;margin:0 .5rem;font-size:1.16667rem}.button .fa-spinner.fa-pulse{font-size:.88889rem;vertical-align:-.2rem}",""]),e.exports=o},296:function(e,t,n){var content=n(301);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(38).default)("11cfe360",content,!0,{sourceMap:!1})},298:function(e,t,n){"use strict";var o=n(12),r=n(3),l=n(95),c=n(17),d=n(13),f=n(51),m=n(203),w=n(75),v=n(202),_=n(4),h=n(60),y=n(76).f,x=n(39).f,k=n(16).f,E=n(204).trim,A="Number",I=r.Number,N=I.prototype,C=f(h(N))==A,L=function(e){if(w(e))throw TypeError("Cannot convert a Symbol value to a number");var t,n,o,r,l,c,d,code,f=v(e,"number");if("string"==typeof f&&f.length>2)if(43===(t=(f=E(f)).charCodeAt(0))||45===t){if(88===(n=f.charCodeAt(2))||120===n)return NaN}else if(48===t){switch(f.charCodeAt(1)){case 66:case 98:o=2,r=49;break;case 79:case 111:o=8,r=55;break;default:return+f}for(c=(l=f.slice(2)).length,d=0;d<c;d++)if((code=l.charCodeAt(d))<48||code>r)return NaN;return parseInt(l,o)}return+f};if(l(A,!I(" 0o1")||!I("0b1")||I("+0x1"))){for(var R,T=function(e){var t=arguments.length<1?0:e,n=this;return n instanceof T&&(C?_((function(){N.valueOf.call(n)})):f(n)!=A)?m(new I(L(t)),n,T):L(t)},j=o?y(I):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),B=0;j.length>B;B++)d(I,R=j[B])&&!d(T,R)&&k(T,R,x(I,R));T.prototype=N,N.constructor=T,c(r,A,T)}},299:function(e,t,n){(function(n){var o,r,l;r=[],void 0===(l="function"==typeof(o=function(){"use strict";function b(a,b){return void 0===b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\ufeff",a],{type:a.type}):a}function t(a,b,e){var t=new XMLHttpRequest;t.open("GET",a),t.responseType="blob",t.onload=function(){g(t.response,b,e)},t.onerror=function(){console.error("could not download file")},t.send()}function o(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function r(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(e){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var l="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof n&&n.global===n?n:void 0,a=l.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=l.saveAs||("object"!=typeof window||window!==l?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,e){var i=l.URL||l.webkitURL,n=document.createElement("a");g=g||b.name||"download",n.download=g,n.rel="noopener","string"==typeof b?(n.href=b,n.origin===location.origin?r(n):o(n.href)?t(b,g,e):r(n,n.target="_blank")):(n.href=i.createObjectURL(b),setTimeout((function(){i.revokeObjectURL(n.href)}),4e4),setTimeout((function(){r(n)}),0))}:"msSaveOrOpenBlob"in navigator?function(e,g,n){if(g=g||e.name||"download","string"!=typeof e)navigator.msSaveOrOpenBlob(b(e,n),g);else if(o(e))t(e,g,n);else{var i=document.createElement("a");i.href=e,i.target="_blank",setTimeout((function(){r(i)}))}}:function(b,e,n,g){if((g=g||open("","_blank"))&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return t(b,e,n);var o="application/octet-stream"===b.type,i=/constructor/i.test(l.HTMLElement)||l.safari,r=/CriOS\/[\d]+/.test(navigator.userAgent);if((r||o&&i||a)&&"undefined"!=typeof FileReader){var c=new FileReader;c.onloadend=function(){var a=c.result;a=r?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},c.readAsDataURL(b)}else{var d=l.URL||l.webkitURL,f=d.createObjectURL(b);g?g.location=f:location.href=f,g=null,setTimeout((function(){d.revokeObjectURL(f)}),4e4)}});l.saveAs=g.saveAs=g,e.exports=g})?o.apply(t,r):o)||(e.exports=l)}).call(this,n(30))},300:function(e,t,n){"use strict";n(296)},301:function(e,t,n){var o=n(37)(!1);o.push([e.i,".list{flex-direction:column;justify-content:center;align-items:flex-start}.list,.listitem{display:flex;align-content:flex-start}.listitem{width:98%;position:relative;flex-direction:row;justify-content:space-between;flex-wrap:nowrap;align-items:center;border-bottom:1px solid #eee;padding:.47133rem 0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.listitem:last-child{border-bottom:none}.listitem--selected{background-color:#eee}.listitem__icon{display:flex;flex-shrink:0;justify-content:center;width:1.75rem;margin-right:.4rem}.listitem__label{display:flex;flex-grow:4;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.listitem__link{color:#000;text-decoration:none}.listitem__lang{margin-left:.3rem;font-size:.66667rem;line-height:.66667rem;align-self:flex-start;color:#bbb;font-weight:700;letter-spacing:.05rem;padding:.11rem .18rem;text-transform:uppercase}.listitem__size{flex-grow:2;white-space:nowrap;text-align:right}.listitem__download,.listitem__size{margin-left:1rem}@media only screen and (max-width:650px){.listitem__download{display:none}}",""]),e.exports=o},302:function(e,t,n){"use strict";n.r(t);var o=n(6),r=(n(50),n(298),n(0)),l=n(299),c=n.n(l),d=r.a.extend({name:"List",props:{entries:{type:Array,default:function(){return[]}},isSubdir:{type:Boolean,default:!1},selectedIndex:{type:Number,default:-1}},data:function(){return{isPreparingDownload:!1}},methods:{download:function(e,t){var n=this;return Object(o.a)(regeneratorRuntime.mark((function o(){var r;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return n.isPreparingDownload=!0,o.next=3,n.$axios.get(t,{responseType:"blob"});case 3:r=o.sent,n.isPreparingDownload=!1,c.a.saveAs(new Blob([r.data]),e);case 6:case"end":return o.stop()}}),o)})))()}}}),f=(n(300),n(26)),component=Object(f.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"list"},e._l(e.entries,(function(t,o){return n("div",{key:t.slug,staticClass:"listitem",class:{"listitem--selected":e.selectedIndex>=0&&e.selectedIndex===o}},[n("div",{staticClass:"listitem__icon"},["dir"===t.type?n("font-awesome-icon",{staticClass:"icon--dir",attrs:{icon:["far","folder"]}}):"file"===t.type?n("font-awesome-icon",{staticClass:"icon--file",attrs:{icon:["far","file"]}}):e._e()],1),n("div",{staticClass:"listitem__label"},["dir"===t.type?n("NuxtLink",{staticClass:"listitem__link",attrs:{to:t.slug}},[e._v(e._s(t.name))]):"file"===t.type?n("a",{staticClass:"listitem__link",attrs:{href:t.downloadUrl,download:"",rel:"noopener"}},[e._v(e._s(t.name))]):e._e(),e.isSubdir?e._e():n("span",{staticClass:"listitem__lang"},[e._v(e._s(t.lang))])],1),"file"===t.type?[n("div",{staticClass:"listitem__size"},[e._v(e._s(e.$formatBytes(t.size)))]),n("div",{staticClass:"listitem__download"},[n("Button",{attrs:{primary:!0,icon:!0===e.isPreparingDownload?["fas","spinner"]:null,pulse:!0===e.isPreparingDownload},nativeOn:{click:function(n){return e.download(t.name,t.downloadUrl)}}},[e._v("Download")])],1)]:e._e()],2)})),0)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Button:n(293).default})}}]);