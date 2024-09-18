"use strict";(self.webpackChunk_modern_kit_docs=self.webpackChunk_modern_kit_docs||[]).push([[450],{6487:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>c,default:()=>u,frontMatter:()=>l,metadata:()=>d,toc:()=>i});var r=t(1986),s=t(9937);const l={},c="excludeElements",d={id:"utils/array/excludeElements",title:"excludeElements",description:"1\ubc88\uc9f8 \ub9e4\uac1c\ubcc0\uc218\ub85c \uc804\ub2ec\ub41c \ubc30\uc5f4\uc744 \uae30\uc900\uc73c\ub85c 2\ubc88\uc9f8 \ubc30\uc5f4\uc758 \uc694\uc18c\ub4e4\uc744 \uc81c\uc678\ud558\ub294 \uc720\ud2f8 \ud568\uc218\uc785\ub2c8\ub2e4.",source:"@site/docs/utils/array/excludeElements.md",sourceDirName:"utils/array",slug:"/utils/array/excludeElements",permalink:"/modern-kit/docs/utils/array/excludeElements",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"drop",permalink:"/modern-kit/docs/utils/array/drop"},next:{title:"fill",permalink:"/modern-kit/docs/utils/array/fill"}},a={},i=[{value:"Code",id:"code",level:2},{value:"Interface",id:"interface",level:2},{value:"Usage",id:"usage",level:2}];function o(e){const n={a:"a",br:"br",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"excludeelements",children:"excludeElements"})}),"\n",(0,r.jsx)(n.p,{children:"1\ubc88\uc9f8 \ub9e4\uac1c\ubcc0\uc218\ub85c \uc804\ub2ec\ub41c \ubc30\uc5f4\uc744 \uae30\uc900\uc73c\ub85c 2\ubc88\uc9f8 \ubc30\uc5f4\uc758 \uc694\uc18c\ub4e4\uc744 \uc81c\uc678\ud558\ub294 \uc720\ud2f8 \ud568\uc218\uc785\ub2c8\ub2e4."}),"\n",(0,r.jsxs)(n.p,{children:["\uc6d0\uc2dc\uac12\uc758 \uacbd\uc6b0 \uba85\ud655\ud55c \ud0c0\uc785\uccb4\ud06c\ub97c \uc704\ud574 ",(0,r.jsx)(n.code,{children:"as const"})," \uc0ac\uc6a9\uc744 \uad8c\uc7a5\ub4dc\ub9bd\ub2c8\ub2e4.",(0,r.jsx)(n.br,{}),"\n","\uae30\ubcf8\uc801\uc73c\ub85c \uc6d0\uc2dc\uac12\uc5d0 \ub300\ud55c \ube44\uad50\ub97c \uc9c4\ud589\ud558\uba70, \ucc38\uc870\ud615\uc758 \uacbd\uc6b0 3\ubc88\uc9f8 ",(0,r.jsx)(n.code,{children:"iteratee"})," \ud568\uc218 \uacb0\uacfc\ub97c \ud1b5\ud574 \uc81c\uc678 \ud560 \uc694\uc18c\ub97c \uacb0\uc815 \ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."]}),"\n",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(n.h2,{id:"code",children:"Code"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/excludeElements/index.ts",children:"\ud83d\udd17 \uc2e4\uc81c \uad6c\ud604 \ucf54\ub4dc \ud655\uc778"})}),"\n",(0,r.jsx)(n.h2,{id:"interface",children:"Interface"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",metastring:'title="typescript"',children:"const excludeElements: <T, U>(\n  arr: T[] | readonly T[],\n  excludeArr: T[] | readonly T[],\n  iteratee?: ((item: T) => U) | undefined\n) => T[];\n"})}),"\n",(0,r.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",metastring:'title="typescript"',children:"import { excludeElements } from '@modern-kit/utils';\n\nconst array = [1, 2, 3, 4];\nconst excluded = [3, 4]\n\nexcludeElements(array, excluded); // [1, 2]\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",metastring:'title="typescript"',children:"import { excludeElements } from '@modern-kit/utils';\n\nconst array = ['a', 'b', 'c', 'd'];\nconst excluded = ['a']\n\nexcludeElements(array, excluded); // ['b', 'c', 'd']\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",metastring:'title="typescript"',children:"import { excludeElements } from '@modern-kit/utils';\n\nconst array = [[3, 'a'], [4, 'b']];\nconst excluded = [[3, 'a']]\n\nexcludeElements(array, excluded, (item) => JSON.stringify(item)); // [4, 'b']\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",metastring:'title="typescript"',children:"import { excludeElements } from '@modern-kit/utils';\n\nconst array = [\n  { name: 'kim', address: { city: 'Seoul' } },\n  { name: 'lee', address: { city: 'NewYork' } },\n];\nconst excluded = [{ name: 'kim', address: { city: 'Seoul' } }];\n\nexcludeElements(array, excluded, (item) => item.name); // { name: 'lee', address: { city: 'NewYork' } }\n"})})]})}function u(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}},9937:(e,n,t)=>{t.d(n,{Z:()=>d,a:()=>c});var r=t(7800);const s={},l=r.createContext(s);function c(e){const n=r.useContext(l);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),r.createElement(l.Provider,{value:n},e.children)}}}]);