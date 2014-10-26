/** @jsx React.DOM */
"use strict";
var Immutable = require("immutable");

var StageMixin = {

    getStageQuery: function() {
        return this.props.query.stage || [];
    },

    stagesToQuery: function(stages) {
         return stages.map(s => s.flip().join(",")).toArray();
    },

    parseStages: function() {
        if (!this.props.query.stage) return Immutable.Vector();
        var rawStages = this.getStageQuery();

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
