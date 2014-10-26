/** @jsx React.DOM */
"use strict";
var Immutable = require("immutable");

var StageMixin = {

    parseStages: function() {
        var rawStages = this.props.query.stage;
        if (!this.props.query.stage) return Immutable.Vector();

        var stages = rawStages.reduce((stages, current) => {

                var stage = current.split(",").reduce((stage, key) => {
                    return stage.set(key, true);
                }, Immutable.Map());

                return stages.push(stage);
        }, Immutable.Vector());

        return stages;
    },
};


module.exports = StageMixin;
