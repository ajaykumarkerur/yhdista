/** @jsx React.DOM */
"use strict";
var React = require("react");
var Navigation = require("react-router").Navigation;
var StageMixin = require("./StageMixin");

/**
 * StartUp
 *
 * @namespace components
 * @class StartUp
 * @constructor
 * @param {Object} props
 */
var StartUp = React.createClass({

    mixins: [StageMixin, Navigation],

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.activeKeys.length) {
            this.transitionTo("play", {}, this.props.query);
        }
    },

    render: function() {
        return (
            <div className="StartUp">
                <h1>Paina mitä tahansa näppäintä aloittaaksesi</h1>
            </div>
        );
    }
});

module.exports = StartUp;
