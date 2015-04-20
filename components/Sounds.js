/** @jsx React.DOM */
"use strict";


// http://egonelbre.com/project/jsfx/
module.exports = {
    ok: function() {
        window.jsfxlib.createWave(["square",0.0000,0.4000,0.0000,0.0200,0.5490,0.4380,20.0000,1490.0000,2400.0000,0.0000,0.0000,0.0000,0.0100,0.0003,0.0000,0.5420,0.1140,0.0000,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000]).play();

    },

    okShort: function() {
        window.jsfxlib.createWave(["square",0.0000,0.4000,0.0000,0.0060,0.4860,0.1380,20.0000,1287.0000,2400.0000,0.0000,0.0000,0.0000,0.0100,0.0003,0.0000,0.2760,0.1280,0.0000,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000]).play();

    },

    error: function() {
        window.jsfxlib.createWave(["saw",0.0000,0.2460,0.0000,0.2660,0.0000,0.1380,110.0000,693.0000,2400.0000,-0.7500,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.2200,0.1820,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000]).play();
    },

    times: function(sound, count, delay) {
        delay = delay || 100;

        var loop = (_count) => {
            if (!_count) return;
            this[sound]();
            console.log(_count);
            setTimeout(() => loop(_count-1), delay);
        };

        loop(count);
    },

    play: function() {
        this.ok();
    },
};
