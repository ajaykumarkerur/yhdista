/** @jsx React.DOM */
"use strict";

var Immutable = require("immutable");
var React = require("react");
var prettyMs = require("pretty-ms");
var Navigation = require("react-router").Navigation;


var Stage = require("./Stage");
var StageMixin = require("./StageMixin");

var RunningTimer = React.createClass({

    componentDidMount: function() {
        this.update();
    },

    update: function() {
        if (this.isMounted()) {
            this.forceUpdate();
            setTimeout(this.update, 100);
        }
    },

    componentWillUnmount: function() {
        clearInterval(this.interval);
    },

    render: function() {
        var now = new Date();
        var from = this.props.from;
        return (
            <div className="RunningTimer">
                {prettyMs(now.getTime() - from.getTime())}
            </div>
        );
    },

});

var Play = React.createClass({

    mixins: [StageMixin, Navigation],

    propTypes: {
        activeKeys: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
        return {
            started: new Date()
        };
    },

    componentWillMount: function() {
        this.setState({
            stages: this.parseStages()
        });
    },

    componentWillReceiveProps: function(nextProps) {
        var stages = this.state.stages;
        var stage = stages.first();

        if (Immutable.is(nextProps.activeKeys, stage)) {
            stages = stages.rest();
        }

        if (stages.length === 0) {
            var started = this.state.started.getTime();
            var done = new Date().getTime();
            var time = done - started;
            this.transitionTo("gameover", {}, {time, stage: this.props.query.stage});
            return;
        }

        this.setState({stages});
    },

    render: function() {
        var stage = this.state.stages.first();

        return (
            <div className="Play">

                <h1>Paina</h1>
                <Stage stage={stage} activeKeys={this.props.activeKeys} />

                <div className="debug">
                    <hr />
                    <pre>{JSON.stringify(this.state.stages)}</pre>
                    <pre>{JSON.stringify(this.props.query)}</pre>
                    <pre>{JSON.stringify(this.props.activeKeys)}</pre>
                </div>
            </div>
        );
    }

});

module.exports = Play;
