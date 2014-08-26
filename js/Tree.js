define(function(Tree) {

    function TreeNode(name) {
        this.name = name;
        this.level = 0;
        this.depth = 0;
        this.children = [];
    }

    TreeNode.prototype.traverse = function(cb) {
        cb(this);

        for (var i = 0; i < this.children.length; i++) {
            this.children[i].traverse(cb);
        }
    }

    TreeNode.prototype.update = function(level) {
        var depth = 0;
        this.level = level;
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            child.update(level + 1);
            if (child.depth > depth) {
                depth = child.depth;
            }
        }
        this.depth = depth + 1;
    }

    TreeNode.prototype.find = function(name) {
        if (this.name === name) {
            return this;
        }
        for (var i = 0; i < this.children.length; i++) {
            var res = this.children[i].find(name);
            if (res) {
                return res;
            }
        }
    }

    function Tree(name) {
        this.root = new TreeNode(name);
    }

    Tree.prototype.traverse = function(cb) {
        this.root.traverse(cb);
    }

    Tree.prototype.getSubTree = function(name) {
        var root = this.find(name);
        if (root) {
            var tree = new Tree(root.name);
            tree.root = root;
            return tree;
        }
    }

    Tree.prototype.find = function(name) {
        return this.root.find(name);
    }

    Tree.fromGraph = function(graph) {

        function buildHierarch(root) {
            for (var i = 0; i < root.data.outEdges.length; i++) {
                var edge = root.data.outEdges[i];
                var childTreeNode = treeNodesMap[edge.target.name]
                root.children.push(childTreeNode);
                buildHierarch(childTreeNode);
            }
        }

        var treeMap = {};
        var treeNodesMap = {};
        for (var i = 0; i < graph.nodes.length; i++) {
            var node = graph.nodes[i];
            var treeNode;
            if (node.inDegree() == 0) {
                treeMap[node.name] = new Tree(node.name);
                treeNode = treeMap[node.name].root;
            } else {
                treeNode = new TreeNode(node.name);
            }

            treeNode.width = node.width || 0;
            treeNode.height = node.height || 0;
            treeNode.data = node;

            treeNodesMap[node.name] = treeNode;
        }
        var treeList = [];
        for (var name in treeMap) {
            buildHierarch(treeMap[name].root);
            treeMap[name].root.update(0);
            treeList.push(treeMap[name]);
        }
        return treeList;
    }

    return Tree;
});