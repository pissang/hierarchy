define(function(require) {


    function TreeLayout(tree) {
        this.tree = tree;
        this.nodePadding = 30;
        this.layerPadding = 100;

        this._layerOffsets = [];

        this._layers = [];
    }

    TreeLayout.prototype.run = function() {
        this._layerOffsets.length = 0;
        for (var i = 0; i < this.tree.root.depth + 1; i++) {
            this._layerOffsets[i] = 0;
            this._layers[i] = [];
        }
        this._updateNodeXPosition(this.tree.root);
        var root = this.tree.root;
        this._updateNodeYPosition(root, 0, root.height);
    }

    TreeLayout.prototype._updateNodeXPosition = function(node) {
        var minX = Infinity;
        var maxX = -Infinity;
        for (var i = 0; i < node.children.length; i++) {
            var child = node.children[i];
            this._updateNodeXPosition(child);
            var x = child.x;
            if (x < minX) {
                minX = x;
            }
            if (x > maxX) {
                maxX = x;
            }
        }
        if (node.children.length > 0) {
            node.x = (minX + maxX) / 2;
        } else {
            node.x = 0;
        }
        var off = this._layerOffsets[node.level] || 0;
        if (off > node.x) {
            var shift = off - node.x;
            this._shiftSubtree(node, shift);
            for (var i = node.level + 1; i < node.depth + node.level; i++) {
                this._layerOffsets[i] += shift;
            }
        }
        this._layerOffsets[node.level] = node.x + node.width + this.nodePadding;

        this._layers[node.level].push(node);
    }

    TreeLayout.prototype._shiftSubtree = function(root, offset) {
        root.x += offset;
        for (var i = 0; i < root.children.length; i++) {
            this._shiftSubtree(root.children[i], offset);
        }
    }

    TreeLayout.prototype._updateNodeYPosition = function(node, y, prevLayerHeight) {
        node.y = y;
        var layerHeight = 0;
        for (var i = 0; i < node.children.length; i++) {
            layerHeight = Math.max(node.children[i].height, layerHeight);
        }
        for (var i = 0; i < node.children.length; i++) {
            this._updateNodeYPosition(node.children[i], y + this.layerPadding + prevLayerHeight, layerHeight);
        }
    }

    return TreeLayout;
});