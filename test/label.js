define(function(require) {

    var NodeEntity = require('../js/NodeEntity');

    var zrender = require('zrender');

    var zr = zrender.init(document.getElementById('main'));

    var card = new NodeEntity({
        image: 'sample-man.jpg',
        imageWidth: 50,
        imageHeight: 50,
        labelList: [{
            text: '李某某',
            font: '14px 微软雅黑'
        }, {
            text: '2014年8月19日',
            font: '12px 微软雅黑'
        }],
        labelPosition: 'outside'
    });
    zr.addGroup(card.group);

    zr.render();
})