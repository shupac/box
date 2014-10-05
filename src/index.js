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
var ScrollSync  = require("famous/inputs/ScrollSync");
var GenericSync = require('famous/inputs/GenericSync');

GenericSync.register({
    "mouse"  : MouseSync,
    "touch"  : TouchSync,
    "scroll" : ScrollSync
});

var Box = require('./views/Box');

var mainContext = Engine.createContext();
mainContext.setPerspective(1000);

var box = new Box({
    size: 300
});
// var angle = new Transitionable([-Math.PI/8, -Math.PI/4]);
var angle = new Transitionable([0, 0]);

var modifier = new Modifier({
    transform: function() {
        var currAngle = angle.get();

        return Transform.rotate(currAngle[0], currAngle[1], 0);
    }
});

mainContext.add(modifier).add(box);

// var sync = new GenericSync({
//     'mouse'  : {},
//     'touch'  : {},
//     'scroll' : { scale : 0.25 }
// });

var sync = new MouseSync();

// box.pipe(sync);
Engine.pipe(sync);

sync.on('update', function(data) {
    var currAngle = angle.get();
    angle.set([
        currAngle[0] - data.delta[1]/300, 
        currAngle[1] + data.delta[0]/300
    ]);

    console.log(data.velocity);
});

sync.on('end', function(data) {
    console.log('end', data.velocity)
});

