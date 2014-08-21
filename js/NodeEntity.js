define(function(require) {

    var Base = require('qtek/core/Base');

    var Group = require('zrender/shape/Group');
    var RectShape = require('zrender/shape/Rectangle');
    var CardShape = require('./CardShape');
    var TextShape = require('zrender/shape/Text');
    var ImageShape = require('zrender/shape/Image');

    function CircleStyle(option) {
        option = option || {};
        for (var name in option) {
            this[name] = option[name];
        }
    }
    CircleStyle.prototype.x = 0;
    CircleStyle.prototype.y = 0;
    CircleStyle.prototype.r = 50;


    var NodeEntity = Base.derive({
        
        group: null,

        visible: true,

        imageWidth: 100,

        imageHeight: 100,

        color: '#2882F8',

        highlightColor: '#8c72d4',

        labelList: [],

        labelPosition: 'inside',

        image: '',

        clickable: true,

        _cardShape: null,

        _depth: 0,

        _labelHeight: 25

    }, function() {
        this.init();
    }, {

        init: function() {

            var self = this;

            // Bounding rect
            this.rect = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
            
            this.group = new Group();

            var padding = 5;
            var labelMargin = 5;

            var cardWidth = this.imageWidth + padding * 2;
            var cardHeight = this.imageHeight + padding * 2;

            var cardShape = new CardShape({
                style: {
                    x: 0,
                    y: 0,
                    r: 5,
                    color: this.color,
                    width: cardWidth,
                    height: cardHeight,
                    arrowSize: [20, 10],

                    shadowColor: 'black',
                    shadowOffsetX: 0,
                    shadowOffsetY: 2,
                    shadowBlur: 5
                },
                clickable: this.clickable,
                onclick: function() {
                    self.trigger('click');
                },
                highlightStyle: {
                    opacity: 0
                }
            });

            var image = new ImageShape({
                style: {
                    x: padding,
                    y: padding,
                    width: this.imageWidth,
                    height: this.imageHeight,
                    image: this.image
                },
                hoverable: false
            });

            var labelGroup = new Group();
            var labelY = 0;
            var labelWidth = 0;
            // Label list
            for (var i = 0; i < this.labelList.length; i++) {
                var labelItem = this.labelList[i];
                var textShape = new TextShape({
                    style: {
                        x: 0,
                        y: labelY,
                        color: 'white',
                        textFont: labelItem.font,
                        text: labelItem.text,
                        textBaseline: 'top'
                    },
                    hoverable: false
                });
                var rect = textShape.getRect(textShape.style);
                labelY += rect.height + labelMargin;
                labelWidth = Math.max(labelWidth, rect.width);
                labelGroup.addChild(textShape);
            }

            if (this.labelPosition === 'inside') {
                labelGroup.position[0] = 10;
                labelGroup.position[1] = this.imageHeight + padding + labelMargin + 5;
                cardShape.style.height = labelGroup.position[1] + labelY;
            } else {
                labelGroup.position[0] = cardWidth + 10;
                labelGroup.position[1] = 5;
            }

            this.group.addChild(cardShape);
            this.group.addChild(image);
            this.group.addChild(labelGroup);

            this._cardShape = cardShape;

            // Update bounding rect
            if (this.labelPosition === 'inside') {
                this.rect.width = cardWidth;
                this.rect.height = cardShape.style.height;
            } else {
                this.rect.width = cardWidth + 10 + labelWidth;
                this.rect.height = cardHeight;
            }
        },
        getOutPosition: function() {
            return [
                this._cardShape.style.width / 2 + this.group.position[0],
                this._cardShape.style.height + this.group.position[1] + this._cardShape.style.arrowSize[1]
            ];
        },
        getInPosition: function() {
            return [
                this._cardShape.style.width / 2 + this.group.position[0],
                this.group.position[1]
            ];
        },

        update: function(zr) {

        },

        highlight: function(zr) {
            this._cardShape.style.color = this.highlightColor;
            zr.modShape(this._cardShape);
        },

        lowlight: function(zr) {
            this._cardShape.style.color = this.color;
            zr.modShape(this._cardShape);
        }
    });

    return NodeEntity;
});