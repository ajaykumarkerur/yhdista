"use strict";
var React = require("react/addons");
var Immutable = require("immutable");

var StageMixin = {

    contextTypes: {
        router: React.PropTypes.func
    },

    getQuery() {
        return this.context.router.getCurrentQuery();
    },

    getStageQuery: function() {
        var query = this.context.router.getCurrentQuery();
        return this.getQuery().stage || [];
    },

    stagesToQuery: function(stages) {
        return stages.map(s => s.keySeq().join(",")).toJS();
    },

    parseStages: function() {
        if (!this.getQuery().stage) return Immutable.List();
        var rawStages = this.getStageQuery();

        var stages = rawStages.reduce((stages, current) => {

                var stage = current.split(",").reduce((stage, key) => {
                    return stage.set(key, true);
                }, Immutable.Map());

                return stages.push(stage);
        }, Immutable.List());

        return stages;
    },
};


module.exports = StageMixin;
