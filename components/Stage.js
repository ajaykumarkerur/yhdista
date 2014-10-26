/** @jsx React.DOM */
"use strict";

var React = require("react/addons");
var classSet = React.addons.classSet;
var Badge = require("react-bootstrap/Badge");
var Immutable = require("immutable");

var Fa = require("./Fa");

/**
 * Stage
 *
 * @namespace components
 * @class Stage
 * @constructor
 * @param {Object} props
 */
var Stage = React.createClass({

    getDefaultProps: function() {
        return {
            activeKeys: Immutable.Map()
        };
    },

    getIcon: function(key) {
        var icons = {
            UP: <Fa icon="arrow-up" />,
            DOWN: <Fa icon="arrow-down" />,
            LEFT: <Fa icon="arrow-left" />,
            RIGHT: <Fa icon="arrow-right" />
        };

        return icons[key] || key;
    },

    render: function() {
        var activeKeys = this.props.activeKeys;
        var stage = this.props.stage;
        if (!stage) return null;

        return (
            <div className="Stage">
                {stage.flip().toArray().map(key => {

                    var className = classSet({
                        "badge": true,
                        "Stage-coin": true,
                        "Stage-ok": activeKeys.get(key),
                        "Stage-invalid": this.props.invalid
                    });

                    return <span className={className}>
                        <span className="Stage-coin-inner" >{this.getIcon(key)}</span>
                    </span>;
                })}
            </div>
        );
    }
});


module.exports = Stage;
