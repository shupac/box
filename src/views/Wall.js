var View = require('famous/core/View');
var Surface = require('famous/core/Surface');

function Wall() {
    View.apply(this, arguments);

    this.surface = new Surface({
        properties: this.options.surfaceProps
    });

    this.add(this.surface);
    this.surface.pipe(this._eventOutput);
}

Wall.prototype = Object.create(View.prototype);
Wall.prototype.constructor = Wall;

Wall.DEFAULT_OPTIONS = {
    surfaceProps: {
        backgroundColor: 'blue',
        webkitBackfaceVisibility: 'visible'
    }
};

Wall.prototype.setContent = function(content) {
    this.surface.setContent(content);
};

module.exports = Wall;
