# traverseTree

트리 구조의 노드를 재귀적으로 순회하면서 각 노드에 대해 전달된 콜백을 호출하는 함수입니다.

노드가 `childrenKey`(기본값: `'children'`)로 지정된 프로퍼티에 자식 노드 배열을 가지고 있으면, 해당 자식 노드들도 이어서 재귀적으로 순회합니다. 순회 순서는 `깊이 우선(DFS, pre-order)`이며, 부모 노드에 대해 콜백을 먼저 호출한 뒤 자식 노드로 진입합니다.

콜백의 두 번째 인자로 순회 컨텍스트 객체(`ctx`)가 전달됩니다. 이 객체는 자식 노드 존재 여부(`hasChildren`), 루트 노드를 `0`으로 하는 현재 깊이(`depth`), 부모 노드(`parent`), 형제 사이에서의 인덱스(`index`), 그리고 루트에서 부모까지의 조상 배열(`path`)을 포함합니다.

조상 체인에서 이미 방문한 노드를 다시 만나면(순환 참조) 즉시 에러를 던집니다. 실제 순환만 감지하며, 같은 노드를 여러 위치에서 참조하는 DAG(공유 서브트리)는 허용됩니다.

콜백의 반환값으로 순회 흐름을 제어할 수 있습니다.

- `'stop'` 반환 시: 순회를 **즉시 중단**합니다. 특정 노드를 찾은 뒤 조기 종료할 때 사용합니다.
- `'children_skip'` 반환 시: 현재 노드의 자식 서브트리를 **건너뜁니다**. 형제 노드 순회는 계속 진행됩니다.
- `'siblings_skip'` 반환 시: 현재 노드의 자식 서브트리는 정상 순회한 뒤, **같은 레벨의 남은 형제 노드**를 건너뜁니다. 상위 레벨 순회는 계속 진행됩니다.
- 그 외 값(`undefined` 등): 순회를 계속 진행합니다.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/traverseTree/index.ts)

<br />

## Interface

```ts title="typescript"
interface TraverseTreeOptions {
  childrenKey?: string;
}

interface TraverseTreeContext<T> {
  hasChildren: boolean;
  depth: number;
  parent: T | null;
  index: number;
  path: readonly T[];
}

type TraverseTreeCallback<T> = (
  node: T,
  ctx: TraverseTreeContext<T>
) => 'stop' | 'children_skip' | 'siblings_skip' | void;

function traverseTree<T extends Record<PropertyKey, any>>(
  tree: T | T[] | readonly T[],
  callback: TraverseTreeCallback<T>,
  options?: TraverseTreeOptions
): void;
```

<br />

## Parameters

| Name       | Type                                                            | Default | Description                                                                     |
| ---------- | --------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------- |
| `tree`     | `T \| T[] \| readonly T[]`                                      | -       | 순회할 트리 노드 또는 트리 노드 배열입니다.                                     |
| `callback` | `TraverseTreeCallback<T>`                                       | -       | 각 노드에 대해 호출되는 콜백 함수입니다. `'stop'` 반환 시 순회 중단, `'children_skip'` 반환 시 자식 서브트리를 건너뛰며, `'siblings_skip'` 반환 시 자식은 순회하되 남은 형제 노드를 건너뜁니다. |
| `options`  | `TraverseTreeOptions`                                           | `{}`    | 순회 옵션 객체입니다.                                                           |

### Callback Arguments

| Name              | Type            | Description                                                     |
| ----------------- | --------------- | --------------------------------------------------------------- |
| `node`            | `T`             | 현재 순회 중인 노드입니다.                                      |
| `ctx.hasChildren` | `boolean`       | 이어서 순회할 자식 노드가 존재하는지 여부입니다.                |
| `ctx.depth`       | `number`        | 루트 노드를 `0`으로 하는 현재 노드의 깊이입니다.                |
| `ctx.parent`      | `T \| null`     | 현재 노드의 부모 노드입니다. 루트 노드일 경우 `null`입니다.     |
| `ctx.index`       | `number`        | 형제 노드들 사이에서 현재 노드의 인덱스입니다(0부터 시작).      |
| `ctx.path`        | `readonly T[]`  | 루트에서 현재 노드의 부모까지의 조상 배열입니다. 루트 노드는 `[]`. |

### Options

| Name          | Type     | Default      | Description                                    |
| ------------- | -------- | ------------ | ---------------------------------------------- |
| `childrenKey` | `string` | `'children'` | 자식 노드 배열이 담긴 프로퍼티 키입니다.       |

<br />

## Remarks

:::caution 순환 참조

조상 체인에서 이미 방문한 노드를 다시 만나면 무한 재귀를 방지하기 위해 즉시 에러를 던집니다.

- 자기 참조(`node.children = [node]`) 및 상호 순환(`a → b → a`)이 감지됩니다.
- 같은 노드를 여러 위치에서 참조하는 **DAG(공유 서브트리)** 는 순환이 아니므로 허용되며, 방문된 만큼 콜백이 여러 번 호출됩니다.

:::

<br />

## Usage

### 기본 사용법

```ts title="typescript"
import { traverseTree } from '@modern-kit/utils';

const tree = {
  id: 1,
  children: [
    { id: 2, children: [{ id: 4 }] },
    { id: 3 },
  ],
};

traverseTree(tree, (node, { hasChildren }) => {
  console.log(node.id, hasChildren);
});
// 1 true
// 2 true
// 4 false
// 3 false
```

<br />

### depth / parent / index 활용

컨텍스트의 `depth`, `parent`, `index`를 이용하면 트리 구조상의 위치 정보를 활용할 수 있습니다.

