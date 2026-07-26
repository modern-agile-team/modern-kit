import { describe, it, expect, vi } from 'vitest';
import { traverseTree } from '.';

interface Node {
  id: number;
  children?: Node[];
}

describe('traverseTree', () => {
  describe('기본 순회', () => {
    it('단일 트리 노드를 깊이 우선(pre-order)으로 순회하면서 각 노드에 대해 콜백을 호출해야 합니다.', () => {
      const tree = {
        id: 1,
        children: [{ id: 2, children: [{ id: 4 }] }, { id: 3 }],
      } as const;
      const callback = vi.fn();

      traverseTree(tree, callback);

      expect(callback).toHaveBeenCalledTimes(4);
      expect(callback).toHaveBeenNthCalledWith(1, tree, {
        hasChildren: true,
        depth: 0,
        parent: null,
        index: 0,
        path: [],
      });
      expect(callback).toHaveBeenNthCalledWith(2, tree.children[0], {
        hasChildren: true,
        depth: 1,
        parent: tree,
        index: 0,
        path: [tree],
      });
      expect(callback).toHaveBeenNthCalledWith(
        3,
        tree.children[0].children[0],
        {
          hasChildren: false,
          depth: 2,
          parent: tree.children[0],
          index: 0,
          path: [tree, tree.children[0]],
        }
      );
      expect(callback).toHaveBeenNthCalledWith(4, tree.children[1], {
        hasChildren: false,
        depth: 1,
        parent: tree,
        index: 1,
        path: [tree],
      });
    });

    it('트리 노드 배열을 전달하면 각 루트 노드부터 재귀적으로 순회하고, 루트 노드의 depth는 0, parent는 null, index는 forest 내 위치여야 합니다.', () => {
      const forest = [
        { id: 1, children: [{ id: 2 }] },
        { id: 3, children: [{ id: 4 }] },
      ] as const;
      const callback = vi.fn();

      traverseTree(forest, callback);

      expect(callback).toHaveBeenCalledTimes(4);
      expect(callback).toHaveBeenNthCalledWith(1, forest[0], {
        hasChildren: true,
        depth: 0,
        parent: null,
        index: 0,
        path: [],
      });
      expect(callback).toHaveBeenNthCalledWith(2, forest[0].children[0], {
        hasChildren: false,
        depth: 1,
        parent: forest[0],
        index: 0,
        path: [forest[0]],
      });
      expect(callback).toHaveBeenNthCalledWith(3, forest[1], {
        hasChildren: true,
        depth: 0,
        parent: null,
        index: 1,
        path: [],
      });
      expect(callback).toHaveBeenNthCalledWith(4, forest[1].children[0], {
        hasChildren: false,
        depth: 1,
        parent: forest[1],
        index: 0,
        path: [forest[1]],
      });
    });

    it('자식 노드가 없는 경우 콜백을 루트 노드에 대해 한 번만 호출하고 ctx는 초기값이어야 합니다.', () => {
      const tree = { id: 1 } as const;
      const callback = vi.fn();

      traverseTree(tree, callback);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(tree, {
        hasChildren: false,
        depth: 0,
        parent: null,
        index: 0,
        path: [],
      });
    });

    it('자식 노드가 빈 배열인 경우 hasChildren은 false여야 합니다.', () => {
      const tree = { id: 1, children: [] } as const;
      const callback = vi.fn();

      traverseTree(tree, callback);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(tree, {
        hasChildren: false,
        depth: 0,
        parent: null,
        index: 0,
        path: [],
      });
    });
  });

  describe('childrenKey 옵션', () => {
    it('childrenKey 옵션을 통해 자식 노드가 담긴 프로퍼티 키를 지정할 수 있어야 합니다.', () => {
      const tree = {
        id: 1,
        items: [{ id: 2, items: [{ id: 4 }] }, { id: 3 }],
      } as const;
      const callback = vi.fn();

      traverseTree(tree, callback, { childrenKey: 'items' });

      expect(callback).toHaveBeenCalledTimes(4);
      expect(callback).toHaveBeenNthCalledWith(1, tree, {
        hasChildren: true,
        depth: 0,
        parent: null,
        index: 0,
        path: [],
      });
      expect(callback).toHaveBeenNthCalledWith(2, tree.items[0], {
        hasChildren: true,
        depth: 1,
        parent: tree,
        index: 0,
        path: [tree],
      });
      expect(callback).toHaveBeenNthCalledWith(3, tree.items[0].items[0], {
        hasChildren: false,
        depth: 2,
        parent: tree.items[0],
        index: 0,
        path: [tree, tree.items[0]],
      });
      expect(callback).toHaveBeenNthCalledWith(4, tree.items[1], {
        hasChildren: false,
        depth: 1,
        parent: tree,
        index: 1,
        path: [tree],
      });
    });

    it('childrenKey에 해당하는 값이 배열이 아니면 자식 노드로 간주하지 않고 hasChildren은 false여야 합니다.', () => {
      const tree = { id: 1, children: 'not an array' } as const;
      const callback = vi.fn();

      traverseTree(tree, callback);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(tree, {
        hasChildren: false,
        depth: 0,
        parent: null,
        index: 0,
        path: [],
      });
    });
  });

  describe('콜백 반환값 제어', () => {
    describe(`'stop' (조기 종료)`, () => {
      it(`콜백이 'stop'을 반환하면 순회를 즉시 중단해야 합니다. 이때 상위 서브트리를 넘어 형제 노드까지 순회를 중단해야 합니다.`, () => {
        const tree: Node = {
          id: 1,
          children: [
            { id: 2, children: [{ id: 4 }] },
            { id: 3, children: [{ id: 5 }] },
          ],
        };

        const visited: number[] = [];

        traverseTree(tree, (node) => {
          visited.push(node.id);
          if (node.id === 4) return 'stop';
        });

        expect(visited).toEqual([1, 2, 4]); // id 4 이후 방문하는 형제 노드인 id 3, 5는 방문을 중단합니다.
      });
    });

    describe(`'children_skip' (자식 서브트리 건너뛰기)`, () => {
      it(`콜백이 'children_skip'을 반환하면 해당 노드의 자식 서브트리를 건너뛰고 형제 노드 순회는 계속해야 합니다.`, () => {
        const tree: Node = {
          id: 1,
          children: [
            { id: 2, children: [{ id: 4 }, { id: 5 }] },
            { id: 3, children: [{ id: 6 }] },
          ],
        };

        const visited: number[] = [];

        traverseTree(tree, (node) => {
          visited.push(node.id);
          if (node.id === 2) return 'children_skip';
        });

        expect(visited).toEqual([1, 2, 3, 6]); // id 2 자식 노드인 id 4, 5는 건너뛰고, 형제 노드인 id 3, 6는 방문을 계속합니다.
      });

      it(`'children_skip'과 'stop'은 독립적으로 동작해야 합니다.`, () => {
        const tree: Node = {
          id: 1,
          children: [
            { id: 2, children: [{ id: 4 }] },
            { id: 3, children: [{ id: 5 }, { id: 6 }] },
          ],
        };

        const visited: number[] = [];

        traverseTree(tree, (node) => {
          visited.push(node.id);
          if (node.id === 2) return 'children_skip';
          if (node.id === 5) return 'stop';
        });

        expect(visited).toEqual([1, 2, 3, 5]); // id 2 자식 노드인 id 4는 건너뛰고, id 5 이후 방문하는 형제 노드인 id 6는 방문을 중단합니다.
      });
    });

    describe(`'siblings_skip' (형제 노드 스킵)`, () => {
      it(`콜백이 'siblings_skip'을 반환하면 현재 노드의 자식은 정상 순회하되, 같은 레벨의 남은 형제 노드는 건너뛰어야 합니다.`, () => {
        const tree: Node = {
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

        // id 2의 자식(4, 5)은 순회, 이후 형제 노드(3, 6)는 건너뜀
        expect(visited).toEqual([1, 2, 4, 5]);
      });

      it(`'siblings_skip'은 상위 레벨의 형제 순회에는 영향을 주지 않아야 합니다.`, () => {
        const tree: Node = {
          id: 1,
          children: [
            {
              id: 2,
              children: [{ id: 4 }, { id: 5 }],
            },
            { id: 3, children: [{ id: 6 }] },
          ],
        };

        const visited: number[] = [];

        traverseTree(tree, (node) => {
          visited.push(node.id);
          if (node.id === 4) return 'siblings_skip';
        });

        // id 4의 형제(5)만 건너뜀. 상위 레벨의 형제(3)와 그 자식(6)은 정상 순회
        expect(visited).toEqual([1, 2, 4, 3, 6]);
      });
    });
  });

  describe('순환 참조 감지', () => {
    it('조상 체인에서 이미 방문한 노드를 다시 만나면(순환 참조) 에러를 던져야 합니다.', () => {
      const a: Node = { id: 1 };
      const b: Node = { id: 2 };
      a.children = [b];
      b.children = [a]; // 순환

      expect(() => traverseTree(a, () => {})).toThrow(
        'traverseTree: 순환 참조가 감지되어 순회를 중단합니다.'
      );
    });

    it('노드 자신을 자식으로 참조하는 자기 순환도 감지해야 합니다.', () => {
      const node: Node = { id: 1 };
      node.children = [node];

      expect(() => traverseTree(node, () => {})).toThrow(
        'traverseTree: 순환 참조가 감지되어 순회를 중단합니다.'
      );
    });

    it('같은 노드가 형제로 두 번 등장하는 DAG는 순환이 아니므로 정상 순회해야 합니다.', () => {
      const shared: Node = { id: 99 };
      const tree: Node = {
        id: 1,
        children: [shared, shared],
      };

      const visited: number[] = [];

      expect(() =>
        traverseTree(tree, (node) => {
          visited.push(node.id);
        })
      ).not.toThrow();

      expect(visited).toEqual([1, 99, 99]);
    });
  });
});
