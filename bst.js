class Node{
    constructor(data){
    this.data=data
    this.right=null
    this.left=null
    this.parent = null
}
}

class Tree{
    constructor(arr){
        const sortedArr = this.simpleSort(arr)
        const start = 0
        const end = sortedArr.length - 1
        const parent = null;
        this.root = this.buildTree(sortedArr, start, end, parent)
    }

    buildTree(arr, start, end, parent=null){
        if (start > end) return null;
        const mid = start + Math.floor((end - start)/2)
        const root = new Node(arr[mid])
        root.parent = parent
        root.left = this.buildTree(arr, start, mid-1, root)
        root.right = this.buildTree(arr, mid+1, end, root)

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
    levelOrder(callback){
        if (!callback){
            throw new Error('missing callback!')
        }
        let queue = [this.root]
        
        while (queue.length > 0){
            let node = queue.shift()
            callback(node)
            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)
        
        }
    }
    recursiveLeveLOrder(callback, queue = [this.root]){
        if (!callback){
            throw new Error('missing callback!')
        }
        if (queue.length === 0){
            return
        }
        const node = queue.shift()
        callback(node)
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);

        this.recursiveLeveLOrder(callback, queue)
    }
    inOrder(callback, node = this.root){
        if (!callback){
            throw new Error('missing callback!')
        }
        if (node == null){
            return
        }
        this.inOrder(callback, node.left)
        callback(node) 
        this.inOrder(callback, node.right)
    }
    preOrder(callback, node = this.root){
        if (!callback){
            throw new Error('missing callback!')
        }
        if (node == null){
            return
        }
        callback(node) 
        this.preOrder(callback, node.left)
        this.preOrder(callback, node.right)
    }
    postOrder(callback, node = this.root){
        if (!callback){
            throw new Error('missing callback!')
        }
        if (node == null){
            return
        }
        this.postOrder(callback, node.left)
        this.postOrder(callback, node.right)
        callback(node) 
    }    
    height(node){
        if (node==null){
            return -1
        }
        let leftHeight = this.height(node.left)
        let rightHeight = this.height(node.right)
        return 1 + Math.max(leftHeight, rightHeight)
    }
    find(value, node = this.root){
        if (node === null || node.data === value ){
            return node
        }
        if (value < node.data){
            return this.find(value, node.left)
        } else if (value > node.data){
            return this.find(value, node.right)
        }
    }
    depth(node){
        if (node == null) {
            return -1; 
        }
        if (node == this.root){
            return 0
        }
       return 1 + this.depth(node.parent)
    }
    isBalanced(node = this.root){
        if (node == null){
            return true
        }
        let leftHeight = this.height(node.left)
        let rightHeight = this.height(node.right)

        if (Math.abs(leftHeight - rightHeight) > 1){
            return false
        }

        return this.isBalanced(node.left) && this.isBalanced(node.right)
    }
    rebalance(){
        let values = []
        this.inOrder(node => values.push(node.data), this.root)
        this.root = this.buildTree(values, 0, values.length-1)
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
testTree.rebalance()
prettyPrint(testTree.root)
