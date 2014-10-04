// load css
require('./styles');

// Load polyfills
require('famous-polyfills');

// import dependencies
var Engine = require('famous/core/Engine');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var Transitionable = require('famous/transitions/Transitionable');

var MouseSync   = require("famous/inputs/MouseSync");
var TouchSync   = require("famous/inputs/TouchSync");
var GenericSync = require('famous/inputs/GenericSync');

GenericSync.register({
    "mouse"  : MouseSync,
    "touch"  : TouchSync
});

var Box = require('./views/Box');

var mainContext = Engine.createContext();
mainContext.setPerspective(1000);

var box = new Box();
var angle = new Transitionable([-Math.PI/4, -Math.PI/4]);

var modifier = new Modifier({
    transform: function() {
        var currAngle = angle.get();

        return Transform.rotate(currAngle[0], currAngle[1], 0);
    }
});

mainContext.add(modifier).add(box);

var sync = new GenericSync({
    "mouse"  : {},
    "touch"  : {}
});

box.pipe(sync);

sync.on('update', function(data) {
    var currAngle = angle.get();
    angle.set([
        currAngle[0] - data.delta[1]/300, 
        currAngle[1] + data.delta[0]/300
    ]);
});
