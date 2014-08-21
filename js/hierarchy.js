define(function(require) {

    var zrender = require('zrender');
    var NodeEntity = require('./NodeEntity');
    var TreeShape = require('./TreeShape');
    var Graph = require('./Graph');
    var graphData = JSON.parse(require('text!../data/test.json'));
    var vec2 = require('zrender/tool/vector');
    
    var graph = new Graph();
    var zr = zrender.init(document.getElementById('main'));

    var mainNode = '刘作虎';

    for (var i = 0; i < graphData.nodes.length; i++) {
        var n = graphData.nodes[i];
        var node = graph.addNode(n.name, n);

        var isMainNode = node.name === mainNode;

        var description = '';
        var len = node.description.length;
        var idx = 0;
        while (len > 8) {
            description += node.description.slice(idx, 8) + '\n';
            len -= 8;
            idx += 8;
        }
        description += node.description.slice(idx);

        node.entity = new NodeEntity({
            image: node.image || 'imgs/sample-man.jpg',
            imageWidth: isMainNode ? 100 : 60,
            imageHeight: isMainNode ? 100 : 60,
            labelList: [{
                text: node.name,
                font: 'bold 14px 微软雅黑'
            }, {
                text: node.date,
                font: '12px 微软雅黑'
            }, {
                text: node.description,
                font: '12px 微软雅黑'
            }],
            labelPosition: isMainNode ? 'inside' : 'outside'
        });
    }

    for (var i = 0; i < graphData.edges.length; i++) {
        var e = graphData.edges[i];
        var edge = graph.addEdge(e.source, e.target);
    }

    // Layouting
    var dagreGraph = new dagre.Digraph();
    graph.eachNode(function(node) {
        dagreGraph.addNode(node.name, {
            width: node.entity.rect.width,
            height: node.entity.rect.height
        });
    });
    graph.eachEdge(function(edge) {
        dagreGraph.addEdge(null, edge.source.name, edge.target.name);
    });

    var layout = dagre.layout().rankSep(200).run(dagreGraph);

    layout.eachNode(function(name, layoutNode) {
        var node = graph.getNodeByName(name);
        node.entity.group.position[0] = layoutNode.x;
        node.entity.group.position[1] = layoutNode.y;
    });

    // Draw
    graph.eachNode(function(node) {
        zr.addGroup(node.entity.group);

        if (node.outDegree() > 0) {
            // Draw out three shapes
            var treeShape = new TreeShape({
                style: {
                    parent: node.entity.getOutPosition(),
                    children: [],
                    lineWidth: 3,
                    strokeColor: 'grey',
                    lineJoin: 'round',
                    opacity: 0.6
                },
                hoverable: true
            });
            node.treeShape = treeShape;

            for (var i = 0; i < node.outEdges.length; i++) {
                var e = node.outEdges[i];
                treeShape.style.children.push(e.target.entity.getInPosition());
            }

            zr.addShape(treeShape);
        }
    });

    zr.modLayer(0, {
        panable: true,
        zoomable: true,
        maxZoom: 2,
        minZoom: 0.2
    });
    zr.render();

    var zrRefresh = zr.painter.refresh;

    zr.painter.refresh = function() {
        // Culling
        var width = zr.getWidth();
        var height = zr.getHeight();
        var layer = zr.painter.getLayer(0);
        var min = [0, 0];
        var max = [0, 0];
        for (var i = 0; i < graph.nodes.length; i++) {
            var card = graph.nodes[i].entity;
            var treeShape = graph.nodes[i].treeShape;
            min[0] = card.rect.x + card.group.position[0];
            min[1] = card.rect.y + card.group.position[1];
            max[0] = card.rect.width + min[0];
            max[1] = card.rect.height + min[1];
            if (layer.transform) {
                vec2.applyTransform(min, min, layer.transform);
                vec2.applyTransform(max, max, layer.transform);
            }
            var ignore = min[0] > width || min[1] > height || max[0] < 0 || max[1] < 0;
            graph.nodes[i].entity.group.ignore = ignore;
        }
        zrRefresh.apply(this, arguments);
    }
});