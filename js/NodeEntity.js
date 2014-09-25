define(function(require) {

    var Base = require('qtek/core/Base');

    var Group = require('zrender/Group');
    var RectShape = require('zrender/shape/Rectangle');
    var CardShape = require('./CardShape');
    var TextShape = require('zrender/shape/Text');
    var ImageShape = require('zrender/shape/Image');

    var loadingImage = new Image();
    loadingImage.src = 'imgs/logo_loading.png';
    var defaultImage = new Image();
    defaultImage.src = 'imgs/default_logo.jpg';

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

        _isImageLoad: false,

        _cardShape: null,

        _imageShape: null,

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

            var padding = 3;
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

                    shadowColor: '#333',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 5
                },
                clickable: this.clickable,
                onclick: function() {
                    self.trigger('click');
                },
                onmouseover: function() {
                    self.trigger('mouseover');
                },
                onmouseout: function() {
                    self.trigger('mouseout');
                },
                highlightStyle: {
                    opacity: 0
                }
            });

            var imageShape = new ImageShape({
                style: {
                    x: padding,
                    y: padding,
                    width: this.imageWidth,
                    height: this.imageHeight,
                    image: loadingImage
                },
                hoverable: false
            });

            var labelGroup = new Group();
            var labelY = 0;
            var labelWidth = 0;

            // var labelColor = this.labelPosition === 'inside' ? 'white' : '#111';
            var labelColor = 'white';
            // Label list
            for (var i = 0; i < this.labelList.length; i++) {
                var labelItem = this.labelList[i];
                var textShape = new TextShape({
                    style: {
                        x: 0,
                        y: labelY,
                        color: labelItem.color || labelColor,
                        textFont: labelItem.font,
                        text: labelItem.text,
                        textBaseline: 'top'
                    },
                    hoverable: false,
                    z: 1
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
            this.group.addChild(imageShape);
            this.group.addChild(labelGroup);

            this._cardShape = cardShape;
            this._imageShape = imageShape;

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
            // this._cardShape.style.color = this.highlightColor;
            this._cardShape.style.shadowBlur = 20;
            this._cardShape.style.shadowColor = 'white';
            zr.modShape(this._cardShape.id);
        },

        lowlight: function(zr) {
            // this._cardShape.style.color = this.color;
            this._cardShape.style.shadowBlur = 5;
            this._cardShape.style.shadowColor = '#333';
            zr.modShape(this._cardShape.id);
        },

        isImageLoad: function() {
            return this._isImageLoad;
        },

        loadImage: function(zr) {
            var self = this;
            var image = new Image();
            image.onload = function() {
                image.onload = image.oerror = null;
                self._imageShape.style.image = image;
                zr.refreshNextFrame();
            }
            image.onerror = function() {
                image.onload = image.onerror = null;
                self._imageShape.style.image = defaultImage;
                zr.refreshNextFrame();
            }
            image.src = this.image;
            this._isImageLoad = true;
            zr.modShape(this._imageShape);
        },

        setScale: function(zr, scale) {
            this._scale = scale;
            this._cardShape.style.shadowBlur = 5 * Math.pow(scale, 4);
            this.group.scale[0] = scale;
            this.group.scale[1] = scale;
            this.group.scale[2] = this._cardShape.style.width / 2;
            this.group.scale[3] = this._cardShape.style.height / 2;

            zr.modGroup(this.group.id);
        },

        getScale: function() {
            return this._scale;
        }
    });

    return NodeEntity;
});