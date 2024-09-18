"use strict";(self.webpackChunk_modern_kit_docs=self.webpackChunk_modern_kit_docs||[]).push([[178],{801:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>o,frontMatter:()=>s,metadata:()=>i,toc:()=>c});var r=n(1986),a=n(9937);const s={},l="flatMap",i={id:"utils/array/flatMap",title:"flatMap",description:"\uac01 \ubc30\uc5f4 \uc694\uc18c\ub97c iteratee \ud568\uc218\ub85c \ub9e4\ud551\ud558\uace0 \uc9c0\uc815\ub41c \uae4a\uc774\uae4c\uc9c0 \uacb0\uacfc\ub97c \ud3c9\ud0c4\ud654\ud569\ub2c8\ub2e4.",source:"@site/docs/utils/array/flatMap.md",sourceDirName:"utils/array",slug:"/utils/array/flatMap",permalink:"/modern-kit/docs/utils/array/flatMap",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"fill",permalink:"/modern-kit/docs/utils/array/fill"},next:{title:"flatMapDeep",permalink:"/modern-kit/docs/utils/array/flatMapDeep"}},d={},c=[{value:"Code",id:"code",level:2},{value:"Benchmark",id:"benchmark",level:2},{value:"Interface",id:"interface",level:2},{value:"Usage",id:"usage",level:2}];function h(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,a.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"flatmap",children:"flatMap"})}),"\n",(0,r.jsx)(t.p,{children:"\uac01 \ubc30\uc5f4 \uc694\uc18c\ub97c iteratee \ud568\uc218\ub85c \ub9e4\ud551\ud558\uace0 \uc9c0\uc815\ub41c \uae4a\uc774\uae4c\uc9c0 \uacb0\uacfc\ub97c \ud3c9\ud0c4\ud654\ud569\ub2c8\ub2e4."}),"\n",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(t.h2,{id:"code",children:"Code"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.a,{href:"https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/flatMap/index.ts",children:"\ud83d\udd17 \uc2e4\uc81c \uad6c\ud604 \ucf54\ub4dc \ud655\uc778"})}),"\n",(0,r.jsx)(t.h2,{id:"benchmark",children:"Benchmark"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"hz"}),": \ucd08\ub2f9 \uc791\uc5c5 \uc218"]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"mean"}),": \ud3c9\uade0 \uc751\ub2f5 \uc2dc\uac04(ms)"]}),"\n"]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"\uc774\ub984"}),(0,r.jsx)(t.th,{children:"hz"}),(0,r.jsx)(t.th,{children:"mean"}),(0,r.jsx)(t.th,{children:"\uc131\ub2a5"})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"modern-kit/flatMap"}),(0,r.jsx)(t.td,{children:"294,327,51"}),(0,r.jsx)(t.td,{children:"0.0034"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"fastest"})})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"lodash/flatMapDepth"}),(0,r.jsx)(t.td,{children:"267,170,29"}),(0,r.jsx)(t.td,{children:"0.0037"}),(0,r.jsx)(t.td,{children:"-"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"js built-in/map.flat"}),(0,r.jsx)(t.td,{children:"82,654,90"}),(0,r.jsx)(t.td,{children:"0.0121"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"slowest"})})]})]})]}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"modern-kit/flatMap"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"1.10x"})," faster than lodash/flatMapDepth"]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"3.56x"})," faster than js built-in/map.flat"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"interface",children:"Interface"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",metastring:'title="typescript"',children:'type FlatArray<Arr, Depth extends number> = {\n    "done": Arr,\n    "recur": Arr extends ReadonlyArray<infer InnerArr>\n        ? FlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>\n        : Arr\n}[Depth extends -1 ? "done" : "recur"];\n'})}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",metastring:'title="typescript"',children:"function flatMap<T, U, D extends number>(\n  arr: T[] | readonly T[],\n  iteratee: (item: T) => U,\n  depth?: D\n): FlatArray<U[], D>[];\n"})}),"\n",(0,r.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",metastring:'title="typescript"',children:"import { flatMap } from '@modern-kit/utils';\n\nconst arr = [1, 2, 3];\n\nflatMap(arr, (item: number) => [item, item]);\n// [1, 1, 2, 2, 3, 3]\n\nflatMap(arr, (item: number) => [[item, item]], 2);\n// [1, 1, 2, 2, 3, 3]\n"})})]})}function o(e={}){const{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},9937:(e,t,n)=>{n.d(t,{Z:()=>i,a:()=>l});var r=n(7800);const a={},s=r.createContext(a);function l(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:l(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);