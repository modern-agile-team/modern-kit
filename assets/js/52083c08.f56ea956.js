"use strict";(self.webpackChunk_modern_kit_docs=self.webpackChunk_modern_kit_docs||[]).push([[259],{5670:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>l,frontMatter:()=>i,metadata:()=>s,toc:()=>a});var t=o(1986),r=o(9937);const i={},c="deepCopy",s={id:"utils/common/deepCopy",title:"deepCopy",description:"\uc778\uc790\ub85c \uc8fc\uc5b4\uc9c4 \uac12\uc744 \uae4a\uc740 \ubcf5\uc0ac\ub97c \uc218\ud589\ud558\ub294 \ud568\uc218\uc785\ub2c8\ub2e4.",source:"@site/docs/utils/common/deepCopy.md",sourceDirName:"utils/common",slug:"/utils/common/deepCopy",permalink:"/modern-kit/docs/utils/common/deepCopy",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"asyncNoop",permalink:"/modern-kit/docs/utils/common/asyncNoop"},next:{title:"delay",permalink:"/modern-kit/docs/utils/common/delay"}},d={},a=[{value:"Code",id:"code",level:2},{value:"Interface",id:"interface",level:2},{value:"Usage",id:"usage",level:2}];function p(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"deepcopy",children:"deepCopy"})}),"\n",(0,t.jsxs)(n.p,{children:["\uc778\uc790\ub85c \uc8fc\uc5b4\uc9c4 \uac12\uc744 ",(0,t.jsx)(n.code,{children:"\uae4a\uc740 \ubcf5\uc0ac"}),"\ub97c \uc218\ud589\ud558\ub294 \ud568\uc218\uc785\ub2c8\ub2e4."]}),"\n",(0,t.jsx)("br",{}),"\n",(0,t.jsx)(n.h2,{id:"code",children:"Code"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/deepCopy/index.ts",children:"\ud83d\udd17 \uc2e4\uc81c \uad6c\ud604 \ucf54\ub4dc \ud655\uc778"})}),"\n",(0,t.jsx)(n.h2,{id:"interface",children:"Interface"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:'title="typescript"',children:"const deepCopy: <T>(value: T) => T\n"})}),"\n",(0,t.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:'title="typescript"',children:"import { deepCopy } from '@modern-kit/utils';\n\nconst originNum = 42;\nconst copyNum = deepCopy(originNum);\n\nconst originObj = { a: 1, b: { c: 2 } };\nconst copyObj = deepCopy(originObj);\n\nconst originArray = [1, 2, [3, 4]];\nconst copyArray = deepCopy(originArray);\n\nconst originSet = new Set([1, 2, 3]);\nconst copySet = deepCopy(originSet);\n\nconst originMap = new Map([\n  ['a', 1],\n  ['b', 2],\n]);\nconst copyMap = deepCopy(originMap);\n"})})]})}function l(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(p,{...e})}):p(e)}},9937:(e,n,o)=>{o.d(n,{Z:()=>s,a:()=>c});var t=o(7800);const r={},i=t.createContext(r);function c(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);