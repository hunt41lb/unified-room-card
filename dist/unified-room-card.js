function t(t,e,i,s){var a,n=arguments.length,o=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(a=t[r])&&(o=(n<3?a(o):n>3?a(e,i,o):a(e,i))||o);return n>3&&o&&Object.defineProperty(e,i,o),o}function e(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)}"function"==typeof SuppressedError&&SuppressedError;const i=globalThis,s=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),n=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const r=t=>new o("string"==typeof t?t:t+"",void 0,a),c=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,a)},l=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return r(e)})(t):t,{is:d,defineProperty:h,getOwnPropertyDescriptor:u,getOwnPropertyNames:p,getOwnPropertySymbols:m,getPrototypeOf:g}=Object,f=globalThis,v=f.trustedTypes,_=v?v.emptyScript:"",y=f.reactiveElementPolyfillSupport,$=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},w=(t,e)=>!d(t,e),x={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let C=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=u(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);a?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...p(t),...m(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(s)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of e){const e=document.createElement("style"),a=i.litNonce;void 0!==a&&e.setAttribute("nonce",a),e.textContent=s.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=s;const n=a.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(void 0!==t){const n=this.constructor;if(!1===s&&(a=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??w)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==a||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[$("elementProperties")]=new Map,C[$("finalized")]=new Map,y?.({ReactiveElement:C}),(f.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,k=t=>t,S=A.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,P="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+I,U=`<${T}>`,j=document,z=()=>j.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,D=Array.isArray,R="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,H=/>/g,L=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),V=/'/g,B=/"/g,G=/^(?:script|style|textarea|title)$/i,W=(t,...e)=>({_$litType$:1,strings:t,values:e}),q=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),Q=new WeakMap,J=j.createTreeWalker(j,129);function Z(t,e){if(!D(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let a,n=2===e?"<svg>":3===e?"<math>":"",o=N;for(let e=0;e<i;e++){const i=t[e];let r,c,l=-1,d=0;for(;d<i.length&&(o.lastIndex=d,c=o.exec(i),null!==c);)d=o.lastIndex,o===N?"!--"===c[1]?o=M:void 0!==c[1]?o=H:void 0!==c[2]?(G.test(c[2])&&(a=RegExp("</"+c[2],"g")),o=L):void 0!==c[3]&&(o=L):o===L?">"===c[0]?(o=a??N,l=-1):void 0===c[1]?l=-2:(l=o.lastIndex-c[2].length,r=c[1],o=void 0===c[3]?L:'"'===c[3]?B:V):o===B||o===V?o=L:o===M||o===H?o=N:(o=L,a=void 0);const h=o===L&&t[e+1].startsWith("/>")?" ":"";n+=o===N?i+U:l>=0?(s.push(r),i.slice(0,l)+P+i.slice(l)+I+h):i+I+(-2===l?e:h)}return[Z(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Y{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,n=0;const o=t.length-1,r=this.parts,[c,l]=K(t,e);if(this.el=Y.createElement(c,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=J.nextNode())&&r.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(P)){const e=l[n++],i=s.getAttribute(t).split(I),o=/([.?@])?(.*)/.exec(e);r.push({type:1,index:a,name:o[2],strings:i,ctor:"."===o[1]?st:"?"===o[1]?at:"@"===o[1]?nt:it}),s.removeAttribute(t)}else t.startsWith(I)&&(r.push({type:6,index:a}),s.removeAttribute(t));if(G.test(s.tagName)){const t=s.textContent.split(I),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],z()),J.nextNode(),r.push({type:2,index:++a});s.append(t[e],z())}}}else if(8===s.nodeType)if(s.data===T)r.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(I,t+1));)r.push({type:7,index:a}),t+=I.length-1}a++}}static createElement(t,e){const i=j.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===q)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const n=O(e)?void 0:e._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),void 0===n?a=void 0:(a=new n(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=X(t,a._$AS(t,e.values),a,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??j).importNode(e,!0);J.currentNode=s;let a=J.nextNode(),n=0,o=0,r=i[0];for(;void 0!==r;){if(n===r.index){let e;2===r.type?e=new et(a,a.nextSibling,this,t):1===r.type?e=new r.ctor(a,r.name,r.strings,this,t):6===r.type&&(e=new ot(a,this,t)),this._$AV.push(e),r=i[++o]}n!==r?.index&&(a=J.nextNode(),n++)}return J.currentNode=j,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),O(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>D(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(j.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Q.get(t.strings);return void 0===e&&Q.set(t.strings,e=new Y(t)),e}k(t){D(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new et(this.O(z()),this.O(z()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(t,e=this,i,s){const a=this.strings;let n=!1;if(void 0===a)t=X(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==q,n&&(this._$AH=t);else{const s=t;let o,r;for(t=a[0],o=0;o<a.length-1;o++)r=X(this,s[i+o],e,o),r===q&&(r=this._$AH[o]),n||=!O(r)||r!==this._$AH[o],r===F?t=F:t!==F&&(t+=(r??"")+a[o+1]),this._$AH[o]=r}n&&!s&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class at extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class nt extends it{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??F)===q)return;const i=this._$AH,s=t===F&&i!==F||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==F&&(i===F||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const rt=A.litHtmlPolyfillSupport;rt?.(Y,et),(A.litHtmlVersions??=[]).push("3.3.2");const ct=globalThis;let lt=class extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new et(e.insertBefore(z(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}};lt._$litElement$=!0,lt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:lt});const dt=ct.litElementPolyfillSupport;dt?.({LitElement:lt}),(ct.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ut={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:w},pt=(t=ut,e,i)=>{const{kind:s,metadata:a}=i;let n=globalThis.litPropertyMetadata.get(a);if(void 0===n&&globalThis.litPropertyMetadata.set(a,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,a,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const a=this[s];e.call(this,i),this.requestUpdate(s,a,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function mt(t){return(e,i)=>"object"==typeof i?pt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function gt(t){return mt({...t,state:!0,attribute:!1})}const ft=t=>(...e)=>({_$litDirective$:t,values:e});let vt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const _t=ft(class extends vt{constructor(t){if(super(t),1!==t.type||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const s=!!e[t];s===this.st.has(t)||this.nt?.has(t)||(s?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return q}}),yt="important",$t=" !"+yt,bt=ft(class extends vt{constructor(t){if(super(t),1!==t.type||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const s=t[i];return null==s?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const s=e[t];if(null!=s){this.ft.add(t);const e="string"==typeof s&&s.endsWith($t);t.includes("-")||e?i.setProperty(t,e?s.slice(0,-11):s,e?yt:""):i[t]=s}}return q}}),wt="unified-room-card",xt="unified-room-card",Ct="unified-room-card-editor",At="35px",kt="on",St="unlocked",Et="open",Pt="home",It="heating",Tt="cooling",Ut="left",jt="center",zt="right",Ot=[{value:Ut,label:"Left"},{value:jt,label:"Center"},{value:zt,label:"Right"}],Dt="top",Rt="center",Nt="bottom",Mt=[{value:Dt,label:"Top"},{value:Rt,label:"Center"},{value:Nt,label:"Bottom"}],Ht=[{value:"",label:"Default (auto)",category:"Default"},{value:"var(--primary-color)",label:"Primary",category:"Theme"},{value:"var(--accent-color)",label:"Accent",category:"Theme"},{value:"var(--primary-text-color)",label:"Primary Text",category:"Theme"},{value:"var(--secondary-text-color)",label:"Secondary Text",category:"Theme"},{value:"var(--disabled-text-color)",label:"Disabled",category:"Theme"},{value:"var(--success-color)",label:"Success (Green)",category:"Status"},{value:"var(--warning-color)",label:"Warning (Amber)",category:"Status"},{value:"var(--error-color)",label:"Error (Red)",category:"Status"},{value:"var(--info-color)",label:"Info (Blue)",category:"Status"},{value:"var(--amber-color)",label:"Amber",category:"Colors"},{value:"var(--blue-color)",label:"Blue",category:"Colors"},{value:"var(--green-color)",label:"Green",category:"Colors"},{value:"var(--red-color)",label:"Red",category:"Colors"},{value:"var(--orange-color)",label:"Orange",category:"Colors"},{value:"var(--cyan-color)",label:"Cyan",category:"Colors"},{value:"var(--purple-color)",label:"Purple",category:"Colors"},{value:"var(--pink-color)",label:"Pink",category:"Colors"},{value:"var(--yellow-color)",label:"Yellow",category:"Colors"},{value:"var(--state-binary_sensor-active-color)",label:"Binary Sensor Active",category:"Binary Sensor"},{value:"var(--state-binary_sensor-inactive-color)",label:"Binary Sensor Inactive",category:"Binary Sensor"},{value:"var(--state-lock-locked-color)",label:"Lock Locked",category:"Lock"},{value:"var(--state-lock-unlocked-color)",label:"Lock Unlocked",category:"Lock"},{value:"var(--state-lock-jammed-color)",label:"Lock Jammed",category:"Lock"},{value:"var(--state-lock-pending-color)",label:"Lock Pending",category:"Lock"},{value:"var(--state-light-active-color)",label:"Light Active",category:"Light"},{value:"var(--state-light-inactive-color)",label:"Light Inactive",category:"Light"},{value:"var(--state-switch-active-color)",label:"Switch Active",category:"Switch"},{value:"var(--state-switch-inactive-color)",label:"Switch Inactive",category:"Switch"},{value:"var(--state-cover-open-color)",label:"Cover Open",category:"Cover"},{value:"var(--state-cover-closed-color)",label:"Cover Closed",category:"Cover"},{value:"var(--state-climate-heat-color)",label:"Climate Heat",category:"Climate"},{value:"var(--state-climate-cool-color)",label:"Climate Cool",category:"Climate"},{value:"var(--state-climate-idle-color)",label:"Climate Idle",category:"Climate"},{value:"var(--state-climate-fan_only-color)",label:"Climate Fan",category:"Climate"},{value:"var(--state-climate-dry-color)",label:"Climate Dry",category:"Climate"},{value:"var(--state-person-home-color)",label:"Person Home",category:"Presence"},{value:"var(--state-person-away-color)",label:"Person Away",category:"Presence"},{value:"var(--state-alarm-armed-color)",label:"Alarm Armed",category:"Alarm"},{value:"var(--state-alarm-disarmed-color)",label:"Alarm Disarmed",category:"Alarm"},{value:"var(--state-alarm-triggered-color)",label:"Alarm Triggered",category:"Alarm"},{value:"var(--state-alarm-pending-color)",label:"Alarm Pending",category:"Alarm"},{value:"var(--state-active-color)",label:"Active (Generic)",category:"Generic"},{value:"var(--state-inactive-color)",label:"Inactive (Generic)",category:"Generic"},{value:"custom",label:"↳ Custom CSS...",category:"Custom"}],Lt="light",Vt="switch",Bt="climate",Gt="lock",Wt="cover",qt="fan",Ft="binary_sensor",Qt="sensor",Jt="media_player",Zt="vacuum",Kt="scene",Yt="script",Xt="automation",te="input_boolean",ee={[Lt]:["on"],[Vt]:["on"],[Bt]:["cooling","heating","drying","fan_only","heat_cool","auto"],[Gt]:["unlocked","unlocking","locking","open","opening"],[Wt]:["open","opening"],[qt]:["on"],[Ft]:["on"],[Jt]:["playing","paused","buffering","on"],[Zt]:["cleaning","returning"],[te]:["on"]},ie={[Lt]:"mdi:lightbulb",[Vt]:"mdi:toggle-switch",[Bt]:"mdi:thermostat",[Gt]:"mdi:lock",[Wt]:"mdi:window-shutter",[qt]:"mdi:fan",[Ft]:"mdi:checkbox-blank-circle",[Qt]:"mdi:eye",[Jt]:"mdi:cast",[Zt]:"mdi:robot-vacuum",[Kt]:"mdi:palette",[Yt]:"mdi:script",[Xt]:"mdi:robot",[te]:"mdi:toggle-switch"},se={[Gt]:{locked:"mdi:lock",unlocked:"mdi:lock-open",jammed:"mdi:lock-alert",locking:"mdi:lock-clock",unlocking:"mdi:lock-clock",open:"mdi:lock-open-variant",opening:"mdi:lock-open-variant"},[Bt]:{off:"mdi:thermostat",idle:"mdi:thermostat",heating:"mdi:fire",cooling:"mdi:snowflake",drying:"mdi:water-percent",fan_only:"mdi:fan",auto:"mdi:thermostat-auto",heat_cool:"mdi:thermostat-auto"},[Wt]:{open:"mdi:window-shutter-open",closed:"mdi:window-shutter",opening:"mdi:window-shutter-open",closing:"mdi:window-shutter"}},ae={[Lt]:{on:"var(--state-light-active-color, var(--amber-color, #ffc107))",off:"var(--primary-text-color)"},[Gt]:{jammed:"var(--state-lock-jammed-color, #db4437)",locked:"var(--state-lock-locked-color, #43a047)",locking:"var(--state-lock-locking-color, #ffc107)",unlocked:"var(--state-lock-unlocked-color, #ffc107)",unlocking:"var(--state-lock-unlocking-color, #ffc107)",open:"var(--state-lock-open-color, #db4437)",opening:"var(--state-lock-opening-color, #ffc107)"},[Bt]:{heating:"var(--state-climate-heat-color, #ff8c00)",cooling:"var(--state-climate-cool-color, #2196f3)",drying:"var(--state-climate-dry-color, #8bc34a)",fan_only:"var(--state-climate-fan_only-color, #00bcd4)",auto:"var(--state-climate-auto-color, #9c27b0)",heat_cool:"var(--state-climate-auto-color, #9c27b0)",idle:"var(--primary-text-color)",off:"var(--primary-text-color)"},[Ft]:{on:"var(--state-binary_sensor-active-color, var(--amber-color, #ffc107))",off:"var(--primary-text-color)"},[Vt]:{on:"var(--state-switch-active-color, var(--amber-color, #ffc107))",off:"var(--primary-text-color)"},[Wt]:{open:"var(--state-cover-open-color, #ffc107)",opening:"var(--state-cover-open-color, #ffc107)",closed:"var(--state-cover-closed-color, #43a047)",closing:"var(--state-cover-closed-color, #43a047)"}},ne="var(--primary-color)",oe="var(--primary-text-color)",re="var(--secondary-text-color)",ce="var(--divider-color, #e0e0e0)",le=c`
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
    grid-template-areas: ${r('"icon icon icon icon" "climate climate status status"')};
    grid-template-columns: ${r("1fr 1fr 1fr 1fr")};
    grid-template-rows: ${r("1fr min-content")};
    height: ${r("97px")};
    width: ${r("auto")};
    padding: 6px;
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
    /* Position in row 1, spanning first 2 columns */
    grid-row: 1;
    grid-column: 1 / 3;
    justify-self: start;
    align-self: start;
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    color: ${r(oe)};
    padding: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    z-index: 1; /* Ensure name is above icon area */
  }
`}
  ${c`
  .icon-section {
    grid-area: icon;
    /* Position is set via inline styles for flexibility */
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${r(At)};
    height: ${r("35px")};
    transition: all 0.2s ease;
  }

  .icon-container.with-img-cell {
    width: ${r("50px")};
    height: ${r("50px")};
    border-radius: 100%;
    background: var(--secondary-background-color);
    transition: background 0.3s ease;
  }

  /* Active state background is applied dynamically via inline style for light color support */

  .icon-container ha-icon {
    --mdc-icon-size: ${r(At)};
    color: ${r(oe)};
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
    color: ${r(re)};
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
    justify-self: start;
    font-size: 30px;
    line-height: 30px;
    font-weight: 300;
    color: ${r(oe)};
    padding: 0 0 1px 14px;
  }

  .climate-primary {
    font-size: 18px;
  }

  .climate-secondary {
    display: inline;
  }

  .climate-value {
    font-size: 12px;
    font-weight: 400;
    opacity: 0.7;
  }

  .climate-divider {
    display: none;
  }
`}
  ${c`
  .status-section {
    grid-area: status;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    padding: 0 0 1px 2px;
    margin: 0 3px 0 0;
  }
`}
  ${c`
  .persistent-section {
    display: flex;
    align-items: center;
    /* padding, gap, and justify-self are set via inline styles for flexibility */
  }

  /* When using legacy grid with separate persistent area */
  .persistent-section.legacy-grid {
    grid-area: persistent;
  }

  .persistent-entity {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .persistent-entity:hover {
    transform: scale(1.1);
  }

  .persistent-entity:active {
    transform: scale(0.95);
  }

  .persistent-entity ha-icon {
    --mdc-icon-size: ${r("20px")};
    transition: color 0.3s ease;
  }
`}
  ${c`
  .intermittent-section {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
  }

  /* When using legacy grid with separate intermittent area */
  .intermittent-section.legacy-grid {
    grid-area: intermittent;
  }

  .intermittent-entity {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .intermittent-entity:hover {
    transform: scale(1.1);
  }

  .intermittent-entity:active {
    transform: scale(0.95);
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
    color: ${r(re)};
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
`,de=c`
  :host {
    display: block;
  }

  .editor-container {
    padding: 16px;
  }

  .accordion {
    border: 1px solid ${r(ce)};
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
    color: ${r(oe)};
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
    color: ${r(oe)};
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
    color: ${r(oe)};
  }

  .form-input {
    flex: 1;
  }

  .entity-list {
    border: 1px solid ${r(ce)};
    border-radius: 8px;
    overflow: hidden;
  }

  .entity-item {
    border-bottom: 1px solid ${r(ce)};
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
    border-top: 1px solid ${r(ce)};
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
    border: 1px dashed ${r(ce)};
    border-radius: 8px;
    cursor: pointer;
    color: ${r(re)};
    transition: all 0.2s ease;
    gap: 4px;
  }

  .add-entity-btn:hover {
    border-color: ${r(ne)};
    color: ${r(ne)};
  }

  .add-state-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    margin-top: 8px;
    border: 1px dashed ${r(ce)};
    border-radius: 4px;
    cursor: pointer;
    color: ${r(re)};
    transition: all 0.2s ease;
    font-size: 12px;
    gap: 4px;
  }

  .add-state-btn:hover {
    border-color: ${r(ne)};
    color: ${r(ne)};
  }

  .state-config-row {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 8px 0;
    flex-wrap: wrap;
  }

  .state-config-row > ha-textfield,
  .state-config-row > ha-selector {
    flex: 1;
    min-width: 100px;
  }

  .state-config-row > .color-select-wrapper {
    flex: 1.5;
    min-width: 150px;
  }

  .state-config-row > ha-icon {
    cursor: pointer;
    color: ${r(re)};
    flex-shrink: 0;
    margin-top: 12px;
  }

  .state-config-row > ha-icon:hover {
    color: var(--error-color, #db4437);
  }

  .color-select-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .color-select-wrapper ha-select {
    width: 100%;
  }

  .color-select-wrapper ha-textfield {
    width: 100%;
  }

  ha-textfield,
  ha-select,
  ha-selector {
    width: 100%;
  }

  ha-switch {
    --mdc-theme-secondary: ${r(ne)};
  }
`;function he(t){return t&&"none"!==t?`animation-${t}`:""}let ue=class extends lt{constructor(){super(...arguments),this._accordionState={main:!0,persistent:!1,intermittent:!1,climate:!1,power:!1,battery:!1,update:!1,grid:!1},this._persistentEntityExpanded=-1,this._customColorInputs=new Set}setConfig(t){this._config=t}render(){return this.hass&&this._config?W`
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
    `:F}_renderMainSection(){const t=this._accordionState.main;return W`
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
          <!-- Icon Position (Horizontal / Vertical) -->
          <div class="form-row-dual expand-inputs">
            <div class="form-item">
              <span class="form-label">Horizontal</span>
              <div class="form-input">
                <ha-select
                  .value=${this._config?.icon_horizontal_position||"right"}
                  @selected=${t=>this._valueChanged("icon_horizontal_position",t.target.value)}
                  @closed=${t=>t.stopPropagation()}
                >
                  ${Ot.map(t=>W`
                      <mwc-list-item .value=${t.value}>${t.label}</mwc-list-item>
                    `)}
                </ha-select>
              </div>
            </div>
            <div class="form-item">
              <span class="form-label">Vertical</span>
              <div class="form-input">
                <ha-select
                  .value=${this._config?.icon_vertical_position||"top"}
                  @selected=${t=>this._valueChanged("icon_vertical_position",t.target.value)}
                  @closed=${t=>t.stopPropagation()}
                >
                  ${Mt.map(t=>W`
                      <mwc-list-item .value=${t.value}>${t.label}</mwc-list-item>
                    `)}
                </ha-select>
              </div>
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
          <!-- Icon Size / Background Size (dual row) -->
          <div class="form-row-dual expand-inputs">
            <div class="form-item">
              <span class="form-label">Icon Size</span>
              <div class="form-input">
                <ha-textfield
                  .value=${this._config?.icon_size||""}
                  placeholder="35px"
                  @input=${t=>this._valueChanged("icon_size",t.target.value)}
                ></ha-textfield>
              </div>
            </div>
            <div class="form-item">
              <span class="form-label">Background Size</span>
              <div class="form-input">
                <ha-textfield
                  .value=${this._config?.img_cell_size||""}
                  placeholder="50px"
                  @input=${t=>this._valueChanged("img_cell_size",t.target.value)}
                ></ha-textfield>
              </div>
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
          <!-- Border Indicator Entity -->
          <div class="form-row">
            <span class="form-label">Border Entity</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{entity:{}}}
                .value=${this._config?.border_entity||""}
                @value-changed=${t=>this._valueChanged("border_entity",t.detail.value)}
              ></ha-selector>
            </div>
          </div>
          ${this._config?.border_entity?W`
          <div class="form-row-dual expand-inputs">
            <div class="form-item">
              <span class="form-label">Border Width</span>
              <div class="form-input">
                <ha-select
                  .value=${this._config?.border_width||"2px"}
                  @selected=${t=>this._valueChanged("border_width",t.target.value)}
                  @closed=${t=>t.stopPropagation()}
                >
                  <mwc-list-item value="1px">1px</mwc-list-item>
                  <mwc-list-item value="2px">2px</mwc-list-item>
                  <mwc-list-item value="3px">3px</mwc-list-item>
                  <mwc-list-item value="4px">4px</mwc-list-item>
                  <mwc-list-item value="5px">5px</mwc-list-item>
                </ha-select>
              </div>
            </div>
            <div class="form-item">
              <span class="form-label">Border Style</span>
              <div class="form-input">
                <ha-select
                  .value=${this._config?.border_style||"solid"}
                  @selected=${t=>this._valueChanged("border_style",t.target.value)}
                  @closed=${t=>t.stopPropagation()}
                >
                  <mwc-list-item value="solid">Solid</mwc-list-item>
                  <mwc-list-item value="dashed">Dashed</mwc-list-item>
                  <mwc-list-item value="dotted">Dotted</mwc-list-item>
                  <mwc-list-item value="double">Double</mwc-list-item>
                  <mwc-list-item value="groove">Groove</mwc-list-item>
                  <mwc-list-item value="ridge">Ridge</mwc-list-item>
                </ha-select>
              </div>
            </div>
          </div>
          `:""}
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
          ${"navigate"===this._config?.tap_action?.action?W`
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
          ${"url"===this._config?.tap_action?.action?W`
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
          ${"navigate"===this._config?.hold_action?.action?W`
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
          ${"url"===this._config?.hold_action?.action?W`
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
          ${"navigate"===this._config?.double_tap_action?.action?W`
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
          ${"url"===this._config?.double_tap_action?.action?W`
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
    `}_renderPersistentSection(){const t=this._accordionState.persistent,e=this._config?.persistent_entities||{},i=e.entities||[];return W`
      <div class="accordion">
        <div
          class="accordion-header ${t?"expanded":""}"
          @click=${()=>this._toggleAccordion("persistent")}
        >
          <span>Persistent Entities</span>
          <ha-icon .icon=${t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        <div class="accordion-content ${t?"expanded":""}">
          <!-- Position -->
          <div class="form-row">
            <span class="form-label">Position</span>
            <div class="form-input">
              <ha-select
                .value=${e.position||"right"}
                @selected=${t=>this._persistentValueChanged("position",t.target.value)}
                @closed=${t=>t.stopPropagation()}
              >
                <mwc-list-item value="left">Left</mwc-list-item>
                <mwc-list-item value="center">Center</mwc-list-item>
                <mwc-list-item value="right">Right</mwc-list-item>
              </ha-select>
            </div>
          </div>
          <!-- Default Icon Size -->
          <div class="form-row">
            <span class="form-label">Default Icon Size</span>
            <div class="form-input">
              <ha-textfield
                .value=${e.icon_size||""}
                placeholder="21px"
                @input=${t=>this._persistentValueChanged("icon_size",t.target.value)}
              ></ha-textfield>
            </div>
          </div>
          <!-- Padding & Gap -->
          <div class="form-row-dual expand-inputs">
            <div class="form-item">
              <span class="form-label">Padding</span>
              <div class="form-input">
                <ha-textfield
                  .value=${e.padding||""}
                  placeholder="Auto (based on position)"
                  @input=${t=>this._persistentValueChanged("padding",t.target.value)}
                ></ha-textfield>
              </div>
            </div>
            <div class="form-item">
              <span class="form-label">Margin</span>
              <div class="form-input">
                <ha-textfield
                  .value=${e.margin||""}
                  placeholder="Auto"
                  @input=${t=>this._persistentValueChanged("margin",t.target.value)}
                ></ha-textfield>
              </div>
            </div>
          </div>
          <!-- Gap -->
          <div class="form-row">
            <span class="form-label">Gap (between icons)</span>
            <div class="form-input">
              <ha-textfield
                .value=${e.gap||""}
                placeholder="4px"
                @input=${t=>this._persistentValueChanged("gap",t.target.value)}
              ></ha-textfield>
            </div>
          </div>
          <!-- Entities List -->
          <div class="form-row">
            <span class="form-label">Entities</span>
          </div>
          ${i.map((t,e)=>this._renderPersistentEntityConfig(t,e))}
          <div class="add-entity-btn" @click=${this._addPersistentEntity}>
            <ha-icon icon="mdi:plus"></ha-icon>
            <span>Add Entity</span>
          </div>
        </div>
      </div>
    `}_renderPersistentEntityConfig(t,e){return W`
      <div class="entity-row">
        <div class="entity-header" @click=${()=>this._togglePersistentEntityExpand(e)}>
          <span class="entity-name">${t.entity||"New Entity"}</span>
          <div class="entity-actions">
            <ha-icon icon="mdi:chevron-down"></ha-icon>
            <ha-icon icon="mdi:delete" @click=${t=>{t.stopPropagation(),this._removePersistentEntity(e)}}></ha-icon>
          </div>
        </div>
        <div class="entity-config ${this._persistentEntityExpanded===e?"expanded":""}">
          <!-- Entity Selector -->
          <div class="form-row">
            <span class="form-label">Entity</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{entity:{}}}
                .value=${t.entity||""}
                @value-changed=${t=>this._updatePersistentEntity(e,"entity",t.detail.value)}
              ></ha-selector>
            </div>
          </div>
          <!-- Default Icon -->
          <div class="form-row">
            <span class="form-label">Default Icon</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{icon:{}}}
                .value=${t.icon||""}
                @value-changed=${t=>this._updatePersistentEntity(e,"icon",t.detail.value)}
              ></ha-selector>
            </div>
          </div>
          <!-- Icon Size -->
          <div class="form-row">
            <span class="form-label">Icon Size</span>
            <div class="form-input">
              <ha-textfield
                .value=${t.icon_size||""}
                placeholder="Inherit from section"
                @input=${t=>this._updatePersistentEntity(e,"icon_size",t.target.value)}
              ></ha-textfield>
            </div>
          </div>
          <!-- State Configuration -->
          <div class="form-row">
            <span class="form-label">State-based Icons & Colors</span>
          </div>
          ${(t.states||[]).map((t,i)=>{const s=`${e}-${i}`,a=t.color||"",n=this._customColorInputs.has(s)||a&&!Ht.some(t=>t.value===a),o=n?"custom":a;return W`
              <div class="state-config-row">
                <ha-textfield
                  .value=${t.state||""}
                  placeholder="State (e.g., locked)"
                  @input=${t=>this._updatePersistentEntityState(e,i,"state",t.target.value)}
                  style="flex: 1;"
                ></ha-textfield>
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{icon:{}}}
                  .value=${t.icon||""}
                  @value-changed=${t=>this._updatePersistentEntityState(e,i,"icon",t.detail.value)}
                  style="flex: 1;"
                ></ha-selector>
                <div class="color-select-wrapper" style="flex: 1.5; display: flex; flex-direction: column; gap: 4px;">
                  <ha-select
                    .value=${o}
                    @selected=${t=>this._handleColorSelect(e,i,t.target.value)}
                    @closed=${t=>t.stopPropagation()}
                    style="width: 100%;"
                  >
                    ${this._renderColorOptions()}
                  </ha-select>
                  ${n?W`
                    <ha-textfield
                      .value=${a}
                      placeholder="CSS color value"
                      @input=${t=>this._updatePersistentEntityState(e,i,"color",t.target.value)}
                      style="width: 100%;"
                    ></ha-textfield>
                  `:F}
                </div>
                <ha-icon icon="mdi:delete" @click=${()=>this._removePersistentEntityState(e,i)}></ha-icon>
              </div>
            `})}
          <div class="add-state-btn" @click=${()=>this._addPersistentEntityState(e)}>
            <ha-icon icon="mdi:plus"></ha-icon>
            <span>Add State Config</span>
          </div>
        </div>
      </div>
    `}_renderIntermittentSection(){const t=this._accordionState.intermittent;return W`
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
    `}_renderClimateSection(){const t=this._accordionState.climate,e=this._config?.climate_entities||{};return W`
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
          <div class="form-row">
            <span class="form-label">Show Temperature Unit</span>
            <div class="form-input">
              <ha-switch
                .checked=${!1!==e.show_temperature_unit}
                @change=${t=>this._climateValueChanged("show_temperature_unit",t.target.checked)}
              ></ha-switch>
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
          <div class="form-row">
            <span class="form-label">Show Humidity Unit</span>
            <div class="form-input">
              <ha-switch
                .checked=${!1!==e.show_humidity_unit}
                @change=${t=>this._climateValueChanged("show_humidity_unit",t.target.checked)}
              ></ha-switch>
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
          <div class="form-row">
            <span class="form-label">Show Air Quality Unit</span>
            <div class="form-input">
              <ha-switch
                .checked=${!1!==e.show_air_quality_unit}
                @change=${t=>this._climateValueChanged("show_air_quality_unit",t.target.checked)}
              ></ha-switch>
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
          <div class="form-row">
            <span class="form-label">Show Illuminance Unit</span>
            <div class="form-input">
              <ha-switch
                .checked=${!1!==e.show_illuminance_unit}
                @change=${t=>this._climateValueChanged("show_illuminance_unit",t.target.checked)}
              ></ha-switch>
            </div>
          </div>
          <!-- Decimal Places -->
          <div class="form-row">
            <span class="form-label">Decimal Places</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{number:{min:0,max:3,mode:"box"}}}
                .value=${e.decimal_places??0}
                @value-changed=${t=>this._climateValueChanged("decimal_places",t.detail.value)}
              ></ha-selector>
            </div>
          </div>
        </div>
      </div>
    `}_renderPowerSection(){const t=this._accordionState.power,e=this._config?.power_entities||{};return W`
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
          <!-- Decimal Places -->
          <div class="form-row">
            <span class="form-label">Decimal Places</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{number:{min:0,max:3,mode:"box"}}}
                .value=${e.decimal_places??0}
                @value-changed=${t=>this._powerValueChanged("decimal_places",t.detail.value)}
              ></ha-selector>
            </div>
          </div>
          <!-- Show Unit -->
          <div class="form-row">
            <span class="form-label">Show Unit</span>
            <div class="form-input">
              <ha-switch
                .checked=${!1!==e.show_unit}
                @change=${t=>this._powerValueChanged("show_unit",t.target.checked)}
              ></ha-switch>
            </div>
          </div>
        </div>
      </div>
    `}_renderBatterySection(){const t=this._accordionState.battery;return W`
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
    `}_renderUpdateSection(){const t=this._accordionState.update;return W`
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
    `}_renderGridSection(){const t=this._accordionState.grid;return W`
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
    `}_toggleAccordion(t){this._accordionState={...this._accordionState,[t]:!this._accordionState[t]}}_valueChanged(t,e){if(!this._config)return;const i={...this._config,[t]:e};""!==e&&null!=e||delete i[t],this._config=i,this._dispatchConfigChanged()}_gridValueChanged(t,e){if(!this._config)return;const i={...this._config.grid}||{};e?i[t]=e:delete i[t],this._config={...this._config,grid:Object.keys(i).length>0?i:void 0},this._dispatchConfigChanged()}_tapActionChanged(t,e){if(!this._config)return;const i={...this._config,[t]:{action:e}};this._config=i,this._dispatchConfigChanged()}_tapActionDataChanged(t,e,i){if(!this._config)return;const s=this._config[t]||{action:"none"},a={...this._config,[t]:{...s,[e]:i||void 0}};i||delete a[t][e],this._config=a,this._dispatchConfigChanged()}_climateValueChanged(t,e){if(!this._config)return;const i={...this._config.climate_entities}||{};Array.isArray(e)&&0===e.length||""===e||null==e?delete i[t]:i[t]=e,this._config={...this._config,climate_entities:Object.keys(i).length>0?i:void 0},this._dispatchConfigChanged()}_powerValueChanged(t,e){if(!this._config)return;const i={...this._config.power_entities}||{};Array.isArray(e)&&0===e.length||""===e||null==e?delete i[t]:i[t]=e,this._config={...this._config,power_entities:Object.keys(i).length>0?i:void 0},this._dispatchConfigChanged()}_persistentValueChanged(t,e){if(!this._config)return;const i={...this._config.persistent_entities}||{};""===e||null==e?delete i[t]:i[t]=e,this._config={...this._config,persistent_entities:Object.keys(i).length>0?i:void 0},this._dispatchConfigChanged()}_togglePersistentEntityExpand(t){this._persistentEntityExpanded=this._persistentEntityExpanded===t?-1:t}_addPersistentEntity(){if(!this._config)return;const t={...this._config.persistent_entities}||{},e=[...t.entities||[]];e.push({entity:""}),t.entities=e,this._config={...this._config,persistent_entities:t},this._persistentEntityExpanded=e.length-1,this._dispatchConfigChanged()}_removePersistentEntity(t){if(!this._config)return;const e={...this._config.persistent_entities}||{},i=[...e.entities||[]];i.splice(t,1),e.entities=i.length>0?i:void 0,this._config={...this._config,persistent_entities:Object.keys(e).filter(t=>void 0!==e[t]).length>0?e:void 0},this._persistentEntityExpanded===t&&(this._persistentEntityExpanded=-1),this._dispatchConfigChanged()}_updatePersistentEntity(t,e,i){if(!this._config)return;const s={...this._config.persistent_entities}||{},a=[...s.entities||[]];a[t]&&(a[t][e]=i||void 0,i||delete a[t][e]),s.entities=a,this._config={...this._config,persistent_entities:s},this._dispatchConfigChanged()}_addPersistentEntityState(t){if(!this._config)return;const e={...this._config.persistent_entities}||{},i=[...e.entities||[]];if(i[t]){const e={...i[t]};e.states=[...e.states||[],{state:"",icon:"",color:""}],i[t]=e}e.entities=i,this._config={...this._config,persistent_entities:e},this._dispatchConfigChanged()}_removePersistentEntityState(t,e){if(!this._config)return;const i={...this._config.persistent_entities}||{},s=[...i.entities||[]];if(s[t]){const i={...s[t]},a=[...i.states||[]];a.splice(e,1),i.states=a.length>0?a:void 0,s[t]=i}i.entities=s,this._config={...this._config,persistent_entities:i},this._dispatchConfigChanged()}_updatePersistentEntityState(t,e,i,s){if(!this._config)return;const a={...this._config.persistent_entities}||{},n=[...a.entities||[]];if(n[t]){const a={...n[t]},o=[...a.states||[]];o[e]&&(o[e][i]=s||void 0,s||delete o[e][i]),a.states=o,n[t]=a}a.entities=n,this._config={...this._config,persistent_entities:a},this._dispatchConfigChanged()}_renderColorOptions(){const t=[];let e="";for(const i of Ht)i.category!==e&&(e=i.category,"Default"!==e&&t.push(W`
            <mwc-list-item disabled noninteractive style="font-weight: 500; opacity: 0.7; font-size: 12px; text-transform: uppercase;">
              ${e}
            </mwc-list-item>
          `)),t.push(W`
        <mwc-list-item value=${i.value}>${i.label}</mwc-list-item>
      `);return t}_handleColorSelect(t,e,i){const s=`${t}-${e}`;"custom"===i?this._customColorInputs=new Set([...this._customColorInputs,s]):(this._customColorInputs.delete(s),this._customColorInputs=new Set(this._customColorInputs),this._updatePersistentEntityState(t,e,"color",i))}_dispatchConfigChanged(){const t=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(t)}};ue.styles=de,t([mt({attribute:!1}),e("design:type",Object)],ue.prototype,"hass",void 0),t([gt(),e("design:type",Object)],ue.prototype,"_config",void 0),t([gt(),e("design:type",Object)],ue.prototype,"_accordionState",void 0),t([gt(),e("design:type",Number)],ue.prototype,"_persistentEntityExpanded",void 0),t([gt(),e("design:type",Set)],ue.prototype,"_customColorInputs",void 0),ue=t([ht(Ct)],ue),console.info(`%c ${wt.toUpperCase()} %c v1.0.9 `,"color: white; background: #3498db; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;","color: #3498db; background: #ecf0f1; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;");let pe=class extends lt{setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={show_name:!0,show_icon:!0,show_state:!1,show_img_cell:!0,animate_icon:!1,tap_action:{action:"toggle"},hold_action:{action:"none"},double_tap_action:{action:"more-info"},...t}}getCardSize(){return 2}static getConfigElement(){return document.createElement(Ct)}static getStubConfig(){return{type:`custom:${xt}`,name:"Room Name",entity:"",show_name:!0,show_icon:!0}}updated(t){super.updated(t),this._config?.grid_area?this.style.gridArea=this._config.grid_area:this.style.removeProperty("grid-area")}shouldUpdate(t){if(t.has("_config"))return!0;if(t.has("hass")&&this._config){const e=t.get("hass");return!e||this._hasRelevantStateChanged(e)}return!1}_hasRelevantStateChanged(t){if(!this._config||!this.hass)return!1;const e=[];if(this._config.entity&&e.push(this._config.entity),this._config.persistent_entities?.entities&&e.push(...this._config.persistent_entities.entities.map(t=>t.entity)),this._config.intermittent_entities?.entities&&e.push(...this._config.intermittent_entities.entities.map(t=>t.entity)),this._config.climate_entities){const t=this._config.climate_entities;t.primary_entity&&e.push(t.primary_entity),t.temperature_entities&&e.push(...t.temperature_entities),t.humidity_entities&&e.push(...t.humidity_entities),t.air_quality_entities&&e.push(...t.air_quality_entities),t.illuminance_entities&&e.push(...t.illuminance_entities)}this._config.power_entities?.entities&&e.push(...this._config.power_entities.entities),this._config.battery_entities?.entities&&e.push(...this._config.battery_entities.entities),this._config.update_entities?.entities&&e.push(...this._config.update_entities.entities);for(const i of e)if(t.states[i]!==this.hass.states[i])return!0;return!1}render(){if(!this._config||!this.hass)return F;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=!!t&&this._isEntityActive(t.entity_id,t.state,t.attributes),i={"state-on":e,"state-off":!e&&!!t},s=this._getBorderStyle(),a=function(t){const e=[];return t.cardHeight&&e.push(`height: ${t.cardHeight};`),t.cardWidth&&e.push(`width: ${t.cardWidth};`),t.gridTemplateAreas&&e.push(`grid-template-areas: ${t.gridTemplateAreas};`),t.gridTemplateColumns&&e.push(`grid-template-columns: ${t.gridTemplateColumns};`),t.gridTemplateRows&&e.push(`grid-template-rows: ${t.gridTemplateRows};`),t.backgroundGradient?e.push(`background: ${t.backgroundGradient};`):t.backgroundColor&&e.push(`background-color: ${t.backgroundColor};`),t.borderStyle&&e.push(`border: ${t.borderStyle};`),e.join(" ")}({cardHeight:this._config.card_height,cardWidth:this._config.card_width,gridTemplateAreas:this._config.grid?.template_areas,gridTemplateColumns:this._config.grid?.template_columns,gridTemplateRows:this._config.grid?.template_rows,backgroundColor:this._config.background_color,activeBackgroundColor:e?this._config.active_background_color:void 0,backgroundGradient:this._config.background_gradient,borderStyle:s}),n=this._usesLegacyGridAreas();return W`
      <ha-card
        class=${_t(i)}
        style=${a}
        @click=${this._handleTap}
        @contextmenu=${this._handleHold}
        @dblclick=${this._handleDoubleTap}
      >
        ${this._renderName()}
        ${this._renderIcon()}
        ${this._renderClimateSection()}
        ${n?W`
              ${this._renderPersistentEntities(!0)}
              ${this._renderIntermittentEntities(!0)}
            `:this._renderStatusSection()}
      </ha-card>
    `}_usesLegacyGridAreas(){const t=this._config?.grid?.template_areas;return!!t&&(t.includes("persistent")||t.includes("intermittent"))}_renderStatusSection(){const t=this._config?.persistent_entities?.entities?.length,e=this._config?.intermittent_entities?.entities?.length;return t||e?W`
      <div class="status-section">
        ${this._renderPersistentEntities(!1)}
        ${this._renderIntermittentEntities(!1)}
      </div>
    `:F}_getBorderStyle(){if(!this._config?.border_entity||!this.hass)return;const t=this.hass.states[this._config.border_entity];if(!t)return;const e=this._config.border_width||"2px",i=this._config.border_style||"solid",s=this._getBorderEntityColor(t);return s?`${e} ${i} ${s}`:void 0}_getBorderEntityColor(t){const e=this._getDomain(t.entity_id);if("climate"===e){const e=t.attributes.hvac_action;if(e)switch(e){case"heating":case"preheating":return"var(--state-climate-heat-color, #ff8c00)";case"cooling":return"var(--state-climate-cool-color, #2196f3)";case"drying":return"var(--state-climate-dry-color, #8bc34a)";case"fan":return"var(--state-climate-fan_only-color, #00bcd4)";default:return}}const i=ae[e];if(i&&i[t.state]){const e=i[t.state];if("var(--primary-text-color)"===e)return;return e}if("on"===t.state)return"var(--state-active-color, var(--amber-color, #ffc107))"}_renderName(){return this._config?.show_name&&this._config.name?W`
      <div class="name-section">
        ${this._config.name}
      </div>
    `:F}_renderIcon(){const t=this._config?.entity?this.hass?.states[this._config.entity]:void 0,e=!!t&&this._isEntityActive(t.entity_id,t.state,t.attributes),i=!1!==this._config?.show_icon,s=this._config?.show_img_cell??!0,a=this._config?.icon||this._getDefaultIcon(t),n=t?this._getDomain(t.entity_id):"",o={"icon-container":!0,"with-img-cell":s,active:e,[he(this._config?.animate_icon&&e?"pulse":void 0)]:!0},r={};if(s&&this._config?.img_cell_size&&(r.width=this._config.img_cell_size,r.height=this._config.img_cell_size),e&&s){const e=this._getEntityBackgroundColor(t);r["background-color"]=e,r.background=e}const c={};if(this._config?.icon_size&&(c["--mdc-icon-size"]=this._config.icon_size,s||(r.width=this._config.icon_size,r.height=this._config.icon_size)),e&&s)c.color="var(--text-primary-color, #fff)";else if(t&&e)if("light"===n)c.color=this._getLightIconColor(t);else if("climate"===n)c.color=this._getClimateIconColor(t);else{const e=this._getEntityStateColor(t);c.color=e||"var(--state-active-color, var(--amber-color, #ffc107))"}else if(t&&"climate"===n)c.color=this._getClimateIconColor(t);else if(t){const e=this._getEntityStateColor(t);e&&(c.color=e)}const l={};switch(this._config?.icon_horizontal_position||zt){case Ut:l["justify-self"]="start";break;case jt:l["justify-self"]="center";break;default:l["justify-self"]="end"}switch(this._config?.icon_vertical_position||Dt){case Dt:l["align-self"]="start";break;case Rt:l["align-self"]="center";break;case Nt:l["align-self"]="end"}return W`
      <div class="icon-section" style=${bt(l)}>
        ${this._config?.show_state&&t?W`<span class="state-text">${t.state}</span>`:F}
        <div class="icon-wrapper">
          ${i?W`
                <div 
                  class=${_t(o)}
                  style=${bt(r)}
                >
                  <ha-icon
                    .icon=${a}
                    style=${bt(c)}
                  ></ha-icon>
                </div>
              `:F}
        </div>
      </div>
    `}_getEntityBackgroundColor(t){if(!t)return"var(--state-active-color, rgba(255, 167, 38, 0.3))";const e=this._getDomain(t.entity_id);if("climate"===e)switch(t.attributes.hvac_action){case"heating":case"preheating":return"var(--state-climate-heat-color, #ff8c00)";case"cooling":return"var(--state-climate-cool-color, #2196f3)";case"drying":return"var(--state-climate-dry-color, #8bc34a)";case"fan":return"var(--state-climate-fan_only-color, #00bcd4)";default:return"var(--secondary-background-color)"}if("light"===e){const e=.3,i=t.attributes.rgb_color;if(i&&Array.isArray(i)&&3===i.length)return`rgba(${i[0]}, ${i[1]}, ${i[2]}, ${e})`;const s=t.attributes.hs_color,a=t.attributes.brightness;if(s&&Array.isArray(s)&&2===s.length){const t=this._hsToRgb(s[0],s[1],a);return`rgba(${t[0]}, ${t[1]}, ${t[2]}, ${e})`}return`rgba(255, 193, 7, ${e})`}if("lock"===e){const i=ae[e]?.[t.state];if(i)return i}return"rgba(255, 167, 38, 0.3)"}_getLightIconColor(t){const e=t.attributes.rgb_color;if(e&&Array.isArray(e)&&3===e.length)return`rgb(${e[0]}, ${e[1]}, ${e[2]})`;const i=t.attributes.hs_color,s=t.attributes.brightness;if(i&&Array.isArray(i)&&2===i.length){const t=this._hsToRgb(i[0],i[1],s);return`rgb(${t[0]}, ${t[1]}, ${t[2]})`}return"var(--state-light-active-color, var(--amber-color, #ffc107))"}_getClimateIconColor(t){switch(t.attributes.hvac_action){case"heating":case"preheating":return"var(--state-climate-heat-color, #ff8c00)";case"cooling":return"var(--state-climate-cool-color, #2196f3)";case"drying":return"var(--state-climate-dry-color, #8bc34a)";case"fan":return"var(--state-climate-fan_only-color, #00bcd4)";default:return"var(--primary-text-color)"}}_hsToRgb(t,e,i){const s=e/100,a=(i??255)/255*.5,n=(1-Math.abs(2*a-1))*s,o=n*(1-Math.abs(t/60%2-1)),r=a-n/2;let c=0,l=0,d=0;return t>=0&&t<60?(c=n,l=o,d=0):t>=60&&t<120?(c=o,l=n,d=0):t>=120&&t<180?(c=0,l=n,d=o):t>=180&&t<240?(c=0,l=o,d=n):t>=240&&t<300?(c=o,l=0,d=n):t>=300&&t<360&&(c=n,l=0,d=o),[Math.round(255*(c+r)),Math.round(255*(l+r)),Math.round(255*(d+r))]}_renderClimateSection(){if(!this._config?.climate_entities&&!this._config?.power_entities)return F;const t=this._config.climate_entities,e=this._config.power_entities,i=t?.decimal_places??0,s=e?.decimal_places??0,a=!1!==t?.show_temperature_unit,n=!1!==t?.show_humidity_unit,o=!1!==t?.show_air_quality_unit,r=!1!==t?.show_illuminance_unit,c=!1!==e?.show_unit,l=this._getTemperatureValue(t,i,a),d=this._getHumidityValue(t,i,n),h=this._getAirQualityValue(t,i,o),u=this._getIlluminanceValue(t,i,r),p=this._getPowerValue(e,s,c),m=[];return d&&m.push({label:"humidity",value:d}),h&&m.push({label:"air quality",value:h}),u&&m.push({label:"illuminance",value:u}),p&&m.push({label:"power",value:p}),W`
      <div class="climate-section">
        ${l?W`
          <span class="climate-primary">${l}</span>
        `:F}
        ${m.length>0?W`
          <div class="climate-secondary">
            ${m.map(t=>W`
              <span class="climate-value">${t.value}</span>
            `)}
          </div>
        `:F}
      </div>
    `}_getTemperatureValue(t,e=0,i=!0){if(!t||!this.hass)return null;if(t.primary_entity){const s=this.hass.states[t.primary_entity];if(s&&!this._isUnavailable(s)){const t=parseFloat(s.state);if(!isNaN(t)){const a=i&&s.attributes.unit_of_measurement||"°";return`${t.toFixed(e)}${a}`}}}if(t.temperature_entities&&t.temperature_entities.length>0){const s=this._calculateAverage(t.temperature_entities,e);if(null!==s.value){const t=i&&s.unit||"°";return`${s.value}${t}`}}return null}_getHumidityValue(t,e=0,i=!0){if(!t?.humidity_entities||0===t.humidity_entities.length||!this.hass)return null;const s=this._calculateAverage(t.humidity_entities,e);if(null!==s.value){const t=i?"%":"";return`${s.value}${t}`}return null}_getAirQualityValue(t,e=0,i=!0){if(!t?.air_quality_entities||0===t.air_quality_entities.length||!this.hass)return null;const s=this._calculateAverage(t.air_quality_entities,e);if(null!==s.value){const t=i&&s.unit?` ${s.unit}`:"";return`${s.value}${t}`}return null}_getIlluminanceValue(t,e=0,i=!0){if(!t?.illuminance_entities||0===t.illuminance_entities.length||!this.hass)return null;const s=this._calculateAverage(t.illuminance_entities,e);if(null!==s.value){const t=i?" lx":"";return`${s.value}${t}`}return null}_getPowerValue(t,e=0,i=!0){if(!t?.entities||0===t.entities.length||!this.hass)return null;let s=0,a=0;for(const e of t.entities){const t=this.hass.states[e];if(!t||this._isUnavailable(t))continue;const i=parseFloat(t.state);if(isNaN(i))continue;const n=t.attributes.unit_of_measurement,o=("string"==typeof n?n:"W").toLowerCase();s+="kw"===o?1e3*i:"mw"===o?1e6*i:"gw"===o?1e9*i:i,a++}if(0===a)return null;if(s>=1e3){const t=(s/1e3).toFixed(e);return i?`${t}kW`:t}const n=s.toFixed(e);return i?`${n}W`:n}_calculateAverage(t,e=1){if(!this.hass)return{value:null,unit:"",count:0};const i=[];let s="";for(const e of t){const t=this.hass.states[e];if(!t||this._isUnavailable(t))continue;const a=parseFloat(t.state);isNaN(a)||(i.push(a),!s&&t.attributes.unit_of_measurement&&(s=t.attributes.unit_of_measurement))}if(0===i.length)return{value:null,unit:"",count:0};const a=i.reduce((t,e)=>t+e,0)/i.length;return{value:parseFloat(a.toFixed(e)),unit:s,count:i.length}}_isUnavailable(t){return["unavailable","unknown"].includes(t.state)}_renderPersistentEntities(t=!1){if(!this._config?.persistent_entities?.entities?.length||!this.hass)return F;const e=this._config.persistent_entities,i=e.position||"right",s=e.icon_size||"21px",a={gap:e.gap||"4px"};if(t){if(e.padding)a.padding=e.padding;else switch(i){case"left":a.padding="0 0 1px 14px";break;case"center":a.padding="0 0 1px 0";break;default:a.padding="0 0 1px 2px",e.margin||(a.margin="0 3px 0 0")}switch(e.margin&&(a.margin=e.margin),i){case"left":a["justify-self"]="start";break;case"center":a["justify-self"]="center";break;default:a["justify-self"]="end"}}const n=e.entities||[];return W`
      <div class=${_t({"persistent-section":!0,"legacy-grid":t})} style=${bt(a)}>
        ${n.map(t=>this._renderPersistentEntity(t,s))}
      </div>
    `}_renderPersistentEntity(t,e){const i=this.hass?.states[t.entity],s=!i||this._isUnavailable(i),a=i?.state||"unavailable",n=t.entity.split(".")[0],o=t.states?.find(t=>t.state===a);let r=o?.icon||t.icon;!r&&i?.attributes.icon&&(r=i.attributes.icon),r||(r=this._getPersistentEntityDefaultIcon(n,a));let c=o?.color;c||(c=this._getPersistentEntityColor(n,a,s));const l=t.icon_size||e,d={width:l,height:l,color:c,"--mdc-icon-size":l};return W`
      <div 
        class="persistent-entity"
        @click=${e=>{e.stopPropagation(),t.tap_action?this._handlePersistentAction(t.tap_action,t.entity):this._fireMoreInfo(t.entity)}}
        @contextmenu=${e=>{e.stopPropagation(),e.preventDefault(),t.hold_action&&this._handlePersistentAction(t.hold_action,t.entity)}}
        title="${i?.attributes.friendly_name||t.entity}: ${a}"
      >
        <ha-icon
          .icon=${r}
          style=${bt(d)}
        ></ha-icon>
      </div>
    `}_getPersistentEntityDefaultIcon(t,e){if("lock"===t)switch(e){case"locked":return"mdi:lock";case"unlocked":return"mdi:lock-open";case"locking":case"unlocking":return"mdi:lock-clock";case"jammed":return"mdi:lock-alert";default:return"mdi:lock-question"}if("binary_sensor"===t)return"on"===e?"mdi:motion-sensor":"mdi:motion-sensor-off";if("cover"===t)switch(e){case"open":case"opening":return"mdi:door-open";case"closed":case"closing":return"mdi:door-closed";default:return"mdi:door"}return"switch"===t?"on"===e?"mdi:toggle-switch":"mdi:toggle-switch-off":"light"===t?"on"===e?"mdi:lightbulb":"mdi:lightbulb-off":"mdi:help-circle"}_getPersistentEntityColor(t,e,i){if(i)return"var(--disabled-text-color, #9e9e9e)";if("lock"===t)switch(e){case"locked":return"var(--state-lock-locked-color, #43a047)";case"unlocked":return"var(--state-lock-unlocked-color, #ffc107)";case"locking":return"var(--state-lock-locking-color, #ffc107)";case"unlocking":return"var(--state-lock-unlocking-color, #ffc107)";case"jammed":return"var(--state-lock-jammed-color, #db4437)";case"open":return"var(--state-lock-open-color, #db4437)";default:return"var(--primary-text-color)"}if("binary_sensor"===t)return"on"===e?"var(--state-binary_sensor-active-color, var(--amber-color, #ffc107))":"var(--primary-text-color)";if("cover"===t)switch(e){case"open":case"opening":return"var(--state-cover-open-color, #ffc107)";case"closed":case"closing":return"var(--state-cover-closed-color, #43a047)";default:return"var(--primary-text-color)"}return"switch"===t?"on"===e?"var(--state-switch-active-color, var(--amber-color, #ffc107))":"var(--primary-text-color)":"light"===t?"on"===e?"var(--state-light-active-color, var(--amber-color, #ffc107))":"var(--primary-text-color)":"on"===e||"home"===e||"open"===e?"var(--state-active-color, var(--amber-color, #ffc107))":"var(--primary-text-color)"}_handlePersistentAction(t,e){if(this.hass)switch(t.action){case"more-info":this._fireMoreInfo(e);break;case"toggle":this.hass.callService("homeassistant","toggle",{entity_id:e});break;case"navigate":t.navigation_path&&(window.history.pushState(null,"",t.navigation_path),window.dispatchEvent(new CustomEvent("location-changed",{bubbles:!0,composed:!0})));break;case"url":t.url_path&&window.open(t.url_path,"_blank");break;case"perform-action":if(t.service){const[e,i]=t.service.split(".");this.hass.callService(e,i,t.service_data||{})}}}_fireMoreInfo(t){const e=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}});this.dispatchEvent(e)}_renderIntermittentEntities(t=!1){return this._config?.intermittent_entities?.entities?.length?W`
      <div class=${_t({"intermittent-section":!0,"legacy-grid":t})}>
        <!-- Intermittent entities will be implemented in Phase 5 -->
      </div>
    `:F}_getDomain(t){return t.split(".")[0]}_isEntityActive(t,e,i){if(this._config?.active_states&&this._config.active_states.length>0)return this._config.active_states.includes(e);const s=this._getDomain(t);if("climate"===s&&i){const t=i.hvac_action;if(t)return["heating","cooling","drying","fan","preheating"].includes(t)}const a=ee[s];return a?a.includes(e):[kt,St,Et,Pt,It,Tt].includes(e)}_getDefaultIcon(t){if(!t)return"mdi:home";if(t.attributes.icon)return t.attributes.icon;const e=this._getDomain(t.entity_id);if("climate"===e){const e=t.attributes.hvac_action;if(e)switch(e){case"heating":case"preheating":return"mdi:fire";case"cooling":return"mdi:snowflake";case"drying":return"mdi:water-percent";case"fan":return"mdi:fan";default:return"mdi:thermostat"}}const i=se[e];return i&&i[t.state]?i[t.state]:ie[e]||"mdi:home"}_getEntityStateColor(t){if(!t)return;const e=this._getDomain(t.entity_id),i=ae[e];return i&&i[t.state]?i[t.state]:void 0}_handleTap(t){t.stopPropagation(),this._config?.tap_action&&this._handleAction(this._config.tap_action)}_handleHold(t){t.preventDefault(),t.stopPropagation(),this._config?.hold_action&&this._handleAction(this._config.hold_action)}_handleDoubleTap(t){t.stopPropagation(),this._config?.double_tap_action&&this._handleAction(this._config.double_tap_action)}_handleAction(t){if(!this.hass||!this._config)return;const e=this._config.entity;switch(t.action){case"toggle":e&&this.hass.callService("homeassistant","toggle",{entity_id:e});break;case"more-info":if(e){const t=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});this.dispatchEvent(t)}break;case"navigate":if(t.navigation_path){window.history.pushState(null,"",t.navigation_path);const e=new CustomEvent("location-changed",{bubbles:!0,composed:!0});window.dispatchEvent(e)}break;case"url":t.url_path&&window.open(t.url_path,"_blank");break;case"perform-action":if(t.service){const[e,i]=t.service.split(".");this.hass.callService(e,i,t.service_data||{})}break;case"assist":const i=new CustomEvent("hass-assist",{bubbles:!0,composed:!0});this.dispatchEvent(i)}}};pe.styles=le,t([mt({attribute:!1}),e("design:type",Object)],pe.prototype,"hass",void 0),t([gt(),e("design:type",Object)],pe.prototype,"_config",void 0),pe=t([ht(xt)],pe),window.customCards=window.customCards||[],window.customCards.push({type:xt,name:wt.split("-").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" "),description:"A comprehensive room status card for Home Assistant with support for climate, persistent, and intermittent entities."});export{pe as UnifiedRoomCard};
