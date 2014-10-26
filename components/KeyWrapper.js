/** @jsx React.DOM */
"use strict";

var React = require("react/addons");
var Immutable = require("immutable");
var cloneWithProps = React.addons.cloneWithProps;

var getKey = require("./getKey");

/**
 * KeyWrapper
 *
 * @namespace components
 * @class KeyWrapper
 * @constructor
 * @param {Object} props
 */
var KeyWrapper = React.createClass({

    componentDidMount: function() {
        document.addEventListener("click", this.focus);
        this.focus();
    },

    componentWillUnmount: function() {
        document.removeEventListener("click", this.focus);
    },

    componentDidUpdate: function() {
        this.focus();
    },

    focus: function() {
        this.refs.input.getDOMNode().focus();
    },

    getInitialState: function() {
        return {
            activeKeys: Immutable.Map({})
        };
    },

    // shouldComponentUpdate: function(nextProps, nextState) {
    //     if (this.props.target !== nextProps.target) return true;
    //     return !Immutable.is(nextState.activeKeys, this.state.activeKeys);
    // },


    handleKeyDown: function(e) {
        e.preventDefault();
        this.setState({
            activeKeys: this.state.activeKeys.set(getKey(e), true)
        });
    },

    handleKeyUp: function(e) {
        this.setState({
            activeKeys: this.state.activeKeys.delete(getKey(e))
        });
    },


    render: function() {
        var activeKeys = this.state.activeKeys;
        var target = this.props.target;

        return (
            <div className="KeyWrapper">
                <input className="KeyWrapper-input" ref="input" autofocus onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp} onBlur={this.focus} />
                {this.transferPropsTo(<target activeKeys={activeKeys} />)}
            </div>
        );
    }
});


KeyWrapper.wrap = function(Component) {
    return React.createClass({
        render: function() {
            return this.transferPropsTo(<KeyWrapper target={Component} />);
        },
    });
};

module.exports = KeyWrapper;
