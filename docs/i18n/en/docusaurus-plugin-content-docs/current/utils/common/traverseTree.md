# traverseTree

A function that recursively traverses a tree structure and invokes the given callback for each node.

If a node has a child node array under the property specified by `childrenKey` (default: `'children'`), the function continues to recursively traverse those child nodes. Traversal follows `depth-first (DFS, pre-order)`, invoking the callback on the parent node before descending into its children.

The second argument of the callback is a traversal context object (`ctx`) containing whether the node has child nodes (`hasChildren`), the current depth starting from `0` at the root (`depth`), the parent node (`parent`), the sibling index (`index`), and the ancestor array from the root to the parent (`path`).

If a node already present in the ancestor chain is encountered again (circular reference), the function throws immediately. Only real cycles are detected — DAGs (shared subtrees referenced from multiple locations) are allowed.

The callback's return value controls traversal flow:

- Returning `'stop'`: **stops traversal immediately**. Useful for early termination once the target node is found.
- Returning `'children_skip'`: **skips the current node's child subtree**. Sibling traversal continues normally.
- Returning `'siblings_skip'`: traverses the current node's child subtree normally, then **skips the remaining siblings at the same level**. Higher-level traversal continues.
- Any other value (`undefined`, etc.): traversal continues.

<br />

## Code

[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/traverseTree/index.ts)

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

| Name       | Type                                                            | Default | Description                                                                                 |
| ---------- | --------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------- |
| `tree`     | `T \| T[] \| readonly T[]`                                      | -       | The tree node or array of tree nodes to traverse.                                           |
| `callback` | `TraverseTreeCallback<T>`                                       | -       | The callback function invoked for each node. Returning `'stop'` stops traversal; `'children_skip'` skips the child subtree; `'siblings_skip'` traverses the child subtree but skips the remaining siblings. |
| `options`  | `TraverseTreeOptions`                                           | `{}`    | The traversal options object.                                                               |

### Callback Arguments

| Name              | Type            | Description                                                            |
| ----------------- | --------------- | ---------------------------------------------------------------------- |
| `node`            | `T`             | The node currently being traversed.                                    |
| `ctx.hasChildren` | `boolean`       | Whether there are child nodes to be traversed next.                    |
| `ctx.depth`       | `number`        | The depth of the current node, starting from `0` at the root.          |
| `ctx.parent`      | `T \| null`     | The parent of the current node. `null` if the node is a root node.     |
| `ctx.index`       | `number`        | The index of the current node among its siblings (starting from `0`).  |
| `ctx.path`        | `readonly T[]`  | The ancestor array from the root to the parent of the current node. `[]` for root nodes. |

### Options

| Name          | Type     | Default      | Description                                                   |
| ------------- | -------- | ------------ | ------------------------------------------------------------- |
| `childrenKey` | `string` | `'children'` | The property key that holds the child nodes array.            |

<br />

## Remarks

:::caution Circular references

To prevent infinite recursion, the function throws immediately if a node already present in the ancestor chain is encountered again.

- Self-references (`node.children = [node]`) and mutual cycles (`a → b → a`) are detected.
- **DAGs (shared subtrees referenced from multiple locations)** are not cycles and are allowed; the callback is invoked once per visit.

:::

<br />

## Usage

### Basic Usage

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

### Using depth / parent / index

You can leverage `depth`, `parent`, and `index` from the context to make use of the structural position within the tree.

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

### Using path

`path` is the ancestor array from the root to the current node's **parent**. It does not include the current node, and is `[]` at the root. Useful for breadcrumbs, ancestor predicates, and dotted path building.

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

### Traversing a Forest of Tree Nodes

If multiple root nodes are passed as an array, the function recursively traverses starting from each root node. In this case, each root's `depth` is `0` and `parent` is `null`.

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

### Specifying childrenKey

If the property key holding child nodes is not `'children'`, you can specify it via the `childrenKey` option.

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

### Early Termination

Returning `'stop'` from the callback stops traversal immediately. Useful for skipping the rest once you have found what you are looking for.

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
    return 'stop'; // stops traversal immediately
  }
});

// found: { id: 4 }
// Nodes with id: 5 and id: 3 are not visited.
```

<br />

### Pruning a Subtree

Returning the string `'children_skip'` from the callback skips the current node's child subtree and continues traversal from its siblings. Useful when you want to exclude an entire subtree based on a condition.

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
  if (node.id === 2) return 'children_skip'; // skip children of id: 2
});

// visited: [1, 2, 3, 6]
// id: 4 and id: 5 are not visited, but id: 3 and its child (id: 6) are.
```

<br />

### Skipping Remaining Siblings

Returning `'siblings_skip'` from the callback traverses the current node's child subtree normally, then **skips the remaining siblings at the same level**. Higher-level traversal is unaffected.

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
// id: 2's children (4, 5) are visited, but id: 2's siblings (3, 6) are skipped.
```

<br />

### Handling Leaf Nodes Only

Using `ctx.hasChildren`, you can execute logic only on leaf nodes.

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
