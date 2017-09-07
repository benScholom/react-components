/* This mixin provides a simple setInterval method.
 *
 * Example:
 *
 *     const Component = React.createClass({
 *         ...
 *         componentDidMount: function() {
 *             this.setInterval(this.doSomething, 1000);
 *             this.setInterval(this.doSomethingElse, 5000);
 *         }
 *         ...
 *     });
 *
 * doSomething is called every second and doSomethingElse is called every five
 * seconds. Their intervals will be canceled automatically when the component
 * unmounts.
 */
/**
 * @description This mixin provides a simple setInterval method. Like setInterval that calls clearInterval for you.
 * @example
 * var RefreshingComponent = React.createClass({
 *     mixins: [SetIntervalMixin],
 *     componentDidMount: function() {
 *         this.setInterval(this.updateState, 1000);
 *     },
 * 	render: function() {
 * 		return <div>{this.state.time} seconds</div>;
 * 	},
 * 	// {{{
 * 	getInitialState: function() {
 * 		return { time: 0 };
 * 	},
 * 	updateState: function() {
 * 		var time = this.state.time + 1;
 * 		this.setState({ time });
 * 	}
 * 	// }}}
 * });
 * return <RefreshingComponent />;
 */
const SetIntervalMixin = {
    componentWillMount: function() {
        this.intervals = [];
    },
    setInterval: function(fn, ms) {
        this.intervals.push(setInterval(fn, ms));
    },
    componentWillUnmount: function() {
        this.intervals.forEach(clearInterval);
    },
};

module.exports = SetIntervalMixin;