```ts title="typescript"
import { traverseTree } from '@modern-kit/utils';

const tree = {
  id: 1,
  children: [
    { id: 2, children: [{ id: 4 }] },
    { id: 3 },
  ],
};

traverseTree(tree, (node, { depth, parent, index }) => {
  const indent = '  '.repeat(depth);
  const parentInfo = parent ? `(parent: ${parent.id}, index: ${index})` : '(root)';
  console.log(`${indent}${node.id} ${parentInfo}`);
});
// 1 (root)
//   2 (parent: 1, index: 0)
//     4 (parent: 2, index: 0)
//   3 (parent: 1, index: 1)
```

<br />

### path 활용

`path`는 루트에서 현재 노드의 **부모까지** 이어지는 조상 노드 배열입니다. 현재 노드는 포함되지 않으며, 루트 노드에서는 `[]`입니다. 경로 표시(breadcrumb), 조상 조건 검사 등에 유용합니다.

```ts title="typescript"
import { traverseTree } from '@modern-kit/utils';

const tree = {
  id: 'root',
  children: [
    {
      id: 'docs',
      children: [{ id: 'settings', children: [{ id: 'theme.md' }] }],
    },
  ],
};

traverseTree(tree, (node, { path }) => {
  const fullPath = [...path, node].map((n) => n.id).join('/');
  console.log(fullPath);
});
// root
// root/docs
// root/docs/settings
// root/docs/settings/theme.md
```

<br />

### 트리 노드 배열(forest) 순회

여러 개의 루트 노드를 배열로 전달하면, 각 루트 노드부터 재귀적으로 순회합니다. 이때 각 루트 노드의 `depth`는 `0`이고 `parent`는 `null`입니다.

```ts title="typescript"
import { traverseTree } from '@modern-kit/utils';

const forest = [
  { id: 1, children: [{ id: 2 }] },
  { id: 3, children: [{ id: 4 }] },
];

traverseTree(forest, (node) => {
  console.log(node.id);
});
// 1, 2, 3, 4
```

<br />

### childrenKey 지정

자식 노드가 담긴 프로퍼티 키가 `'children'`이 아니라면, `childrenKey` 옵션으로 지정할 수 있습니다.

```ts title="typescript"
import { traverseTree } from '@modern-kit/utils';

const tree = {
  id: 1,
  items: [
    { id: 2, items: [{ id: 4 }] },
    { id: 3 },
  ],
};

traverseTree(tree, (node) => console.log(node.id), {
  childrenKey: 'items',
});
// 1, 2, 4, 3
```

<br />

### 조기 종료(early termination)

콜백에서 `'stop'`을 반환하면 순회를 즉시 중단합니다. 특정 노드를 찾은 뒤 나머지 노드는 순회하지 않도록 할 때 유용합니다.

```ts title="typescript"
import { traverseTree } from '@modern-kit/utils';

const tree = {
  id: 1,
  children: [
    { id: 2, children: [{ id: 4 }, { id: 5 }] },
    { id: 3 },
  ],
};

let found: { id: number } | null = null;

traverseTree(tree, (node) => {
  if (node.id === 4) {
    found = node;
    return 'stop'; // 순회 즉시 중단
  }
});

// found: { id: 4 }
// id: 5, id: 3 노드는 순회되지 않습니다.
```

<br />

### 자식 서브트리 건너뛰기 (prune)

콜백에서 `'children_skip'` 문자열을 반환하면 현재 노드의 자식 서브트리를 순회하지 않고, 형제 노드부터 순회를 이어갑니다. 특정 조건의 서브트리를 통째로 제외해야 할 때 유용합니다.

```ts title="typescript"
import { traverseTree } from '@modern-kit/utils';

const tree = {
  id: 1,
  children: [
    { id: 2, children: [{ id: 4 }, { id: 5 }] },
    { id: 3, children: [{ id: 6 }] },
  ],
};

const visited: number[] = [];

traverseTree(tree, (node) => {
  visited.push(node.id);
  if (node.id === 2) return 'children_skip'; // id: 2의 자식은 건너뛴다
});

// visited: [1, 2, 3, 6]
// id: 4, id: 5는 순회되지 않지만, id: 3과 그 자식(id: 6)은 계속 순회됩니다.
```

<br />

### 형제 노드 스킵

콜백에서 `'siblings_skip'`을 반환하면 현재 노드의 자식 서브트리는 정상 순회한 뒤, **같은 레벨의 남은 형제 노드**를 건너뜁니다. 상위 레벨의 형제 순회는 영향을 받지 않습니다.

```ts title="typescript"
import { traverseTree } from '@modern-kit/utils';

const tree = {
  id: 1,
  children: [
    { id: 2, children: [{ id: 4 }, { id: 5 }] },
    { id: 3 },
    { id: 6 },
  ],
};

const visited: number[] = [];

traverseTree(tree, (node) => {
  visited.push(node.id);
  if (node.id === 2) return 'siblings_skip';
});

// visited: [1, 2, 4, 5]
// id: 2의 자식(4, 5)은 순회되지만, id: 2의 형제인 id: 3, 6은 건너뜁니다.
```

<br />

### 리프 노드만 처리하기

`ctx.hasChildren`을 이용해 리프 노드에서만 특정 로직을 수행할 수 있습니다.

```ts title="typescript"
import { traverseTree } from '@modern-kit/utils';

const tree = {
  id: 1,
  children: [
    { id: 2, children: [{ id: 4 }] },
    { id: 3 },
  ],
};

const leafIds: number[] = [];

traverseTree(tree, (node, { hasChildren }) => {
  if (!hasChildren) {
    leafIds.push(node.id);
  }
});
// leafIds: [4, 3]
```
