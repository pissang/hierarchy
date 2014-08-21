define(function(require) {

    'use strict';

    var ShapeBase = require('zrender/shape/Base');

    function CardShape(options) {
        ShapeBase.call(this, options);
    }

    CardShape.prototype = {

        type: 'card',

        buildPath: function(ctx, style) {
            var x = style.x || 0;
            var y = style.y || 0;
            var width = style.width || 0;
            var height = style.height || 0;
            var arrowSize = style.arrowSize;
            var r = style.r;

            var r1;
            var r2;
            var r3;
            var r4;
            if(typeof r === 'number') {
                r1 = r2 = r3 = r4 = r;
            }
            else if(r instanceof Array) {
                if (r.length === 1) {
                    r1 = r2 = r3 = r4 = r[0];
                }
                else if(r.length === 2) {
                    r1 = r3 = r[0];
                    r2 = r4 = r[1];
                }
                else if(r.length === 3) {
                    r1 = r[0];
                    r2 = r4 = r[1];
                    r3 = r[2];
                } else {
                    r1 = r[0];
                    r2 = r[1];
                    r3 = r[2];
                    r4 = r[3];
                }
            } else {
                r1 = r2 = r3 = r4 = 0;
            }

            ctx.beginPath();

            // Left top
            ctx.moveTo(x + r1, y);
            // Right top
            ctx.lineTo(x + width - r2, y);
            r2 !== 0 && ctx.quadraticCurveTo(
                x + width, y, x + width, y + r2
            );
            // Right bottom
            ctx.lineTo(x + width, y + height - r3);
            r3 !== 0 && ctx.quadraticCurveTo(
                x + width, y + height, x + width - r3, y + height
            );
            // Arrow
            ctx.lineTo(x + width / 2 + arrowSize[0] / 2, y + height);
            ctx.lineTo(x + width / 2, y + height + arrowSize[1]);
            ctx.lineTo(x + width / 2 - arrowSize[0] / 2, y + height);
            // Left bottom
            ctx.lineTo(x + r4, y + height);
            r4 !== 0 && ctx.quadraticCurveTo(
                x, y + height, x, y + height - r4
            );
            // Left top
            ctx.lineTo(x, y + r1);
            r1 !== 0 && ctx.quadraticCurveTo(x, y, x + r1, y);
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
            style.__rect = {
                x : Math.round(style.x - lineWidth / 2),
                y : Math.round(style.y - lineWidth / 2),
                width : style.width + lineWidth,
                height : style.height + lineWidth + style.arrowSize[1]
            };
            
            return style.__rect;
        }
    }

    require('zrender/tool/util').inherits(CardShape, ShapeBase);
    return CardShape;
})