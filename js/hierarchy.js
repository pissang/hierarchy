define(function(require, exports, module) {

    var zrender = require('zrender');
    var NodeEntity = require('./NodeEntity');
    var TreeShape = require('./TreeShape');
    var Graph = require('./Graph');
    var Animation = require('zrender/animation/Animation');
    var vec2 = require('zrender/tool/vector');
    var Parallax = require('./Parallax');
    var Tree = require('./Tree');
    var TreeLayout = require('./TreeLayout');
    
    var graph;
    var zr;
    var parallax;
    var animation;

    var config = module.config();
    config = config || {};
    var imageUrl = config.imageUrl || '';

    var industries = {};
    var colorList = ['#7f5ce1', '#952492', '#c93558', '#4ba310', '#dc7c0b'];

    var isIE8 = document.createElement('canvas').getContext;

    // Interface
    var hierarchy = {

        start: function(graphData, mainNode) {
            graph = new Graph();
            zr = zrender.init(document.getElementById('main'));
            parallax = new Parallax('bg');
            parallax.scaleBase = 0.15;
            parallax.scaleStep = 0.5;
            animation = new Animation();
            animation.start();

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
                node.isMain = isMainNode;

                var industry = industries[node.profession_type];
                if (industry) {
                    var color = industry.color;
                } else {
                    var color = '#0fb8c3';
                }

                var image = imageUrl.replace('{name}', node.name);

                var labelList = [{
                    text: node.name,
                    font: 'bold 14px 微软雅黑'
                }];
                if (node.reason) {
                    labelList.push({
                        text: node.reason,
                        font: 'bold 10px 微软雅黑'
                    });
                }
                if (node.short_title) {
                    labelList.push({
                        text: node.short_title,
                        font: '12px 微软雅黑'
                    });
                }
                if (node.ice_action_type) {
                    labelList.push({
                        text: node.ice_action_type,
                        font: '10px 微软雅黑'
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

            var tree = Tree.fromGraph(graph)[0];
            tree.traverse(function(node) {
                node.width = node.data.entity.rect.width;
                node.height = node.data.entity.rect.height;
            });
            // Layouting

            window.layout = new TreeLayout(tree);
            layout.run();

            layout.tree.traverse(function(treeNode) {
                var node = treeNode.data;
                node.entity.group.position[0] = treeNode.x;
                node.entity.group.position[1] = treeNode.y;
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
                        z: -1,
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
                if (isIE8) {
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
                var layer = zr.painter.getLayer(0);

                // Culling
                var width = zr.getWidth();
                var height = zr.getHeight();
                var min = [0, 0];
                var max = [0, 0];
                for (var i = 0; i < graph.nodes.length; i++) {
                    var card = graph.nodes[i].entity;
                    var treeShape = graph.nodes[i].treeShape;

                    // Culling card
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

                    // Layzing loading image
                    if (!ignore && !card.isImageLoad()) {
                        card.loadImage(zr);
                    }

                    // Culling tree shape
                    if (treeShape) {
                        var rect = treeShape.getRect(treeShape.style);
                        min[0] = rect.x;
                        min[1] = rect.y;
                        max[0] = rect.width + min[0];
                        max[1] = rect.height + min[1];
                        if (layer.transform) {
                            vec2.applyTransform(min, min, layer.transform);
                            vec2.applyTransform(max, max, layer.transform);
                        }
                        var ignore = min[0] > width || min[1] > height || max[0] < 0 || max[1] < 0;
                        treeShape.ignore = ignore;
                    }
                }

                // Parallax
                parallax.moveTo(layer.position[0] / layer.scale[0], layer.position[1] / layer.scale[1]);

                zrRefresh.apply(this, arguments);
            }
            setTimeout(function() {
                hierarchy.moveTo(mainNode);
            }, 20);
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
                hierarchy._moveToPos(newPos, function() {
                    if (node.isMain) {
                        return
                    }
                    var scaleObj = {
                        scale: node.entity.getScale()
                    };
                    animation.animate(scaleObj)
                        .when(500, {
                            scale: 1.3
                        })
                        .during(function() {
                            node.entity.setScale(zr, scaleObj.scale);
                            zr.refresh();
                        })
                        .start('BounceOut');
                });
            }

            // Highlight
            for (var i = 0; i < graph.nodes.length; i++) {
                graph.nodes[i].entity.setScale(zr, 1);
            }
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

        _moveToPos: function(newPos, cb) {
            var layer = zr.painter.getLayer(0);
            var self = this;
            animation.clear();
            animation.animate(layer)
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
                    if (layer.__zoom && layer.__zoom !== 1) {
                        self._scaleToRatio(1, cb);
                    } else {
                        cb && cb();
                    }
                })
                .start('CubicInOut');
        },

        _scaleToRatio: function(zoom, cb) {
            var cx = zr.getWidth() / 2;
            var cy = zr.getHeight() / 2;
            var layer = zr.painter.getLayer(0);
            layer.__zoom = layer.__zoom || 1;
            var zoomScale = zoom / layer.__zoom;

            var newScale = layer.scale.slice();
            var newPos = layer.position.slice();
            newPos[0] -= (cx - newPos[0]) * (zoomScale - 1);
            newPos[1] -= (cy - newPos[1]) * (zoomScale - 1);
            newScale[0] *= zoomScale;
            newScale[1] *= zoomScale;

            layer.__zoom = zoom;

            animation.clear();
            animation.animate(layer)
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
                    cb && cb();
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