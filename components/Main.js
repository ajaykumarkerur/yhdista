/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var Link = require("react-router").Link;

var Navbar = require("react-bootstrap/Navbar");
var Nav = require("react-bootstrap/Nav");

var StageMixin = require("./StageMixin");


/**
 * Main
 *
 * @namespace components
 * @class Main
 * @constructor
 * @param {Object} props
 */
var Main = React.createClass({

    mixins: [StageMixin],

    render: function() {
        var query = {
            stage: this.getStageQuery()
        };

        return (
            <div className="Main">
                <Navbar>
                    <Nav>
                        {query.stage.length > 0 &&
                        <li>
                            <Link to="editor" query={query}>Muokkaa tasoa</Link>
                        </li>}

                        {query.stage.length > 0 &&
                        <li>
                            <Link to="startup" query={query}>Aloita</Link>
                        </li>}

                        <li>
                            <Link to="editor" >Luo uusi taso</Link>
                        </li>
                    </Nav>
                </Navbar>
                <div className="container">
                    {this.props.activeRouteHandler()}
                </div>
            </div>
        );
    }
});


module.exports = Main;
