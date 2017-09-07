/* MultiButtonGroup is an aesthetically pleasing group of buttons,
 * which allows multiple buttons to be selected at the same time.
 *
 * The class requires these properties:
 *   buttons - an array of objects with keys:
 *     "value": this is the value returned when the button is selected
 *     "content": this is the JSX shown within the button, typically a string
 *         that gets rendered as the button's display text
 *     "title": this is the title-text shown on hover
 *   onChange - a function that is provided with an array of the updated
 *     values (which it then is responsible for updating)
 *
 * The class has these optional properties:
 *   values - an array of the initial values of the buttons selected.
 *
 * Requires stylesheets/perseus-admin-package/editor.less to look nice.
 */

const React = require('react');
const ReactDOM = require("react-dom");
const styles = require('./styles.js');
const css = require("aphrodite").css;

/**
 * @description MultiButtonGroup is an aesthetically pleasing group of buttons,
 * which allows multiple buttons to be selected at the same time.
 * @example
 * var Options = React.createClass({
 *     render: function() {
 *         // {{{
 *         // Returns a small, colored div
 *         var paint = function (color) {
 *             var style = {
 *                 backgroundColor: color,
 *                 border: (color === 'white') ? '1px solid' : null,
 *                 height: 15,
 *                 width: 15,
 *                 display: 'inline-block'
 *             };
 *             return <div style={style} />;
 *         };
 *         var outerStyle = {
 *             padding: '0 10px',
 *             display: 'inline-block'
 *         };
 *         // }}}
 *         return <div>
 *             Mixing Colors:
 *             <div style={outerStyle}>
 *                 <MultiButtonGroup values={this.state.values}
 *                         buttons={[
 *                             {value: 'red', content: paint('red')},
 *                             {value: 'green', content: paint('green')},
 *                             {value: 'blue', content: paint('blue')}
 *                         ]}
 *                         onChange={this.handleChange} />
 *             </div>
 *             {paint(this.mixColors(this.state.values))}
 *         </div>;
 *     },
 *     getInitialState: function() {
 *         return { values: ['red', 'blue'] };
 *     },
 *     // {{{
 *     mixColors: function(colors) {
 *         var containsRed = colors.indexOf('red') > -1;
 *         var containsBlue = colors.indexOf('blue') > -1;
 *         var containsGreen = colors.indexOf('green') > -1;
 *         if (containsRed && containsGreen && containsBlue) {
 *             return 'white';
 *         } else if (containsRed && containsGreen) {
 *             return 'yellow';
 *         } else if (containsRed && containsBlue) {
 *             return 'purple';
 *         } else if (containsGreen && containsBlue) {
 *             return 'cyan';
 *         } else if (colors.length > 0) {
 *             return colors[0];
 *         }
 *         return 'black';
 *     },
 *     // }}}
 *     handleChange: function(values) {
 *         this.setState({ values });
 *     }
 * });
 * return <Options />;
 */
const MultiButtonGroup = React.createClass({
    propTypes: {
        /**
         * @property {PropTypes.any[]} values - an array of the initial values of the buttons selected.
         */
        values: React.PropTypes.arrayOf(React.PropTypes.any),
        /**
         * @property {PropTypes.object[]} buttons -an array of objects with keys: 
         * "value": this is the value returned when the button is selected
         * "content": this is the JSX shown within the button, typically a string
         *       that gets rendered as the button's display text
         * "title": this is the title-text shown on hover
         */
        buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
            value: React.PropTypes.any.isRequired,
            content: React.PropTypes.node,
            title: React.PropTypes.string,
        })).isRequired,
        /**
         * @property {Proptypes.func} onChange - a function that is provided with an array of the updated values (which it then is responsible for updating)
         */
        onChange: React.PropTypes.func.isRequired,
        /**
         * @property {PropTypes.bool} allowEmpty 
         */
        allowEmpty: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            values: [],
            allowEmpty: true,
        };
    },

    focus: function() {
        ReactDOM.findDOMNode(this).focus();
        return true;
    },

    toggleSelect: function(newValue) {
        const values = (this.props.values || []).slice(0);
        const allowEmpty = this.props.allowEmpty;

        if (values.indexOf(newValue) >= 0 &&
                (values.length > 1 || allowEmpty)) {
            // If the value is already selected, unselect it
            values.splice(values.indexOf(newValue), 1);
        } else {
            // Otherwise merge with other values and return
            if (values.indexOf(newValue) < 0) {
                values.push(newValue);
            }
        }

        this.props.onChange(values);
    },

    render: function() {
        const values = this.props.values || [];
        const buttons = this.props.buttons.map((button, i) => {
            const selected = values.indexOf(button.value) >= 0;
            return <button title={button.title}
                type="button"
                id={"" + i}
                key = {"" + i}
                ref={"button" + i}
                className={css(
                    styles.button.buttonStyle,
                    selected && styles.button.selectedStyle
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

module.exports = MultiButtonGroup;
