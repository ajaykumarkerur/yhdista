/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var Route = require("react-router").Route;
var Routes = require("react-router").Routes;
var Link = require("react-router").Link;

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
                <h1>mmpuzzle</h1>

                <p>
                    Yksinkertainen <a href="http://www.makeymakey.com/">Makey Makey</a> peli.

                    Kokeile <a href={example} >esimerkkitasoa</a> tai luo <Link to="editor">omasi</Link>.

                    Lähdekoodit löytyvät <a href="https://github.com/opinsys/mmpuzzle">Githubista</a>.
                </p>

            </div>
        );
    }
});

React.renderComponent(
    <Routes scrollBehavior="none">
        <Route handler={Main}>
            <Route name="about" path="/" handler={About} />
            <Route name="editor" path="/editor" handler={Editor} />
            <Route name="startup" path="/startup" handler={StartUp} />
            <Route name="play" path="/play" handler={Play} />
            <Route name="gameover" path="/gameover" handler={GameOver} />
        </Route>
    </Routes>, appContainer);

