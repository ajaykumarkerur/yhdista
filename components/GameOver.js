"use strict";

var React = require("react");
var _ = require("lodash");
var prettyMs = require("pretty-ms");
var {Navigation} = require("react-router");
var sha1 = require("sha1");
var {Link} = require("react-router");
var Jumbotron = require("react-bootstrap/lib/Jumbotron");
var stringify = require("json-stable-stringify");
var Grid = require("react-bootstrap/lib/Grid");
var Row = require("react-bootstrap/lib/Row");
var Col = require("react-bootstrap/lib/Col");
var ListGroup = require("react-bootstrap/lib/ListGroup");
var ListGroupItem = require("react-bootstrap/lib/ListGroupItem");
var Button = require("react-bootstrap/lib/Button");
var Input = require("react-bootstrap/lib/Input");
var Badge = require("react-bootstrap/lib/Badge");

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

    getPlayId() {
        var id = this.getQuery().playId;
        if (!id) throw new Error("playId missing");
        return id;

    },

    getInitialState() {
        var time = this.getTimeScore();
        var scores = this.getCurrentScores();
        scores = scores.concat({
            id: this.getPlayId(),
            time,
            name: null
        });

        scores = _.unique(scores, s => s.id);
        scores = scores.sort((a, b) => a.time - b.time);

        return {
            scores,
            name: ""
        };
    },

    getTimeScore() {
        return parseInt(this.getQuery().time, 10);
    },

    getStageKey() {
        return "stage-" + sha1(stringify(this.parseStages()));
    },

    getCurrentScores() {
        var key = this.getStageKey();
        try {
            return JSON.parse(window.localStorage[key]);
        } catch(err) {
            return [];
        }
    },

    saveScore() {
        var scores = this.state.scores;
        var playId = this.getPlayId();
        var score = _.find(scores, s => s.id === playId);
        score.name = this.state.name;
        this.setState({scores});

        window.localStorage[this.getStageKey()] = JSON.stringify(scores);
        var el = React.findDOMNode(this.refs.restart);
        el.focus();
    },


    isSaved() {
        var scores = this.state.scores;
        var playId = this.getPlayId();
        var score = _.find(scores, s => s.id === playId);
        return !!score.name;
    },

    renderSaveInput() {

        return (
            <div>
                <Col xs={5}>
                    <Input
                        autoFocus
                        onChange={e => this.setState({ name: e.target.value })}
                        value={this.state.name}
                        type="text"
                        onKeyDown={e => {
                            if (e.key === "Enter") this.saveScore();
                        }}
                        placeholder="Ryhmän nimi" />
                </Col>
                <Col xs={2}>
                    <Button bsStyle="success"
                        disabled={!this.state.name.trim()}
                        onClick={this.saveScore}>Tallenna</Button>
                </Col>
            </div>
        );
    },

    render: function() {

        var scores = this.state.scores;
        var id = this.getPlayId();
        var position = _.findIndex(scores, s => s.id === id) + 1;


        return (
            <div className="GameOver">
                <Grid>
                    <Row>
                        <Col md={6}>
                                <h2>
                                    Peli on päättynyt
                                </h2>

                            <Jumbotron>
                                <p>
                                    Sija {position}!
                                </p>
                                <p>
                                    Taso suoritettu ajassa {prettyMs(this.getTimeScore())}
                                </p>

                                <Link ref="restart" to="startup" className="btn btn-success" query={{stage: this.getStageQuery()}} >
                                    Uudestaan!
                                </Link>
                            </Jumbotron>

                        </Col>

                        <Col md={6}>
                            <h2>Parhaat tulokset</h2>
                            <ListGroup>
                                {scores.map((score, i) => {
                                    return (
                                        <ListGroupItem key={i}>
                                            <Row>
                                                <Col xs={1}>
                                                    <Badge className="badge">{i+1}.</Badge>
                                                </Col>

                                                <Col xs={2} style={{fontSize: 15, fontWeight: "bold"}}>
                                                    {prettyMs(score.time)}
                                                </Col>

                                                {!!score.name || this.renderSaveInput()}

                                                {score.name && <Col>
                                                    {score.name}
                                                </Col>}

                                            </Row>
                                        </ListGroupItem>
                                    );
                                })}
                            </ListGroup>

                        </Col>

                    </Row>
                </Grid>
            </div>
        );
    }
});


module.exports = GameOver;
