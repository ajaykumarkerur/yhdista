/** @jsx React.DOM */
"use strict";

var Immutable = require("immutable");
var React = require("react");
var Navigation = require("react-router").Navigation;
var Label = require("react-bootstrap/Label");


var Sounds = require("./Sounds");
var KeyWrapper = require("./KeyWrapper");
var Stage = require("./Stage");
var StageMixin = require("./StageMixin");

var RunningTimer = React.createClass({

    getInitialState: function() {
        return {seconds: 0};
    },

    componentDidMount: function() {
        this.update();
    },

    update: function() {
        if (!this.isMounted()) return;

        var now = new Date();
        var from = this.props.from;
        var seconds = Math.round((now.getTime() - from.getTime()) / 1000);
        if (this.state.seconds !== seconds) {
            this.setState({seconds});
        }

        setTimeout(this.update, 100);
    },

    componentWillUnmount: function() {
        clearInterval(this.interval);
    },

    render: function() {
        return (
            <div className="RunningTimer">
                <Label>{this.state.seconds} sekuntia</Label>
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
            Sounds.play();
            stages = stages.rest();
        }

        if (stages.length === 0) {
            var started = this.state.started.getTime();
            var done = new Date().getTime();
            var time = done - started;

            var times = Immutable.Vector(0, 100, 100, 100, 100, 100, 100);
            (function success(times) {
                if (times.length === 0) return;
                Sounds.play();
                setTimeout(() => success(times.rest()), times.first());
            }(times));

            this.transitionTo("gameover", {}, {time, stage: this.props.query.stage});
            return;
        }

        this.setState({stages});
    },

    render: function() {
        var stage = this.state.stages.first();
        var activeKeys = this.props.activeKeys;

        var badKeys = activeKeys.filter((v, k) =>  !stage.get(k));

        return (
            <div className="Play">
                <RunningTimer from={this.state.started} />

                <h1>Paina</h1>

                <Stage stage={stage} activeKeys={activeKeys} />

                <Stage invalid stage={badKeys} />

                <div className="debug">
                    <hr />
                    <pre>{JSON.stringify(this.parseStages())}</pre>
                    <pre>{JSON.stringify(this.props.query)}</pre>
                    <pre>{JSON.stringify(this.props.activeKeys)}</pre>
                </div>
            </div>
        );
    }

});

module.exports = KeyWrapper.wrap(Play);
