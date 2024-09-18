"use strict";(self.webpackChunk_modern_kit_docs=self.webpackChunk_modern_kit_docs||[]).push([[7180],{9629:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>o,frontMatter:()=>d,metadata:()=>c,toc:()=>a});var t=r(1986),s=r(9937);const d={},i="range",c={id:"utils/math/range",title:"range",description:"\uc8fc\uc5b4\uc9c4 \ubc94\uc704 \ub0b4\uc758 \uc22b\uc790 \ubc30\uc5f4\uc744 \uc0dd\uc131\ud569\ub2c8\ub2e4.",source:"@site/docs/utils/math/range.md",sourceDirName:"utils/math",slug:"/utils/math/range",permalink:"/modern-kit/docs/utils/math/range",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"min",permalink:"/modern-kit/docs/utils/math/min"},next:{title:"sum",permalink:"/modern-kit/docs/utils/math/sum"}},l={},a=[{value:"Code",id:"code",level:2},{value:"Benchmark",id:"benchmark",level:2},{value:"Interface",id:"interface",level:2},{value:"Usage",id:"usage",level:2},{value:"Default",id:"default",level:3}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"range",children:"range"})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"\uc8fc\uc5b4\uc9c4 \ubc94\uc704 \ub0b4\uc758 \uc22b\uc790 \ubc30\uc5f4"}),"\uc744 \uc0dd\uc131\ud569\ub2c8\ub2e4."]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"\ud558\ub098\uc758 \uc778\uc790"}),"\ub9cc \ub4e4\uc5b4\uc624\ub294 \uacbd\uc6b0 ",(0,t.jsx)(n.code,{children:"0\ubd80\ud130 \ud574\ub2f9 \uac12 \uc804\uae4c\uc9c0\uc758 \uc22b\uc790 \ubc30\uc5f4"}),"\uc744 \uc0dd\uc131\ud569\ub2c8\ub2e4."]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"\ub450 \uac1c\uc758 \uc778\uc790"}),"\uac00 \ub4e4\uc5b4\uc624\ub294 \uacbd\uc6b0 ",(0,t.jsx)(n.code,{children:"\uccab \ubc88\uc9f8 \uc778\uc790\uac12\uc744 \ud3ec\ud568"}),"\ud558\uc5ec ",(0,t.jsx)(n.code,{children:"\ub450 \ubc88\uc9f8 \uc778\uc790\uac12 \uc804\uae4c\uc9c0\uc758 \uc22b\uc790 \ubc30\uc5f4"}),"\uc744 \uc0dd\uc131\ud558\uba70, ",(0,t.jsx)(n.code,{children:"\uc74c\uc218"})," \uc0ac\uc774\uc758 \uac04\uaca9\ub3c4 \uad6c\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"\uc138 \ubc88\uc9f8 \uc778\uc790"}),"\ub85c ",(0,t.jsx)(n.code,{children:"\uac04\uaca9(step)"}),"\uc744 \uba85\uc2dc\ud574\uc8fc\uba74, \uccab \ubc88\uc9f8 \uc778\uc790\uac12\ubd80\ud130 \ub450 \ubc88\uc9f8 \uc778\uc790\uac12 \uc804\uae4c\uc9c0\uc758 \uc22b\uc790 \uc911 ",(0,t.jsx)(n.code,{children:"\uc8fc\uc5b4\uc9c4 \uac04\uaca9\ub9cc\ud07c \ub5a8\uc5b4\uc9c4 \uac12\ub4e4\uc744 \ud3ec\ud568\ud558\ub294 \ubc30\uc5f4\uc744 \uc0dd\uc131"}),"\ud569\ub2c8\ub2e4."]}),"\n",(0,t.jsx)("br",{}),"\n",(0,t.jsx)(n.h2,{id:"code",children:"Code"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/math/range/index.ts",children:"\ud83d\udd17 \uc2e4\uc81c \uad6c\ud604 \ucf54\ub4dc \ud655\uc778"})}),"\n",(0,t.jsx)(n.h2,{id:"benchmark",children:"Benchmark"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"hz"}),": \ucd08\ub2f9 \uc791\uc5c5 \uc218"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"mean"}),": \ud3c9\uade0 \uc751\ub2f5 \uc2dc\uac04(ms)"]}),"\n"]}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:"\uc774\ub984"}),(0,t.jsx)(n.th,{children:"hz"}),(0,t.jsx)(n.th,{children:"mean"}),(0,t.jsx)(n.th,{children:"\uc131\ub2a5"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"modern-kit/range"}),(0,t.jsx)(n.td,{children:"5,006,149.95"}),(0,t.jsx)(n.td,{children:"0.0002"}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"fastest"})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"lodash/range"}),(0,t.jsx)(n.td,{children:"3,468,585.03"}),(0,t.jsx)(n.td,{children:"0.0003"}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"slowest"})})]})]})]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"modern-kit/range"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"1.44x"})," faster than lodash/range"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"interface",children:"Interface"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:'title="typescript"',children:"// \ud568\uc218 \uc624\ubc84\ub85c\ub529\nfunction range(end: number): number[];\nfunction range(start: number, end: number): number[];\nfunction range(start: number, end: number, step: number): number[];\n"})}),"\n",(0,t.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,t.jsx)(n.h3,{id:"default",children:"Default"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:'title="typescript"',children:"import { range } from '@modern-kit/utils';\n\nconst result1 = range(5); // [0, 1, 2, 3, 4]\nconst result2 = range(1, 6); // [1, 2, 3, 4, 5]\nconst result3 = range(1, 6, 2); // [1, 3, 5]\nconst result4 = range(-10, -5, 1); // [-10, -9, -8, -7, -6]\nconst result5 = range(10, 5, -1); // [10, 9, 8, 7, 6]\n"})})]})}function o(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},9937:(e,n,r)=>{r.d(n,{Z:()=>c,a:()=>i});var t=r(7800);const s={},d=t.createContext(s);function i(e){const n=t.useContext(d);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),t.createElement(d.Provider,{value:n},e.children)}}}]);