/** @jsx React.DOM */
"use strict";

var React = require("react/addons");
var classSet = React.addons.classSet;
var Badge = require("react-bootstrap/Badge");
var Immutable = require("immutable");

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

    render: function() {
        var activeKeys = this.props.activeKeys;
        var stage = this.props.stage;
        if (!stage) return null;

        return (
            <div className="Stage">
                {stage.flip().toArray().map(key => {

                    var className = classSet({
                        "btn-success": activeKeys.get(key)
                    });

                    return <span>
                        <Badge className={className} >{key}</Badge>
                    </span>;
                })}
            </div>
        );
    }
});


module.exports = Stage;
