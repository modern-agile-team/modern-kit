import { isArray } from '../../validator/isArray';

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

const DEFAULT_CHILDREN_KEY = 'children';
const STOP = 'stop';
const CHILDREN_SKIP = 'children_skip';
const SIBLINGS_SKIP = 'siblings_skip';

/**
 * @description 트리 구조의 노드를 재귀적으로 순회하면서 각 노드에 대해 전달된 콜백을 호출합니다.
 * 노드가 `childrenKey`(기본값: `'children'`)로 지정된 프로퍼티에 자식 노드 배열을 가지고 있으면,
 * 해당 자식 노드들도 이어서 재귀적으로 순회합니다.
 *
 * 콜백의 두 번째 인자로 순회 컨텍스트(`ctx`)가 전달됩니다:
 * - `hasChildren`: 이어서 순회할 자식 노드가 존재하는지 여부입니다.
 * - `depth`: 루트 노드를 `0`으로 하는 현재 노드의 깊이입니다.
 * - `parent`: 현재 노드의 부모 노드입니다. 루트 노드는 `null`입니다.
 * - `index`: 형제 노드들 사이에서 현재 노드의 인덱스(0부터 시작)입니다.
 * - `path`: 루트에서 현재 노드의 부모까지의 조상 노드 배열입니다. 루트는 `[]`이며, 배열은 매 호출마다 새로 생성됩니다.
 *
 * 콜백의 반환값으로 순회 흐름을 제어할 수 있습니다:
 * - `'stop'` 반환 시: 순회를 **즉시 중단**합니다.
 * - `'children_skip'` 반환 시: 현재 노드의 자식 서브트리를 **건너뜁니다**. 형제 노드 순회는 계속 진행됩니다.
 * - `'siblings_skip'` 반환 시: 현재 노드의 자식 서브트리는 정상 순회한 뒤, **같은 레벨의 남은 형제 노드**를 건너뜁니다. 상위 레벨 순회는 계속 진행됩니다.
 * - 그 외 순회를 계속 진행합니다.
 *
 * @remarks 순회 순서는 `깊이 우선(DFS, pre-order)`이며, 부모 노드에 대해 콜백을 먼저 호출한 뒤 자식 노드로 진입합니다.
 *
 * @remarks 조상 체인에서 이미 방문한 노드를 다시 만나면(순환 참조) 즉시 에러를 던집니다. 이는 실제 순환만 감지하며,
 * 같은 노드를 여러 위치에서 참조하는 DAG(공유 서브트리)는 허용됩니다.
 *
 * @template T - 트리 노드의 타입입니다.
 * @param {T | T[] | readonly T[]} tree - 순회할 트리 노드 또는 트리 노드 배열입니다.
 * @param {TraverseTreeCallback<T>} callback - 각 노드에 대해 호출되는 콜백 함수입니다.
 * @param {TraverseTreeOptions} [options] - 순회 옵션 객체입니다.
 * @param {string} [options.childrenKey='children'] - 자식 노드 배열이 담긴 프로퍼티 키입니다.
 * @throws {Error} 조상 체인에서 이미 방문한 노드를 다시 만나면(순환 참조) 에러를 던집니다.
 *
 * @example
 * const tree = {
 *   id: 1,
 *   children: [
 *     { id: 2, children: [{ id: 4 }] },
 *     { id: 3 },
 *   ],
 * };
 *
 * traverseTree(tree, (node, { depth, parent, hasChildren, index, path }) => {
 *   console.log(node.id, depth, parent?.id ?? null, hasChildren, index, path.map(p => p.id));
 * });
 * // 1 0 null true  0 []
 * // 2 1 1    true  0 [1]
 * // 4 2 2    false 0 [1, 2]
 * // 3 1 1    false 1 [1]
 *
 * @example
 * // id가 2인 노드를 찾으면 순회를 중단합니다.
 * traverseTree(tree, (node) => {
 *   if (node.id === 2) return 'stop';
 * });
 *
 * @example
 * // id가 2인 노드의 자식 서브트리는 건너뛰고 형제 노드는 계속 순회합니다.
 * traverseTree(tree, (node) => {
 *   if (node.id === 2) return 'children_skip';
 * });
 *
 * @example
 * // id가 2인 노드의 자식은 순회하되, 같은 레벨의 형제 노드(id: 3)는 건너뜁니다.
 * traverseTree(tree, (node) => {
 *   if (node.id === 2) return 'siblings_skip';
 * });
 *
 * @example
 * traverseTree(tree, (node) => console.log(node.id), {
 *   childrenKey: 'items',
 * });
 * // childrenKey를 'items'로 지정하여 순회합니다.
 */
export function traverseTree<T extends Record<PropertyKey, any>>(
  tree: T | T[] | readonly T[],
  callback: TraverseTreeCallback<T>,
  options: TraverseTreeOptions = {}
): void {
  const { childrenKey = DEFAULT_CHILDREN_KEY } = options;
  const referenceMap = new WeakSet<T>();
  let aborted = false;

  const walk = (
    nodes: readonly T[],
    depth: number,
    parent: T | null,
    ancestors: readonly T[]
  ): void => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if (referenceMap.has(node)) {
        throw new Error(
          'traverseTree: 순환 참조가 감지되어 순회를 중단합니다.'
        );
      }
      referenceMap.add(node);

      const children = node[childrenKey];
      const hasChildren = isArray<T>(children) && children.length > 0;

      const result = callback(node, {
        hasChildren,
        depth,
        parent,
        index: i,
        path: ancestors,
      });

      // 순회 중단
      if (result === STOP) {
        aborted = true;
        return;
      }

      // 자식 서브트리 순회: result가 'children_skip'이 아니고 자식이 있으면 재귀 하강
      const shouldDescend = result !== CHILDREN_SKIP && hasChildren;
      if (shouldDescend) {
        walk(children, depth + 1, node, [...ancestors, node]);
        if (aborted) return;
      }

      // DAG(공유 서브트리)를 순환으로 오탐하지 않도록 서브트리 처리 완료 후 조상 목록에서 제거
      referenceMap.delete(node);

      // 형제 노드 건너뛰기
      if (result === SIBLINGS_SKIP) {
        break;
      }
    }
  };

  walk(isArray<T>(tree) ? tree : [tree], 0, null, []);
}
