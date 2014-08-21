define(function(require) {

    'use strict';

    var Graph = function() {
        this.nodes = [];
        this.edges = [];

        this._nodesMap = {};
        this._edgesMap = {};
    }

    Graph.prototype.addNode = function(name, extraData) {
        if (this._nodesMap[name]) {
            return this._nodesMap[name];
        }

        var node = new Graph.Node(name);

        if (extraData) {
            for (var key in extraData) {
                if (key == 'name' || key == 'edges') {
                    continue;
                }
                if (extraData.hasOwnProperty(key)) {
                    node[key] = extraData[key];
                }
            }
        }

        this.nodes.push(node);

        this._nodesMap[name] = node;
        return node;
    }

    Graph.prototype.getNodeByName = function(name) {
        return this._nodesMap[name];
    }

    Graph.prototype.addEdge = function(source, target, extraData) {
        if (typeof(source) == 'string') {
            source = this._nodesMap[source];
        }
        if (typeof(target) == 'string') {
            target = this._nodesMap[target];
        }
        if (! source || !target) {
            return;
        }

        var key = source.name + '-' + target.name;
        if (this._edgesMap[key]) {
            return this._edgesMap[key];
        }
        var edge = new Graph.Edge(source, target);

        if (extraData) {
            for (var key in extraData) {
                if (key == 'source' || key == 'target') {
                    continue;
                }
                if (extraData.hasOwnProperty(key)) {
                    edge[key] = extraData[key];
                }
            }
        }

        source.outEdges.push(edge);
        target.inEdges.push(edge);

        this.edges.push(edge);
        this._edgesMap[key] = edge;

        return edge;
    }

    /**
     * Get a new create filtered graph
     * @param  {string} name
     * @param  {number} maxDepth
     * @param {number} w1 跟中心节点相关的边的最低权重
     * @param {number} w2 其它边的最低权重
     * @return {Graph}
     */
    Graph.prototype.filter = function(name, maxDepth, w1, w2) {
        var graph = new Graph();
        if (!name || !this._nodesMap[name]) {
            return graph;
        }
        if (typeof(w1) == 'undefined') {
            w1 = 0;
        }
        if (typeof(w2) == 'undefined') {
            w2 = w1;
        }

        var node = this._nodesMap[name];

        filter(node, graph.addNode(node.name), 0);

        function filter(node, newNode, depth) {
            if (depth >= maxDepth) {
                return;
            }
            var edges = node.edges;

            for (var i = 0; i < edges.length; i++) {
                var edge = edges[i];
                var w = depth == 0 ? w1 : w2;
                if (edge.weight < w) {
                    continue;
                }

                if (edge.source === node) {
                    var target = graph.addNode(edge.target.name);
                    graph.addEdge(newNode, target, edge.weight);

                    filter(edge.target, target, depth+1);
                } else {
                    var source = graph.addNode(edge.source.name);
                    graph.addEdge(source, newNode, edge.weight);

                    filter(edge.source, source, depth+1);
                }
            }
        }

        // Find if any relation between each nodes
        for (var i = 0; i < graph.nodes.length; i++) {
            var na = graph.nodes[i];
            for (var j = 0; j < graph.nodes.length; j++) {
                var nb = graph.nodes[j];
                var key = na.name + '-' + nb.name;
                var edge = this._edgesMap[key];
                if (edge) {
                    var w = na.name == name || nb.name == name ? w1 : w2;
                    if (edge.weight < w) {
                        continue;
                    }
                    graph.addEdge(na, nb, edge.weight);
                } else {
                    key = nb.name + '-' + na.name;
                    edge = this._edgesMap[key];
                    if (edge) {
                        var w = na.name == name || nb.name == name ? w1 : w2;
                        if (edge.weight < w) {
                            continue;
                        }
                        graph.addEdge(nb, na, edge.weight);
                    }
                }
            }
        }

        return graph;
    }

    // TODO Test
    Graph.prototype.removeEdge = function(edge) {
        var key = source.name + '-' + target.name;
        edge.source.outEdges.splice(indexOf(edge.source.outEdges, edge), 1);
        edge.target.inEdges.splice(indexOf(edge.target.inEdges, edge), 1);

        delete this._edgesMap[edge];
        this.edges.splice(indexOf(this.edges, edge), 1);
    }

    // TODO Test
    Graph.prototype.removeNode = function(node) {
        var name = node.name;
        delete this._nodesMap[name];
        this.nodes.splice(indexOf(this.nodes, node), 1);

        for (var i = 0; i < this.edges.length;) {
            var edge = this.edges[i];
            if (edge.source == node || edge.target == node) {
                this.removeEdge(edge);
            } else {
                i++;
            }
        }
    }

    Graph.prototype.eachNode = function(cb, context) {
        for (var i = 0; i < this.nodes.length; i++) {
            cb.call(context, this.nodes[i]);
        }
    }

    Graph.prototype.eachEdge = function(cb, context) {
        for (var i = 0; i < this.edges.length; i++) {
            cb.call(context, this.edges[i]);
        }
    }

    Graph.Node = function(name) {
        this.name = name;
        this.inEdges = [];
        this.outEdges = [];
    }

    Graph.Node.prototype.degree = function() {
        return this.inEdges.length + outEdges.length; 
    }

    Graph.Node.prototype.inDegree = function() {
        return this.inEdges.length;
    }

    Graph.Node.prototype.outDegree = function() {
        return this.outEdges.length;
    }

    Graph.Edge = function(source, target) {
        this.source = source;
        this.target = target;
    }

    /**
     * 查询数组中元素的index
     */
    function indexOf(array, value){
        if (array.indexOf) {
            return array.indexOf(value);
        }
        for(var i = 0, len=array.length; i<len; i++) {
            if (array[i] === value) {
                return i;
            }
        }
        return -1;
    }

    return Graph;
});