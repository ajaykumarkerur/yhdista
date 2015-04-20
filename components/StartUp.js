"use strict";
var React = require("react");
var Navigation = require("react-router").Navigation;
var StageMixin = require("./StageMixin");
var KeyWrapper = require("./KeyWrapper");


/**
 * StartUp
 *
 * @namespace components
 * @class StartUp
 * @constructor
 * @param {Object} props
 */
var StartUp = React.createClass({

    mixins: [StageMixin, Navigation],

    contextTypes: {
        router: React.PropTypes.func
    },

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.activeKeys.count()) {
            this.transitionTo("play", {}, this.context.router.getCurrentQuery());
        }
    },

    render: function() {
        return (
            <div className="StartUp">
                <h1>Paina mitä tahansa näppäintä aloittaaksesi</h1>
            </div>
        );
    }
});

module.exports = KeyWrapper.wrap(StartUp);
