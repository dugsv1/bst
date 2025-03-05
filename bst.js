class Node{
    constructor(data){
    this.data=data
    this.right=null
    this.left=null
}
}

class Tree{
    constructor(arr){
        const sortedArr = this.simpleSort(arr)
        const start = 0
        const end = sortedArr.length - 1
        this.root = this.buildTree(sortedArr, start, end)
    }

    buildTree(arr, start, end){
        if (start > end) return null;
        const mid = start + Math.floor((end - start)/2)
        const root = new Node(arr[mid])
        root.left = this.buildTree(arr, start, mid-1)
        root.right = this.buildTree(arr, mid+1, end)

        return root
    }
    simpleSort(arr){
        const uniq = [...new Set(arr)]
        return uniq.sort( (a,b) => a-b)
    }
    insert(root, key){
        if (root === null) {
            return new Node(key)
    }
    if (root.data === key){
        return root
    }
    if (key < root.data){
        root.left = this.insert(root.left, key)
    } else if (key > root.data){
        root.right = this.insert(root.right, key)
    }
    return root
}
}
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
 

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]

const testTree = new Tree(testArray)
prettyPrint(testTree.root)

testTree.insert(testTree.root, 69)
prettyPrint(testTree.root)

