"use strict";

var React = require("react");
var prettyMs = require("pretty-ms");
var {Navigation} = require("react-router");
var {Link} = require("react-router");
var Jumbotron = require("reac-bootstrap/lib/Jumbotron");
var stringify = require("json-stable-stringify");

var KeyWrapper = require("./KeyWrapper");
var Sounds = require("./Sounds");
var StageMixin = require("./StageMixin");


/**
 * GameOver
 *
 * @namespace components
 * @class GameOver
 * @constructor
 * @param {Object} props
 */
var GameOver = React.createClass({
    mixins: [Navigation, StageMixin],

    componentDidMount: function() {
        var stages = this.parseStages();
        var coinCount = stages.reduce((count, stage) => {
            return count + stage.count();
        }, 0);

        Sounds.times("okShort", coinCount);
    },

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.activeKeys.get("ENTER") || nextProps.activeKeys.get("SPACE")) {
            this.transitionTo("startup", {}, {stage: this.getStageQuery()});
        }
    },

    render: function() {
        var time = parseInt(this.getQuery().time, 10);
        return (
            <div className="GameOver">
                <h1>
                    Game Over!
                </h1>
                <p>
                    Taso suoritettu ajassa {prettyMs(time)}
                </p>

                <Link to="startup" className="btn btn-success" query={{stage: this.getStageQuery()}} >
                    Uudestaan!
                </Link>

            </div>
        );
    }
});


module.exports = KeyWrapper.wrap(GameOver);
