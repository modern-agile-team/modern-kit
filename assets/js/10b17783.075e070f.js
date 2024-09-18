"use strict";(self.webpackChunk_modern_kit_docs=self.webpackChunk_modern_kit_docs||[]).push([[5352],{7107:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>s,metadata:()=>o,toc:()=>d});var i=r(1986),t=r(9937);const s={},a="serialize",o={id:"utils/string/serialize",title:"serialize",description:"\uac1d\uccb4\ub85c \ub4e4\uc5b4\uc628 \uac12\uc744 query paramater\ub85c \uc0ac\uc6a9\ud560 \uc218 \uc788\ub3c4\ub85d \uc9c1\ub82c\ud654\ud574\uc90d\ub2c8\ub2e4.",source:"@site/docs/utils/string/serialize.md",sourceDirName:"utils/string",slug:"/utils/string/serialize",permalink:"/modern-kit/docs/utils/string/serialize",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"reverseString",permalink:"/modern-kit/docs/utils/string/reverseString"},next:{title:"rem",permalink:"/modern-kit/docs/utils/style/rem"}},l={},d=[{value:"Code",id:"code",level:2},{value:"Interface",id:"interface",level:2},{value:"Usage",id:"usage",level:2}];function c(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"serialize",children:"serialize"})}),"\n",(0,i.jsxs)(n.p,{children:["\uac1d\uccb4\ub85c \ub4e4\uc5b4\uc628 \uac12\uc744 ",(0,i.jsx)(n.code,{children:"query paramater\ub85c \uc0ac\uc6a9\ud560 \uc218 \uc788\ub3c4\ub85d \uc9c1\ub82c\ud654"}),"\ud574\uc90d\ub2c8\ub2e4."]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"\uac1d\uccb4 \ub0b4\uc5d0 \ubc30\uc5f4\ub85c \ub4e4\uc5b4\uc628 \uac12"}),"\uc758 \uacbd\uc6b0 \ubc30\uc5f4 \ub0b4\uc758 \uac12\uc5d0 \ub300\ud574 ",(0,i.jsx)(n.code,{children:"\uc804\ubd80 key-value \ud615\ud0dc\ub85c \ubcc0\ud658\ud558\uc5ec \uc9c1\ub82c\ud654"}),"\ud574\uc90d\ub2c8\ub2e4."]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"\ub450\ubc88\uc9f8 \uc778\uc790"}),"\ub85c ",(0,i.jsx)(n.code,{children:"option"}),"\uc744 \ub123\uc5b4\uc904 \uc218 \uc788\uc73c\uba70, option\uc73c\ub85c ",(0,i.jsx)(n.code,{children:"null, empty string, undefined\uc5d0 \ub300\ud55c \ucc98\ub9ac\ub97c \uc9c0\uc815"}),"\ud560 \uc218 \uc788\uc73c\uba70 ",(0,i.jsx)(n.code,{children:"\uae30\ubcf8\uc801\uc73c\ub85c \uc774 \uac12\uc5d0 \ub300\ud574\uc11c\ub294 \ubaa8\ub450 \uc81c\uc678"}),"\ub429\ub2c8\ub2e4."]}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(n.h2,{id:"code",children:"Code"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/serialize/index.ts",children:"\ud83d\udd17 \uc2e4\uc81c \uad6c\ud604 \ucf54\ub4dc \ud655\uc778"})}),"\n",(0,i.jsx)(n.h2,{id:"interface",children:"Interface"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="typescript"',children:"interface SerializeOptions {\n  skipNull?: boolean;\n  skipEmptyString?: boolean;\n  skipUndefined?: boolean;\n}\n\nfunction serialize<T extends Record<PropertyKey, any>>(\n  obj: T,\n  options?: SerializeOptions\n): string;\n"})}),"\n",(0,i.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="typescript"',children:"import { serialize } from '@modern-kit/utils';\n\nconst serializedValue = serialize({ str: 123, foo: 'bar' }) // 'str=123&foo=bar'\n\nconst paramaterWithInvalidValue = { str: 123, foo: 'bar', name: null, phone: '' }\nconst serializedValue = serialize(paramaterWithInvalidValue); // 'str=123&foo=bar'\n\nconst paramaterWithArray = { str: 123, foo: 'bar', num: [1,2,3] }\nconst serializedValue = serialize(paramaterWithArray); // 'str=123&foo=bar&num=1&num=2&num=3'\n\nconst paramater = { str: null, foo: '', bar: undefined }\nconst options = { skipNull: false, skipEmptyString: false, skipUndefined: false }\nconst serializedValue = serialize(paramater, options); // 'str=null&foo=&bar=undefined'\n"})})]})}function u(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},9937:(e,n,r)=>{r.d(n,{Z:()=>o,a:()=>a});var i=r(7800);const t={},s=i.createContext(t);function a(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);