function t(t,e,i,s){var n,a=arguments.length,o=a<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(o=(a<3?n(o):a>3?n(e,i,o):n(e,i))||o);return a>3&&o&&Object.defineProperty(e,i,o),o}function e(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)}"function"==typeof SuppressedError&&SuppressedError;const i=globalThis,s=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),a=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}};const r=t=>new o("string"==typeof t?t:t+"",void 0,n),c=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,n)},l=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return r(e)})(t):t,{is:d,defineProperty:h,getOwnPropertyDescriptor:p,getOwnPropertyNames:u,getOwnPropertySymbols:m,getPrototypeOf:f}=Object,g=globalThis,_=g.trustedTypes,v=_?_.emptyScript:"",$=g.reactiveElementPolyfillSupport,y=(t,e)=>t,w={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!d(t,e),x={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=p(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const a=s?.call(this);n?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=f(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...u(t),...m(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(s)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of e){const e=document.createElement("style"),n=i.litNonce;void 0!==n&&e.setAttribute("nonce",n),e.textContent=s.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:w).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this._$Em=s;const a=n.fromAttribute(e,t.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const a=this.constructor;if(!1===s&&(n=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??b)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==n||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[y("elementProperties")]=new Map,A[y("finalized")]=new Map,$?.({ReactiveElement:A}),(g.reactiveElementVersions??=[]).push("2.1.2");const C=globalThis,S=t=>t,E=C.trustedTypes,k=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,P="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,U="?"+T,O=`<${U}>`,N=document,j=()=>N.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,H="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,z=/>/g,V=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,B=/"/g,W=/^(?:script|style|textarea|title)$/i,q=(t,...e)=>({_$litType$:1,strings:t,values:e}),F=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),Q=new WeakMap,Z=N.createTreeWalker(N,129);function J(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let n,a=2===e?"<svg>":3===e?"<math>":"",o=I;for(let e=0;e<i;e++){const i=t[e];let r,c,l=-1,d=0;for(;d<i.length&&(o.lastIndex=d,c=o.exec(i),null!==c);)d=o.lastIndex,o===I?"!--"===c[1]?o=D:void 0!==c[1]?o=z:void 0!==c[2]?(W.test(c[2])&&(n=RegExp("</"+c[2],"g")),o=V):void 0!==c[3]&&(o=V):o===V?">"===c[0]?(o=n??I,l=-1):void 0===c[1]?l=-2:(l=o.lastIndex-c[2].length,r=c[1],o=void 0===c[3]?V:'"'===c[3]?B:L):o===B||o===L?o=V:o===D||o===z?o=I:(o=V,n=void 0);const h=o===V&&t[e+1].startsWith("/>")?" ":"";a+=o===I?i+O:l>=0?(s.push(r),i.slice(0,l)+P+i.slice(l)+T+h):i+T+(-2===l?e:h)}return[J(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class X{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,a=0;const o=t.length-1,r=this.parts,[c,l]=K(t,e);if(this.el=X.createElement(c,i),Z.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Z.nextNode())&&r.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(P)){const e=l[a++],i=s.getAttribute(t).split(T),o=/([.?@])?(.*)/.exec(e);r.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?st:"?"===o[1]?nt:"@"===o[1]?at:it}),s.removeAttribute(t)}else t.startsWith(T)&&(r.push({type:6,index:n}),s.removeAttribute(t));if(W.test(s.tagName)){const t=s.textContent.split(T),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],j()),Z.nextNode(),r.push({type:2,index:++n});s.append(t[e],j())}}}else if(8===s.nodeType)if(s.data===U)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(T,t+1));)r.push({type:7,index:n}),t+=T.length-1}n++}}static createElement(t,e){const i=N.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,s){if(e===F)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const a=M(e)?void 0:e._$litDirective$;return n?.constructor!==a&&(n?._$AO?.(!1),void 0===a?n=void 0:(n=new a(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=Y(t,n._$AS(t,e.values),n,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??N).importNode(e,!0);Z.currentNode=s;let n=Z.nextNode(),a=0,o=0,r=i[0];for(;void 0!==r;){if(a===r.index){let e;2===r.type?e=new et(n,n.nextSibling,this,t):1===r.type?e=new r.ctor(n,r.name,r.strings,this,t):6===r.type&&(e=new ot(n,this,t)),this._$AV.push(e),r=i[++o]}a!==r?.index&&(n=Z.nextNode(),a++)}return Z.currentNode=N,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),M(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Q.get(t.strings);return void 0===e&&Q.set(t.strings,e=new X(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new et(this.O(j()),this.O(j()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(t,e=this,i,s){const n=this.strings;let a=!1;if(void 0===n)t=Y(this,t,e,0),a=!M(t)||t!==this._$AH&&t!==F,a&&(this._$AH=t);else{const s=t;let o,r;for(t=n[0],o=0;o<n.length-1;o++)r=Y(this,s[i+o],e,o),r===F&&(r=this._$AH[o]),a||=!M(r)||r!==this._$AH[o],r===G?t=G:t!==G&&(t+=(r??"")+n[o+1]),this._$AH[o]=r}a&&!s&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class nt extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class at extends it{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??G)===F)return;const i=this._$AH,s=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==G&&(i===G||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const rt=C.litHtmlPolyfillSupport;rt?.(X,et),(C.litHtmlVersions??=[]).push("3.3.2");const ct=globalThis;let lt=class extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new et(e.insertBefore(j(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}};lt._$litElement$=!0,lt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:lt});const dt=ct.litElementPolyfillSupport;dt?.({LitElement:lt}),(ct.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:b},ut=(t=pt,e,i)=>{const{kind:s,metadata:n}=i;let a=globalThis.litPropertyMetadata.get(n);if(void 0===a&&globalThis.litPropertyMetadata.set(n,a=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function mt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ft(t){return mt({...t,state:!0,attribute:!1})}const gt=t=>(...e)=>({_$litDirective$:t,values:e});let _t=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const vt=gt(class extends _t{constructor(t){if(super(t),1!==t.type||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const s=!!e[t];s===this.st.has(t)||this.nt?.has(t)||(s?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return F}}),$t="important",yt=" !"+$t,wt=gt(class extends _t{constructor(t){if(super(t),1!==t.type||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const s=t[i];return null==s?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const s=e[t];if(null!=s){this.ft.add(t);const e="string"==typeof s&&s.endsWith(yt);t.includes("-")||e?i.setProperty(t,e?s.slice(0,-11):s,e?$t:""):i[t]=s}}return F}}),bt="unified-room-card",xt="unified-room-card",At="unified-room-card-editor",Ct="35px",St="50px",Et="50px",kt="on",Pt="unlocked",Tt="open",Ut="home",Ot="heating",Nt="cooling",jt="var(--primary-color)",Mt="var(--primary-text-color)",Rt="var(--secondary-text-color)",Ht="var(--divider-color, #e0e0e0)",It=c`
  ${c`
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.05);
    }
  }

  @keyframes glow {
    0%, 100% {
      filter: drop-shadow(0 0 2px currentColor);
    }
    50% {
      filter: drop-shadow(0 0 8px currentColor) drop-shadow(0 0 12px currentColor);
    }
  }

  @keyframes flash {
    0%, 50%, 100% {
      opacity: 1;
    }
    25%, 75% {
      opacity: 0.3;
    }
  }
`}
  ${c`
  .animation-pulse {
    animation: pulse 2s ease-in-out infinite;
  }

  .animation-glow {
    animation: glow 2s ease-in-out infinite;
  }

  .animation-flash {
    animation: flash 1s ease-in-out infinite;
  }
`}
  ${c`
  :host {
    display: block;
  }

  ha-card {
    display: grid;
    grid-template-areas: ${r('"name name icon icon" "climate climate persistent intermittent"')};
    grid-template-columns: ${r("1fr 1fr 1fr 1fr")};
    grid-template-rows: ${r("auto auto")};
    height: ${r("97px")};
    width: ${r("auto")};
    padding: 12px;
    box-sizing: border-box;
    cursor: pointer;
    overflow: hidden;
    background: ${r("var(--ha-card-background, var(--card-background-color, white))")};
    border-radius: ${r("var(--ha-card-border-radius, 12px)")};
    transition: background-color 0.3s ease;
  }

  ha-card.state-on {
    background-color: var(--card-background-color);
  }

  ha-card.state-off {
    background-color: color-mix(in srgb, var(--card-background-color) 50%, transparent);
  }
`}
  ${c`
  .name-section {
    grid-area: name;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: ${r(Mt)};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`}
  ${c`
  .icon-section {
    grid-area: icon;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    /* Fixed minimum width to prevent layout shift */
    min-width: ${r(St)};
  }

  .icon-wrapper {
    /* Fixed size wrapper - always reserves space for img-cell size */
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${r(St)};
    height: ${r(Et)};
    flex-shrink: 0;
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${r(Ct)};
    height: ${r("35px")};
    transition: all 0.2s ease;
  }

  .icon-container.with-img-cell {
    width: ${r(St)};
    height: ${r(Et)};
    border-radius: 50%;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background 0.3s ease;
  }

  /* Active state background is applied dynamically via inline style for light color support */

  .icon-container ha-icon {
    --mdc-icon-size: ${r(Ct)};
    color: ${r("var(--paper-item-icon-color, #44739e)")};
    transition: color 0.3s ease, transform 0.3s ease;
  }

  .icon-container.active ha-icon {
    color: ${r("var(--paper-item-icon-active-color, var(--primary-color))")};
  }

  .icon-container.with-img-cell.active ha-icon {
    color: var(--text-primary-color, #fff);
  }

  .state-text {
    font-size: 12px;
    font-weight: 500;
    color: ${r(Rt)};
    text-transform: capitalize;
    white-space: nowrap;
  }

  /* When icon is hidden, keep the section but hide content */
  .icon-section.hidden {
    visibility: hidden;
  }
`}
  ${c`
  .climate-section {
    grid-area: climate;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .climate-primary {
    font-size: ${r("18px")};
    font-weight: 500;
    color: ${r(Mt)};
  }

  .climate-secondary {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .climate-value {
    font-size: ${r("12px")};
    font-weight: ${r("400")};
    opacity: ${r("0.7")};
    color: ${r(Mt)};
    white-space: nowrap;
  }

  .climate-divider {
    width: 1px;
    height: 12px;
    background: ${r(Ht)};
    opacity: 0.5;
  }
`}
  ${c`
  .persistent-section {
    grid-area: persistent;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 6px;
  }

  .persistent-section.position-left {
    justify-content: flex-start;
  }

  .persistent-section.position-center {
    justify-content: center;
  }

  .persistent-section.position-right {
    justify-content: flex-end;
  }

  .persistent-entity {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .persistent-entity ha-icon {
    --mdc-icon-size: ${r("20px")};
    transition: color 0.3s ease;
  }
`}
  ${c`
  .intermittent-section {
    grid-area: intermittent;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
  }

  .intermittent-section.position-left {
    justify-content: flex-start;
  }

  .intermittent-section.position-center {
    justify-content: center;
  }

  .intermittent-section.position-right {
    justify-content: flex-end;
  }

  .intermittent-entity {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .intermittent-entity ha-icon {
    --mdc-icon-size: ${r("20px")};
    transition: color 0.3s ease, opacity 0.3s ease;
  }

  .intermittent-entity.hidden {
    display: none;
  }
`}
  ${c`
  .overflow-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 600;
    color: ${r(Rt)};
    background: rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    padding: 2px 6px;
    min-width: 20px;
  }
`}
  ${c`
  .unavailable {
    color: ${r("var(--state-unavailable-color, var(--disabled-text-color))")} !important;
    opacity: 0.5;
  }
`}
`,Dt=c`
  :host {
    display: block;
  }

  .editor-container {
    padding: 16px;
  }

  .accordion {
    border: 1px solid ${r(Ht)};
    border-radius: 8px;
    margin-bottom: 8px;
    overflow: hidden;
  }

  .accordion-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: rgba(0, 0, 0, 0.03);
    cursor: pointer;
    font-weight: 500;
    color: ${r(Mt)};
    transition: background 0.2s ease;
  }

  .accordion-header:hover {
    background: rgba(0, 0, 0, 0.06);
  }

  .accordion-header ha-icon {
    transition: transform 0.2s ease;
  }

  .accordion-header.expanded ha-icon {
    transform: rotate(180deg);
  }

  .accordion-content {
    padding: 16px;
    display: none;
  }

  .accordion-content.expanded {
    display: block;
  }

  .form-row {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  .form-row:last-child {
    margin-bottom: 0;
  }

  .form-row-dual {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    gap: 24px;
  }

  .form-row-dual:last-child {
    margin-bottom: 0;
  }

  .form-row-dual .form-item {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
  }

  .form-row-dual .form-label {
    flex: 1;
    font-size: 14px;
    white-space: nowrap;
    color: ${r(Mt)};
  }

  .form-row-dual .form-input {
    flex: 0 0 auto;
  }

  .form-row-dual .form-input ha-textfield {
    width: 100%;
  }

  /* For dual rows with text inputs, the input should expand */
  .form-row-dual.expand-inputs .form-input {
    flex: 1;
    min-width: 0;
  }

  .form-label {
    flex: 0 0 140px;
    font-size: 14px;
    color: ${r(Mt)};
  }

  .form-input {
    flex: 1;
  }

  .entity-list {
    border: 1px solid ${r(Ht)};
    border-radius: 8px;
    overflow: hidden;
  }

  .entity-item {
    border-bottom: 1px solid ${r(Ht)};
  }

  .entity-item:last-child {
    border-bottom: none;
  }

  .entity-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    background: rgba(0, 0, 0, 0.02);
    cursor: pointer;
  }

  .entity-header:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  .entity-config {
    padding: 12px;
    display: none;
    border-top: 1px solid ${r(Ht)};
  }

  .entity-config.expanded {
    display: block;
  }

  .add-entity-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    margin-top: 8px;
    border: 1px dashed ${r(Ht)};
    border-radius: 8px;
    cursor: pointer;
    color: ${r(Rt)};
    transition: all 0.2s ease;
  }

  .add-entity-btn:hover {
    border-color: ${r(jt)};
    color: ${r(jt)};
  }

  ha-textfield,
  ha-select,
  ha-selector {
    width: 100%;
  }

  ha-switch {
    --mdc-theme-secondary: ${r(jt)};
  }
`;function zt(t){return t&&"none"!==t?`animation-${t}`:""}let Vt=class extends lt{constructor(){super(...arguments),this._accordionState={main:!0,persistent:!1,intermittent:!1,climate:!1,power:!1,battery:!1,update:!1,grid:!1}}setConfig(t){this._config=t}render(){return this.hass&&this._config?q`
      <div class="editor-container">
        ${this._renderMainSection()}
        ${this._renderPersistentSection()}
        ${this._renderIntermittentSection()}
        ${this._renderClimateSection()}
        ${this._renderPowerSection()}
        ${this._renderBatterySection()}
        ${this._renderUpdateSection()}
        ${this._renderGridSection()}
      </div>
    `:G}_renderMainSection(){const t=this._accordionState.main;return q`
      <div class="accordion">
        <div
          class="accordion-header ${t?"expanded":""}"
          @click=${()=>this._toggleAccordion("main")}
        >
          <span>Main Configuration</span>
          <ha-icon .icon=${t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        <div class="accordion-content ${t?"expanded":""}">
          <!-- Card Name -->
          <div class="form-row">
            <span class="form-label">Card Name</span>
            <div class="form-input">
              <ha-textfield
                .value=${this._config?.name||""}
                @input=${t=>this._valueChanged("name",t.target.value)}
              ></ha-textfield>
            </div>
          </div>
          <!-- Entity -->
          <div class="form-row">
            <span class="form-label">Entity</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{entity:{}}}
                .value=${this._config?.entity||""}
                @value-changed=${t=>this._valueChanged("entity",t.detail.value)}
              ></ha-selector>
            </div>
          </div>
          <!-- Icon -->
          <div class="form-row">
            <span class="form-label">Icon</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{icon:{}}}
                .value=${this._config?.icon||""}
                @value-changed=${t=>this._valueChanged("icon",t.detail.value)}
              ></ha-selector>
            </div>
          </div>
          <!-- Show Name / Show Icon (dual row) -->
          <div class="form-row-dual">
            <div class="form-item">
              <span class="form-label">Show Name</span>
              <div class="form-input">
                <ha-switch
                  .checked=${!1!==this._config?.show_name}
                  @change=${t=>this._valueChanged("show_name",t.target.checked)}
                ></ha-switch>
              </div>
            </div>
            <div class="form-item">
              <span class="form-label">Show Icon</span>
              <div class="form-input">
                <ha-switch
                  .checked=${!1!==this._config?.show_icon}
                  @change=${t=>this._valueChanged("show_icon",t.target.checked)}
                ></ha-switch>
              </div>
            </div>
          </div>
          <!-- Show State Text / Show Icon Background (dual row) -->
          <div class="form-row-dual">
            <div class="form-item">
              <span class="form-label">Show State</span>
              <div class="form-input">
                <ha-switch
                  .checked=${this._config?.show_state||!1}
                  @change=${t=>this._valueChanged("show_state",t.target.checked)}
                ></ha-switch>
              </div>
            </div>
            <div class="form-item">
              <span class="form-label">Icon Background</span>
              <div class="form-input">
                <ha-switch
                  .checked=${!1!==this._config?.show_img_cell}
                  @change=${t=>this._valueChanged("show_img_cell",t.target.checked)}
                ></ha-switch>
              </div>
            </div>
          </div>
          <!-- Animate Icon (single row) -->
          <div class="form-row">
            <span class="form-label">Animate Icon</span>
            <div class="form-input">
              <ha-switch
                .checked=${this._config?.animate_icon||!1}
                @change=${t=>this._valueChanged("animate_icon",t.target.checked)}
              ></ha-switch>
            </div>
          </div>
          <!-- Card Height / Card Width (dual row) -->
          <div class="form-row-dual expand-inputs">
            <div class="form-item">
              <span class="form-label">Height</span>
              <div class="form-input">
                <ha-textfield
                  .value=${this._config?.card_height||""}
                  placeholder="97px"
                  @input=${t=>this._valueChanged("card_height",t.target.value)}
                ></ha-textfield>
              </div>
            </div>
            <div class="form-item">
              <span class="form-label">Width</span>
              <div class="form-input">
                <ha-textfield
                  .value=${this._config?.card_width||""}
                  placeholder="auto"
                  @input=${t=>this._valueChanged("card_width",t.target.value)}
                ></ha-textfield>
              </div>
            </div>
          </div>
          <!-- Tap Action -->
          <div class="form-row">
            <span class="form-label">Tap Action</span>
            <div class="form-input">
              <ha-select
                .value=${this._config?.tap_action?.action||"toggle"}
                @selected=${t=>this._tapActionChanged("tap_action",t.target.value)}
                @closed=${t=>t.stopPropagation()}
              >
                <mwc-list-item value="toggle">Toggle</mwc-list-item>
                <mwc-list-item value="more-info">More Info</mwc-list-item>
                <mwc-list-item value="navigate">Navigate</mwc-list-item>
                <mwc-list-item value="url">URL</mwc-list-item>
                <mwc-list-item value="perform-action">Perform Action</mwc-list-item>
                <mwc-list-item value="assist">Assist</mwc-list-item>
                <mwc-list-item value="none">None</mwc-list-item>
              </ha-select>
            </div>
          </div>
          ${"navigate"===this._config?.tap_action?.action?q`
          <div class="form-row">
            <span class="form-label">Navigation Path</span>
            <div class="form-input">
              <ha-textfield
                .value=${this._config?.tap_action?.navigation_path||""}
                placeholder="/lovelace/0"
                @input=${t=>this._tapActionDataChanged("tap_action","navigation_path",t.target.value)}
              ></ha-textfield>
            </div>
          </div>
          `:""}
          ${"url"===this._config?.tap_action?.action?q`
          <div class="form-row">
            <span class="form-label">URL Path</span>
            <div class="form-input">
              <ha-textfield
                .value=${this._config?.tap_action?.url_path||""}
                placeholder="https://example.com"
                @input=${t=>this._tapActionDataChanged("tap_action","url_path",t.target.value)}
              ></ha-textfield>
            </div>
          </div>
          `:""}
          <!-- Hold Action -->
          <div class="form-row">
            <span class="form-label">Hold Action</span>
            <div class="form-input">
              <ha-select
                .value=${this._config?.hold_action?.action||"none"}
                @selected=${t=>this._tapActionChanged("hold_action",t.target.value)}
                @closed=${t=>t.stopPropagation()}
              >
                <mwc-list-item value="none">None</mwc-list-item>
                <mwc-list-item value="toggle">Toggle</mwc-list-item>
                <mwc-list-item value="more-info">More Info</mwc-list-item>
                <mwc-list-item value="navigate">Navigate</mwc-list-item>
                <mwc-list-item value="url">URL</mwc-list-item>
                <mwc-list-item value="perform-action">Perform Action</mwc-list-item>
                <mwc-list-item value="assist">Assist</mwc-list-item>
              </ha-select>
            </div>
          </div>
          ${"navigate"===this._config?.hold_action?.action?q`
          <div class="form-row">
            <span class="form-label">Navigation Path</span>
            <div class="form-input">
              <ha-textfield
                .value=${this._config?.hold_action?.navigation_path||""}
                placeholder="/lovelace/0"
                @input=${t=>this._tapActionDataChanged("hold_action","navigation_path",t.target.value)}
              ></ha-textfield>
            </div>
          </div>
          `:""}
          ${"url"===this._config?.hold_action?.action?q`
          <div class="form-row">
            <span class="form-label">URL Path</span>
            <div class="form-input">
              <ha-textfield
                .value=${this._config?.hold_action?.url_path||""}
                placeholder="https://example.com"
                @input=${t=>this._tapActionDataChanged("hold_action","url_path",t.target.value)}
              ></ha-textfield>
            </div>
          </div>
          `:""}
          <!-- Double Tap Action -->
          <div class="form-row">
            <span class="form-label">Double Tap Action</span>
            <div class="form-input">
              <ha-select
                .value=${this._config?.double_tap_action?.action||"more-info"}
                @selected=${t=>this._tapActionChanged("double_tap_action",t.target.value)}
                @closed=${t=>t.stopPropagation()}
              >
                <mwc-list-item value="more-info">More Info</mwc-list-item>
                <mwc-list-item value="toggle">Toggle</mwc-list-item>
                <mwc-list-item value="navigate">Navigate</mwc-list-item>
                <mwc-list-item value="url">URL</mwc-list-item>
                <mwc-list-item value="perform-action">Perform Action</mwc-list-item>
                <mwc-list-item value="assist">Assist</mwc-list-item>
                <mwc-list-item value="none">None</mwc-list-item>
              </ha-select>
            </div>
          </div>
          ${"navigate"===this._config?.double_tap_action?.action?q`
          <div class="form-row">
            <span class="form-label">Navigation Path</span>
            <div class="form-input">
              <ha-textfield
                .value=${this._config?.double_tap_action?.navigation_path||""}
                placeholder="/lovelace/0"
                @input=${t=>this._tapActionDataChanged("double_tap_action","navigation_path",t.target.value)}
              ></ha-textfield>
            </div>
          </div>
          `:""}
          ${"url"===this._config?.double_tap_action?.action?q`
          <div class="form-row">
            <span class="form-label">URL Path</span>
            <div class="form-input">
              <ha-textfield
                .value=${this._config?.double_tap_action?.url_path||""}
                placeholder="https://example.com"
                @input=${t=>this._tapActionDataChanged("double_tap_action","url_path",t.target.value)}
              ></ha-textfield>
            </div>
          </div>
          `:""}
        </div>
      </div>
    `}_renderPersistentSection(){const t=this._accordionState.persistent;return q`
      <div class="accordion">
        <div
          class="accordion-header ${t?"expanded":""}"
          @click=${()=>this._toggleAccordion("persistent")}
        >
          <span>Persistent Entities</span>
          <ha-icon .icon=${t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        <div class="accordion-content ${t?"expanded":""}">
          <p>Persistent entities configuration - Coming in Phase 6</p>
        </div>
      </div>
    `}_renderIntermittentSection(){const t=this._accordionState.intermittent;return q`
      <div class="accordion">
        <div
          class="accordion-header ${t?"expanded":""}"
          @click=${()=>this._toggleAccordion("intermittent")}
        >
          <span>Intermittent Entities</span>
          <ha-icon .icon=${t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        <div class="accordion-content ${t?"expanded":""}">
          <p>Intermittent entities configuration - Coming in Phase 6</p>
        </div>
      </div>
    `}_renderClimateSection(){const t=this._accordionState.climate,e=this._config?.climate_entities||{};return q`
      <div class="accordion">
        <div
          class="accordion-header ${t?"expanded":""}"
          @click=${()=>this._toggleAccordion("climate")}
        >
          <span>Climate Entities</span>
          <ha-icon .icon=${t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        <div class="accordion-content ${t?"expanded":""}">
          <!-- Primary Entity -->
          <div class="form-row">
            <span class="form-label">Primary Entity</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{entity:{domain:["sensor","climate","weather"]}}}
                .value=${e.primary_entity||""}
                @value-changed=${t=>this._climateValueChanged("primary_entity",t.detail.value)}
              ></ha-selector>
            </div>
          </div>
          <!-- Temperature Entities -->
          <div class="form-row">
            <span class="form-label">Temperature</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{entity:{domain:"sensor",device_class:"temperature",multiple:!0}}}
                .value=${e.temperature_entities||[]}
                @value-changed=${t=>this._climateValueChanged("temperature_entities",t.detail.value)}
              ></ha-selector>
            </div>
          </div>
          <!-- Humidity Entities -->
          <div class="form-row">
            <span class="form-label">Humidity</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{entity:{domain:"sensor",device_class:"humidity",multiple:!0}}}
                .value=${e.humidity_entities||[]}
                @value-changed=${t=>this._climateValueChanged("humidity_entities",t.detail.value)}
              ></ha-selector>
            </div>
          </div>
          <!-- Air Quality Entities -->
          <div class="form-row">
            <span class="form-label">Air Quality</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{entity:{domain:"sensor",device_class:["aqi","pm25","pm10","co2","volatile_organic_compounds"],multiple:!0}}}
                .value=${e.air_quality_entities||[]}
                @value-changed=${t=>this._climateValueChanged("air_quality_entities",t.detail.value)}
              ></ha-selector>
            </div>
          </div>
          <!-- Illuminance Entities -->
          <div class="form-row">
            <span class="form-label">Illuminance</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{entity:{domain:"sensor",device_class:"illuminance",multiple:!0}}}
                .value=${e.illuminance_entities||[]}
                @value-changed=${t=>this._climateValueChanged("illuminance_entities",t.detail.value)}
              ></ha-selector>
            </div>
          </div>
          <!-- Decimal Places -->
          <div class="form-row">
            <span class="form-label">Decimal Places</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{number:{min:0,max:3,mode:"box"}}}
                .value=${e.decimal_places??1}
                @value-changed=${t=>this._climateValueChanged("decimal_places",t.detail.value)}
              ></ha-selector>
            </div>
          </div>
        </div>
      </div>
    `}_renderPowerSection(){const t=this._accordionState.power,e=this._config?.power_entities||{};return q`
      <div class="accordion">
        <div
          class="accordion-header ${t?"expanded":""}"
          @click=${()=>this._toggleAccordion("power")}
        >
          <span>Power Entities</span>
          <ha-icon .icon=${t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        <div class="accordion-content ${t?"expanded":""}">
          <!-- Power Entities -->
          <div class="form-row">
            <span class="form-label">Power Sensors</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{entity:{domain:"sensor",device_class:"power",multiple:!0}}}
                .value=${e.entities||[]}
                @value-changed=${t=>this._powerValueChanged("entities",t.detail.value)}
              ></ha-selector>
            </div>
          </div>
        </div>
      </div>
    `}_renderBatterySection(){const t=this._accordionState.battery;return q`
      <div class="accordion">
        <div
          class="accordion-header ${t?"expanded":""}"
          @click=${()=>this._toggleAccordion("battery")}
        >
          <span>Battery Entities</span>
          <ha-icon .icon=${t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        <div class="accordion-content ${t?"expanded":""}">
          <p>Battery entities configuration - Coming in Phase 6</p>
        </div>
      </div>
    `}_renderUpdateSection(){const t=this._accordionState.update;return q`
      <div class="accordion">
        <div
          class="accordion-header ${t?"expanded":""}"
          @click=${()=>this._toggleAccordion("update")}
        >
          <span>Update Entities</span>
          <ha-icon .icon=${t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        <div class="accordion-content ${t?"expanded":""}">
          <p>Update entities configuration - Coming in Phase 6</p>
        </div>
      </div>
    `}_renderGridSection(){const t=this._accordionState.grid;return q`
      <div class="accordion">
        <div
          class="accordion-header ${t?"expanded":""}"
          @click=${()=>this._toggleAccordion("grid")}
        >
          <span>Grid Layout</span>
          <ha-icon .icon=${t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        <div class="accordion-content ${t?"expanded":""}">
          <div class="form-row">
            <span class="form-label">Grid Template Areas</span>
            <div class="form-input">
              <ha-textfield
                .value=${this._config?.grid?.template_areas||""}
                placeholder='"name name icon icon" "climate climate persistent intermittent"'
                @input=${t=>this._gridValueChanged("template_areas",t.target.value)}
              ></ha-textfield>
            </div>
          </div>
          <div class="form-row">
            <span class="form-label">Grid Template Columns</span>
            <div class="form-input">
              <ha-textfield
                .value=${this._config?.grid?.template_columns||""}
                placeholder="1fr 1fr 1fr 1fr"
                @input=${t=>this._gridValueChanged("template_columns",t.target.value)}
              ></ha-textfield>
            </div>
          </div>
          <div class="form-row">
            <span class="form-label">Grid Template Rows</span>
            <div class="form-input">
              <ha-textfield
                .value=${this._config?.grid?.template_rows||""}
                placeholder="auto auto"
                @input=${t=>this._gridValueChanged("template_rows",t.target.value)}
              ></ha-textfield>
            </div>
          </div>
          <div class="form-row">
            <span class="form-label">Grid Area</span>
            <div class="form-input">
              <ha-textfield
                .value=${this._config?.grid_area||""}
                placeholder="Optional grid area name"
                @input=${t=>this._valueChanged("grid_area",t.target.value)}
              ></ha-textfield>
            </div>
          </div>
        </div>
      </div>
    `}_toggleAccordion(t){this._accordionState={...this._accordionState,[t]:!this._accordionState[t]}}_valueChanged(t,e){if(!this._config)return;const i={...this._config,[t]:e};""!==e&&null!=e||delete i[t],this._config=i,this._dispatchConfigChanged()}_gridValueChanged(t,e){if(!this._config)return;const i={...this._config.grid}||{};e?i[t]=e:delete i[t],this._config={...this._config,grid:Object.keys(i).length>0?i:void 0},this._dispatchConfigChanged()}_tapActionChanged(t,e){if(!this._config)return;const i={...this._config,[t]:{action:e}};this._config=i,this._dispatchConfigChanged()}_tapActionDataChanged(t,e,i){if(!this._config)return;const s=this._config[t]||{action:"none"},n={...this._config,[t]:{...s,[e]:i||void 0}};i||delete n[t][e],this._config=n,this._dispatchConfigChanged()}_climateValueChanged(t,e){if(!this._config)return;const i={...this._config.climate_entities}||{};Array.isArray(e)&&0===e.length||""===e||null==e?delete i[t]:i[t]=e,this._config={...this._config,climate_entities:Object.keys(i).length>0?i:void 0},this._dispatchConfigChanged()}_powerValueChanged(t,e){if(!this._config)return;const i={...this._config.power_entities}||{};Array.isArray(e)&&0===e.length||""===e||null==e?delete i[t]:i[t]=e,this._config={...this._config,power_entities:Object.keys(i).length>0?i:void 0},this._dispatchConfigChanged()}_dispatchConfigChanged(){const t=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(t)}};Vt.styles=Dt,t([mt({attribute:!1}),e("design:type",Object)],Vt.prototype,"hass",void 0),t([ft(),e("design:type",Object)],Vt.prototype,"_config",void 0),t([ft(),e("design:type",Object)],Vt.prototype,"_accordionState",void 0),Vt=t([ht(At)],Vt),console.info(`%c ${bt.toUpperCase()} %c v1.0.2 `,"color: white; background: #3498db; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;","color: #3498db; background: #ecf0f1; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;");let Lt=class extends lt{setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={show_name:!0,show_icon:!0,show_state:!1,show_img_cell:!0,animate_icon:!1,tap_action:{action:"toggle"},hold_action:{action:"none"},double_tap_action:{action:"more-info"},...t}}getCardSize(){return 2}static getConfigElement(){return document.createElement(At)}static getStubConfig(){return{type:`custom:${xt}`,name:"Room Name",entity:"",show_name:!0,show_icon:!0}}updated(t){super.updated(t),this._config?.grid_area?this.style.gridArea=this._config.grid_area:this.style.removeProperty("grid-area")}shouldUpdate(t){if(t.has("_config"))return!0;if(t.has("hass")&&this._config){const e=t.get("hass");return!e||this._hasRelevantStateChanged(e)}return!1}_hasRelevantStateChanged(t){if(!this._config||!this.hass)return!1;const e=[];if(this._config.entity&&e.push(this._config.entity),this._config.persistent_entities?.entities&&e.push(...this._config.persistent_entities.entities.map(t=>t.entity)),this._config.intermittent_entities?.entities&&e.push(...this._config.intermittent_entities.entities.map(t=>t.entity)),this._config.climate_entities){const t=this._config.climate_entities;t.primary_entity&&e.push(t.primary_entity),t.temperature_entities&&e.push(...t.temperature_entities),t.humidity_entities&&e.push(...t.humidity_entities),t.air_quality_entities&&e.push(...t.air_quality_entities),t.illuminance_entities&&e.push(...t.illuminance_entities)}this._config.power_entities?.entities&&e.push(...this._config.power_entities.entities),this._config.battery_entities?.entities&&e.push(...this._config.battery_entities.entities),this._config.update_entities?.entities&&e.push(...this._config.update_entities.entities);for(const i of e)if(t.states[i]!==this.hass.states[i])return!0;return!1}render(){if(!this._config||!this.hass)return G;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=!!t&&this._isEntityActive(t.state),i={"state-on":e,"state-off":!e&&!!t},s=function(t){const e=[];return t.cardHeight&&e.push(`height: ${t.cardHeight};`),t.cardWidth&&e.push(`width: ${t.cardWidth};`),t.gridTemplateAreas&&e.push(`grid-template-areas: ${t.gridTemplateAreas};`),t.gridTemplateColumns&&e.push(`grid-template-columns: ${t.gridTemplateColumns};`),t.gridTemplateRows&&e.push(`grid-template-rows: ${t.gridTemplateRows};`),t.backgroundGradient?e.push(`background: ${t.backgroundGradient};`):t.backgroundColor&&e.push(`background-color: ${t.backgroundColor};`),e.join(" ")}({cardHeight:this._config.card_height,cardWidth:this._config.card_width,gridTemplateAreas:this._config.grid?.template_areas,gridTemplateColumns:this._config.grid?.template_columns,gridTemplateRows:this._config.grid?.template_rows,backgroundColor:this._config.background_color,activeBackgroundColor:e?this._config.active_background_color:void 0,backgroundGradient:this._config.background_gradient});return q`
      <ha-card
        class=${vt(i)}
        style=${s}
        @click=${this._handleTap}
        @contextmenu=${this._handleHold}
        @dblclick=${this._handleDoubleTap}
      >
        ${this._renderName()}
        ${this._renderIcon()}
        ${this._renderClimateSection()}
        ${this._renderPersistentEntities()}
        ${this._renderIntermittentEntities()}
      </ha-card>
    `}_renderName(){return this._config?.show_name&&this._config.name?q`
      <div class="name-section">
        ${this._config.name}
      </div>
    `:G}_renderIcon(){const t=this._config?.entity?this.hass?.states[this._config.entity]:void 0,e=!!t&&this._isEntityActive(t.state),i=!1!==this._config?.show_icon,s=this._config?.show_img_cell??!0,n=this._config?.icon||this._getDefaultIcon(t),a={"icon-container":!0,"with-img-cell":s,active:e,[zt(this._config?.animate_icon&&e?"pulse":void 0)]:!0},o={};if(e&&s){const e=this._getEntityBackgroundColor(t);o["background-color"]=e,o.background=e}const r={};return this._config?.icon_size&&(r["--mdc-icon-size"]=this._config.icon_size),e&&s&&(r.color="var(--text-primary-color, #fff)"),q`
      <div class="icon-section">
        ${this._config?.show_state&&t?q`<span class="state-text">${t.state}</span>`:G}
        <div class="icon-wrapper">
          ${i?q`
                <div 
                  class=${vt(a)}
                  style=${wt(o)}
                >
                  <ha-icon
                    .icon=${n}
                    style=${wt(r)}
                  ></ha-icon>
                </div>
              `:G}
        </div>
      </div>
    `}_getEntityBackgroundColor(t){if(!t)return"rgba(66, 133, 244, 0.3)";const e=t.attributes.rgb_color;if(e&&Array.isArray(e)&&3===e.length)return`rgba(${e[0]}, ${e[1]}, ${e[2]}, 0.3)`;const i=t.attributes.hs_color,s=t.attributes.brightness;if(i&&Array.isArray(i)&&2===i.length){const t=this._hsToRgb(i[0],i[1],s);return`rgba(${t[0]}, ${t[1]}, ${t[2]}, 0.3)`}return"rgba(255, 167, 38, 0.3)"}_hsToRgb(t,e,i){const s=e/100,n=(i??255)/255*.5,a=(1-Math.abs(2*n-1))*s,o=a*(1-Math.abs(t/60%2-1)),r=n-a/2;let c=0,l=0,d=0;return t>=0&&t<60?(c=a,l=o,d=0):t>=60&&t<120?(c=o,l=a,d=0):t>=120&&t<180?(c=0,l=a,d=o):t>=180&&t<240?(c=0,l=o,d=a):t>=240&&t<300?(c=o,l=0,d=a):t>=300&&t<360&&(c=a,l=0,d=o),[Math.round(255*(c+r)),Math.round(255*(l+r)),Math.round(255*(d+r))]}_renderClimateSection(){if(!this._config?.climate_entities&&!this._config?.power_entities)return G;const t=this._config.climate_entities,e=this._config.power_entities,i=t?.decimal_places??1,s=this._getTemperatureValue(t,i),n=this._getHumidityValue(t,i),a=this._getAirQualityValue(t,i),o=this._getIlluminanceValue(t,i),r=this._getPowerValue(e),c=[];return n&&c.push({label:"humidity",value:n}),a&&c.push({label:"air quality",value:a}),o&&c.push({label:"illuminance",value:o}),r&&c.push({label:"power",value:r}),q`
      <div class="climate-section">
        ${s?q`
          <span class="climate-primary">${s}</span>
        `:G}
        ${c.length>0?q`
          <div class="climate-secondary">
            ${c.map((t,e)=>q`
              ${e>0?q`<span class="climate-divider"></span>`:G}
              <span class="climate-value">${t.value}</span>
            `)}
          </div>
        `:G}
      </div>
    `}_getTemperatureValue(t,e=1){if(!t||!this.hass)return null;if(t.primary_entity){const i=this.hass.states[t.primary_entity];if(i&&!this._isUnavailable(i)){const t=parseFloat(i.state);if(!isNaN(t)){const s=i.attributes.unit_of_measurement||"°";return`${t.toFixed(e)}${s}`}}}if(t.temperature_entities&&t.temperature_entities.length>0){const i=this._calculateAverage(t.temperature_entities,e);if(null!==i.value)return`${i.value}${i.unit||"°"}`}return null}_getHumidityValue(t,e=0){if(!t?.humidity_entities||0===t.humidity_entities.length||!this.hass)return null;const i=this._calculateAverage(t.humidity_entities,e);return null!==i.value?`${i.value}%`:null}_getAirQualityValue(t,e=0){if(!t?.air_quality_entities||0===t.air_quality_entities.length||!this.hass)return null;const i=this._calculateAverage(t.air_quality_entities,e);if(null!==i.value){const t=i.unit?` ${i.unit}`:"";return`${i.value}${t}`}return null}_getIlluminanceValue(t,e=0){if(!t?.illuminance_entities||0===t.illuminance_entities.length||!this.hass)return null;const i=this._calculateAverage(t.illuminance_entities,e);return null!==i.value?`${i.value} lx`:null}_getPowerValue(t){if(!t?.entities||0===t.entities.length||!this.hass)return null;let e=0,i=0;for(const s of t.entities){const t=this.hass.states[s];if(!t||this._isUnavailable(t))continue;const n=parseFloat(t.state);if(isNaN(n))continue;const a=(t.attributes.unit_of_measurement||"W").toLowerCase();e+="kw"===a?1e3*n:"mw"===a?1e6*n:"gw"===a?1e9*n:n,i++}return 0===i?null:e>=1e3?`${(e/1e3).toFixed(2)} kW`:`${e.toFixed(1)} W`}_calculateAverage(t,e=1){if(!this.hass)return{value:null,unit:"",count:0};const i=[];let s="";for(const e of t){const t=this.hass.states[e];if(!t||this._isUnavailable(t))continue;const n=parseFloat(t.state);isNaN(n)||(i.push(n),!s&&t.attributes.unit_of_measurement&&(s=t.attributes.unit_of_measurement))}if(0===i.length)return{value:null,unit:"",count:0};const n=i.reduce((t,e)=>t+e,0)/i.length;return{value:parseFloat(n.toFixed(e)),unit:s,count:i.length}}_isUnavailable(t){return["unavailable","unknown"].includes(t.state)}_renderPersistentEntities(){return this._config?.persistent_entities?.entities?.length?q`
      <div class="persistent-section">
        <!-- Persistent entities will be implemented in Phase 4 -->
      </div>
    `:G}_renderIntermittentEntities(){return this._config?.intermittent_entities?.entities?.length?q`
      <div class="intermittent-section">
        <!-- Intermittent entities will be implemented in Phase 5 -->
      </div>
    `:G}_isEntityActive(t){return[kt,Pt,Tt,Ut,Ot,Nt].includes(t)}_getDefaultIcon(t){return t?t.attributes.icon?t.attributes.icon:{light:"mdi:lightbulb",switch:"mdi:toggle-switch",fan:"mdi:fan",climate:"mdi:thermostat",lock:"mdi:lock",binary_sensor:"mdi:radiobox-blank",sensor:"mdi:eye",cover:"mdi:window-shutter",camera:"mdi:camera",media_player:"mdi:cast"}[t.entity_id.split(".")[0]]||"mdi:home":"mdi:home"}_handleTap(t){t.stopPropagation(),this._config?.tap_action&&this._handleAction(this._config.tap_action)}_handleHold(t){t.preventDefault(),t.stopPropagation(),this._config?.hold_action&&this._handleAction(this._config.hold_action)}_handleDoubleTap(t){t.stopPropagation(),this._config?.double_tap_action&&this._handleAction(this._config.double_tap_action)}_handleAction(t){if(!this.hass||!this._config)return;const e=this._config.entity;switch(t.action){case"toggle":e&&this.hass.callService("homeassistant","toggle",{entity_id:e});break;case"more-info":if(e){const t=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});this.dispatchEvent(t)}break;case"navigate":if(t.navigation_path){window.history.pushState(null,"",t.navigation_path);const e=new CustomEvent("location-changed",{bubbles:!0,composed:!0});window.dispatchEvent(e)}break;case"url":t.url_path&&window.open(t.url_path,"_blank");break;case"perform-action":if(t.service){const[e,i]=t.service.split(".");this.hass.callService(e,i,t.service_data||{})}break;case"assist":const i=new CustomEvent("hass-assist",{bubbles:!0,composed:!0});this.dispatchEvent(i)}}};Lt.styles=It,t([mt({attribute:!1}),e("design:type",Object)],Lt.prototype,"hass",void 0),t([ft(),e("design:type",Object)],Lt.prototype,"_config",void 0),Lt=t([ht(xt)],Lt),window.customCards=window.customCards||[],window.customCards.push({type:xt,name:bt.split("-").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" "),description:"A comprehensive room status card for Home Assistant with support for climate, persistent, and intermittent entities."});export{Lt as UnifiedRoomCard};
