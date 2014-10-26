/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var Route = require("react-router").Route;
var Routes = require("react-router").Routes;

var Main = require("./components/Main");
var Play = require("./components/Play");
var StartUp = require("./components/StartUp");
var Editor = require("./components/Editor");
var GameOver = require("./components/GameOver");

var appContainer = document.getElementById("app");


React.renderComponent(
    <Routes>
        <Route handler={Main}>
            <Route name="editor" path="/" handler={Editor} />
            <Route name="startup" path="/startup" handler={StartUp} />
            <Route name="play" path="/play" handler={Play} />
            <Route name="gameover" path="/gameover" handler={GameOver} />
        </Route>
    </Routes>, appContainer);

