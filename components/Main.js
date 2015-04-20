"use strict";
var React = require("react/addons");
var classSet = React.addons.classSet;
var Link = require("react-router").Link;
var RouteHandler = require("react-router").RouteHandler;

var Navbar = require("react-bootstrap/lib/Navbar");
var Nav = require("react-bootstrap/lib/Nav");

var StageMixin = require("./StageMixin");
var Fa = require("./Fa");


var Item = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    render: function() {
        var className = classSet({
            active: this.context.router.isActive(this.props.to)
        });
        return (
            <li className={className}>
                <Link {...this.props}>{this.props.children}</Link>
            </li>
        );
    }
});

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
        var query = { stage: this.getStageQuery() };

        return (
            <div className="Main">
                <Navbar>
                    <Nav>
                        {query.stage.length > 0 &&
                            <Item to="editor" query={query}>
                                <Fa icon="edit" /> Muokkaa tasoa
                            </Item>}


                        {query.stage.length > 0 &&
                            <Item to="startup" query={query}>
                                <Fa icon="play" /> Aloita
                            </Item>}

                        <li>
                            <Link to="editor" >
                                <Fa icon="star" /> Luo uusi taso
                            </Link>
                        </li>

                        <Item to="about" >
                            <Fa icon="question" /> Tietoja
                        </Item>
                    </Nav>
                </Navbar>
                <div className="container">
                    <RouteHandler />
                </div>
            </div>
        );
    }
});


module.exports = Main;
