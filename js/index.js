define(function(require) {

    var hierarchy = require('./hierarchy');

    return {
        start: function(data) {
            hierarchy.start(data);
        }
    }
});