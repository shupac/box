var View = require('famous/core/View');
var Surface = require('famous/core/Surface');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');

var Wall = require('./Wall');

function Box() {
    View.apply(this, arguments);

    _createWalls.call(this);

    this._eventInput.pipe(this._eventOutput);
}

Box.prototype = Object.create(View.prototype);
Box.prototype.constructor = Box;

Box.DEFAULT_OPTIONS = {
    size: 400,
    surfaceProps: {
        backgroundColor: 'blue'
    }
};

function _createWalls() {
    for (var i = 0; i < 6; i++) {
        var size = this.options.size;
        var transform = i < 4 ?
            Transform.moveThen([0, 0, size/2], Transform.rotateX(i * Math.PI/2)) :
            Transform.moveThen([0, 0, size/2], Transform.rotateY(Math.PI/2 - Math.PI * (i-4))) ;

        var wall = new Wall({
            surfaceProps: {
                 backgroundColor: "hsl(" + (i * 360 / 6) + ", 100%, 50%)",
            }
        });
        var mod = new Modifier({
            opacity: 1,
            origin: [0.5, 0.5],
            align: [0.5, 0.5],
            size: [this.options.size, this.options.size],
            transform: transform
        });

        this.add(mod).add(wall);
        this.subscribe(wall);
    }
}

module.exports = Box;
