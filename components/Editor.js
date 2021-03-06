"use strict";
var React = require("react");
var Link = require("react-router").Link;
var Immutable = require("immutable");
var _ = require("lodash");
var Navigation = require("react-router").Navigation;

var Button = require("react-bootstrap/lib/Button");
var ListGroup = require("react-bootstrap/lib/ListGroup");
var ListGroupItem = require("react-bootstrap/lib/ListGroupItem");
var Grid = require("react-bootstrap/lib/Grid");
var Row = require("react-bootstrap/lib/Row");
var Col = require("react-bootstrap/lib/Col");
var Well = require("react-bootstrap/lib/Well");


var Sounds = require("./Sounds");
var KeyWrapper = require("./KeyWrapper");
var Stage = require("./Stage");
var StageMixin = require("./StageMixin");

/**
 * Editor
 *
 * @namespace components
 * @class Editor
 * @constructor
 * @param {Object} props
 */
var Editor = React.createClass({

    mixins: [StageMixin, Navigation],

    getInitialState: function() {
        return {
            stages: Immutable.List()
        };
    },

    addStage: function(stage) {
        if (stage.count() === 0) return;
        var stages = this.parseStages().push(stage);
        Sounds.ok();
        console.log("Saving statages", JSON.stringify(stages));
        this.saveStages(stages);
    },

    saveStages: function(stages) {
        this.transitionTo("editor", {}, {stage: this.stagesToQuery(stages)});
    },

    componentWillMount: function() {
        this.addStageDebounced = _.debounce(this.addStage, 1000);
    },

    componentWillReceiveProps: function(nextProps) {
        if (Immutable.is(this.props.activeKeys, nextProps.activeKeys)) {
            return;
        }
        this.addStageDebounced(nextProps.activeKeys);
    },

    deleteStage: function(stage) {
        var stages = this.parseStages() .filter(current => {
            return !Immutable.is(current, stage);
        });

        this.saveStages(stages);
    },

    render: function() {

        var stages = this.parseStages();
        var activeKeys = this.props.activeKeys;

        var query = {
            stage: this.stagesToQuery(stages)
        };

        return (
            <Grid className="Editor">

                <Row>
                    <Col xs={12} md={8}>
                        <h1>Luo taso</h1>
                        <p>Yhdistä yksi tai useampi Makey Makey -johdin hetkeksi tallentaaksesi askeleen.</p>
                        <Link disabled={stages.count() === 0}
                            className="btn btn-success Editor-save"
                            to="startup"
                            query={query}
                            >Valmis!</Link>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={8}>
                        <Well className="Editor-workarea">
                            <Stage stage={activeKeys} activeKeys={activeKeys} />
                        </Well>
                    </Col>
                </Row>



                <Row>
                    <Col xs={12} md={8}>
                        <ListGroup className="Editor-saved-list">
                            {stages.reverse().map((stage, i) => {
                                console.log("rendering saved stage", JSON.stringify(stage));
                                return (
                                    <ListGroupItem key={i}>
                                        <Button className="Editor-delete-stage"
                                            bsStyle="danger"
                                            onClick={() => this.deleteStage(stage)}>
                                            X
                                        </Button>
                                        <Stage stage={stage} />
                                    </ListGroupItem>
                                );
                            })}
                        </ListGroup>
                    </Col>


                </Row>

                <Row className="debug">
                    <hr />
                    <pre>{JSON.stringify(this.props.activeKeys)}</pre>
                    <pre>{JSON.stringify(this.parseStages())}</pre>
                </Row>
            </Grid>
        );
    }
});

module.exports = KeyWrapper.wrap(Editor);
