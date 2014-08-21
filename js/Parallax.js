// Parallax
define(function(require) {

    function ParallaxLayer(dom, scale) {

    }

    function Parallax(dom) {
        if (typeof(dom) === 'string') {
            dom = document.getElementById(dom)
        }
        var current = dom.firstChild;
        var bgLayers = [];

        while (current) {
            if (current.className && current.className.indexOf('bg-layer') >= 0) {
                bgLayers.push(current);
            }
            current = current.nextSibling;
        }
        this._root = dom;
        this._bgLayers = bgLayers;
    }

    Parallax.prototype.scaleBase = 0.5;
    Parallax.prototype.scaleStep = 0.5;

    Parallax.prototype.moveTo = function(x, y) {
        var scale = this.scaleBase;
        for (var i = 0; i < this._bgLayers.length; i++) {
            var bgLayer = this._bgLayers[i];
            var left = x * scale;
            var top = y * scale;
            scale *= this.scaleStep;

            left = -Math.max(Math.min(-left, bgLayer.clientWidth - this._root.clientWidth), 0);
            top = -Math.max(Math.min(-top, bgLayer.clientHeight - this._root.clientHeight), 0);
            bgLayer.style.left = left + 'px';
            bgLayer.style.top = top + 'px';
        }
    }

    return Parallax;
});