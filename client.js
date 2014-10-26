/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var Route = require("react-router").Route;
var Routes = require("react-router").Routes;

var Play = require("./components/Play");
var StartUp = require("./components/StartUp");
var Editor = require("./components/Editor");
var GameOver = require("./components/GameOver");

var appContainer = document.getElementById("app");

/**
 * Main
 *
 * @namespace components
 * @class Main
 * @constructor
 * @param {Object} props
 */
var Main = React.createClass({
    render: function() {
        return (
            <div className="Main container">
                {this.props.activeRouteHandler()}
            </div>
        );
    }
});

React.renderComponent(
    <Routes>
        <Route handler={Main}>
            <Route name="editor" path="/" handler={Editor} />
            <Route name="startup" path="/startup" handler={StartUp} />
            <Route name="play" path="/play" handler={Play} />
            <Route name="gameover" path="/gameover" handler={GameOver} />
        </Route>
    </Routes>, appContainer);

