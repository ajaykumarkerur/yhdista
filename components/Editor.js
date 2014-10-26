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
var Grid = require("react-bootstrap/Grid");
var Row = require("react-bootstrap/Row");
var Col = require("react-bootstrap/Col");
var Well = require("react-bootstrap/Well");


var KeyWrapper = require("./KeyWrapper");
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

        return (
            <Grid className="Editor">

                <Row>
                    <h1>Luo taso</h1>
                    <p>Pidä näppäimiä painettuna sekunnin ajan</p>
                </Row>

                <Row>
                    <Col>
                        <Well className="Editor-workarea">
                            <Stage stage={activeKeys} />
                        </Well>
                    </Col>
                </Row>



                <Row>
                    <Col xs={12} md={8}>
                        <ListGroup className="Editor-saved-list">
                            {stages.reverse().map( (stage, i) => {
                                return <ListGroupItem key={i}>
                                    <Badge>{stages.length - i}</Badge>
                                    <Stage stage={stage} activeKeys={stage} />
                                </ListGroupItem>;
                            }).toArray()}
                        </ListGroup>
                    </Col>



                    <Col xs={6} md={4} >
                        <Link disabled={stages.length === 0}
                            className="btn btn-success Editor-save"
                            to="startup"
                            query={query}
                            >Valmis!</Link>

                        <Button className="Editor-cancel"
                            bsStyle="danger"
                            onClick={this.deletePrevious}
                            >Poista edellinen</Button>
                    </Col>


                </Row>

                <Row className="debug">
                    <hr />
                    <pre>{JSON.stringify(this.props.activeKeys)}</pre>
                    <pre>{JSON.stringify(this.state.stages)}</pre>
                </Row>
            </Grid>
        );
    }
});

module.exports = KeyWrapper.wrap(Editor);
