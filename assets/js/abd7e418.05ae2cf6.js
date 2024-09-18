"use strict";(self.webpackChunk_modern_kit_docs=self.webpackChunk_modern_kit_docs||[]).push([[5554],{4077:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>d,default:()=>h,frontMatter:()=>s,metadata:()=>i,toc:()=>a});var c=t(1986),r=t(9937);const s={},d="compact",i={id:"utils/array/compact",title:"compact",description:"\ubc30\uc5f4\uc5d0\uc11c false, 0, '', null, undefined \uac12\uc744 \uc81c\uac70\ud558\uace0 \uc0c8\ub85c\uc6b4 \ubc30\uc5f4\uc744 \ubc18\ud658\ud558\ub294 \ud568\uc218\uc785\ub2c8\ub2e4.",source:"@site/docs/utils/array/compact.md",sourceDirName:"utils/array",slug:"/utils/array/compact",permalink:"/modern-kit/docs/utils/array/compact",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"chunk",permalink:"/modern-kit/docs/utils/array/chunk"},next:{title:"contains",permalink:"/modern-kit/docs/utils/array/contains"}},l={},a=[{value:"Code",id:"code",level:2},{value:"Benchmark",id:"benchmark",level:2},{value:"Interface",id:"interface",level:2},{value:"Usage",id:"usage",level:2}];function o(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n.header,{children:(0,c.jsx)(n.h1,{id:"compact",children:"compact"})}),"\n",(0,c.jsxs)(n.p,{children:["\ubc30\uc5f4\uc5d0\uc11c ",(0,c.jsx)(n.code,{children:"false"}),", ",(0,c.jsx)(n.code,{children:"0"}),", ",(0,c.jsx)(n.code,{children:"''"}),", ",(0,c.jsx)(n.code,{children:"null"}),", ",(0,c.jsx)(n.code,{children:"undefined"})," \uac12\uc744 \uc81c\uac70\ud558\uace0 \uc0c8\ub85c\uc6b4 \ubc30\uc5f4\uc744 \ubc18\ud658\ud558\ub294 \ud568\uc218\uc785\ub2c8\ub2e4."]}),"\n",(0,c.jsx)("br",{}),"\n",(0,c.jsx)(n.h2,{id:"code",children:"Code"}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.a,{href:"https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/compact/index.ts",children:"\ud83d\udd17 \uc2e4\uc81c \uad6c\ud604 \ucf54\ub4dc \ud655\uc778"})}),"\n",(0,c.jsx)(n.h2,{id:"benchmark",children:"Benchmark"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"hz"}),": \ucd08\ub2f9 \uc791\uc5c5 \uc218"]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"mean"}),": \ud3c9\uade0 \uc751\ub2f5 \uc2dc\uac04(ms)"]}),"\n"]}),"\n",(0,c.jsxs)(n.table,{children:[(0,c.jsx)(n.thead,{children:(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.th,{children:"\uc774\ub984"}),(0,c.jsx)(n.th,{children:"hz"}),(0,c.jsx)(n.th,{children:"mean"}),(0,c.jsx)(n.th,{children:"\uc131\ub2a5"})]})}),(0,c.jsxs)(n.tbody,{children:[(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:"modern-kit/compact"}),(0,c.jsx)(n.td,{children:"7,306,246.60"}),(0,c.jsx)(n.td,{children:"0.0004"}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:"fastest"})})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:"lodash/compact"}),(0,c.jsx)(n.td,{children:"5,472,880.46"}),(0,c.jsx)(n.td,{children:"0.0006"}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:"slowest"})})]})]})]}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:"modern-kit/compact"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"1.33x"})," faster than lodash/compact"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(n.h2,{id:"interface",children:"Interface"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-ts",metastring:'title="typescript"',children:"type Removable = false | 0 | '' | null | undefined;\ntype Retained<T> = Exclude<T, Removable>;\n\nconst compact: <T>(arr: T[] | readonly T[]) => Retained<T>[];\n"})}),"\n",(0,c.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-ts",metastring:'title="typescript"',children:"import { compact } from '@modern-kit/utils';\n\ncompact([0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);\n// [1, 2, 3, 4, 5]\n"})})]})}function h(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}},9937:(e,n,t)=>{t.d(n,{Z:()=>i,a:()=>d});var c=t(7800);const r={},s=c.createContext(r);function d(e){const n=c.useContext(s);return c.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:d(e.components),c.createElement(s.Provider,{value:n},e.children)}}}]);