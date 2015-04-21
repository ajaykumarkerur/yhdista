"use strict";
require("babel/polyfill");
var React = require("react/addons");

var Router = require("react-router");
var {Route, Routes, DefaultRoute, NotFoundRoute} = Router;
var Link = require("react-router").Link;
var Grid = require("react-bootstrap/lib/Grid");
var Row = require("react-bootstrap/lib/Row");
var Col = require("react-bootstrap/lib/Col");

var Main = require("./components/Main");
var Play = require("./components/Play");
var StartUp = require("./components/StartUp");
var Editor = require("./components/Editor");
var GameOver = require("./components/GameOver");

var appContainer = document.getElementById("app");

var example = "#/startup?stage%5B0%5D=LEFT&stage%5B1%5D=DOWN&stage%5B2%5D=DOWN%2CLEFT&stage%5B3%5D=A%2CDOWN%2CRIGHT";

/**
 * About
 *
 * @namespace components
 * @class About
 * @constructor
 * @param {Object} props
 */
var About = React.createClass({
    render: function() {
        return (
            <div className="About">

                <Grid>
                    <Row>
                        <Col md={12}>
                            <h1>mmpuzzle</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <p>
                                Yksinkertainen <a href="http://www.makeymakey.com/">Makey Makey</a> -peli.

                                Kokeile <a href={example} >esimerkkitasoa</a> tai luo <Link to="editor">omasi</Link>.

                                Lähdekoodit löytyvät <a href="https://github.com/opinsys/mmpuzzle">Githubista</a>.
                            </p>

                            <p>
                                Pelin on toteuttanut <a href="http://opinsys.fi/">Opinsys Oy</a>.
                            </p>
                        </Col>
                        <Col md={4}>
                            <a href="pics/overview.jpg" className="thumbnail">
                                <img src="pics/overview.jpg" />
                            </a>

                            <a href="pics/usage.jpg" className="thumbnail">
                                <img src="pics/usage.jpg" />
                            </a>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});

var NotFound = React.createClass({
    render: function() {
        return (
            <div className="NotFound">
                <p>
                    404 - tuntematon osoite
                </p>
            </div>
        );
    }
});


var routes = (
    <Route name="app" handler={Main} path="/">
        <Route name="editor" handler={Editor} />
        <Route name="startup" handler={StartUp} />
        <Route name="play" handler={Play} />
        <Route name="gameover" handler={GameOver} />
        <NotFoundRoute handler={NotFound} />
        <DefaultRoute name="about" handler={About} />
    </Route>
);

Router.run(routes, (Handler, state) => {
    console.log("Rendering", state.routes.map(r => r.handler.displayName));
    React.render(<Handler /> , appContainer);
});


