export class RectangleTreeNode {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    left: any;
    right: any;

    constructor(x1: number, y1: number, x2: number, y2: number) {
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
      this.left = null;
      this.right = null;
    }
}
  
export default class IntervalTree {
    root: RectangleTreeNode | null

    constructor() {
      this.root = null;
    }
  
    insert(x1: number, y1: number, x2: number, y2: number) {
      this.root = this._insert(this.root, x1, y1, x2, y2);
    }
  
    _insert(node: RectangleTreeNode | null, x1: number, y1: number, x2: number, y2: number) {
      if (!node) {
        return new RectangleTreeNode(x1, y1, x2, y2);
      }
  
      if (y1 < node.y1) {
        node.left = this._insert(node.left, x1, y1, x2, y2);
      } else {
        node.right = this._insert(node.right, x1, y1, x2, y2);
      }
  
      return node;
    }
  
    findOverlappingNodes(x1: number, y1: number, x2: number, y2: number) {
      const overlappingNodes: RectangleTreeNode[] = [];
      this._findOverlappingNodes(this.root, x1, y1, x2, y2, overlappingNodes);

      return overlappingNodes;
    }
  
    _findOverlappingNodes(node: RectangleTreeNode | null, x1: number, y1: number, x2: number, y2: number, overlappingNodes: RectangleTreeNode[]) {
      if (!node) {
        return;
      }
      console.log('node : ', node)
  
      // 겹치지 않는 경우
      if (x1 > node.x2 || x2 < node.x1 || y1 > node.y2 || y2 < node.y1) {
        console.log('not overlap')
        // return;
      }
  
      // 완전 포함 또는 부분 포함인 경우
      if (
        (x1 <= node.x1 && x2 >= node.x2 && y1 <= node.y1 && y2 >= node.y2) || // 완전 포함
        (x1 <= node.x1 && x2 >= node.x1 && y1 <= node.y1 && y2 >= node.y1) || // 부분 포함
        (x1 <= node.x2 && x2 >= node.x2 && y1 <= node.y2 && y2 >= node.y2) // 부분 포함
      ) {
        overlappingNodes.push(node);
      }
  
      // console.log('left : ', node.left, y1, node.left.y1)
      // 자식 노드 탐색
      if (node.left) {
        this._findOverlappingNodes(node.left, x1, y1, x2, y2, overlappingNodes);
      }
  
      this._findOverlappingNodes(node.right, x1, y1, x2, y2, overlappingNodes);
    }
}
  