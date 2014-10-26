/** @jsx React.DOM */
"use strict";

var Immutable = require("immutable");
var React = require("react");


var Stage = require("./Stage");
var StageMixin = require("./StageMixin");

var Play = React.createClass({

    mixins: [StageMixin],

    propTypes: {
        activeKeys: React.PropTypes.object.isRequired
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
            console.log("DONE!");
            stages = stages.rest();
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
