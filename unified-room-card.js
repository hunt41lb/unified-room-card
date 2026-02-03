function t(t,e,i,a){var n,s=arguments.length,o=s<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,a);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(o=(s<3?n(o):s>3?n(e,i,o):n(e,i))||o);return s>3&&o&&Object.defineProperty(e,i,o),o}function e(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)}"function"==typeof SuppressedError&&SuppressedError;const i=globalThis,a=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),s=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(a&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const r=t=>new o("string"==typeof t?t:t+"",void 0,n),c=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,a)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[a+1],t[0]);return new o(i,t,n)},l=a?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return r(e)})(t):t,{is:d,defineProperty:h,getOwnPropertyDescriptor:p,getOwnPropertyNames:u,getOwnPropertySymbols:f,getPrototypeOf:m}=Object,g=globalThis,v=g.trustedTypes,_=v?v.emptyScript:"",b=g.reactiveElementPolyfillSupport,y=(t,e)=>t,w={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!d(t,e),x={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let C=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(t,i,e);void 0!==a&&h(this.prototype,t,a)}}static getPropertyDescriptor(t,e,i){const{get:a,set:n}=p(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:a,set(e){const s=a?.call(this);n?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...u(t),...f(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(a)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const a of e){const e=document.createElement("style"),n=i.litNonce;void 0!==n&&e.setAttribute("nonce",n),e.textContent=a.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),a=this.constructor._$Eu(t,i);if(void 0!==a&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:w).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(a):this.setAttribute(a,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,a=i._$Eh.get(t);if(void 0!==a&&this._$Em!==a){const t=i.getPropertyOptions(a),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this._$Em=a;const s=n.fromAttribute(e,t.type);this[a]=s??this._$Ej?.get(a)??s,this._$Em=null}}requestUpdate(t,e,i,a=!1,n){if(void 0!==t){const s=this.constructor;if(!1===a&&(n=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??$)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:a,wrapped:n},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==n||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===a&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,a=this[e];!0!==t||this._$AL.has(e)||void 0===a||this.C(e,void 0,i,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[y("elementProperties")]=new Map,C[y("finalized")]=new Map,b?.({ReactiveElement:C}),(g.reactiveElementVersions??=[]).push("2.1.2");const S=globalThis,k=t=>t,A=S.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,P="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+I,T=`<${z}>`,U=document,j=()=>U.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,B=Array.isArray,N="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,H=/>/g,L=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),V=/'/g,R=/"/g,G=/^(?:script|style|textarea|title)$/i,W=(t,...e)=>({_$litType$:1,strings:t,values:e}),q=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),Z=new WeakMap,J=U.createTreeWalker(U,129);function Q(t,e){if(!B(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,a=[];let n,s=2===e?"<svg>":3===e?"<math>":"",o=O;for(let e=0;e<i;e++){const i=t[e];let r,c,l=-1,d=0;for(;d<i.length&&(o.lastIndex=d,c=o.exec(i),null!==c);)d=o.lastIndex,o===O?"!--"===c[1]?o=D:void 0!==c[1]?o=H:void 0!==c[2]?(G.test(c[2])&&(n=RegExp("</"+c[2],"g")),o=L):void 0!==c[3]&&(o=L):o===L?">"===c[0]?(o=n??O,l=-1):void 0===c[1]?l=-2:(l=o.lastIndex-c[2].length,r=c[1],o=void 0===c[3]?L:'"'===c[3]?R:V):o===R||o===V?o=L:o===D||o===H?o=O:(o=L,n=void 0);const h=o===L&&t[e+1].startsWith("/>")?" ":"";s+=o===O?i+T:l>=0?(a.push(r),i.slice(0,l)+P+i.slice(l)+I+h):i+I+(-2===l?e:h)}return[Q(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),a]};class Y{constructor({strings:t,_$litType$:e},i){let a;this.parts=[];let n=0,s=0;const o=t.length-1,r=this.parts,[c,l]=K(t,e);if(this.el=Y.createElement(c,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(a=J.nextNode())&&r.length<o;){if(1===a.nodeType){if(a.hasAttributes())for(const t of a.getAttributeNames())if(t.endsWith(P)){const e=l[s++],i=a.getAttribute(t).split(I),o=/([.?@])?(.*)/.exec(e);r.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?at:"?"===o[1]?nt:"@"===o[1]?st:it}),a.removeAttribute(t)}else t.startsWith(I)&&(r.push({type:6,index:n}),a.removeAttribute(t));if(G.test(a.tagName)){const t=a.textContent.split(I),e=t.length-1;if(e>0){a.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)a.append(t[i],j()),J.nextNode(),r.push({type:2,index:++n});a.append(t[e],j())}}}else if(8===a.nodeType)if(a.data===z)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=a.data.indexOf(I,t+1));)r.push({type:7,index:n}),t+=I.length-1}n++}}static createElement(t,e){const i=U.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,a){if(e===q)return e;let n=void 0!==a?i._$Co?.[a]:i._$Cl;const s=M(e)?void 0:e._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),void 0===s?n=void 0:(n=new s(t),n._$AT(t,i,a)),void 0!==a?(i._$Co??=[])[a]=n:i._$Cl=n),void 0!==n&&(e=X(t,n._$AS(t,e.values),n,a)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,a=(t?.creationScope??U).importNode(e,!0);J.currentNode=a;let n=J.nextNode(),s=0,o=0,r=i[0];for(;void 0!==r;){if(s===r.index){let e;2===r.type?e=new et(n,n.nextSibling,this,t):1===r.type?e=new r.ctor(n,r.name,r.strings,this,t):6===r.type&&(e=new ot(n,this,t)),this._$AV.push(e),r=i[++o]}s!==r?.index&&(n=J.nextNode(),s++)}return J.currentNode=U,a}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,a){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),M(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>B(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,a="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(Q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(e);else{const t=new tt(a,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new Y(t)),e}k(t){B(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,a=0;for(const n of t)a===e.length?e.push(i=new et(this.O(j()),this.O(j()),this,this.options)):i=e[a],i._$AI(n),a++;a<e.length&&(this._$AR(i&&i._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,a,n){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(t,e=this,i,a){const n=this.strings;let s=!1;if(void 0===n)t=X(this,t,e,0),s=!M(t)||t!==this._$AH&&t!==q,s&&(this._$AH=t);else{const a=t;let o,r;for(t=n[0],o=0;o<n.length-1;o++)r=X(this,a[i+o],e,o),r===q&&(r=this._$AH[o]),s||=!M(r)||r!==this._$AH[o],r===F?t=F:t!==F&&(t+=(r??"")+n[o+1]),this._$AH[o]=r}s&&!a&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class at extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class nt extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class st extends it{constructor(t,e,i,a,n){super(t,e,i,a,n),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??F)===q)return;const i=this._$AH,a=t===F&&i!==F||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==F&&(i===F||a);a&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const rt=S.litHtmlPolyfillSupport;rt?.(Y,et),(S.litHtmlVersions??=[]).push("3.3.2");const ct=globalThis;let lt=class extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const a=i?.renderBefore??e;let n=a._$litPart$;if(void 0===n){const t=i?.renderBefore??null;a._$litPart$=n=new et(e.insertBefore(j(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}};lt._$litElement$=!0,lt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:lt});const dt=ct.litElementPolyfillSupport;dt?.({LitElement:lt}),(ct.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:$},ut=(t=pt,e,i)=>{const{kind:a,metadata:n}=i;let s=globalThis.litPropertyMetadata.get(n);if(void 0===s&&globalThis.litPropertyMetadata.set(n,s=new Map),"setter"===a&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),"accessor"===a){const{name:a}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(a,n,t,!0,i)},init(e){return void 0!==e&&this.C(a,void 0,t,e),e}}}if("setter"===a){const{name:a}=i;return function(i){const n=this[a];e.call(this,i),this.requestUpdate(a,n,t,!0,i)}}throw Error("Unsupported decorator location: "+a)};function ft(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const a=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),a?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function mt(t){return ft({...t,state:!0,attribute:!1})}const gt=t=>(...e)=>({_$litDirective$:t,values:e});let vt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const _t=gt(class extends vt{constructor(t){if(super(t),1!==t.type||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const a=!!e[t];a===this.st.has(t)||this.nt?.has(t)||(a?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return q}}),bt="important",yt=" !"+bt,wt=gt(class extends vt{constructor(t){if(super(t),1!==t.type||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const a=t[i];return null==a?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${a};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const a=e[t];if(null!=a){this.ft.add(t);const e="string"==typeof a&&a.endsWith(yt);t.includes("-")||e?i.setProperty(t,e?a.slice(0,-11):a,e?bt:""):i[t]=a}}return q}}),$t="Unified Room Card",xt="unified-room-card",Ct="unified-room-card-editor",St="35px",kt=[{value:"off",label:"Treat as Off",description:"Card appears inactive (default)"},{value:"on",label:"Treat as On",description:"Card appears active"},{value:"unavailable",label:"Show as Unavailable",description:"Shows custom unavailable styling"},{value:"custom",label:"Custom Styling",description:"Full control over appearance"}],At=[{value:"none",label:"None"},{value:"pulse",label:"Pulse"},{value:"glow",label:"Glow"},{value:"flash",label:"Flash"},{value:"spin",label:"Spin"}],Et="on",Pt="unlocked",It="open",zt="home",Tt="heating",Ut="cooling",jt="left",Mt="center",Bt="right",Nt=[{value:jt,label:"Left"},{value:Mt,label:"Center"},{value:Bt,label:"Right"}],Ot="top",Dt="center",Ht="bottom",Lt=[{value:Ot,label:"Top"},{value:Dt,label:"Center"},{value:Ht,label:"Bottom"}],Vt=[{value:"1px",label:"1px"},{value:"2px",label:"2px"},{value:"3px",label:"3px"},{value:"4px",label:"4px"},{value:"5px",label:"5px"}],Rt=[{value:"solid",label:"Solid"},{value:"dashed",label:"Dashed"},{value:"dotted",label:"Dotted"},{value:"double",label:"Double"},{value:"groove",label:"Groove"},{value:"ridge",label:"Ridge"}],Gt=[{value:"",label:"Default (auto)",category:"Default"},{value:"var(--primary-color)",label:"Primary",category:"Theme"},{value:"var(--accent-color)",label:"Accent",category:"Theme"},{value:"var(--primary-text-color)",label:"Primary Text",category:"Theme"},{value:"var(--secondary-text-color)",label:"Secondary Text",category:"Theme"},{value:"var(--disabled-text-color)",label:"Disabled",category:"Theme"},{value:"var(--success-color)",label:"Success (Green)",category:"Status"},{value:"var(--warning-color)",label:"Warning (Amber)",category:"Status"},{value:"var(--error-color)",label:"Error (Red)",category:"Status"},{value:"var(--info-color)",label:"Info (Blue)",category:"Status"},{value:"var(--amber-color)",label:"Amber",category:"Colors"},{value:"var(--blue-color)",label:"Blue",category:"Colors"},{value:"var(--green-color)",label:"Green",category:"Colors"},{value:"var(--red-color)",label:"Red",category:"Colors"},{value:"var(--orange-color)",label:"Orange",category:"Colors"},{value:"var(--cyan-color)",label:"Cyan",category:"Colors"},{value:"var(--purple-color)",label:"Purple",category:"Colors"},{value:"var(--pink-color)",label:"Pink",category:"Colors"},{value:"var(--yellow-color)",label:"Yellow",category:"Colors"},{value:"var(--state-binary_sensor-active-color)",label:"Binary Sensor Active",category:"Binary Sensor"},{value:"var(--state-binary_sensor-inactive-color)",label:"Binary Sensor Inactive",category:"Binary Sensor"},{value:"var(--state-lock-locked-color)",label:"Lock Locked",category:"Lock"},{value:"var(--state-lock-unlocked-color)",label:"Lock Unlocked",category:"Lock"},{value:"var(--state-lock-jammed-color)",label:"Lock Jammed",category:"Lock"},{value:"var(--state-lock-pending-color)",label:"Lock Pending",category:"Lock"},{value:"var(--state-light-active-color)",label:"Light Active",category:"Light"},{value:"var(--state-light-inactive-color)",label:"Light Inactive",category:"Light"},{value:"var(--state-switch-active-color)",label:"Switch Active",category:"Switch"},{value:"var(--state-switch-inactive-color)",label:"Switch Inactive",category:"Switch"},{value:"var(--state-cover-open-color)",label:"Cover Open",category:"Cover"},{value:"var(--state-cover-closed-color)",label:"Cover Closed",category:"Cover"},{value:"var(--state-climate-heat-color)",label:"Climate Heat",category:"Climate"},{value:"var(--state-climate-cool-color)",label:"Climate Cool",category:"Climate"},{value:"var(--state-climate-idle-color)",label:"Climate Idle",category:"Climate"},{value:"var(--state-climate-fan_only-color)",label:"Climate Fan",category:"Climate"},{value:"var(--state-climate-dry-color)",label:"Climate Dry",category:"Climate"},{value:"var(--state-person-home-color)",label:"Person Home",category:"Presence"},{value:"var(--state-person-away-color)",label:"Person Away",category:"Presence"},{value:"var(--state-alarm-armed-color)",label:"Alarm Armed",category:"Alarm"},{value:"var(--state-alarm-disarmed-color)",label:"Alarm Disarmed",category:"Alarm"},{value:"var(--state-alarm-triggered-color)",label:"Alarm Triggered",category:"Alarm"},{value:"var(--state-alarm-pending-color)",label:"Alarm Pending",category:"Alarm"},{value:"var(--state-active-color)",label:"Active (Generic)",category:"Generic"},{value:"var(--state-inactive-color)",label:"Inactive (Generic)",category:"Generic"},{value:"custom",label:"↳ Custom CSS...",category:"Custom"}],Wt="light",qt="switch",Ft="climate",Zt="lock",Jt="cover",Qt="fan",Kt="binary_sensor",Yt="sensor",Xt="media_player",te="vacuum",ee="scene",ie="script",ae="automation",ne="input_boolean",se={[Wt]:["on"],[qt]:["on"],[Ft]:["cooling","heating","drying","fan_only","heat_cool","auto"],[Zt]:["unlocked","unlocking","locking","open","opening"],[Jt]:["open","opening"],[Qt]:["on"],[Kt]:["on"],[Xt]:["playing","paused","buffering","on"],[te]:["cleaning","returning"],[ne]:["on"]},oe={[Wt]:"mdi:lightbulb",[qt]:"mdi:toggle-switch",[Ft]:"mdi:thermostat",[Zt]:"mdi:lock",[Jt]:"mdi:window-shutter",[Qt]:"mdi:fan",[Kt]:"mdi:checkbox-blank-circle",[Yt]:"mdi:eye",[Xt]:"mdi:cast",[te]:"mdi:robot-vacuum",[ee]:"mdi:palette",[ie]:"mdi:script",[ae]:"mdi:robot",[ne]:"mdi:toggle-switch"},re={[Zt]:{locked:"mdi:lock",unlocked:"mdi:lock-open",jammed:"mdi:lock-alert",locking:"mdi:lock-clock",unlocking:"mdi:lock-clock",open:"mdi:lock-open-variant",opening:"mdi:lock-open-variant"},[Ft]:{off:"mdi:thermostat",idle:"mdi:thermostat",heating:"mdi:fire",cooling:"mdi:snowflake",drying:"mdi:water-percent",fan_only:"mdi:fan",auto:"mdi:thermostat-auto",heat_cool:"mdi:thermostat-auto"},[Jt]:{open:"mdi:window-shutter-open",closed:"mdi:window-shutter",opening:"mdi:window-shutter-open",closing:"mdi:window-shutter"}},ce={[Wt]:{on:"var(--state-light-active-color, var(--amber-color, #ffc107))",off:"var(--primary-text-color)"},[Zt]:{jammed:"var(--state-lock-jammed-color, #db4437)",locked:"var(--state-lock-locked-color, #43a047)",locking:"var(--state-lock-locking-color, #ffc107)",unlocked:"var(--state-lock-unlocked-color, #ffc107)",unlocking:"var(--state-lock-unlocking-color, #ffc107)",open:"var(--state-lock-open-color, #db4437)",opening:"var(--state-lock-opening-color, #ffc107)"},[Ft]:{heating:"var(--state-climate-heat-color, #ff8c00)",cooling:"var(--state-climate-cool-color, #2196f3)",drying:"var(--state-climate-dry-color, #8bc34a)",fan_only:"var(--state-climate-fan_only-color, #00bcd4)",auto:"var(--state-climate-auto-color, #9c27b0)",heat_cool:"var(--state-climate-auto-color, #9c27b0)",idle:"var(--primary-text-color)",off:"var(--primary-text-color)"},[Kt]:{on:"var(--state-binary_sensor-active-color, var(--amber-color, #ffc107))",off:"var(--primary-text-color)"},[qt]:{on:"var(--state-switch-active-color, var(--amber-color, #ffc107))",off:"var(--primary-text-color)"},[Jt]:{open:"var(--state-cover-open-color, #ffc107)",opening:"var(--state-cover-open-color, #ffc107)",closed:"var(--state-cover-closed-color, #43a047)",closing:"var(--state-cover-closed-color, #43a047)"}},le={[Zt]:[{state:"locked",icon:"mdi:lock",color:"var(--state-lock-locked-color)"},{state:"unlocked",icon:"mdi:lock-open",color:"var(--state-lock-unlocked-color)"},{state:"jammed",icon:"mdi:lock-alert",color:"var(--state-lock-jammed-color)"},{state:"locking",icon:"mdi:lock-clock",color:"var(--state-lock-pending-color)"},{state:"unlocking",icon:"mdi:lock-clock",color:"var(--state-lock-pending-color)"}],[Kt]:[{state:"on",icon:"mdi:motion-sensor",color:"var(--state-binary_sensor-active-color)"},{state:"off",icon:"mdi:motion-sensor-off",color:"var(--primary-text-color)"}],[Jt]:[{state:"open",icon:"mdi:window-shutter-open",color:"var(--state-cover-open-color)"},{state:"closed",icon:"mdi:window-shutter",color:"var(--state-cover-closed-color)"},{state:"opening",icon:"mdi:window-shutter-open",color:"var(--warning-color)"},{state:"closing",icon:"mdi:window-shutter",color:"var(--warning-color)"}],[Wt]:[{state:"on",icon:"mdi:lightbulb",color:"var(--state-light-active-color)"},{state:"off",icon:"mdi:lightbulb-off",color:"var(--primary-text-color)"}],[qt]:[{state:"on",icon:"mdi:toggle-switch",color:"var(--state-switch-active-color)"},{state:"off",icon:"mdi:toggle-switch-off",color:"var(--primary-text-color)"}],[Qt]:[{state:"on",icon:"mdi:fan",color:"var(--state-active-color)"},{state:"off",icon:"mdi:fan-off",color:"var(--primary-text-color)"}],[Ft]:[{state:"heating",icon:"mdi:fire",color:"var(--state-climate-heat-color)"},{state:"cooling",icon:"mdi:snowflake",color:"var(--state-climate-cool-color)"},{state:"idle",icon:"mdi:thermostat",color:"var(--primary-text-color)"},{state:"off",icon:"mdi:thermostat-off",color:"var(--disabled-text-color)"}],[ne]:[{state:"on",icon:"mdi:toggle-switch",color:"var(--state-active-color)"},{state:"off",icon:"mdi:toggle-switch-off",color:"var(--primary-text-color)"}]},de=Object.keys(le),he="20px",pe="12px",ue="top-right",fe="top-left",me="bottom-right",ge="bottom-left",ve=ue,_e=[{value:ue,label:"Top Right"},{value:fe,label:"Top Left"},{value:me,label:"Bottom Right"},{value:ge,label:"Bottom Left"}],be="var(--primary-color)",ye="var(--primary-text-color)",we="var(--secondary-text-color)",$e="var(--divider-color, #e0e0e0)",xe=c`
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

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* Card Glow Animations */
  @keyframes card-glow-pulse {
    0%, 100% {
      box-shadow: 0 0 var(--glow-spread, 4px) var(--glow-spread, 4px) var(--glow-color, transparent);
    }
    50% {
      box-shadow: 0 0 calc(var(--glow-spread, 4px) * 2) calc(var(--glow-spread, 4px) * 2) var(--glow-color, transparent);
    }
  }

  @keyframes card-glow-breathe {
    0%, 100% {
      box-shadow: 0 0 var(--glow-spread, 4px) var(--glow-spread, 4px) var(--glow-color, transparent);
    }
    50% {
      box-shadow: 0 0 var(--glow-spread, 4px) var(--glow-spread, 4px) transparent;
    }
  }
`,Ce=c`
  .animation-pulse {
    animation: pulse 2s ease-in-out infinite;
  }

  .animation-glow {
    animation: glow 2s ease-in-out infinite;
  }

  .animation-flash {
    animation: flash 1s ease-in-out infinite;
  }

  .animation-spin {
    animation: spin var(--spin-duration, 2s) linear infinite;
  }
`,Se=c`
  /* Static card glow - applied via inline style with --glow-color and --glow-spread */
  .card-glow {
    box-shadow: 0 0 var(--glow-spread, 4px) var(--glow-spread, 4px) var(--glow-color, transparent);
  }

  /* Animated card glow */
  .card-glow-pulse {
    animation: card-glow-pulse 2s ease-in-out infinite;
  }

  .card-glow-breathe {
    animation: card-glow-breathe 2s ease-in-out infinite;
  }
`,ke=c`
  :host {
    display: block;
  }

  ha-card {
    display: grid;
    grid-template-areas: ${r('"name name icon icon" "climate climate status status"')};
    grid-template-columns: ${r("1fr 1fr 1fr 1fr")};
    grid-template-rows: ${r("1fr min-content")};
    height: ${r("97px")};
    width: ${r("auto")};
    padding: 6px;
    box-sizing: border-box;
    cursor: pointer;
    overflow: visible;
    background: ${r("var(--ha-card-background, var(--card-background-color, white))")};
    border-radius: ${r("var(--ha-card-border-radius, 12px)")};
    transition: background-color 0.3s ease, opacity 0.3s ease, transform 0.15s ease;
  }

  /* Hover effect */
  ha-card:hover {
    transform: scale(1.02);
  }

  /* Active/pressed effect */
  ha-card:active {
    transform: scale(0.98);
    transition: transform 0.05s ease;
  }

  ha-card.state-on {
    background-color: var(--card-background-color);
  }

  ha-card.state-off {
    background-color: color-mix(in srgb, var(--card-background-color) 50%, transparent);
  }

  /* NEW: Unavailable state styling */
  ha-card.state-unavailable {
    background-color: color-mix(in srgb, var(--card-background-color) 40%, transparent);
  }
`,Ae=c`
  .name-section {
    /* Position in row 1, spanning first 2 columns */
    grid-area: name;
    justify-self: start;
    align-self: start;
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    color: ${r(ye)};
    padding: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    z-index: 1; /* Ensure name is above icon area */
  }
`,Ee=c`
  .icon-section {
    grid-area: icon;
    /* Position is set via inline styles for flexibility */
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative; /* NEW: For unavailable badge positioning */
    transition: opacity 0.3s ease; /* NEW: For unavailable opacity transition */
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${r(St)};
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
    --mdc-icon-size: ${r(St)};
    color: ${r(ye)};
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
    color: ${r(we)};
    text-transform: capitalize;
    white-space: nowrap;
  }

  /* When icon is hidden, keep the section but hide content */
  .icon-section.hidden {
    visibility: hidden;
  }
`,Pe=c`
  .climate-section {
    grid-area: climate;
    justify-self: start;
    font-size: 30px;
    line-height: 30px;
    font-weight: 300;
    color: ${r(ye)};
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
`,Ie=c`
  .status-section {
    grid-area: status;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    padding: 0 0 1px 2px;
    margin: 0 3px 0 0;
  }
`,ze=c`
  @keyframes spin-once {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .update-icon.spin-animation {
    animation: spin-once 1s ease-in-out;
  }

  .update-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    background: var(--error-color, #db4437);
    color: white;
    font-size: 9px;
    font-weight: 600;
    min-width: 14px;
    height: 14px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 3px;
  }

  .intermittent-entity {
    position: relative;
  }
`,Te=c`
  /* Base alert badge styles - positioned absolute to card */
  .alert-badge {
    position: absolute;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .alert-badge:hover {
    transform: scale(1.1);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  }

  .alert-badge:active {
    transform: scale(0.95);
  }

  .alert-badge ha-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Spin animation for update badge icon */
  .alert-badge .update-icon.spin-animation {
    animation: spin-once 1s ease-in-out;
  }
`,Ue=c`
  ${xe}
  ${Ce}
  ${Se}
  ${ke}
  ${Ae}
  ${c`
  .label-section {
    grid-area: label;
    justify-self: start;
    align-self: center;
    text-align: left;
    font-size: 12px;
    font-weight: 400;
    color: ${r(we)};
    padding: 0 14px 8px 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`}
  ${Ee}
  ${c`
  .state-section {
    grid-area: state;
    justify-self: end;
    align-self: center;
    font-size: 12px;
    font-weight: 500;
    color: ${r(we)};
    text-transform: capitalize;
    white-space: nowrap;
    padding: 0 14px 8px 0;
  }
`}
  ${Pe}
  ${Ie}
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
  .battery-section {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
  }

  .battery-section.legacy-grid {
    grid-area: battery;
  }
`}
  ${c`
  .update-section {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
  }

  .update-section.legacy-grid {
    grid-area: update;
  }
`}
  ${c`
  .overflow-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 600;
    color: ${r(we)};
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

  /* NEW: Unavailable badge indicator */
  .unavailable-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 16px;
    height: 16px;
    background: var(--error-color, #db4437);
    color: white;
    border-radius: 50%;
    font-size: 10px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }
`}
  ${ze}
  ${Te}
`,je=c`
  :host {
    display: block;
  }

  .editor-container {
    padding: 16px;
  }

  .accordion {
    border: 1px solid ${r($e)};
    border-radius: 8px;
    margin-bottom: 8px;
    overflow: visible;
  }

  .accordion-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: rgba(0, 0, 0, 0.03);
    cursor: pointer;
    font-weight: 500;
    color: ${r(ye)};
    transition: background 0.2s ease;
    border-radius: 8px 8px 0 0;
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
    overflow: visible;
  }

  /* Sub-accordion styles (nested within main accordions) */
  .sub-accordion {
    border: 1px solid ${r($e)};
    border-radius: 6px;
    margin-bottom: 12px;
    margin-left: 8px;
    background: rgba(0, 0, 0, 0.01);
    overflow: visible;
  }

  .sub-accordion:last-child {
    margin-bottom: 0;
  }

  .sub-accordion-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: rgba(0, 0, 0, 0.02);
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    color: ${r(ye)};
    transition: background 0.2s ease;
    border-radius: 6px 6px 0 0;
  }

  .sub-accordion-header:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  .sub-accordion-header ha-icon {
    transition: transform 0.2s ease;
    --mdc-icon-size: 18px;
  }

  .sub-accordion-header.expanded ha-icon {
    transform: rotate(180deg);
  }

  .sub-accordion-content {
    padding: 12px 14px;
    display: none;
    background: rgba(255, 255, 255, 0.02);
  }

  .sub-accordion-content.expanded {
    display: block;
    overflow: visible;
  }

  /* Ensure ha-select dropdowns can extend beyond containers */
  ha-select {
    --mdc-menu-max-height: 300px;
    --mdc-menu-min-width: 200px;
  }

  /* Fix mwc-menu positioning to use fixed positioning */
  mwc-menu {
    --mdc-menu-z-index: 100;
  }

  .section-description {
    font-size: 12px;
    color: ${r(we)};
    margin: 0 0 16px 0;
    font-style: italic;
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
    color: ${r(ye)};
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
    color: ${r(ye)};
  }

  .form-input {
    flex: 1;
  }

  /* Inline form row - text field with toggle on same row */
  .form-row-inline {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    gap: 12px;
  }

  .form-row-inline:last-child {
    margin-bottom: 0;
  }

  .form-row-inline .form-label {
    flex: 0 0 auto;
  }

  .form-row-inline .form-input {
    flex: 1;
  }

  .form-row-inline .form-toggle {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: ${r(we)};
  }

  /* Helper text style */
  .helper-text {
    font-size: 11px;
    color: ${r(we)};
    margin: -8px 0 12px 0;
    padding-left: 140px;
    font-style: italic;
  }

  .entity-list {
    border: 1px solid ${r($e)};
    border-radius: 8px;
    overflow: hidden;
  }

  .entity-item {
    border-bottom: 1px solid ${r($e)};
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
    border-top: 1px solid ${r($e)};
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
    border: 1px dashed ${r($e)};
    border-radius: 8px;
    cursor: pointer;
    color: ${r(we)};
    transition: all 0.2s ease;
    gap: 4px;
  }

  .add-entity-btn:hover {
    border-color: ${r(be)};
    color: ${r(be)};
  }

  .entity-list-item {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  .entity-list-item ha-selector {
    flex: 1;
  }

  .entity-list-item ha-icon {
    cursor: pointer;
    color: ${r(we)};
    transition: color 0.2s ease;
  }

  .entity-list-item ha-icon:hover {
    color: var(--error-color, #db4437);
  }

  .add-state-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    margin-top: 8px;
    border: 1px dashed ${r($e)};
    border-radius: 4px;
    cursor: pointer;
    color: ${r(we)};
    transition: all 0.2s ease;
    font-size: 12px;
    gap: 4px;
  }

  .add-state-btn:hover {
    border-color: ${r(be)};
    color: ${r(be)};
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
    color: ${r(we)};
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

  /* Color select with preview */
  .color-select-with-preview {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
  }

  .color-select-with-preview ha-select {
    flex: 1;
  }

  .color-preview {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    flex-shrink: 0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }

  /* Entity validation warning */
  .entity-name-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .entity-warning {
    color: var(--warning-color, #ffc107);
    --mdc-icon-size: 18px;
  }

  .validation-warning {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(255, 193, 7, 0.1);
    border: 1px solid var(--warning-color, #ffc107);
    border-radius: 4px;
    margin: 4px 0 8px 0;
    font-size: 12px;
    color: var(--warning-color, #ffc107);
  }

  .validation-warning ha-icon {
    --mdc-icon-size: 16px;
    flex-shrink: 0;
  }

  /* State header row with apply defaults button */
  .state-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .apply-defaults-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    background: transparent;
    border: 1px solid ${r(be)};
    border-radius: 4px;
    color: ${r(be)};
    font-size: 11px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .apply-defaults-btn:hover {
    background: ${r(be)};
    color: white;
  }

  .apply-defaults-btn ha-icon {
    --mdc-icon-size: 14px;
  }

  ha-textfield,
  ha-select,
  ha-selector {
    width: 100%;
  }

  ha-switch {
    --mdc-theme-secondary: ${r(be)};
  }

  /* Section divider and header */
  .section-divider {
    height: 1px;
    background: ${r($e)};
    margin: 16px 0;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    margin-bottom: 8px;
    color: ${r(ye)};
  }

  .section-header ha-icon {
    --mdc-icon-size: 18px;
    color: ${r(we)};
  }

  /* Glow Effects */
  .glow-effects-list {
    margin-bottom: 12px;
  }

  .glow-effect-config {
    border: 1px solid ${r($e)};
    border-radius: 6px;
    padding: 12px;
    margin-bottom: 12px;
    background: rgba(0, 0, 0, 0.01);
  }

  .glow-effect-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .glow-effect-title {
    font-weight: 500;
    font-size: 14px;
  }

  /* NEW: Add entity button styling (used in various sections) */
  .add-entity-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px 16px;
    margin-top: 12px;
    background: transparent;
    border: 1px dashed ${r($e)};
    border-radius: 8px;
    cursor: pointer;
    color: ${r(we)};
    font-size: 14px;
    transition: all 0.2s ease;
    width: 100%;
    box-sizing: border-box;
  }

  .add-entity-button:hover {
    border-color: ${r(be)};
    color: ${r(be)};
    background: rgba(var(--rgb-primary-color), 0.04);
  }

  .add-entity-button ha-icon {
    --mdc-icon-size: 18px;
  }
`;let Me=class extends lt{constructor(){super(...arguments),this._accordionState={main:!0,mainBasic:!0,mainIcon:!1,mainAppearance:!1,mainActions:!1,persistent:!1,intermittent:!1,climate:!1,power:!1,battery:!1,update:!1,grid:!1},this._persistentEntityExpanded=-1,this._intermittentEntityExpanded=-1,this._customColorInputs=new Set,this._intermittentCustomColorInputs=new Set,this._showUnavailableCustomColorInput=!1,this._iconStateMapCustomColors=new Set}setConfig(t){this._config=t}render(){return this.hass&&this._config?W`
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
          ${this._renderBasicSettingsSubSection()}
          ${this._renderIconSubSection()}
          ${this._renderAppearanceSubSection()}
          ${this._renderActionsSubSection()}
        </div>
      </div>
    `}_renderBasicSettingsSubSection(){const t=this._accordionState.mainBasic,e=this._config?.entity?this._config.entity.split(".")[0]:void 0;return W`
      <div class="sub-accordion">
        <div
          class="sub-accordion-header ${t?"expanded":""}"
          @click=${()=>this._toggleAccordion("mainBasic")}
        >
          <span>Basic Settings</span>
          <ha-icon .icon=${t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        <div class="sub-accordion-content ${t?"expanded":""}">
          <!-- Card Name with inline Show Name toggle -->
          <div class="form-row-inline">
            <span class="form-label">Name</span>
            <div class="form-input">
              <ha-textfield
                .value=${this._config?.name||""}
                placeholder="Room Name"
                @input=${t=>this._valueChanged("name",t.target.value)}
              ></ha-textfield>
            </div>
            <div class="form-toggle">
              <span>Show</span>
              <ha-switch
                .checked=${!1!==this._config?.show_name}
                @change=${t=>this._valueChanged("show_name",t.target.checked)}
              ></ha-switch>
            </div>
          </div>
          <!-- Label with inline Show Label toggle -->
          <div class="form-row-inline">
            <span class="form-label">Label</span>
            <div class="form-input">
              <ha-textfield
                .value=${this._config?.label||""}
                placeholder="e.g., Ground Floor"
                @input=${t=>this._valueChanged("label",t.target.value)}
              ></ha-textfield>
            </div>
            <div class="form-toggle">
              <span>Show</span>
              <ha-switch
                .checked=${this._config?.show_label||!1}
                @change=${t=>this._valueChanged("show_label",t.target.checked)}
              ></ha-switch>
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
          <!-- Additional Entities (same domain) -->
          ${e?W`
            <div class="form-row">
              <span class="form-label">Additional Entities</span>
              <div class="form-input">
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{entity:{domain:e,multiple:!0}}}
                  .value=${this._config?.entities||[]}
                  @value-changed=${t=>this._valueChanged("entities",t.detail.value)}
                ></ha-selector>
              </div>
            </div>
            <p class="helper-text">Group multiple ${e} entities - tap toggles all, colors are averaged</p>
          `:""}
          <!-- Show State -->
          <div class="form-row">
            <span class="form-label">Show State</span>
            <div class="form-input">
              <ha-switch
                .checked=${this._config?.show_state||!1}
                @change=${t=>this._valueChanged("show_state",t.target.checked)}
              ></ha-switch>
            </div>
          </div>

          <!-- Unavailable State Handling Section -->
          ${this._renderUnavailableHandlingSection()}
        </div>
      </div>
    `}_renderUnavailableHandlingSection(){if(!this._config?.entity)return W``;const t=this._config?.unavailable_handling||{behavior:"off"},e=t.behavior||"off",i="custom"===e||"unavailable"===e,a=t.icon_color||"",n=this._showUnavailableCustomColorInput||a&&!Gt.some(t=>t.value===a),s=n?"custom":a||"var(--disabled-text-color)";return W`
      <div class="section-divider"></div>
      <div class="section-header">
        <ha-icon icon="mdi:help-circle-outline"></ha-icon>
        <span>Unavailable State Handling</span>
      </div>
      <p class="helper-text">Configure how the card appears when the entity is unavailable or unknown</p>

      <!-- Behavior Selection -->
      <div class="form-row">
        <span class="form-label">When Unavailable</span>
        <div class="form-input">
          <ha-select
            .value=${e}
            @selected=${t=>this._updateUnavailableHandling("behavior",t.target.value)}
            @closed=${t=>t.stopPropagation()}
          >
            ${kt.map(t=>W`
                <mwc-list-item .value=${t.value}>${t.label}</mwc-list-item>
              `)}
          </ha-select>
        </div>
      </div>

      ${i?W`
        <!-- Custom Icon when Unavailable -->
        <div class="form-row">
          <span class="form-label">Custom Icon</span>
          <div class="form-input">
            <ha-selector
              .hass=${this.hass}
              .selector=${{icon:{}}}
              .value=${t.icon||""}
              @value-changed=${t=>this._updateUnavailableHandling("icon",t.detail.value)}
            ></ha-selector>
          </div>
        </div>
        <p class="helper-text">Icon to display when entity is unavailable (leave empty to use default icon)</p>

        <!-- Icon Color -->
        <div class="form-row">
          <span class="form-label">Icon Color</span>
          <div class="form-input">
            <ha-select
              .value=${s}
              @selected=${t=>{const e=t.target.value;"custom"===e?this._showUnavailableCustomColorInput=!0:(this._showUnavailableCustomColorInput=!1,this._updateUnavailableHandling("icon_color",e))}}
              @closed=${t=>t.stopPropagation()}
            >
              ${this._renderColorOptions()}
            </ha-select>
          </div>
        </div>
        ${n?W`
          <div class="form-row">
            <span class="form-label">Custom Color</span>
            <div class="form-input">
              <ha-textfield
                .value=${t.icon_color||""}
                placeholder="var(--disabled-text-color)"
                @input=${t=>this._updateUnavailableHandling("icon_color",t.target.value)}
              ></ha-textfield>
            </div>
          </div>
        `:""}

        <!-- Background Color -->
        <div class="form-row">
          <span class="form-label">Background Color</span>
          <div class="form-input">
            <ha-textfield
              .value=${t.background_color||""}
              placeholder="var(--secondary-background-color)"
              @input=${t=>this._updateUnavailableHandling("background_color",t.target.value)}
            ></ha-textfield>
          </div>
        </div>
        <p class="helper-text">CSS color or variable for icon background when unavailable</p>

        <!-- Opacity Slider -->
        <div class="form-row">
          <span class="form-label">Opacity</span>
          <div class="form-input">
            <ha-selector
              .hass=${this.hass}
              .selector=${{number:{min:0,max:1,step:.1,mode:"slider"}}}
              .value=${t.opacity??.5}
              @value-changed=${t=>this._updateUnavailableHandling("opacity",t.detail.value)}
            ></ha-selector>
          </div>
        </div>
        <p class="helper-text">Card opacity when entity is unavailable (0 = transparent, 1 = fully visible)</p>

        <!-- Show Badge Toggle -->
        <div class="form-row">
          <span class="form-label">Show Unavailable Badge</span>
          <div class="form-input">
            <ha-switch
              .checked=${t.show_badge||!1}
              @change=${t=>this._updateUnavailableHandling("show_badge",t.target.checked)}
            ></ha-switch>
          </div>
        </div>
        <p class="helper-text">Show a small indicator badge when entity is unavailable</p>
      `:""}
    `}_updateUnavailableHandling(t,e){if(!this._config)return;const i={...this._config.unavailable_handling||{behavior:"off"},[t]:e};"behavior"===t||""!==e&&null!=e||delete i[t];const a=Object.keys(i).some(t=>"behavior"!==t&&void 0!==i[t]);this._config={...this._config,unavailable_handling:"off"!==i.behavior||a?i:void 0},this._dispatchConfigChanged()}_renderIconSubSection(){const t=this._accordionState.mainIcon,e=!1!==this._config?.show_icon,i=!1!==this._config?.show_img_cell;return W`
      <div class="sub-accordion">
        <div
          class="sub-accordion-header ${t?"expanded":""}"
          @click=${()=>this._toggleAccordion("mainIcon")}
        >
          <span>Icon</span>
          <ha-icon .icon=${t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        <div class="sub-accordion-content ${t?"expanded":""}">
          <!-- Show Icon toggle -->
          <div class="form-row">
            <span class="form-label">Show Icon</span>
            <div class="form-input">
              <ha-switch
                .checked=${e}
                @change=${t=>this._valueChanged("show_icon",t.target.checked)}
              ></ha-switch>
            </div>
          </div>

          ${e?W`
            <!-- Icon selector -->
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
            <!-- Position dropdowns -->
            <div class="form-row-dual expand-inputs">
              <div class="form-item">
                <span class="form-label">Horizontal</span>
                <div class="form-input">
                  <ha-select
                    .value=${this._config?.icon_horizontal_position||"right"}
                    @selected=${t=>this._valueChanged("icon_horizontal_position",t.target.value)}
                    @closed=${t=>t.stopPropagation()}
                  >
                    ${Nt.map(t=>W`
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
                    ${Lt.map(t=>W`
                        <mwc-list-item .value=${t.value}>${t.label}</mwc-list-item>
                      `)}
                  </ha-select>
                </div>
              </div>
            </div>
            <!-- Icon Size -->
            <div class="form-row">
              <span class="form-label">Icon Size</span>
              <div class="form-input">
                <ha-textfield
                  .value=${this._config?.icon_size||""}
                  placeholder="35px"
                  @input=${t=>this._valueChanged("icon_size",t.target.value)}
                ></ha-textfield>
              </div>
            </div>
            <!-- Show Background toggle -->
            <div class="form-row">
              <span class="form-label">Show Background</span>
              <div class="form-input">
                <ha-switch
                  .checked=${i}
                  @change=${t=>this._valueChanged("show_img_cell",t.target.checked)}
                ></ha-switch>
              </div>
            </div>
            ${i?W`
              <!-- Background Size -->
              <div class="form-row">
                <span class="form-label">Background Size</span>
                <div class="form-input">
                  <ha-textfield
                    .value=${this._config?.img_cell_size||""}
                    placeholder="50px"
                    @input=${t=>this._valueChanged("img_cell_size",t.target.value)}
                  ></ha-textfield>
                </div>
              </div>
              <!-- Background Opacity -->
              <div class="form-row">
                <span class="form-label">Background Opacity</span>
                <div class="form-input">
                  <ha-selector
                    .hass=${this.hass}
                    .selector=${{number:{min:0,max:1,step:.1,mode:"slider"}}}
                    .value=${this._config?.icon_background_opacity??.3}
                    @value-changed=${t=>this._valueChanged("icon_background_opacity",t.detail.value)}
                  ></ha-selector>
                </div>
              </div>
              <p class="helper-text">Opacity of the icon background when entity is active</p>
            `:""}
            <!-- Animation dropdown -->
            <div class="form-row">
              <span class="form-label">Animation</span>
              <div class="form-input">
                <ha-select
                  .value=${this._config?.icon_animation||"none"}
                  @selected=${t=>this._valueChanged("icon_animation",t.target.value)}
                  @closed=${t=>t.stopPropagation()}
                >
                  ${At.map(t=>W`
                      <mwc-list-item .value=${t.value}>${t.label}</mwc-list-item>
                    `)}
                </ha-select>
              </div>
            </div>
            <!-- Spin Duration (only show when spin is selected) -->
            ${"spin"===this._config?.icon_animation?W`
              <div class="form-row">
                <span class="form-label">Spin Duration (sec)</span>
                <div class="form-input">
                  <ha-selector
                    .hass=${this.hass}
                    .selector=${{number:{min:1,max:120,step:1,mode:"box"}}}
                    .value=${this._config?.spin_duration??2}
                    @value-changed=${t=>this._valueChanged("spin_duration",t.detail.value)}
                  ></ha-selector>
                </div>
              </div>
              <p class="helper-text">Time for one complete 360° rotation (useful for timer visualization)</p>
            `:""}
            <!-- Icon State Map -->
            ${this._renderIconStateMapSection()}
          `:""}
        </div>
      </div>
    `}_renderAppearanceSubSection(){const t=this._accordionState.mainAppearance,e=!!this._config?.border_entity;return W`
      <div class="sub-accordion">
        <div
          class="sub-accordion-header ${t?"expanded":""}"
          @click=${()=>this._toggleAccordion("mainAppearance")}
        >
          <span>Card Appearance</span>
          <ha-icon .icon=${t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        <div class="sub-accordion-content ${t?"expanded":""}">
          <!-- Card Height / Width -->
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
          <!-- Border Entity -->
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
          <p class="helper-text">Border color changes based on this entity's state</p>

          ${e?W`
            <!-- Border Width / Style -->
            <div class="form-row-dual expand-inputs">
              <div class="form-item">
                <span class="form-label">Border Width</span>
                <div class="form-input">
                  <ha-select
                    .value=${this._config?.border_width||"2px"}
                    @selected=${t=>this._valueChanged("border_width",t.target.value)}
                    @closed=${t=>t.stopPropagation()}
                  >
                    ${Vt.map(t=>W`
                      <mwc-list-item value=${t.value}>${t.label}</mwc-list-item>
                    `)}
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
                    ${Rt.map(t=>W`
                      <mwc-list-item value=${t.value}>${t.label}</mwc-list-item>
                    `)}
                  </ha-select>
                </div>
              </div>
            </div>
          `:""}

          <!-- Glow Effects Section -->
          <div class="section-divider"></div>
          <div class="section-header">
            <span>Glow Effects</span>
          </div>
          <p class="helper-text">Add glow effects triggered by entity states. First matching effect wins.</p>
          ${this._renderGlowEffects()}
          <button
            class="add-entity-button"
            @click=${this._addGlowEffect}
          >
            <ha-icon .icon=${"mdi:plus"}></ha-icon>
            Add Glow Effect
          </button>
        </div>
      </div>
    `}_renderActionsSubSection(){const t=this._accordionState.mainActions;return W`
      <div class="sub-accordion">
        <div
          class="sub-accordion-header ${t?"expanded":""}"
          @click=${()=>this._toggleAccordion("mainActions")}
        >
          <span>Actions</span>
          <ha-icon .icon=${t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        <div class="sub-accordion-content ${t?"expanded":""}">
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
    `}_renderPersistentEntityConfig(t,e){const i=t.entity||"",a=i&&this.hass?.states[i],n=i?i.split(".")[0]:"",s=de.includes(n);return W`
      <div class="entity-row">
        <div class="entity-header" @click=${()=>this._togglePersistentEntityExpand(e)}>
          <div class="entity-name-wrapper">
            ${!a&&i?W`
              <ha-icon icon="mdi:alert-circle" class="entity-warning" title="Entity not found or unavailable"></ha-icon>
            `:F}
            <span class="entity-name">${t.entity||"New Entity"}</span>
          </div>
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
          ${!a&&i?W`
            <div class="validation-warning">
              <ha-icon icon="mdi:alert"></ha-icon>
              <span>Entity "${i}" not found or unavailable</span>
            </div>
          `:F}
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
          <!-- Tap Action -->
          <div class="form-row">
            <span class="form-label">Tap Action</span>
            <div class="form-input">
              <ha-select
                .value=${t.tap_action?.action||"more-info"}
                @selected=${t=>this._updatePersistentEntityAction(e,"tap_action",t.target.value)}
                @closed=${t=>t.stopPropagation()}
              >
                <mwc-list-item value="more-info">More Info</mwc-list-item>
                <mwc-list-item value="toggle">Toggle</mwc-list-item>
                <mwc-list-item value="none">None</mwc-list-item>
              </ha-select>
            </div>
          </div>
          <!-- Hold Action -->
          <div class="form-row">
            <span class="form-label">Hold Action</span>
            <div class="form-input">
              <ha-select
                .value=${t.hold_action?.action||"more-info"}
                @selected=${t=>this._updatePersistentEntityAction(e,"hold_action",t.target.value)}
                @closed=${t=>t.stopPropagation()}
              >
                <mwc-list-item value="more-info">More Info</mwc-list-item>
                <mwc-list-item value="toggle">Toggle</mwc-list-item>
                <mwc-list-item value="none">None</mwc-list-item>
              </ha-select>
            </div>
          </div>
          <!-- State Configuration Header with Apply Defaults -->
          <div class="form-row state-header-row">
            <span class="form-label">State-based Icons & Colors</span>
            ${s?W`
              <button class="apply-defaults-btn" @click=${()=>this._applyDomainDefaults(e,n)}>
                <ha-icon icon="mdi:auto-fix"></ha-icon>
                Apply ${this._getDomainDisplayName(n)} Defaults
              </button>
            `:F}
          </div>
          ${(t.states||[]).map((t,i)=>{const a=`${e}-${i}`,n=t.color||"",s=this._customColorInputs.has(a)||n&&!Gt.some(t=>t.value===n),o=s?"custom":n;return W`
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
                  <div class="color-select-with-preview">
                    <ha-select
                      .value=${o}
                      @selected=${t=>this._handleColorSelect(e,i,t.target.value)}
                      @closed=${t=>t.stopPropagation()}
                      style="flex: 1;"
                    >
                      ${this._renderColorOptions()}
                    </ha-select>
                    <div class="color-preview" style=${this._getColorPreviewStyle(n)}></div>
                  </div>
                  ${s?W`
                    <ha-textfield
                      .value=${n}
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
    `}_renderIntermittentSection(){const t=this._accordionState.intermittent,e=this._config?.intermittent_entities||{},i=e.entities||[];return W`
      <div class="accordion">
        <div
          class="accordion-header ${t?"expanded":""}"
          @click=${()=>this._toggleAccordion("intermittent")}
        >
          <span>Intermittent Entities</span>
          <ha-icon .icon=${t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        <div class="accordion-content ${t?"expanded":""}">
          <p class="section-description">Entities that only appear when in an "active" state (e.g., motion detected)</p>
          <!-- Default Icon Size -->
          <div class="form-row">
            <span class="form-label">Default Icon Size</span>
            <div class="form-input">
              <ha-textfield
                .value=${e.icon_size||""}
                placeholder="21px"
                @input=${t=>this._intermittentValueChanged("icon_size",t.target.value)}
              ></ha-textfield>
            </div>
          </div>
          <!-- Gap -->
          <div class="form-row">
            <span class="form-label">Gap (between icons)</span>
            <div class="form-input">
              <ha-textfield
                .value=${e.gap||""}
                placeholder="4px"
                @input=${t=>this._intermittentValueChanged("gap",t.target.value)}
              ></ha-textfield>
            </div>
          </div>
          <!-- Section Animation -->
          <div class="form-row">
            <span class="form-label">Animation (when active)</span>
            <div class="form-input">
              <ha-select
                .value=${e.animation||""}
                @selected=${t=>this._intermittentValueChanged("animation",t.target.value)}
                @closed=${t=>t.stopPropagation()}
              >
                <mwc-list-item value="">None</mwc-list-item>
                <mwc-list-item value="pulse">Pulse</mwc-list-item>
                <mwc-list-item value="glow">Glow</mwc-list-item>
                <mwc-list-item value="flash">Flash</mwc-list-item>
              </ha-select>
            </div>
          </div>
          <!-- Entities List -->
          <div class="form-row">
            <span class="form-label">Entities</span>
          </div>
          ${i.map((t,e)=>this._renderIntermittentEntityConfig(t,e))}
          <div class="add-entity-btn" @click=${this._addIntermittentEntity}>
            <ha-icon icon="mdi:plus"></ha-icon>
            <span>Add Entity</span>
          </div>
        </div>
      </div>
    `}_renderIntermittentEntityConfig(t,e){const i=t.entity||"",a=i&&this.hass?.states[i],n=i?i.split(".")[0]:"",s=de.includes(n);return W`
      <div class="entity-row">
        <div class="entity-header" @click=${()=>this._toggleIntermittentEntityExpand(e)}>
          <div class="entity-name-wrapper">
            ${!a&&i?W`
              <ha-icon icon="mdi:alert-circle" class="entity-warning" title="Entity not found or unavailable"></ha-icon>
            `:F}
            <span class="entity-name">${t.entity||"New Entity"}</span>
          </div>
          <div class="entity-actions">
            <ha-icon icon="mdi:chevron-down"></ha-icon>
            <ha-icon icon="mdi:delete" @click=${t=>{t.stopPropagation(),this._removeIntermittentEntity(e)}}></ha-icon>
          </div>
        </div>
        <div class="entity-config ${this._intermittentEntityExpanded===e?"expanded":""}">
          <!-- Entity Selector -->
          <div class="form-row">
            <span class="form-label">Entity</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{entity:{}}}
                .value=${t.entity||""}
                @value-changed=${t=>this._updateIntermittentEntity(e,"entity",t.detail.value)}
              ></ha-selector>
            </div>
          </div>
          ${!a&&i?W`
            <div class="validation-warning">
              <ha-icon icon="mdi:alert"></ha-icon>
              <span>Entity "${i}" not found or unavailable</span>
            </div>
          `:F}
          <!-- Default Icon -->
          <div class="form-row">
            <span class="form-label">Default Icon</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{icon:{}}}
                .value=${t.icon||""}
                @value-changed=${t=>this._updateIntermittentEntity(e,"icon",t.detail.value)}
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
                @input=${t=>this._updateIntermittentEntity(e,"icon_size",t.target.value)}
              ></ha-textfield>
            </div>
          </div>
          <!-- Active States (entity-specific override) -->
          <div class="form-row">
            <span class="form-label">Active States</span>
            <div class="form-input">
              <ha-textfield
                .value=${(t.active_states||[]).join(", ")}
                placeholder="Default: domain-based (e.g., on)"
                @input=${t=>this._updateIntermittentEntityActiveStates(e,t.target.value)}
              ></ha-textfield>
            </div>
          </div>
          <!-- Entity Animation -->
          <div class="form-row">
            <span class="form-label">Animation</span>
            <div class="form-input">
              <ha-select
                .value=${t.animation||""}
                @selected=${t=>this._updateIntermittentEntity(e,"animation",t.target.value)}
                @closed=${t=>t.stopPropagation()}
              >
                <mwc-list-item value="">Inherit from section</mwc-list-item>
                <mwc-list-item value="pulse">Pulse</mwc-list-item>
                <mwc-list-item value="glow">Glow</mwc-list-item>
                <mwc-list-item value="flash">Flash</mwc-list-item>
                <mwc-list-item value="none">None</mwc-list-item>
              </ha-select>
            </div>
          </div>
          <!-- Tap Action -->
          <div class="form-row">
            <span class="form-label">Tap Action</span>
            <div class="form-input">
              <ha-select
                .value=${t.tap_action?.action||"more-info"}
                @selected=${t=>this._updateIntermittentEntityAction(e,"tap_action",t.target.value)}
                @closed=${t=>t.stopPropagation()}
              >
                <mwc-list-item value="more-info">More Info</mwc-list-item>
                <mwc-list-item value="toggle">Toggle</mwc-list-item>
                <mwc-list-item value="none">None</mwc-list-item>
              </ha-select>
            </div>
          </div>
          <!-- Hold Action -->
          <div class="form-row">
            <span class="form-label">Hold Action</span>
            <div class="form-input">
              <ha-select
                .value=${t.hold_action?.action||"more-info"}
                @selected=${t=>this._updateIntermittentEntityAction(e,"hold_action",t.target.value)}
                @closed=${t=>t.stopPropagation()}
              >
                <mwc-list-item value="more-info">More Info</mwc-list-item>
                <mwc-list-item value="toggle">Toggle</mwc-list-item>
                <mwc-list-item value="none">None</mwc-list-item>
              </ha-select>
            </div>
          </div>
          <!-- State Configuration Header with Apply Defaults -->
          <div class="form-row state-header-row">
            <span class="form-label">State-based Icons & Colors</span>
            ${s?W`
              <button class="apply-defaults-btn" @click=${()=>this._applyIntermittentDomainDefaults(e,n)}>
                <ha-icon icon="mdi:auto-fix"></ha-icon>
                Apply ${this._getDomainDisplayName(n)} Defaults
              </button>
            `:F}
          </div>
          ${(t.states||[]).map((t,i)=>{const a=`i-${e}-${i}`,n=t.color||"",s=this._intermittentCustomColorInputs.has(a)||n&&!Gt.some(t=>t.value===n),o=s?"custom":n;return W`
              <div class="state-config-row">
                <ha-textfield
                  .value=${t.state||""}
                  placeholder="State (e.g., on)"
                  @input=${t=>this._updateIntermittentEntityState(e,i,"state",t.target.value)}
                  style="flex: 1;"
                ></ha-textfield>
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{icon:{}}}
                  .value=${t.icon||""}
                  @value-changed=${t=>this._updateIntermittentEntityState(e,i,"icon",t.detail.value)}
                  style="flex: 1;"
                ></ha-selector>
                <div class="color-select-wrapper" style="flex: 1.5; display: flex; flex-direction: column; gap: 4px;">
                  <div class="color-select-with-preview">
                    <ha-select
                      .value=${o}
                      @selected=${t=>this._handleIntermittentColorSelect(e,i,t.target.value)}
                      @closed=${t=>t.stopPropagation()}
                      style="flex: 1;"
                    >
                      ${this._renderColorOptions()}
                    </ha-select>
                    <div class="color-preview" style=${this._getColorPreviewStyle(n)}></div>
                  </div>
                  ${s?W`
                    <ha-textfield
                      .value=${n}
                      placeholder="CSS color value"
                      @input=${t=>this._updateIntermittentEntityState(e,i,"color",t.target.value)}
                      style="width: 100%;"
                    ></ha-textfield>
                  `:F}
                </div>
                <ha-icon icon="mdi:delete" @click=${()=>this._removeIntermittentEntityState(e,i)}></ha-icon>
              </div>
            `})}
          <div class="add-state-btn" @click=${()=>this._addIntermittentEntityState(e)}>
            <ha-icon icon="mdi:plus"></ha-icon>
            <span>Add State Config</span>
          </div>
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
          <!-- Primary Entities -->
          <div class="form-row">
            <span class="form-label">Primary Entities</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${this._getPrimaryEntitySelector()}
                .value=${e.primary_entities||[]}
                @value-changed=${t=>this._climateValueChanged("primary_entities",t.detail.value)}
              ></ha-selector>
            </div>
          </div>
          <div class="form-row">
            <span class="form-label">Show Primary Unit</span>
            <div class="form-input">
              <ha-switch
                .checked=${!1!==e.show_primary_unit}
                @change=${t=>this._climateValueChanged("show_primary_unit",t.target.checked)}
              ></ha-switch>
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
                .selector=${this._getPowerEntitySelector()}
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
    `}_renderBatterySection(){const t=this._accordionState.battery,e=this._config?.battery_entities||{},i=e.entities||[],a=e.show_as_badge||!1;return W`
      <div class="accordion">
        <div
          class="accordion-header ${t?"expanded":""}"
          @click=${()=>this._toggleAccordion("battery")}
        >
          <span>Battery Entities</span>
          <ha-icon .icon=${t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        <div class="accordion-content ${t?"expanded":""}">
          <p class="section-description">Shows icons for entities with low battery (only when below threshold)</p>
          <!-- Low Threshold -->
          <div class="form-row">
            <span class="form-label">Low Battery Threshold (%)</span>
            <div class="form-input">
              <ha-textfield
                type="number"
                min="0"
                max="100"
                .value=${String(e.low_threshold??20)}
                @input=${t=>this._batteryValueChanged("low_threshold",parseInt(t.target.value)||20)}
              ></ha-textfield>
            </div>
          </div>
          <!-- Icon Size -->
          <div class="form-row">
            <span class="form-label">Icon Size</span>
            <div class="form-input">
              <ha-textfield
                .value=${e.icon_size||""}
                placeholder="21px"
                @input=${t=>this._batteryValueChanged("icon_size",t.target.value)}
              ></ha-textfield>
            </div>
          </div>
          <!-- Show as Badge Toggle (NEW) -->
          <div class="form-row">
            <span class="form-label">Show as Badge</span>
            <div class="form-input">
              <ha-switch
                .checked=${a}
                @change=${t=>this._batteryValueChanged("show_as_badge",t.target.checked)}
              ></ha-switch>
            </div>
          </div>
          <p class="helper-text">Display as a circular badge on the card corner instead of in the status section</p>
          <!-- Badge Options (only shown when badge mode enabled) (NEW) -->
          ${a?W`
            <div class="form-row">
              <span class="form-label">Badge Position</span>
              <div class="form-input">
                <ha-select
                  .value=${e.badge_position||"top-right"}
                  @selected=${t=>this._batteryValueChanged("badge_position",t.target.value)}
                  @closed=${t=>t.stopPropagation()}
                >
                  ${_e.map(t=>W`
                    <mwc-list-item .value=${t.value}>${t.label}</mwc-list-item>
                  `)}
                </ha-select>
              </div>
            </div>
            <div class="form-row">
              <span class="form-label">Badge Size</span>
              <div class="form-input">
                <ha-textfield
                  .value=${e.badge_size||""}
                  placeholder="20px"
                  @input=${t=>this._batteryValueChanged("badge_size",t.target.value)}
                ></ha-textfield>
              </div>
            </div>
            <div class="form-row">
              <span class="form-label">Badge Icon Size</span>
              <div class="form-input">
                <ha-textfield
                  .value=${e.badge_icon_size||""}
                  placeholder="12px"
                  @input=${t=>this._batteryValueChanged("badge_icon_size",t.target.value)}
                ></ha-textfield>
              </div>
            </div>
            <div class="form-row">
              <span class="form-label">Badge Color</span>
              <div class="form-input">
                <ha-textfield
                  .value=${e.badge_color||""}
                  placeholder="var(--error-color)"
                  @input=${t=>this._batteryValueChanged("badge_color",t.target.value)}
                ></ha-textfield>
              </div>
            </div>
          `:F}
          <!-- Tap Action -->
          <div class="form-row">
            <span class="form-label">Tap Action</span>
            <div class="form-input">
              <ha-select
                .value=${e.tap_action?.action||"more-info"}
                @selected=${t=>this._batteryActionChanged("tap_action",t.target.value)}
                @closed=${t=>t.stopPropagation()}
              >
                <mwc-list-item value="more-info">More Info</mwc-list-item>
                <mwc-list-item value="navigate">Navigate</mwc-list-item>
                <mwc-list-item value="none">None</mwc-list-item>
              </ha-select>
            </div>
          </div>
          <!-- Hold Action -->
          <div class="form-row">
            <span class="form-label">Hold Action</span>
            <div class="form-input">
              <ha-select
                .value=${e.hold_action?.action||"more-info"}
                @selected=${t=>this._batteryActionChanged("hold_action",t.target.value)}
                @closed=${t=>t.stopPropagation()}
              >
                <mwc-list-item value="more-info">More Info</mwc-list-item>
                <mwc-list-item value="navigate">Navigate</mwc-list-item>
                <mwc-list-item value="none">None</mwc-list-item>
              </ha-select>
            </div>
          </div>
          <!-- Entities -->
          <div class="form-row">
            <span class="form-label">Entities</span>
          </div>
          ${i.map((t,e)=>{const i=t&&this.hass?.states[t];return W`
              <div class="entity-list-item">
                ${!i&&t?W`
                  <ha-icon icon="mdi:alert-circle" class="entity-warning" title="Entity not found or unavailable"></ha-icon>
                `:F}
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{entity:{domain:"sensor"}}}
                  .value=${t}
                  @value-changed=${t=>this._updateBatteryEntity(e,t.detail.value)}
                ></ha-selector>
                <ha-icon icon="mdi:delete" @click=${()=>this._removeBatteryEntity(e)}></ha-icon>
              </div>
            `})}
          <div class="add-entity-btn" @click=${this._addBatteryEntity}>
            <ha-icon icon="mdi:plus"></ha-icon>
            <span>Add Entity</span>
          </div>
        </div>
      </div>
    `}_renderUpdateSection(){const t=this._accordionState.update,e=this._config?.update_entities||{},i=e.entities||[],a=e.show_as_badge||!1;return W`
      <div class="accordion">
        <div
          class="accordion-header ${t?"expanded":""}"
          @click=${()=>this._toggleAccordion("update")}
        >
          <span>Update Entities</span>
          <ha-icon .icon=${t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        <div class="accordion-content ${t?"expanded":""}">
          <p class="section-description">Shows a single icon when any entities have available updates</p>
          <!-- Icon -->
          <div class="form-row">
            <span class="form-label">Icon</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{icon:{}}}
                .value=${e.icon||""}
                placeholder="mdi:update"
                @value-changed=${t=>this._updateValueChanged("icon",t.detail.value)}
              ></ha-selector>
            </div>
          </div>
          <!-- Icon Size -->
          <div class="form-row">
            <span class="form-label">Icon Size</span>
            <div class="form-input">
              <ha-textfield
                .value=${e.icon_size||""}
                placeholder="21px"
                @input=${t=>this._updateValueChanged("icon_size",t.target.value)}
              ></ha-textfield>
            </div>
          </div>
          <!-- Color -->
          <div class="form-row">
            <span class="form-label">Color</span>
            <div class="form-input">
              <ha-select
                .value=${e.color||""}
                @selected=${t=>this._updateValueChanged("color",t.target.value)}
                @closed=${t=>t.stopPropagation()}
              >
                ${this._renderColorOptions()}
              </ha-select>
            </div>
          </div>
          <!-- Spin Animation -->
          <div class="form-row">
            <span class="form-label">Spin Animation</span>
            <div class="form-input">
              <ha-switch
                .checked=${!0===e.spin_animation}
                @change=${t=>this._updateValueChanged("spin_animation",t.target.checked)}
              ></ha-switch>
            </div>
          </div>
          <!-- Spin Interval (only show if spin animation enabled) -->
          ${!0===e.spin_animation?W`
            <div class="form-row">
              <span class="form-label">Spin Interval (seconds)</span>
              <div class="form-input">
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{number:{min:10,max:300,step:5,mode:"box"}}}
                  .value=${e.spin_interval??60}
                  @value-changed=${t=>this._updateValueChanged("spin_interval",t.detail.value)}
                ></ha-selector>
              </div>
            </div>
          `:F}
          <!-- Show as Badge Toggle (NEW) -->
          <div class="form-row">
            <span class="form-label">Show as Badge</span>
            <div class="form-input">
              <ha-switch
                .checked=${a}
                @change=${t=>this._updateValueChanged("show_as_badge",t.target.checked)}
              ></ha-switch>
            </div>
          </div>
          <p class="helper-text">Display as a circular badge on the card corner instead of in the status section</p>
          <!-- Badge Options (only shown when badge mode enabled) (NEW) -->
          ${a?W`
            <div class="form-row">
              <span class="form-label">Badge Position</span>
              <div class="form-input">
                <ha-select
                  .value=${e.badge_position||"top-right"}
                  @selected=${t=>this._updateValueChanged("badge_position",t.target.value)}
                  @closed=${t=>t.stopPropagation()}
                >
                  ${_e.map(t=>W`
                    <mwc-list-item .value=${t.value}>${t.label}</mwc-list-item>
                  `)}
                </ha-select>
              </div>
            </div>
            <div class="form-row">
              <span class="form-label">Badge Size</span>
              <div class="form-input">
                <ha-textfield
                  .value=${e.badge_size||""}
                  placeholder="20px"
                  @input=${t=>this._updateValueChanged("badge_size",t.target.value)}
                ></ha-textfield>
              </div>
            </div>
            <div class="form-row">
              <span class="form-label">Badge Icon Size</span>
              <div class="form-input">
                <ha-textfield
                  .value=${e.badge_icon_size||""}
                  placeholder="12px"
                  @input=${t=>this._updateValueChanged("badge_icon_size",t.target.value)}
                ></ha-textfield>
              </div>
            </div>
            <div class="form-row">
              <span class="form-label">Badge Color</span>
              <div class="form-input">
                <ha-textfield
                  .value=${e.badge_color||""}
                  placeholder="var(--info-color)"
                  @input=${t=>this._updateValueChanged("badge_color",t.target.value)}
                ></ha-textfield>
              </div>
            </div>
          `:F}
          <!-- Tap Action -->
          <div class="form-row">
            <span class="form-label">Tap Action</span>
            <div class="form-input">
              <ha-select
                .value=${e.tap_action?.action||"more-info"}
                @selected=${t=>this._updateActionChanged("tap_action",t.target.value)}
                @closed=${t=>t.stopPropagation()}
              >
                <mwc-list-item value="more-info">More Info</mwc-list-item>
                <mwc-list-item value="navigate">Navigate</mwc-list-item>
                <mwc-list-item value="none">None</mwc-list-item>
              </ha-select>
            </div>
          </div>
          <!-- Hold Action -->
          <div class="form-row">
            <span class="form-label">Hold Action</span>
            <div class="form-input">
              <ha-select
                .value=${e.hold_action?.action||"more-info"}
                @selected=${t=>this._updateActionChanged("hold_action",t.target.value)}
                @closed=${t=>t.stopPropagation()}
              >
                <mwc-list-item value="more-info">More Info</mwc-list-item>
                <mwc-list-item value="navigate">Navigate</mwc-list-item>
                <mwc-list-item value="none">None</mwc-list-item>
              </ha-select>
            </div>
          </div>
          <!-- Entities -->
          <div class="form-row">
            <span class="form-label">Entities</span>
          </div>
          ${i.map((t,e)=>{const i=t&&this.hass?.states[t];return W`
              <div class="entity-list-item">
                ${!i&&t?W`
                  <ha-icon icon="mdi:alert-circle" class="entity-warning" title="Entity not found or unavailable"></ha-icon>
                `:F}
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{entity:{domain:"update"}}}
                  .value=${t}
                  @value-changed=${t=>this._updateUpdateEntity(e,t.detail.value)}
                ></ha-selector>
                <ha-icon icon="mdi:delete" @click=${()=>this._removeUpdateEntity(e)}></ha-icon>
              </div>
            `})}
          <div class="add-entity-btn" @click=${this._addUpdateEntity}>
            <ha-icon icon="mdi:plus"></ha-icon>
            <span>Add Entity</span>
          </div>
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
    `}_getPrimaryEntityDeviceClass(){const t=this._config?.climate_entities?.primary_entities;if(!t||0===t.length||!this.hass)return;const e=this.hass.states[t[0]];return e?e.attributes.device_class:void 0}_getPrimaryEntitySelector(){const t=this._getPrimaryEntityDeviceClass();return t?{entity:{domain:"sensor",device_class:t,multiple:!0}}:{entity:{domain:["sensor","climate","weather"],multiple:!0}}}_getPowerEntityUnit(){const t=this._config?.power_entities?.entities;if(!t||0===t.length||!this.hass)return;const e=this.hass.states[t[0]];if(!e)return;const i=e.attributes.unit_of_measurement;return"string"==typeof i?i:void 0}_getPowerEntitySelector(){const t=this._getPowerEntityUnit();return t?{entity:{domain:"sensor",device_class:{W:["power"],kW:["power"],MW:["power"],Wh:["energy"],kWh:["energy"],MWh:["energy"],A:["current"],mA:["current"],V:["voltage"],mV:["voltage"]}[t]||["power","energy","voltage","current"],multiple:!0}}:{entity:{domain:"sensor",device_class:["power","energy","voltage","current"],multiple:!0}}}_toggleAccordion(t){this._accordionState={...this._accordionState,[t]:!this._accordionState[t]}}_valueChanged(t,e){if(!this._config)return;const i=this._config[t];if(i===e)return;if(null==i&&(""===e||null==e))return;const a={...this._config,[t]:e};""!==e&&null!=e||delete a[t],this._config=a,this._dispatchConfigChanged()}_gridValueChanged(t,e){if(!this._config)return;const i={...this._config.grid};e?i[t]=e:delete i[t],this._config={...this._config,grid:Object.keys(i).length>0?i:void 0},this._dispatchConfigChanged()}_tapActionChanged(t,e){if(!this._config)return;const i=this._config[t];if(i?.action===e)return;const a={...this._config,[t]:{...i,action:e}};this._config=a,this._dispatchConfigChanged()}_tapActionDataChanged(t,e,i){if(!this._config)return;const a=this._config[t]||{action:"none"},n={...this._config,[t]:{...a,[e]:i||void 0}};i||delete n[t][e],this._config=n,this._dispatchConfigChanged()}_climateValueChanged(t,e){if(!this._config)return;const i={...this._config.climate_entities};Array.isArray(e)&&0===e.length||""===e||null==e?delete i[t]:i[t]=e,this._config={...this._config,climate_entities:Object.keys(i).length>0?i:void 0},this._dispatchConfigChanged()}_powerValueChanged(t,e){if(!this._config)return;const i={...this._config.power_entities};Array.isArray(e)&&0===e.length||""===e||null==e?delete i[t]:i[t]=e,this._config={...this._config,power_entities:Object.keys(i).length>0?i:void 0},this._dispatchConfigChanged()}_persistentValueChanged(t,e){if(!this._config)return;const i={...this._config.persistent_entities};""===e||null==e?delete i[t]:i[t]=e,this._config={...this._config,persistent_entities:Object.keys(i).length>0?i:void 0},this._dispatchConfigChanged()}_togglePersistentEntityExpand(t){this._persistentEntityExpanded=this._persistentEntityExpanded===t?-1:t}_addPersistentEntity(){if(!this._config)return;const t={...this._config.persistent_entities},e=[...t.entities||[]];e.push({entity:""}),t.entities=e,this._config={...this._config,persistent_entities:t},this._persistentEntityExpanded=e.length-1,this._dispatchConfigChanged()}_removePersistentEntity(t){if(!this._config)return;const e={...this._config.persistent_entities},i=[...e.entities||[]];i.splice(t,1),e.entities=i.length>0?i:void 0,this._config={...this._config,persistent_entities:Object.keys(e).filter(t=>void 0!==e[t]).length>0?e:void 0},this._persistentEntityExpanded===t&&(this._persistentEntityExpanded=-1),this._dispatchConfigChanged()}_updatePersistentEntity(t,e,i){if(!this._config)return;const a={...this._config.persistent_entities},n=[...a.entities||[]];n[t]&&(n[t][e]=i||void 0,i||delete n[t][e]),a.entities=n,this._config={...this._config,persistent_entities:a},this._dispatchConfigChanged()}_addPersistentEntityState(t){if(!this._config)return;const e={...this._config.persistent_entities},i=[...e.entities||[]];if(i[t]){const e={...i[t]};e.states=[...e.states||[],{state:"",icon:"",color:""}],i[t]=e}e.entities=i,this._config={...this._config,persistent_entities:e},this._dispatchConfigChanged()}_removePersistentEntityState(t,e){if(!this._config)return;const i={...this._config.persistent_entities},a=[...i.entities||[]];if(a[t]){const i={...a[t]},n=[...i.states||[]];n.splice(e,1),i.states=n.length>0?n:void 0,a[t]=i}i.entities=a,this._config={...this._config,persistent_entities:i},this._dispatchConfigChanged()}_updatePersistentEntityState(t,e,i,a){if(!this._config)return;const n={...this._config.persistent_entities},s=[...n.entities||[]];if(s[t]){const n={...s[t]},o=[...n.states||[]];o[e]&&(o[e][i]=a||void 0,a||delete o[e][i]),n.states=o,s[t]=n}n.entities=s,this._config={...this._config,persistent_entities:n},this._dispatchConfigChanged()}_renderColorOptions(){const t=[];let e="";for(const i of Gt)i.category!==e&&(e=i.category,"Default"!==e&&t.push(W`
            <mwc-list-item disabled noninteractive style="font-weight: 500; opacity: 0.7; font-size: 12px; text-transform: uppercase;">
              ${e}
            </mwc-list-item>
          `)),t.push(W`
        <mwc-list-item value=${i.value}>${i.label}</mwc-list-item>
      `);return t}_handleColorSelect(t,e,i){const a=`${t}-${e}`;"custom"===i?this._customColorInputs=new Set([...this._customColorInputs,a]):(this._customColorInputs.delete(a),this._customColorInputs=new Set(this._customColorInputs),this._updatePersistentEntityState(t,e,"color",i))}_updatePersistentEntityAction(t,e,i){if(!this._config)return;const a={...this._config.persistent_entities},n=[...a.entities||[]];if(n[t]){const a={...n[t]},s=a[e];if(s?.action===i)return;a[e]={...s,action:i},n[t]=a}a.entities=n,this._config={...this._config,persistent_entities:a},this._dispatchConfigChanged()}_applyDomainDefaults(t,e){if(!this._config)return;const i=le[e];if(!i)return;const a={...this._config.persistent_entities},n=[...a.entities||[]];if(n[t]){const e={...n[t]};e.states=i.map(t=>({state:t.state,icon:t.icon,color:t.color})),n[t]=e}a.entities=n,this._config={...this._config,persistent_entities:a};const s=new Set(this._customColorInputs);for(const e of this._customColorInputs)e.startsWith(`${t}-`)&&s.delete(e);this._customColorInputs=s,this._dispatchConfigChanged()}_renderIconStateMapSection(){const t=this._config?.icon_state_map,e=t?.states&&Object.keys(t.states).length>0;return W`
      <div class="form-row state-header-row" style="margin-top: 12px;">
        <span class="form-label">Icon State Map</span>
      </div>
      <p class="helper-text" style="margin-top: 0;">Change icon and color based on an entity's state</p>
      <!-- Entity selector (optional - defaults to primary entity) -->
      <div class="form-row">
        <span class="form-label">Watch Entity</span>
        <div class="form-input">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${t?.entity||""}
            @value-changed=${t=>this._updateIconStateMapEntity(t.detail.value)}
            allow-custom-entity
          ></ha-entity-picker>
        </div>
      </div>
      <p class="helper-text">Entity whose state drives the icon change (defaults to primary entity if empty)</p>
      ${e?Object.entries(t.states).map(([t,e],i)=>{const a=`ism-${i}`,n=e.color||"",s=this._iconStateMapCustomColors.has(a)||n&&!Gt.some(t=>t.value===n),o=s?"custom":n;return W`
          <div class="state-config-row">
            <ha-textfield
              .value=${t}
              placeholder="State (e.g., on)"
              @input=${e=>this._updateIconStateMapState(t,"state",e.target.value)}
              style="flex: 1;"
            ></ha-textfield>
            <ha-selector
              .hass=${this.hass}
              .selector=${{icon:{}}}
              .value=${e.icon||""}
              @value-changed=${e=>this._updateIconStateMapState(t,"icon",e.detail.value)}
              style="flex: 1;"
            ></ha-selector>
            <div class="color-select-wrapper" style="flex: 1.5; display: flex; flex-direction: column; gap: 4px;">
              <div class="color-select-with-preview">
                <ha-select
                  .value=${o}
                  @selected=${e=>this._handleIconStateMapColorSelect(t,i,e.target.value)}
                  @closed=${t=>t.stopPropagation()}
                  style="flex: 1;"
                >
                  ${this._renderColorOptions()}
                </ha-select>
                <div class="color-preview" style=${this._getColorPreviewStyle(n)}></div>
              </div>
              ${s?W`
                <ha-textfield
                  .value=${n}
                  placeholder="CSS color value"
                  @input=${e=>this._updateIconStateMapState(t,"color",e.target.value)}
                  style="width: 100%;"
                ></ha-textfield>
              `:F}
            </div>
            <ha-icon icon="mdi:delete" @click=${()=>this._removeIconStateMapState(t)}></ha-icon>
          </div>
        `}):F}
      <div class="add-state-btn" @click=${()=>this._addIconStateMapState()}>
        <ha-icon icon="mdi:plus"></ha-icon>
        <span>Add State Mapping</span>
      </div>
    `}_updateIconStateMapEntity(t){if(!this._config)return;const e={...this._config.icon_state_map||{states:{}}};if(t?e.entity=t:delete e.entity,e.entity||e.states&&0!==Object.keys(e.states).length)this._config={...this._config,icon_state_map:e};else{const{icon_state_map:t,...e}=this._config;this._config={...e}}this._dispatchConfigChanged()}_addIconStateMapState(){if(!this._config)return;const t={...this._config.icon_state_map||{states:{}}},e={...t.states};let i="",a=1;do{i=`state_${a}`,a++}while(i in e);e[i]={},t.states=e,this._config={...this._config,icon_state_map:t},this._dispatchConfigChanged()}_removeIconStateMapState(t){if(!this._config?.icon_state_map?.states)return;const e={...this._config.icon_state_map},i={...e.states};if(delete i[t],e.states=i,0!==Object.keys(i).length||e.entity)this._config={...this._config,icon_state_map:e};else{const{icon_state_map:t,...e}=this._config;this._config={...e}}this._dispatchConfigChanged()}_updateIconStateMapState(t,e,i){if(!this._config?.icon_state_map?.states)return;const a={...this._config.icon_state_map},n={...a.states};if("state"===e){const e=n[t]||{};delete n[t],i&&(n[i]={...e})}else{const a={...n[t]||{}};i?a[e]=i:delete a[e],n[t]=a}a.states=n,this._config={...this._config,icon_state_map:a},this._dispatchConfigChanged()}_handleIconStateMapColorSelect(t,e,i){const a=`ism-${e}`;"custom"===i?this._iconStateMapCustomColors=new Set([...this._iconStateMapCustomColors,a]):(this._iconStateMapCustomColors.delete(a),this._iconStateMapCustomColors=new Set(this._iconStateMapCustomColors),this._updateIconStateMapState(t,"color",i))}_toggleIntermittentEntityExpand(t){this._intermittentEntityExpanded=this._intermittentEntityExpanded===t?-1:t}_addIntermittentEntity(){if(!this._config)return;const t={...this._config.intermittent_entities},e=[...t.entities||[]];e.push({entity:""}),t.entities=e,this._config={...this._config,intermittent_entities:t},this._intermittentEntityExpanded=e.length-1,this._dispatchConfigChanged()}_removeIntermittentEntity(t){if(!this._config)return;const e={...this._config.intermittent_entities},i=[...e.entities||[]];i.splice(t,1),e.entities=i,this._config={...this._config,intermittent_entities:e},this._intermittentEntityExpanded===t&&(this._intermittentEntityExpanded=-1),this._dispatchConfigChanged()}_intermittentValueChanged(t,e){if(!this._config)return;const i={...this._config.intermittent_entities};e?i[t]=e:delete i[t],this._config={...this._config,intermittent_entities:i},this._dispatchConfigChanged()}_updateIntermittentEntity(t,e,i){if(!this._config)return;const a={...this._config.intermittent_entities},n=[...a.entities||[]];n[t]&&(n[t][e]=i||void 0,i||delete n[t][e]),a.entities=n,this._config={...this._config,intermittent_entities:a},this._dispatchConfigChanged()}_updateIntermittentEntityActiveStates(t,e){if(!this._config)return;const i={...this._config.intermittent_entities},a=[...i.entities||[]];if(a[t]){const i={...a[t]};e.trim()?i.active_states=e.split(",").map(t=>t.trim()).filter(t=>t):delete i.active_states,a[t]=i}i.entities=a,this._config={...this._config,intermittent_entities:i},this._dispatchConfigChanged()}_updateIntermittentEntityAction(t,e,i){if(!this._config)return;const a={...this._config.intermittent_entities},n=[...a.entities||[]];if(n[t]){const a={...n[t]},s=a[e];if(s?.action===i)return;a[e]={...s,action:i},n[t]=a}a.entities=n,this._config={...this._config,intermittent_entities:a},this._dispatchConfigChanged()}_addIntermittentEntityState(t){if(!this._config)return;const e={...this._config.intermittent_entities},i=[...e.entities||[]];if(i[t]){const e={...i[t]};e.states=[...e.states||[],{state:"",icon:"",color:""}],i[t]=e}e.entities=i,this._config={...this._config,intermittent_entities:e},this._dispatchConfigChanged()}_removeIntermittentEntityState(t,e){if(!this._config)return;const i={...this._config.intermittent_entities},a=[...i.entities||[]];if(a[t]){const i={...a[t]},n=[...i.states||[]];n.splice(e,1),i.states=n,a[t]=i}i.entities=a,this._config={...this._config,intermittent_entities:i},this._dispatchConfigChanged()}_updateIntermittentEntityState(t,e,i,a){if(!this._config)return;const n={...this._config.intermittent_entities},s=[...n.entities||[]];if(s[t]){const n={...s[t]},o=[...n.states||[]];o[e]&&(o[e][i]=a||void 0,a||delete o[e][i]),n.states=o,s[t]=n}n.entities=s,this._config={...this._config,intermittent_entities:n},this._dispatchConfigChanged()}_handleIntermittentColorSelect(t,e,i){const a=`i-${t}-${e}`;"custom"===i?this._intermittentCustomColorInputs=new Set([...this._intermittentCustomColorInputs,a]):(this._intermittentCustomColorInputs.delete(a),this._intermittentCustomColorInputs=new Set(this._intermittentCustomColorInputs),this._updateIntermittentEntityState(t,e,"color",i))}_applyIntermittentDomainDefaults(t,e){if(!this._config)return;const i=le[e];if(!i)return;const a={...this._config.intermittent_entities},n=[...a.entities||[]];if(n[t]){const e={...n[t]};e.states=i.map(t=>({state:t.state,icon:t.icon,color:t.color})),n[t]=e}a.entities=n,this._config={...this._config,intermittent_entities:a};const s=new Set(this._intermittentCustomColorInputs);for(const e of this._intermittentCustomColorInputs)e.startsWith(`i-${t}-`)&&s.delete(e);this._intermittentCustomColorInputs=s,this._dispatchConfigChanged()}_getDomainDisplayName(t){return{lock:"Lock",binary_sensor:"Binary Sensor",cover:"Cover",light:"Light",switch:"Switch",fan:"Fan",climate:"Climate",input_boolean:"Input Boolean"}[t]||t}_getColorPreviewStyle(t){return t?`background-color: ${t};`:"background-color: transparent; border: 1px dashed var(--secondary-text-color);"}_batteryValueChanged(t,e){if(!this._config)return;const i={...this._config.battery_entities};void 0!==e&&""!==e&&null!==e?i[t]=e:delete i[t],this._config={...this._config,battery_entities:i},this._dispatchConfigChanged()}_batteryActionChanged(t,e){if(!this._config)return;const i={...this._config.battery_entities},a=i[t];a?.action!==e&&(i[t]={...a,action:e},this._config={...this._config,battery_entities:i},this._dispatchConfigChanged())}_addBatteryEntity(){if(!this._config)return;const t={...this._config.battery_entities},e=[...t.entities||[]];e.push(""),t.entities=e,this._config={...this._config,battery_entities:t},this._dispatchConfigChanged()}_removeBatteryEntity(t){if(!this._config)return;const e={...this._config.battery_entities},i=[...e.entities||[]];i.splice(t,1),e.entities=i.length>0?i:void 0,this._config={...this._config,battery_entities:e},this._dispatchConfigChanged()}_updateBatteryEntity(t,e){if(!this._config)return;const i={...this._config.battery_entities},a=[...i.entities||[]];a[t]=e,i.entities=a,this._config={...this._config,battery_entities:i},this._dispatchConfigChanged()}_updateValueChanged(t,e){if(!this._config)return;const i={...this._config.update_entities};void 0!==e&&""!==e&&null!==e?i[t]=e:delete i[t],this._config={...this._config,update_entities:i},this._dispatchConfigChanged()}_updateActionChanged(t,e){if(!this._config)return;const i={...this._config.update_entities},a=i[t];a?.action!==e&&(i[t]={...a,action:e},this._config={...this._config,update_entities:i},this._dispatchConfigChanged())}_addUpdateEntity(){if(!this._config)return;const t={...this._config.update_entities},e=[...t.entities||[]];e.push(""),t.entities=e,this._config={...this._config,update_entities:t},this._dispatchConfigChanged()}_removeUpdateEntity(t){if(!this._config)return;const e={...this._config.update_entities},i=[...e.entities||[]];i.splice(t,1),e.entities=i.length>0?i:void 0,this._config={...this._config,update_entities:e},this._dispatchConfigChanged()}_updateUpdateEntity(t,e){if(!this._config)return;const i={...this._config.update_entities},a=[...i.entities||[]];a[t]=e,i.entities=a,this._config={...this._config,update_entities:i},this._dispatchConfigChanged()}_renderGlowEffects(){const t=this._config?.glow_effects||[];return 0===t.length?W``:W`
      <div class="glow-effects-list">
        ${t.map((t,e)=>this._renderGlowEffect(t,e))}
      </div>
    `}_renderGlowEffect(t,e){const i=t.states?.length?t.states.join(", "):t.state||"";return W`
      <div class="glow-effect-config">
        <div class="glow-effect-header">
          <span class="glow-effect-title">Glow Effect ${e+1}</span>
          <ha-icon-button
            .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
            @click=${()=>this._removeGlowEffect(e)}
            title="Remove glow effect"
          ></ha-icon-button>
        </div>

        <!-- Entity -->
        <div class="form-row">
          <span class="form-label">Entity</span>
          <div class="form-input">
            <ha-selector
              .hass=${this.hass}
              .selector=${{entity:{}}}
              .value=${t.entity||""}
              @value-changed=${t=>this._updateGlowEffect(e,"entity",t.detail.value)}
            ></ha-selector>
          </div>
        </div>

        <!-- States (comma-separated) -->
        <div class="form-row">
          <span class="form-label">Trigger States</span>
          <div class="form-input">
            <ha-textfield
              .value=${i}
              placeholder="error, jammed, unlocked"
              @input=${i=>{const a=i.target.value.split(",").map(t=>t.trim()).filter(t=>t);this._updateGlowEffect(e,"states",a),t.state&&this._updateGlowEffect(e,"state",void 0)}}
            ></ha-textfield>
          </div>
        </div>
        <p class="helper-text">Comma-separated list of states that trigger this glow</p>

        <!-- Color -->
        <div class="form-row">
          <span class="form-label">Glow Color</span>
          <div class="form-input">
            <ha-textfield
              .value=${t.color||""}
              placeholder="auto"
              @input=${t=>this._updateGlowEffect(e,"color",t.target.value)}
            ></ha-textfield>
          </div>
        </div>
        <p class="helper-text">Use "auto" for entity color, or CSS color/variable (e.g., #ff0000, var(--error-color))</p>

        <!-- Spread -->
        <div class="form-row">
          <span class="form-label">Spread (px)</span>
          <div class="form-input">
            <ha-selector
              .hass=${this.hass}
              .selector=${{number:{min:1,max:30,step:1,mode:"box"}}}
              .value=${t.spread??4}
              @value-changed=${t=>this._updateGlowEffect(e,"spread",t.detail.value)}
            ></ha-selector>
          </div>
        </div>

        <!-- Animation -->
        <div class="form-row">
          <span class="form-label">Animation</span>
          <div class="form-input">
            <ha-select
              .value=${t.animation||"none"}
              @selected=${t=>this._updateGlowEffect(e,"animation",t.target.value)}
              @closed=${t=>t.stopPropagation()}
            >
              <mwc-list-item value="none">None (Static)</mwc-list-item>
              <mwc-list-item value="pulse">Pulse</mwc-list-item>
              <mwc-list-item value="breathe">Breathe</mwc-list-item>
            </ha-select>
          </div>
        </div>
      </div>
    `}_addGlowEffect(){if(!this._config)return;const t=[...this._config.glow_effects||[]];t.push({entity:"",states:[],color:"auto",spread:4,animation:"none"}),this._config={...this._config,glow_effects:t},this._dispatchConfigChanged()}_updateGlowEffect(t,e,i){if(!this._config?.glow_effects)return;const a=[...this._config.glow_effects];a[t]={...a[t],[e]:i},this._config={...this._config,glow_effects:a},this._dispatchConfigChanged()}_removeGlowEffect(t){if(!this._config?.glow_effects)return;const e=[...this._config.glow_effects];e.splice(t,1),this._config={...this._config,glow_effects:e.length>0?e:void 0},this._dispatchConfigChanged()}_dispatchConfigChanged(){const t=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(t)}};function Be(t){return["unavailable","unknown"].includes(t.state)}function Ne(t,e,i=1){const a=[];let n="";for(const i of e){const e=t.states[i];if(!e||Be(e))continue;const s=parseFloat(e.state);isNaN(s)||(a.push(s),!n&&e.attributes.unit_of_measurement&&(n=e.attributes.unit_of_measurement))}if(0===a.length)return{value:null,unit:"",count:0};const s=a.reduce((t,e)=>t+e,0)/a.length;return{value:parseFloat(s.toFixed(i)),unit:n,count:a.length}}function Oe(t){const e=parseFloat(t.state);return isNaN(e)?null:e}function De(t){return null===t?"mdi:battery-unknown":t<=10?"mdi:battery-alert":t<=20?"mdi:battery-10":t<=30?"mdi:battery-20":t<=40?"mdi:battery-30":t<=50?"mdi:battery-40":t<=60?"mdi:battery-50":t<=70?"mdi:battery-60":t<=80?"mdi:battery-70":t<=90?"mdi:battery-80":"mdi:battery"}function He(t,e){const i=e.low_threshold??20,a=e.entities||[],n=[];for(const e of a){const a=t.states[e];if(!a)continue;const s=Oe(a);null!==s&&s<=i&&n.push(e)}return n}function Le(t,e,i){if(!e)return F;if(e.show_as_badge)return F;const a=He(t,e);if(0===a.length)return F;const n=e.icon_size||"21px";return W`
    ${a.map(a=>function(t,e,i,a,n,s){const o=t.states[e];if(!o)return F;const r=Oe(o),c=De(r),l={"--mdc-icon-size":i,color:"var(--state-sensor-battery-low-color, var(--error-color, #db4437))"},d=n.tap_action||{action:"more-info"},h=n.hold_action||{action:"more-info"};return W`
    <div 
      class="intermittent-entity"
      @click=${t=>{t.stopPropagation(),s(d,e)}}
      @contextmenu=${t=>{t.preventDefault(),t.stopPropagation(),s(h,e)}}
      title="${o.attributes.friendly_name||e}: ${r}%"
    >
      <ha-icon
        .icon=${c}
        style=${wt(l)}
      ></ha-icon>
    </div>
  `}(t,a,n,0,e,i))}
  `}function Ve(t,e){return e?He(t,e).length:0}Me.styles=je,t([ft({attribute:!1}),e("design:type",Object)],Me.prototype,"hass",void 0),t([mt(),e("design:type",Object)],Me.prototype,"_config",void 0),t([mt(),e("design:type",Object)],Me.prototype,"_accordionState",void 0),t([mt(),e("design:type",Number)],Me.prototype,"_persistentEntityExpanded",void 0),t([mt(),e("design:type",Number)],Me.prototype,"_intermittentEntityExpanded",void 0),t([mt(),e("design:type",Set)],Me.prototype,"_customColorInputs",void 0),t([mt(),e("design:type",Set)],Me.prototype,"_intermittentCustomColorInputs",void 0),t([mt(),e("design:type",Boolean)],Me.prototype,"_showUnavailableCustomColorInput",void 0),t([mt(),e("design:type",Set)],Me.prototype,"_iconStateMapCustomColors",void 0),Me=t([ht(Ct)],Me);const Re="mdi:update";function Ge(t,e){const i=e.entities||[],a=[];for(const e of i){const i=t.states[e];i&&"on"===i.state&&a.push(e)}return a}function We(t,e){if(0===e.length)return"";if(1===e.length){const i=t.states[e[0]];return i?`${i.attributes.friendly_name||e[0]}: Update ${i.attributes.latest_version||"available"}`:"1 update available"}const i=e.map(e=>{const i=t.states[e];return i?.attributes.friendly_name||e});return`${e.length} updates available:\n${i.join("\n")}`}function qe(t,e,i,a){if(!e)return F;if(e.show_as_badge)return F;const n=Ge(t,e);if(0===n.length)return F;const s=e.icon_size||"21px",o=e.color||"var(--state-update-active-color, var(--info-color, #039be5))",r=e.icon||Re,c=!0===e.spin_animation,l={"--mdc-icon-size":s,color:o},d=e.tap_action||{action:"more-info"},h=e.hold_action||{action:"more-info"},p=n[0],u=We(t,n),f={"update-icon":!0,"spin-animation":c&&a.isSpinning};return W`
    <div 
      class="intermittent-entity"
      @click=${t=>{t.stopPropagation(),i(d,p)}}
      @contextmenu=${t=>{t.preventDefault(),t.stopPropagation(),i(h,p)}}
      title="${u}"
    >
      <ha-icon
        class=${_t(f)}
        .icon=${r}
        style=${wt(l)}
      ></ha-icon>
      ${n.length>1?W`
        <span class="update-badge">${n.length}</span>
      `:F}
    </div>
  `}function Fe(t,e){return e?Ge(t,e).length:0}function Ze(t){return t.split(".")[0]}function Je(t){if(t.entity)return Ze(t.entity)}function Qe(t){return["unavailable","unknown"].includes(t.state)}function Ke(t,e,i,a){if(a&&a.length>0)return a.includes(e);const n=Ze(t);if("climate"===n&&i){const t=i.hvac_action;if(t)return["heating","cooling","drying","fan","preheating"].includes(t)}const s=se[n];return s?s.includes(e):[Et,Pt,It,zt,Tt,Ut].includes(e)}function Ye(t){const e=[];return t.entity&&e.push(t.entity),t.entities?.length&&e.push(...t.entities),e}function Xe(t,e){if(e.entity)return t.states[e.entity]}function ti(t,e){const i=Xe(t,e);return!i||Qe(i)}function ei(t,e){const i=Ye(e);if(0===i.length)return!1;for(const a of i){const i=t.states[a];if(i&&Ke(a,i.state,i.attributes,e.active_states))return!0}return!1}function ii(t){const e=t.unavailable_handling||{behavior:"off"};return{behavior:e.behavior||"off",icon:e.icon,icon_color:e.icon_color||"var(--disabled-text-color)",background_color:e.background_color||"var(--secondary-background-color)",opacity:e.opacity??.5,show_badge:e.show_badge||!1}}c`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes glow {
    0%, 100% {
      filter: drop-shadow(0 0 2px currentColor);
    }
    50% {
      filter: drop-shadow(0 0 8px currentColor);
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
`,c`
  .animate-spin {
    animation: spin 1s ease-in-out;
  }

  .animate-spin-continuous {
    animation: spin 2s linear infinite;
  }

  .animate-pulse {
    animation: pulse 2s ease-in-out infinite;
  }

  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }

  .animate-flash {
    animation: flash 1s ease-in-out infinite;
  }
`;const ai={motion:{on:"mdi:motion-sensor",off:"mdi:motion-sensor-off"},occupancy:{on:"mdi:home-account",off:"mdi:home-outline"},door:{on:"mdi:door-open",off:"mdi:door-closed"},window:{on:"mdi:window-open",off:"mdi:window-closed"},garage_door:{on:"mdi:garage-open",off:"mdi:garage"},opening:{on:"mdi:square-outline",off:"mdi:square"},lock:{on:"mdi:lock-open",off:"mdi:lock"},moisture:{on:"mdi:water",off:"mdi:water-off"},smoke:{on:"mdi:smoke-detector-alert",off:"mdi:smoke-detector"},gas:{on:"mdi:gas-cylinder",off:"mdi:gas-cylinder"},co:{on:"mdi:molecule-co",off:"mdi:molecule-co"},safety:{on:"mdi:shield-alert",off:"mdi:shield-check"},sound:{on:"mdi:volume-high",off:"mdi:volume-off"},vibration:{on:"mdi:vibrate",off:"mdi:vibrate-off"},presence:{on:"mdi:home",off:"mdi:home-outline"},light:{on:"mdi:brightness-7",off:"mdi:brightness-5"},battery:{on:"mdi:battery-alert",off:"mdi:battery"},battery_charging:{on:"mdi:battery-charging",off:"mdi:battery"},plug:{on:"mdi:power-plug",off:"mdi:power-plug-off"},power:{on:"mdi:flash",off:"mdi:flash-off"},running:{on:"mdi:play",off:"mdi:stop"},problem:{on:"mdi:alert-circle",off:"mdi:check-circle"},tamper:{on:"mdi:alert",off:"mdi:check"},update:{on:"mdi:package-up",off:"mdi:package"},connectivity:{on:"mdi:wifi",off:"mdi:wifi-off"},cold:{on:"mdi:snowflake",off:"mdi:snowflake-off"},heat:{on:"mdi:fire",off:"mdi:fire-off"}};function ni(t,e=.3){if(!t)return`rgba(255, 193, 7, ${e})`;const i=Ze(t.entity_id);if("climate"===i)switch(t.attributes.hvac_action){case"heating":case"preheating":return"var(--state-climate-heat-color, #ff8c00)";case"cooling":return"var(--state-climate-cool-color, #2196f3)";case"drying":return"var(--state-climate-dry-color, #8bc34a)";case"fan":return"var(--state-climate-fan_only-color, #00bcd4)";default:return"var(--secondary-background-color)"}if("light"===i){if("on"===t.state){if(t.attributes.rgb_color){const i=t.attributes.rgb_color;return`rgba(${i[0]}, ${i[1]}, ${i[2]}, ${e})`}return`rgba(255, 193, 7, ${e})`}return"var(--secondary-background-color)"}if("lock"===i){const e=ce[i]?.[t.state];return e||"var(--secondary-background-color)"}return(se[i]||["on"]).includes(t.state)?`rgba(255, 193, 7, ${e})`:"var(--secondary-background-color)"}function si(t){switch(t.attributes.hvac_action){case"heating":case"preheating":return"var(--state-climate-heat-color, #ff8c00)";case"cooling":return"var(--state-climate-cool-color, #2196f3)";case"drying":return"var(--state-climate-dry-color, #8bc34a)";case"fan":return"var(--state-climate-fan_only-color, #00bcd4)";default:return"var(--primary-text-color)"}}function oi(t){if(!t)return;const e=Ze(t.entity_id),i=ce[e];return i&&i[t.state]?i[t.state]:void 0}function ri(t,e){const i=t||"auto";return"auto"===i?function(t){const e=Ze(t.entity_id);if("light"===e&&"on"===t.state){const e=t.attributes.rgb_color;return e?`rgb(${e[0]}, ${e[1]}, ${e[2]})`:"var(--state-light-active-color, var(--amber-color, #ffc107))"}if("climate"===e)switch(t.attributes.hvac_action){case"heating":case"preheating":return"var(--state-climate-heat-color, #ff8c00)";case"cooling":return"var(--state-climate-cool-color, #2196f3)";case"drying":return"var(--state-climate-dry-color, #8bc34a)";case"fan":return"var(--state-climate-fan_only-color, #00bcd4)";default:return"var(--primary-color)"}if("lock"===e)switch(t.state){case"locked":return"var(--state-lock-locked-color, #43a047)";case"unlocked":return"var(--state-lock-unlocked-color, #ffa600)";case"jammed":return"var(--state-lock-jammed-color, #db4437)";default:return"var(--primary-color)"}return"problem"===t.state||"error"===t.state||"jammed"===t.state?"var(--error-color, #db4437)":"var(--primary-color)"}(e):i}function ci(t,e){const i=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});t.dispatchEvent(i)}function li(t){const e=new CustomEvent("hass-assist",{bubbles:!0,composed:!0});t.dispatchEvent(e)}function di(t){window.history.pushState(null,"",t);const e=new CustomEvent("location-changed",{bubbles:!0,composed:!0});window.dispatchEvent(e)}function hi(t){window.open(t,"_blank")}function pi(t,e){t.callService("homeassistant","toggle",{entity_id:e})}function ui(t,e,i){const[a,n]=e.split(".");t.callService(a,n,i||{})}function fi(t,e,i,a){switch(e.action){case"more-info":ci(a,i);break;case"toggle":pi(t,i);break;case"navigate":e.navigation_path&&di(e.navigation_path);break;case"url":e.url_path&&hi(e.url_path);break;case"perform-action":e.service&&ui(t,e.service,e.service_data);break;case"assist":li(a)}}var mi;console.info(`%c ${$t.toUpperCase()} %c v2.0.2-u4 `,"color: white; background: #3498db; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;","color: #3498db; background: #ecf0f1; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;");let gi=mi=class extends lt{constructor(){super(...arguments),this._tapCount=0,this._updateAnimationState={isSpinning:!1}}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={show_name:!0,show_icon:!0,show_state:!1,show_img_cell:!0,icon_animation:"none",tap_action:{action:"toggle"},hold_action:{action:"none"},double_tap_action:{action:"more-info"},...t}}getCardSize(){return 2}disconnectedCallback(){super.disconnectedCallback(),this._tapTimeout&&(clearTimeout(this._tapTimeout),this._tapTimeout=void 0),this._stopUpdateSpinTimer()}_startUpdateSpinTimer(){if(this._stopUpdateSpinTimer(),t=this._config?.update_entities,!0!==t?.spin_animation)return;var t;if(!this.hass||0===Fe(this.hass,this._config?.update_entities))return;const e=function(t){const e=t?.spin_interval??60;return 1e3*Math.max(10,e)}(this._config?.update_entities);this._triggerUpdateSpin(),this._updateSpinTimer=setInterval(()=>{this._triggerUpdateSpin()},e)}_stopUpdateSpinTimer(){this._updateSpinTimer&&(clearInterval(this._updateSpinTimer),this._updateSpinTimer=void 0),this._spinAnimationTimeout&&(clearTimeout(this._spinAnimationTimeout),this._spinAnimationTimeout=void 0)}_triggerUpdateSpin(){this._updateAnimationState={isSpinning:!0},this._spinAnimationTimeout=setTimeout(()=>{this._updateAnimationState={isSpinning:!1}},1e3)}static getConfigElement(){return document.createElement(Ct)}static getStubConfig(){return{type:`custom:${xt}`,name:"Room Name",entity:"",show_name:!0,show_icon:!0}}updated(t){super.updated(t),this._config?.grid_area?this.style.gridArea=this._config.grid_area:this.style.removeProperty("grid-area"),(t.has("hass")||t.has("_config"))&&(t.get("hass")&&!t.has("_config")||this._startUpdateSpinTimer())}shouldUpdate(t){if(t.has("_config"))return!0;if(t.has("_updateAnimationState"))return!0;if(t.has("hass")&&this._config){const e=t.get("hass");return!e||function(t,e,i){const a=function(t){const e=[];if(t.entity&&e.push(t.entity),t.entities?.length&&e.push(...t.entities),t.persistent_entities?.entities&&e.push(...t.persistent_entities.entities.map(t=>t.entity)),t.intermittent_entities?.entities&&e.push(...t.intermittent_entities.entities.map(t=>t.entity)),t.climate_entities){const i=t.climate_entities;i.primary_entities&&e.push(...i.primary_entities),i.temperature_entities&&e.push(...i.temperature_entities),i.humidity_entities&&e.push(...i.humidity_entities),i.air_quality_entities&&e.push(...i.air_quality_entities),i.illuminance_entities&&e.push(...i.illuminance_entities)}return t.power_entities?.entities&&e.push(...t.power_entities.entities),t.battery_entities?.entities&&e.push(...t.battery_entities.entities),t.update_entities?.entities&&e.push(...t.update_entities.entities),t.glow_effects?.length&&e.push(...t.glow_effects.map(t=>t.entity).filter(Boolean)),t.border_entity&&e.push(t.border_entity),t.icon_state_map?.entity&&e.push(t.icon_state_map.entity),e}(t);for(const t of a)if(e.states[t]!==i.states[t])return!0;return!1}(this._config,e,this.hass)}return!1}render(){if(!this._config||!this.hass)return F;const t=Xe(this.hass,this._config),e=ei(this.hass,this._config),i=this._getBorderStyle(),a=function(t,e){if(e.glow_effects?.length)for(const i of e.glow_effects){if(!i.entity)continue;const e=t.states[i.entity];if(!e)continue;const a=[];if(i.state&&a.push(i.state),i.states?.length&&a.push(...i.states),0!==a.length&&a.includes(e.state))return{color:ri(i.color,e),spread:i.spread??4,animation:i.animation||"none"}}}(this.hass,this._config),n=ti(this.hass,this._config),s=ii(this._config),o=n&&"off"!==s.behavior,r=function(t){const e=[];if(t.cardHeight&&e.push(`height: ${t.cardHeight};`),t.cardWidth&&e.push(`width: ${t.cardWidth};`),t.gridTemplateAreas&&e.push(`grid-template-areas: ${t.gridTemplateAreas};`),t.gridTemplateColumns&&e.push(`grid-template-columns: ${t.gridTemplateColumns};`),t.gridTemplateRows&&e.push(`grid-template-rows: ${t.gridTemplateRows};`),t.backgroundGradient?e.push(`background: ${t.backgroundGradient};`):t.backgroundColor&&e.push(`background-color: ${t.backgroundColor};`),t.borderStyle&&e.push(`border: ${t.borderStyle};`),t.glowColor){const i=t.glowSpread??4;e.push(`--glow-color: ${t.glowColor};`),e.push(`--glow-spread: ${i}px;`)}return void 0!==t.unavailableOpacity&&e.push(`opacity: ${t.unavailableOpacity};`),e.join(" ")}({cardHeight:this._config.card_height,cardWidth:this._config.card_width,gridTemplateAreas:this._config.grid?.template_areas,gridTemplateColumns:this._config.grid?.template_columns,gridTemplateRows:this._config.grid?.template_rows,backgroundColor:this._config.background_color,activeBackgroundColor:e?this._config.active_background_color:void 0,backgroundGradient:this._config.background_gradient,borderStyle:i,glowColor:a?.color,glowSpread:a?.spread,glowAnimation:a?.animation,unavailableOpacity:o?s.opacity:void 0}),c={"state-on":e&&!o,"state-off":!e&&!!t&&!o,"state-unavailable":o};a&&!o&&("pulse"===a.animation?c["card-glow-pulse"]=!0:"breathe"===a.animation?c["card-glow-breathe"]=!0:c["card-glow"]=!0);const l=this._getDefinedGridAreas();return W`
      <ha-card
        class=${_t(c)}
        style=${r}
        @click=${this._handleTap}
        @contextmenu=${this._handleHold}
      >
        ${o&&s.show_badge?W`
          <div class="unavailable-badge" title="Entity unavailable">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
          </div>
        `:F}
        ${this._renderBatteryBadge()}
        ${this._renderUpdateBadge()}
        ${this._renderName()}
        ${this._renderLabel()}
        ${this._renderIcon()}
        ${this._renderStateArea()}
        ${this.hass?function(t,e,i){if(!e&&!i)return F;const a=e?.decimal_places??0,n=i?.decimal_places??0,s=!1!==e?.show_primary_unit,o=!1!==e?.show_temperature_unit,r=!1!==e?.show_humidity_unit,c=!1!==e?.show_air_quality_unit,l=!1!==e?.show_illuminance_unit,d=!1!==i?.show_unit;let h=null;e?.primary_entities&&e.primary_entities.length>0&&(h=function(t,e,i=0,a=!0){if(!e?.primary_entities||0===e.primary_entities.length)return null;const n=Ne(t,e.primary_entities,i);return null===n.value?null:a&&n.unit?`${n.value}${n.unit}`:String(n.value)}(t,e,a,s)),h||(h=function(t,e,i=0,a=!0){if(!e?.temperature_entities||0===e.temperature_entities.length)return null;const n=Ne(t,e.temperature_entities,i);if(null!==n.value){const t=a&&n.unit||"°";return`${n.value}${t}`}return null}(t,e,a,o));const p=function(t,e,i=0,a=!0){if(!e?.humidity_entities||0===e.humidity_entities.length)return null;const n=Ne(t,e.humidity_entities,i);if(null!==n.value){const t=a?"%":"";return`${n.value}${t}`}return null}(t,e,a,r),u=function(t,e,i=0,a=!0){if(!e?.air_quality_entities||0===e.air_quality_entities.length)return null;const n=Ne(t,e.air_quality_entities,i);if(null!==n.value){const t=a&&n.unit?n.unit:"";return`${n.value}${t}`}return null}(t,e,a,c),f=function(t,e,i=0,a=!0){if(!e?.illuminance_entities||0===e.illuminance_entities.length)return null;const n=Ne(t,e.illuminance_entities,i);if(null!==n.value){const t=a?"lx":"";return`${n.value}${t}`}return null}(t,e,a,l),m=function(t,e,i=0,a=!0){if(!e?.entities||0===e.entities.length)return null;let n=0,s=0;for(const i of e.entities){const e=t.states[i];if(!e||Be(e))continue;const a=parseFloat(e.state);if(isNaN(a))continue;const o=e.attributes.unit_of_measurement,r=("string"==typeof o?o:"W").toLowerCase();n+="kw"===r?1e3*a:"mw"===r?1e6*a:"gw"===r?1e9*a:a,s++}if(0===s)return null;if(n>=1e3){const t=(n/1e3).toFixed(i);return a?`${t}kW`:t}const o=n.toFixed(i);return a?`${o}W`:o}(t,i,n,d),g=[];return p&&g.push({label:"humidity",value:p}),u&&g.push({label:"air quality",value:u}),f&&g.push({label:"illuminance",value:f}),m&&g.push({label:"power",value:m}),W`
    <div class="climate-section">
      ${h?W`
        <span class="climate-primary">${h}</span>
      `:F}
      ${g.length>0?W`
        <div class="climate-secondary">
          ${g.map(t=>W`
            <span class="climate-value">${t.value}</span>
          `)}
        </div>
      `:F}
    </div>
  `}(this.hass,this._config?.climate_entities,this._config?.power_entities):F}
        ${this._renderEntitySections(l)}
      </ha-card>
    `}_getDefinedGridAreas(){const t=this._config?.grid?.template_areas||"";return{hasCustomGrid:t.length>0,hasNameArea:t.includes("name"),hasLabelArea:t.includes("label"),hasStateArea:/\bstate\b/.test(t),hasPersistentArea:t.includes("persistent"),hasIntermittentArea:t.includes("intermittent"),hasBatteryArea:t.includes("battery"),hasUpdateArea:t.includes("update")}}_renderEntitySections(t){const{hasPersistentArea:e,hasIntermittentArea:i,hasBatteryArea:a,hasUpdateArea:n}=t;if(!(e||i||a||n))return this._renderStatusSection();const s=!a,o=!n;return W`
      ${e?this._renderPersistentEntities(!0):F}
      ${i?this._renderIntermittentEntities(!0,s,o):F}
      ${a?this._renderBatterySection():F}
      ${n?this._renderUpdateSection():F}
    `}_renderBatterySection(){return this.hass&&this._config?.battery_entities?0===Ve(this.hass,this._config.battery_entities)?F:W`
      <div class="battery-section legacy-grid">
        ${Le(this.hass,this._config.battery_entities,this._handleEntityAction.bind(this))}
      </div>
    `:F}_renderUpdateSection(){return this.hass&&this._config?.update_entities?0===Fe(this.hass,this._config.update_entities)?F:W`
      <div class="update-section legacy-grid">
        ${qe(this.hass,this._config.update_entities,this._handleEntityAction.bind(this),this._updateAnimationState)}
      </div>
    `:F}_renderBatteryBadge(){return this.hass&&this._config?.battery_entities?(t=this._config.battery_entities,!0!==t?.show_as_badge?F:function(t,e,i){if(!e||!e.show_as_badge)return F;const a=He(t,e);if(0===a.length)return F;let n=null;for(const e of a){const i=t.states[e];if(i){const t=Oe(i);null!==t&&(null===n||t<n)&&(n=t)}}const s=De(n),o=e.badge_size||he,r=e.badge_icon_size||pe,c=e.badge_position||ve,l=e.badge_color||"var(--state-sensor-battery-low-color, var(--error-color, #db4437))",d={...function(t){switch(t){case fe:return{top:"-10px",left:"-10px",right:"auto",bottom:"auto"};case me:return{top:"auto",left:"auto",right:"-10px",bottom:"-10px"};case ge:return{top:"auto",left:"-10px",right:"auto",bottom:"-10px"};default:return{top:"-10px",left:"auto",right:"-10px",bottom:"auto"}}}(c),width:o,height:o,"background-color":l},h={"--mdc-icon-size":r,color:"white"},p=e.tap_action||{action:"more-info"},u=e.hold_action||{action:"more-info"},f=a[0],m=function(t,e){if(0===e.length)return"";if(1===e.length){const i=t.states[e[0]];return i?`${i.attributes.friendly_name||e[0]}: ${Oe(i)}%`:"1 low battery"}const i=e.map(e=>{const i=t.states[e];return`${i?.attributes.friendly_name||e}: ${Oe(i)}%`});return`${e.length} low batteries:\n${i.join("\n")}`}(t,a);return W`
    <div 
      class="alert-badge alert-badge-battery"
      style=${wt(d)}
      @click=${t=>{t.stopPropagation(),i(p,f)}}
      @contextmenu=${t=>{t.preventDefault(),t.stopPropagation(),i(u,f)}}
      title="${m}"
    >
      <ha-icon
        .icon=${s}
        style=${wt(h)}
      ></ha-icon>
    </div>
  `}(this.hass,this._config.battery_entities,this._handleEntityAction.bind(this))):F;var t}_renderUpdateBadge(){return this.hass&&this._config?.update_entities?(t=this._config.update_entities,!0!==t?.show_as_badge?F:function(t,e,i,a){if(!e||!e.show_as_badge)return F;const n=Ge(t,e);if(0===n.length)return F;const s=e.icon||Re,o=e.badge_size||he,r=e.badge_icon_size||pe,c=e.badge_position||ve,l=e.badge_color||"var(--state-update-active-color, var(--info-color, #039be5))",d=!0===e.spin_animation,h={...function(t){switch(t){case fe:return{top:"-10px",left:"-10px",right:"auto",bottom:"auto"};case me:return{top:"auto",left:"auto",right:"-10px",bottom:"-10px"};case ge:return{top:"auto",left:"-10px",right:"auto",bottom:"-10px"};default:return{top:"-10px",left:"auto",right:"-10px",bottom:"auto"}}}(c),width:o,height:o,"background-color":l},p={"--mdc-icon-size":r,color:"white"},u={"update-icon":!0,"spin-animation":d&&a.isSpinning},f=e.tap_action||{action:"more-info"},m=e.hold_action||{action:"more-info"},g=n[0],v=We(t,n);return W`
    <div 
      class="alert-badge alert-badge-update"
      style=${wt(h)}
      @click=${t=>{t.stopPropagation(),i(f,g)}}
      @contextmenu=${t=>{t.preventDefault(),t.stopPropagation(),i(m,g)}}
      title="${v}"
    >
      <ha-icon
        class=${_t(u)}
        .icon=${s}
        style=${wt(p)}
      ></ha-icon>
    </div>
  `}(this.hass,this._config.update_entities,this._handleEntityAction.bind(this),this._updateAnimationState)):F;var t}_renderStatusSection(){const t=this._config?.persistent_entities?.entities?.length,e=this._config?.intermittent_entities?.entities?.length,i=this._config?.battery_entities,a=this._config?.update_entities,n=this.hass?Ve(this.hass,this._config?.battery_entities):0,s=this.hass?Fe(this.hass,this._config?.update_entities):0;return t||e||0!==n||0!==s?W`
      <div class="status-section">
        ${this._renderPersistentEntities(!1)}
        ${this._renderIntermittentEntities(!1,!1,!1)}
        ${i&&this.hass?Le(this.hass,this._config?.battery_entities,this._handleEntityAction.bind(this)):F}
        ${a&&this.hass?qe(this.hass,this._config?.update_entities,this._handleEntityAction.bind(this),this._updateAnimationState):F}
      </div>
    `:F}_getBorderStyle(){if(!this._config?.border_entity||!this.hass)return;const t=this.hass.states[this._config.border_entity];if(!t)return;const e=this._config.border_width||"2px",i=this._config.border_style||"solid",a=function(t){const e=Ze(t.entity_id);if("climate"===e){const e=t.attributes.hvac_action;if(e)switch(e){case"heating":case"preheating":return"var(--state-climate-heat-color, #ff8c00)";case"cooling":return"var(--state-climate-cool-color, #2196f3)";case"drying":return"var(--state-climate-dry-color, #8bc34a)";case"fan":return"var(--state-climate-fan_only-color, #00bcd4)";default:return}}const i=ce[e];if(i&&i[t.state]){const e=i[t.state];if("var(--primary-text-color)"===e)return;return e}if("on"===t.state)return"var(--state-active-color, var(--amber-color, #ffc107))"}(t);return a?`${e} ${i} ${a}`:void 0}_renderName(){return this._config?.show_name&&this._config.name?W`
      <div class="name-section">
        ${this._config.name}
      </div>
    `:F}_renderLabel(){return this._config?.show_label&&this._config.label?W`
      <div class="label-section">
        ${this._config.label}
      </div>
    `:F}_renderIcon(){const t=Xe(this.hass,this._config),e=ei(this.hass,this._config),i=Je(this._config)||"",a=!1!==this._config?.show_icon,n=this._config?.show_img_cell??!0,s=ti(this.hass,this._config),o=ii(this._config),r=s&&"off"!==o.behavior;let c,l;if(this._config?.icon_state_map?.states&&this.hass){const t=this._config.icon_state_map.entity||this._config.entity,e=t?this.hass.states[t]:void 0;if(e){const t=this._config.icon_state_map.states[e.state];t&&(c=t.icon,l=t.color)}}let d=c||this._config?.icon||function(t){if(!t)return"mdi:home";if(t.attributes.icon)return t.attributes.icon;const e=Ze(t.entity_id);if("climate"===e){const e=t.attributes.hvac_action;if(e)switch(e){case"heating":case"preheating":return"mdi:fire";case"cooling":return"mdi:snowflake";case"drying":return"mdi:water-percent";case"fan":return"mdi:fan";default:return"mdi:thermostat"}}const i=re[e];return i&&i[t.state]?i[t.state]:oe[e]||"mdi:home"}(t);r&&o.icon&&(d=o.icon);const h=e&&this._config?.icon_animation&&"none"!==this._config.icon_animation&&(p=this._config.icon_animation)&&"none"!==p?`animation-${p}`:"";var p;const u={"icon-container":!0,"with-img-cell":n,active:e};h&&(u[h]=!0);const f={};if("spin"===this._config?.icon_animation&&e){const t=this._config?.spin_duration||2;f["--spin-duration"]=`${t}s`}if(n&&this._config?.img_cell_size&&(f.width=this._config.img_cell_size,f.height=this._config.img_cell_size),r&&n)f.background=o.background_color;else if(l&&n)f.background=l;else if(e&&n){const t=function(t,e){const i=Ye(e),a=Je(e),n=e.icon_background_opacity??.3;if("light"!==a)return ni(Xe(t,e),n);const s=[];for(const e of i){const i=t.states[e];if(!i||"on"!==i.state)continue;const a=i.attributes.rgb_color;a&&s.push({r:a[0],g:a[1],b:a[2]})}if(s.length>0){const t=Math.round(s.reduce((t,e)=>t+e.r,0)/s.length),e=Math.round(s.reduce((t,e)=>t+e.g,0)/s.length),i=Math.round(s.reduce((t,e)=>t+e.b,0)/s.length);return`rgba(${t}, ${e}, ${i}, ${n})`}return ni(Xe(t,e),n)}(this.hass,this._config);f.background=t}const m={};if(this._config?.icon_size&&(m["--mdc-icon-size"]=this._config.icon_size,n||(f.width=this._config.icon_size,f.height=this._config.icon_size)),r)m.color=o.icon_color;else if(l&&n)m.color="var(--text-primary-color, #fff)";else if(l)m.color=l;else if(e&&n)m.color="var(--text-primary-color, #fff)";else if(t&&e)if("light"===i)m.color=function(t,e){const i=Ye(e);if("light"!==Je(e)){const i=Xe(t,e);return i?function(t){if("on"===t.state&&t.attributes.rgb_color){const e=t.attributes.rgb_color;return`rgb(${e[0]}, ${e[1]}, ${e[2]})`}return"var(--state-light-active-color, var(--amber-color, #ffc107))"}(i):"var(--state-active-color, var(--amber-color, #ffc107))"}const a=[];for(const e of i){const i=t.states[e];if(!i||"on"!==i.state)continue;const n=i.attributes.rgb_color;n&&a.push({r:n[0],g:n[1],b:n[2]})}if(a.length>0){const t=Math.round(a.reduce((t,e)=>t+e.r,0)/a.length),e=Math.round(a.reduce((t,e)=>t+e.g,0)/a.length),i=Math.round(a.reduce((t,e)=>t+e.b,0)/a.length);return`rgb(${t}, ${e}, ${i})`}return"var(--state-light-active-color, var(--amber-color, #ffc107))"}(this.hass,this._config);else if("climate"===i)m.color=si(t);else{const e=oi(t);m.color=e||"var(--state-active-color, var(--amber-color, #ffc107))"}else if(t&&"climate"===i)m.color=si(t);else if(t){const e=oi(t);e&&(m.color=e)}const g={};switch(this._config?.icon_horizontal_position||Bt){case jt:g["justify-self"]="start";break;case Mt:g["justify-self"]="center";break;default:g["justify-self"]="end"}switch(this._config?.icon_vertical_position||Ot){case Ot:g["align-self"]="start";break;case Dt:g["align-self"]="center";break;case Ht:g["align-self"]="end"}return W`
      <div class="icon-section" style=${wt(g)}>
        ${this._config?.show_state&&t&&!/\bstate\b/.test(this._config?.grid?.template_areas||"")?W`<span class="state-text">${t.state}</span>`:F}
        <div class="icon-wrapper">
          ${a?W`
                <div
                  class=${_t(u)}
                  style=${wt(f)}
                >
                  <ha-icon
                    .icon=${d}
                    style=${wt(m)}
                  ></ha-icon>
                </div>
              `:F}
        </div>
      </div>
    `}_renderStateArea(){if(!this._config?.show_state)return F;const t=Xe(this.hass,this._config);if(!t)return F;const e=this._config?.grid?.template_areas||"";return/\bstate\b/.test(e)?W`
      <div class="state-section">
        ${t.state}
      </div>
    `:F}_renderPersistentEntities(t=!1){if(!this._config?.persistent_entities?.entities?.length||!this.hass)return F;const e=this._config.persistent_entities,i=e.position||"right",a=e.icon_size||"21px",n={gap:e.gap||"4px"};if(t){if(e.padding)n.padding=e.padding;else switch(i){case"left":n.padding="0 0 1px 14px";break;case"center":n.padding="0 0 1px 0";break;default:n.padding="0 0 1px 2px",e.margin||(n.margin="0 3px 0 0")}switch(e.margin&&(n.margin=e.margin),i){case"left":n["justify-self"]="start";break;case"center":n["justify-self"]="center";break;default:n["justify-self"]="end"}}const s=e.entities||[];return W`
      <div class=${_t({"persistent-section":!0,"legacy-grid":t})} style=${wt(n)}>
        ${s.map(t=>this._renderPersistentEntity(t,a))}
      </div>
    `}_renderPersistentEntity(t,e){const i=this.hass?.states[t.entity],a=!i||Qe(i),n=i?.state||"unavailable",s=Ze(t.entity),o=t.states?.find(t=>t.state===n);let r=o?.icon||t.icon;!r&&i?.attributes.icon&&(r=i.attributes.icon),r||(r=function(t,e){if("lock"===t)switch(e){case"locked":return"mdi:lock";case"unlocked":return"mdi:lock-open";case"locking":case"unlocking":return"mdi:lock-clock";case"jammed":return"mdi:lock-alert";default:return"mdi:lock-question"}if("binary_sensor"===t)return"on"===e?"mdi:motion-sensor":"mdi:motion-sensor-off";if("cover"===t)switch(e){case"open":case"opening":return"mdi:door-open";case"closed":case"closing":return"mdi:door-closed";default:return"mdi:door"}return"switch"===t?"on"===e?"mdi:toggle-switch":"mdi:toggle-switch-off":"light"===t?"on"===e?"mdi:lightbulb":"mdi:lightbulb-off":"mdi:help-circle"}(s,n));let c=o?.color;c||(c=function(t,e,i){if(i)return"var(--disabled-text-color, #9e9e9e)";if("lock"===t)switch(e){case"locked":return"var(--state-lock-locked-color, #43a047)";case"unlocked":return"var(--state-lock-unlocked-color, #ffc107)";case"locking":return"var(--state-lock-locking-color, #ffc107)";case"unlocking":return"var(--state-lock-unlocking-color, #ffc107)";case"jammed":return"var(--state-lock-jammed-color, #db4437)";case"open":return"var(--state-lock-open-color, #db4437)";default:return"var(--primary-text-color)"}if("binary_sensor"===t)return"on"===e?"var(--state-binary_sensor-active-color, var(--amber-color, #ffc107))":"var(--primary-text-color)";if("cover"===t)switch(e){case"open":case"opening":return"var(--state-cover-open-color, #ffc107)";case"closed":case"closing":return"var(--state-cover-closed-color, #43a047)";default:return"var(--primary-text-color)"}return"switch"===t?"on"===e?"var(--state-switch-active-color, var(--amber-color, #ffc107))":"var(--primary-text-color)":"light"===t?"on"===e?"var(--state-light-active-color, var(--amber-color, #ffc107))":"var(--primary-text-color)":"on"===e||"home"===e||"open"===e?"var(--state-active-color, var(--amber-color, #ffc107))":"var(--primary-text-color)"}(s,n,a));const l=t.icon_size||e,d={width:l,height:l,color:c,"--mdc-icon-size":l};return W`
      <div
        class="persistent-entity"
        @click=${e=>{e.stopPropagation(),t.tap_action?this._handlePersistentAction(t.tap_action,t.entity):ci(this,t.entity)}}
        @contextmenu=${e=>{e.stopPropagation(),e.preventDefault(),t.hold_action&&this._handlePersistentAction(t.hold_action,t.entity)}}
        title="${i?.attributes.friendly_name||t.entity}: ${n}"
      >
        <ha-icon
          .icon=${r}
          style=${wt(d)}
        ></ha-icon>
      </div>
    `}_handlePersistentAction(t,e){this.hass&&fi(this.hass,t,e,this)}_renderIntermittentEntities(t=!1,e=!1,i=!1){const a=this._config?.intermittent_entities,n=a?.icon_size||"21px",s=a?.gap||"4px",o=a?.active_states,r=a?.animation,c=(a?.entities||[]).filter(t=>this._isIntermittentEntityActive(t,o)),l=e&&this.hass&&this._config?.battery_entities&&Ve(this.hass,this._config.battery_entities)>0,d=i&&this.hass&&this._config?.update_entities&&Fe(this.hass,this._config.update_entities)>0;if(0===c.length&&!l&&!d)return F;const h={gap:s};return W`
      <div class=${_t({"intermittent-section":!0,"legacy-grid":t})} style=${wt(h)}>
        ${c.map(t=>this._renderIntermittentEntity(t,n,r))}
        ${l?Le(this.hass,this._config.battery_entities,this._handleEntityAction.bind(this)):F}
        ${d?qe(this.hass,this._config.update_entities,this._handleEntityAction.bind(this),this._updateAnimationState):F}
      </div>
    `}_isIntermittentEntityActive(t,e){if(!this.hass)return!1;const i=this.hass.states[t.entity];if(!i)return!1;if(["unavailable","unknown"].includes(i.state))return!1;const a=i.state,n=Ze(t.entity);return(t.active_states||e||se[n]||["on"]).includes(a)}_renderIntermittentEntity(t,e,i){if(!this.hass)return F;const a=this.hass.states[t.entity];if(!a)return F;const n=a.state,s=Ze(t.entity);let o=t.icon;const r=t.states?.find(t=>t.state===n);r?.icon?o=r.icon:o||(o=function(t,e,i){return i.attributes.icon?i.attributes.icon:"binary_sensor"===t?function(t,e){const i="on"===e;return t&&ai[t]?i?ai[t].on:ai[t].off:i?"mdi:checkbox-marked-circle":"mdi:checkbox-blank-circle-outline"}(i.attributes.device_class,e):re[t]?.[e]?re[t][e]:oe[t]||"mdi:alert-circle"}(s,n,a));let c=function(t,e){return ce[t]?.[e]?ce[t][e]:(se[t]||["on"]).includes(e)?"var(--state-active-color, var(--amber-color, #ffc107))":"var(--primary-text-color)"}(s,n);r?.color&&(c=r.color);const l=r?.animation||t.animation||i,d=t.icon_size||e,h=t.tap_action||{action:"more-info"},p=t.hold_action||{action:"more-info"},u={"--mdc-icon-size":d,color:c};return W`
      <div
        class=${_t({"intermittent-entity":!0,[`animation-${l}`]:!!l})}
        @click=${e=>{e.stopPropagation(),this._handleIntermittentAction(h,t.entity)}}
        @contextmenu=${e=>{e.preventDefault(),e.stopPropagation(),this._handleIntermittentAction(p,t.entity)}}
        title="${a.attributes.friendly_name||t.entity}: ${n}"
      >
        <ha-icon
          .icon=${o}
          style=${wt(u)}
        ></ha-icon>
      </div>
    `}_handleIntermittentAction(t,e){this.hass&&fi(this.hass,t,e,this)}_handleEntityAction(t,e){this.hass&&fi(this.hass,t,e,this)}_handleTap(t){t.stopPropagation(),this._tapCount++,1===this._tapCount?this._tapTimeout=setTimeout(()=>{1===this._tapCount&&this._config?.tap_action&&this._handleAction(this._config.tap_action),this._tapCount=0},mi.TAP_DEBOUNCE_MS):2===this._tapCount&&(this._tapTimeout&&(clearTimeout(this._tapTimeout),this._tapTimeout=void 0),this._tapCount=0,this._config?.double_tap_action&&this._handleAction(this._config.double_tap_action))}_handleHold(t){t.preventDefault(),t.stopPropagation(),this._tapTimeout&&(clearTimeout(this._tapTimeout),this._tapTimeout=void 0),this._tapCount=0,this._config?.hold_action&&this._handleAction(this._config.hold_action)}_handleAction(t){this.hass&&this._config&&function(t,e,i,a){const n=i.entity,s=Ye(i);switch(e.action){case"toggle":s.length>0&&pi(t,s);break;case"more-info":n&&ci(a,n);break;case"navigate":e.navigation_path&&di(e.navigation_path);break;case"url":e.url_path&&hi(e.url_path);break;case"perform-action":e.service&&ui(t,e.service,e.service_data);break;case"assist":li(a)}}(this.hass,t,this._config,this)}};gi.TAP_DEBOUNCE_MS=250,gi.styles=Ue,t([ft({attribute:!1}),e("design:type",Object)],gi.prototype,"hass",void 0),t([mt(),e("design:type",Object)],gi.prototype,"_config",void 0),t([mt(),e("design:type",Object)],gi.prototype,"_updateAnimationState",void 0),gi=mi=t([ht(xt)],gi),window.customCards=window.customCards||[],window.customCards.push({type:xt,name:$t.split("-").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" "),description:"A comprehensive room status card for Home Assistant"});export{gi as UnifiedRoomCard};
