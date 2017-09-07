/* ButtonGroup is an aesthetically pleasing group of buttons.
 *
 * The class requires these properties:
 *   buttons - an array of objects with keys:
 *     "value": this is the value returned when the button is selected
 *     "content": this is the JSX shown within the button, typically a string
 *         that gets rendered as the button's display text
 *     "title": this is the title-text shown on hover
 *   onChange - a function that is provided with the updated value
 *     (which it then is responsible for updating)
 *
 * The class has these optional properties:
 *   value - the initial value of the button selected, defaults to null.
 *   allowEmpty - if false, exactly one button _must_ be selected; otherwise
 *     it defaults to true and _at most_ one button (0 or 1) may be selected.
 *
 * Requires stylesheets/perseus-admin-package/editor.less to look nice.
 */

const React = require('react');
const ReactDOM = require("react-dom");
const styles = require('./styles.js');
const css = require("aphrodite").css;

/**
 * @description A nice looking replacement for a related set of buttons (like radio buttons).
 * @example
 * var Options = React.createClass({
 * 
 *     render: function() {
 *         var labelStyle = {
 *             color: this.state.value,
 *             padding: '0 10px'
 *         };
 * 
 *         return <div>
 *             <ButtonGroup value={this.state.value}
 *                     buttons={[
 *                         {value: 'red', content: 'red'},
 *                         {value: 'green', content: 'green'},
 *                         {value: 'blue', content: 'blue'}
 *                     ]}
 *                     onChange={this.handleChange} />
 *             <span style={labelStyle}>Your useful text</span>
 *         </div>;
 *     },
 * 
 *     getInitialState: function() {
 *         return { value: 'red' };
 *     },
 * 
 *     handleChange: function(value) {
 *         this.setState({ value });
 *     }
 * });
 * return <Options />;
 */
const ButtonGroup = React.createClass({
    propTypes: {
        /**
         * @property {PropTypes.any} value - the initial value of the button selected, defaults to null.
         */
        value: React.PropTypes.any,
        /**
         * @property {PropTypes.object[]} buttons - an array of objects with keys
         * "value": this is the value returned when the button is selected
         * "content": this is the JSX shown within the button, typically a string
         * that gets rendered as the button's display text
         * "title": this is the title-text shown on hover
         */
        buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
            value: React.PropTypes.any.isRequired,
            content: React.PropTypes.node,
            title: React.PropTypes.string,
        })).isRequired,
        /**
         * @property {PropTypes.func} onChange - a function that is provided with the updated value (which it then is responsible for updating)
         */
        onChange: React.PropTypes.func.isRequired,
        /**
         * @property {Proptypes.bool} - if false, exactly one button _must_ be selected; otherwise it defaults to true and _at most_ one button (0 or 1) may be selected.
         */
        allowEmpty: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            value: null,
            allowEmpty: true,
        };
    },

    focus: function() {
        ReactDOM.findDOMNode(this).focus();
        return true;
    },

    toggleSelect: function(newValue) {
        const value = this.props.value;

        if (this.props.allowEmpty) {
            // Select the new button or unselect if it's already selected
            this.props.onChange(value !== newValue ? newValue : null);
        } else {
            this.props.onChange(newValue);
        }
    },

    render: function() {
        const value = this.props.value;
        const buttons = this.props.buttons.map((button, i) => {
            return <button title={button.title}
                type="button"
                id={"" + i}
                ref={"button" + i}
                key={"" + i}
                className={css(
                    styles.button.buttonStyle,
                    button.value === value &&
                        styles.button.selectedStyle
                )}
                onClick={this.toggleSelect.bind(this, button.value)}
            >
                {button.content || "" + button.value}
            </button>;
        });

        const outerStyle = {
            display: 'inline-block',
        };
        return <div style={outerStyle}>
            {buttons}
        </div>;
    },
});

module.exports = ButtonGroup;
