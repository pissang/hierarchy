define(function(require, exports, module) {

    var zrender = require('zrender');
    var NodeEntity = require('./NodeEntity');
    var TreeShape = require('./TreeShape');
    var Graph = require('./Graph');
    var vec2 = require('zrender/tool/vector');
    var Parallax = require('./Parallax');
    
    var graph;
    var zr;
    var parallax;

    var config = module.config();
    config = config || {};
    var imageUrl = config.imageUrl || '';

    var industries = {};
    var colorList = ['#2068C7', '#C26516', '#1DA364', '#BF20AF', '#7eb46e'];

    // Interface
    var hierarchy = {

        start: function(graphData, mainNode) {
            graph = new Graph();
            zr = zrender.init(document.getElementById('main'));
            parallax = new Parallax('bg');
            parallax.scaleBase = 0.15;
            parallax.scaleStep = 0.5;

            var industryCount = 0;
            for (var i = 0; i < graphData.nodes.length; i++) {
                var n = graphData.nodes[i];
                if (n && n.profession_type) {
                    var industry = industries[n.profession_type];
                    if (!industry) {
                        var color = colorList[industryCount];
                        industries[n.profession_type] = {
                            color: color,
                            name: name
                        };
                        industryCount++;
                    }
                }
            }
            for (var i = 0; i < graphData.nodes.length; i++) {
                var n = graphData.nodes[i];
                if (!n) {
                    continue;
                }
                var node = graph.addNode(n.name, n);

                var isMainNode = node.name === mainNode;

                var description = node.short_title;

                var industry = industries[node.profession_type];
                if (industry) {
                    var color = industry.color;
                } else {
                    var color = '#2882F8';
                }

                var image = imageUrl.replace('{name}', node.name);

                var labelList = [{
                    text: node.name,
                    font: 'bold 14px 微软雅黑'
                }, {
                    text: description,
                    font: '12px 微软雅黑'
                }, {
                    text: node.ice_action_type,
                    font: '10px 微软雅黑'
                }];

                if (node.reason) {
                    labelList.splice(1, 0, {
                        text: node.reason,
                        font: 'bold 10px 微软雅黑'
                    });
                }

                node.entity = new NodeEntity({
                    image: node.logo_image || image || 'imgs/sample-man.jpg',
                    imageWidth: isMainNode ? 120 : 70,
                    imageHeight: isMainNode ? 120 : 70,
                    color: color,
                    labelList: labelList,
                    labelPosition: isMainNode ? 'inside' : 'outside'
                });
            }

            for (var i = 0; i < graphData.edges.length; i++) {
                var e = graphData.edges[i];
                if (!e) {
                    continue;
                }
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

            var layout = dagre.layout().rankSep(120).run(dagreGraph);

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
                            lineWidth: 2,
                            strokeColor: '#a9ecff',
                            lineJoin: 'round',
                            opacity: 0.6
                        },
                        hoverable: false
                    });
                    node.treeShape = treeShape;

                    for (var i = 0; i < node.outEdges.length; i++) {
                        var e = node.outEdges[i];
                        treeShape.style.children.push(e.target.entity.getInPosition());
                    }

                    zr.addShape(treeShape);
                }

                // 浮层
                node.entity.on('click', function() {
                    hierarchy.popup(node.name, node.entity.color);
                });
                node.entity.on('mouseover', function() {
                    node.entity.highlight(zr);
                    zr.refreshNextFrame();
                });
                node.entity.on('mouseout', function() {
                    node.entity.lowlight(zr);
                    zr.refreshNextFrame();
                });
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
                var layer = zr.painter.getLayer(0);

                // Culling
                var width = zr.getWidth();
                var height = zr.getHeight();
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

                // Parallax
                parallax.moveTo(layer.position[0] / layer.scale[0], layer.position[1] / layer.scale[1]);

                zrRefresh.apply(this, arguments);
            }
            setTimeout(function() {
                hierarchy.moveTo(mainNode);
            }, 20)
        },

        moveTo: function(name, noAnim) {
            if (!zr) {
                return;
            }

            var layer = zr.painter.getLayer(0);
            var node = graph.getNodeByName(name);
            if (!node) {
                return;
            }

            var pos = node.entity.group.position.slice();
            pos[1] += node.entity.rect.height;
            pos = vec2.mul([], pos, layer.scale);
            var target = [zr.getWidth() / 2, zr.getHeight() / 2];

            var newPos = vec2.sub([], target, pos);

            if (noAnim) {
                layer.position = newPos;
                layer.dirty = true;
                zr.refresh();
            } else {
                hierarchy._moveToPos(newPos);
            }

            // Highlight
            for (var i = 0; i < graph.nodes.length; i++) {
                graph.nodes[i].entity.lowlight(zr);
            }
            node.entity.highlight(zr);
            zr.refreshNextFrame();
        },

        moveLeft: function() {
            if (!zr) {
                return;
            }
            var layer = zr.painter.getLayer(0);
            var newPos = layer.position.slice();
            newPos[0] += zr.getWidth() * 0.6;

            hierarchy._moveToPos(newPos);
        },

        moveRight: function() {
            if (!zr) {
                return;
            }
            var layer = zr.painter.getLayer(0);
            var newPos = layer.position.slice();
            newPos[0] -= zr.getWidth() * 0.6;

            hierarchy._moveToPos(newPos);
        },

        moveTop: function() {
            if (!zr) {
                return;
            }
            var layer = zr.painter.getLayer(0);
            var newPos = layer.position.slice();
            newPos[1] += zr.getHeight() * 0.3;

            hierarchy._moveToPos(newPos);
        },

        moveDown: function() {
            if (!zr) {
                return;
            }
            var layer = zr.painter.getLayer(0);
            var newPos = layer.position.slice();
            newPos[1] -= zr.getHeight() * 0.3;

            hierarchy._moveToPos(newPos);
        },

        zoomIn: function() {
            if (!zr) {
                return;
            }
            var layer = zr.painter.getLayer(0);
            layer.__zoom = layer.__zoom || 1;
            hierarchy._scaleToRatio(layer.__zoom * 1.5);
        },

        zoomOut: function() {
            if (!zr) {
                return;
            }
            var layer = zr.painter.getLayer(0);
            layer.__zoom = layer.__zoom || 1;
            hierarchy._scaleToRatio(layer.__zoom / 1.5);
        },

        highlightIndustries: function(industries) {
            if (!zr) {
                return;
            }
        },

        _moveToPos: function(newPos) {
            var layer = zr.painter.getLayer(0);
            zr.animation.animate(layer)
                .when(800, {
                    position: newPos
                })
                .during(function() {
                    parallax.moveTo(layer.position[0] / layer.scale[0], layer.position[1] / layer.scale[1]);
                    layer.dirty = true;
                    zr.refreshNextFrame();
                })
                .done(function() {
                    zr.refresh();
                })
                .start('CubicInOut');
        },

        _scaleToRatio: function(zoom) {
            var cx = zr.getWidth() / 2;
            var cy = zr.getHeight() / 2;
            var layer = zr.painter.getLayer(0);
            layer.__zoom = layer.__zoom || 1;
            var scale = zoom / layer.__zoom;
            var newScale = layer.scale.slice();
            var newPos = layer.position.slice();
            newPos[0] -= (cx - newPos[0]) * (scale - 1);
            newPos[1] -= (cy - newPos[1]) * (scale - 1);
            newScale[0] *= scale;
            newScale[1] *= scale;
            zr.animation.animate(layer)
                .when(800, {
                    position: newPos,
                    scale: newScale
                })
                .during(function() {
                    layer.dirty = true;
                    zr.refreshNextFrame();
                })
                .done(function() {
                    zr.refresh();
                })
                .start('CubicInOut');
        },

        popup: function(name) {},

        legends: industries
    }

    // setTimeout(function() {
    //     hierarchy.moveTo('王思聪');
    // }, 1000);
    // 
    window.onresize = function() {
        zr.resize();
    }

    return hierarchy;
});