/** @jsx React.DOM */
"use strict";

var React = require("react");
var prettyMs = require("pretty-ms");
var Navigation = require("react-router").Navigation;
var Button = require("react-bootstrap/Button");
var Link = require("react-router").Link;


/**
 * GameOver
 *
 * @namespace components
 * @class GameOver
 * @constructor
 * @param {Object} props
 */
var GameOver = React.createClass({
    mixins: [Navigation],

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

                <Link to="play" className="btn btn-success" query={{stage: this.props.query.stage}} >
                    Uudestaan!
                </Link>

            </div>
        );
    }
});


module.exports = GameOver;
