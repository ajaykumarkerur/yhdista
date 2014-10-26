/** @jsx React.DOM */
"use strict";
var React = require("react");
var Link = require("react-router").Link;
var Immutable = require("immutable");
var _ = require("lodash");

var Badge = require("react-bootstrap/Badge");
var Button = require("react-bootstrap/Button");
var ListGroup = require("react-bootstrap/ListGroup");
var ListGroupItem = require("react-bootstrap/ListGroupItem");


var Stage = require("./Stage");

/**
 * Editor
 *
 * @namespace components
 * @class Editor
 * @constructor
 * @param {Object} props
 */
var Editor = React.createClass({

    getInitialState: function() {
        return {
            stages: Immutable.Vector()
        };
    },

    saveStage: function(stage) {
        if (stage.length === 0) return;
        this.setState({
            stages: this.state.stages.push(stage)
        });
    },

    componentWillMount: function() {
        this.saveStageDebounced = _.debounce(this.saveStage, 1000);
    },

    deletePrevious: function(e) {
        e.preventDefault();
        this.setState({
            stages: this.state.stages.pop()
        });
    },

    componentWillReceiveProps: function(nextProps) {
        if (Immutable.is(this.props.activeKeys, nextProps.activeKeys)) {
            return;
        }
        this.saveStageDebounced(nextProps.activeKeys);
    },

    render: function() {

        var stages = this.state.stages;
        var activeKeys = this.props.activeKeys;

        var query = {
            stage: stages.map(s => s.flip().join(",")).toArray()
        };

        console.log(query.stage);

                // {stages.map(stage => <Stage stage={stage} />)}
        return (
            <div>
                <h1>Luo taso</h1>
                <p>Pidä näppäimiä painettuna sekunnin ajan</p>

                <div className="Editor-workarea">
                    <Stage stage={activeKeys} />
                </div>

                <hr />

                <ListGroup className="Editor-saved-list">
                    {stages.map( (stage, i) => {
                        return <ListGroupItem key={stage}>
                            <Badge>{i+1}</Badge>
                            <Stage stage={stage} activeKeys={stage} />
                        </ListGroupItem>;
                    }).toArray()}
                </ListGroup>

                <hr />



                <Link disabled={stages.length === 0} className="btn btn-success Editor-save" to="play" query={query} >Valmis!</Link>

                <Button className="Editor-cancel" bsStyle="danger" onClick={this.deletePrevious}>Poista edellinen</Button>

                <div className="debug">
                    <hr />
                    <pre>{JSON.stringify(this.props.activeKeys)}</pre>
                    <pre>{JSON.stringify(this.state.stages)}</pre>
                </div>
            </div>
        );
    }
});

module.exports = Editor;
