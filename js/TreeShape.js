define(function(require) {

    'use strict';

    var ShapeBase = require('zrender/shape/Base');

    function TreeShape(options) {
        this.brushTypeOnly = 'stroke';
        ShapeBase.call(this, options);
    }

    function xSortFunc(a, b) {
        return a[0] - b[0];
    }

    TreeShape.prototype = {

        type: 'card',

        buildPath: function(ctx, style) {
            var parent = style.parent;
            var children = style.children;
            var minX = Infinity;
            var maxX = -Infinity;
            var midY = 0;

            // children.sort(xSortFunc);

            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                midY += child[1];
                var minX = Math.min(minX, child[0]);
                var maxX = Math.max(maxX, child[0]);
            }
            midY /= children.length;
            midY = (midY + parent[1]) / 2;

            if (children.length === 1) {
                var firstChild = children[0];
                ctx.moveTo(parent[0], parent[1]);
                ctx.lineTo(parent[0], midY);
                ctx.lineTo(firstChild[0], midY);
                ctx.lineTo(firstChild[0], firstChild[1]);
            } else {
                ctx.moveTo(parent[0], parent[1]);
                ctx.lineTo(parent[0], midY);

                // Outline
                // --------
                // |      |
                var firstChild = children[0];
                var lastChild = children[children.length - 1];
                ctx.moveTo(firstChild[0], firstChild[1]);
                ctx.lineTo(minX, midY);
                ctx.lineTo(maxX, midY);
                ctx.lineTo(lastChild[0], lastChild[1])

                for (var i = 1; i < children.length - 1; i++) {
                    var child = children[i];
                    ctx.moveTo(child[0], midY);
                    ctx.lineTo(child[0], child[1]);
                }
            }
        },

        /**
         * 返回矩形区域，用于局部刷新和文字定位
         * @param {Object} style
         */
        getRect : function(style) {
            if (style.__rect) {
                return style.__rect;
            }
            
            var lineWidth;
            if (style.brushType == 'stroke' || style.brushType == 'fill') {
                lineWidth = style.lineWidth || 1;
            }
            else {
                lineWidth = 0;
            }

            var minX = Infinity;
            var maxX = -Infinity;
            var minY = Infinity;
            var maxY = -Infinity;
            for (var i = 0; i < style.children.length; i++) {
                var child = style.children[i];
                var minX = Math.min(minX, child[0]);
                var maxX = Math.max(maxX, child[0]);

                var minY = Math.min(minY, child[1]);
                var maxY = Math.max(maxY, child[1]);
            }

            style.__rect = {
                x : minX - lineWidth / 2,
                y : minY,
                width : maxX - minX + lineWidth,
                height : maxY - minY
            };
            
            return style.__rect;
        }
    }

    require('zrender/tool/util').inherits(TreeShape, ShapeBase);
    return TreeShape;
})