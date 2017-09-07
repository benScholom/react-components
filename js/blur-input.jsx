const React = require("react");

/* You know when you want to propagate input to a parent...
 * but then that parent does something with the input...
 * then changing the props of the input...
 * on every keystroke...
 * so if some input is invalid or incomplete...
 * the input gets reset or otherwise effed...
 *
 * This is the solution.
 *
 * Enough melodrama. Its an input that only sends changes
 * to its parent on blur.
 */
/**
 * @description An input component that notifies its parent of changes when it loses focus.
 * @example
 * // {{{ TODO(joel) - numericalParse
 * var URLInput = React.createClass({
 *     render: function() {
 *         // {{{
 *         var imgStyle = {
 *             paddingTop: 15,
 *             display: 'block',
 *             margin: 'auto',
 *             maxWidth: '100%'
 *         };
 *         // }}}
 *         return <div>
 *             Image URL: <BlurInput value={this.state.url}
 *                        onChange={this.handleChange} />
 *             <img style={imgStyle} src={this.state.url} />
 *         </div>;
 *     },
 *     handleChange: function(url) {
 *         this.setState({ url });
 *     },
 *     getInitialState: function() {
 *         return { url: this.props.initialUrl };
 *     }
 * });
 * return <URLInput initialUrl={"https://www.kastatic.org/images/khan-logo-vertical-transparent.png"} />;
 */
const BlurInput = React.createClass({
    propTypes: {
        /**
         * @property {PropTypes.string} className
         */
        className: React.PropTypes.string,
        /**
         * @property {PropTypes.any} style
         */
        style: React.PropTypes.any,
        /**
         * @property {PropTypes.string} value
         */
        value: React.PropTypes.string.isRequired,
        /**
         * @property {PropTypes.func} onChange
         */
        onChange: React.PropTypes.func.isRequired,
    },
    getInitialState: function() {
        return {value: this.props.value};
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({value: nextProps.value});
    },
    handleChange: function(e) {
        this.setState({value: e.target.value});
    },
    handleBlur: function(e) {
        this.props.onChange(e.target.value);
    },
    render: function() {
        return <input
            className={this.props.className}
            style={this.props.style}
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
        />;
    },
});

module.exports = BlurInput;
