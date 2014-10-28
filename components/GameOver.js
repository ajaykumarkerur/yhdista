/** @jsx React.DOM */
"use strict";

var React = require("react");
var prettyMs = require("pretty-ms");
var Navigation = require("react-router").Navigation;
var Link = require("react-router").Link;

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
        var coinCount = this.parseStages().reduce((count, stage) => {
            return count + stage.count();
        }, 0);

        Sounds.times("ok", coinCount);
    },

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.activeKeys.get("ENTER") || nextProps.activeKeys.get("SPACE")) {
            this.transitionTo("startup", {}, {stage: this.props.query.stage});
        }
    },

    render: function() {
        var time = parseInt(this.props.query.time, 10);
        return (
            <div className="GameOver">
                <h1>
                    Game Over!
                </h1>
                <p>
                    Taso suoritettu ajassa {prettyMs(time)}
                </p>

                <Link to="startup" className="btn btn-success" query={{stage: this.props.query.stage}} >
                    Uudestaan!
                </Link>

            </div>
        );
    }
});


module.exports = KeyWrapper.wrap(GameOver);
