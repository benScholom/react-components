/* Render a bootstrap modal.
 *
 * TODO(joel) figure out how to use the header, body, and footer styles
 *
 * Example:
 *
 *      <Modal onClose={this.props.onClose}>
 *          <div className="modal-header">
 *              <h2>{header}</h2>
 *          </div>
 *          <div className="modal-body">
 *              {body}
 *          </div>
 *          <div className="modal-footer">
 *              {footer}
 *          </div>
 *      </Modal>
 */

const aphrodite = require("aphrodite");
const React = require("react");

const css = aphrodite.css;
const StyleSheet = aphrodite.StyleSheet;

const styles = StyleSheet.create({
    modalStyle: {
        position: "fixed",
        width: "500px",
        margin: "0 0 0 -250px",
        top: "60px",
        left: "50%",
        backgroundColor: "white",
        border: "1px solid rgba(0, 0, 0, 0.3)",
        borderRadius: "6px",
        zIndex: 1050,
    },

    modalBackdropStyle: {
        opacity: 0.7,
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1040,
        backgroundColor: "black",
    },
});

/**
 * @description This works like a simplified, React-native version of [Bootstrap's modal](http://getbootstrap.com/javascript/#modals).
 * @example 
 * var ButtonWithDialog = React.createClass({
 * mixins: [LayeredComponentMixin],
 * render: function() {
 *         return <button onClick={this.handleClick}>
 *             Click Me!
 *         </button>;
 *     },
 *     renderLayer: function() {
 *         if (this.state.clicked) {
 *             return <Modal onClose={this.handleClose}>
 *                 <div className="modal-header">
 *                     Header
 *                     <a href="javascript: void 0;"
 *                        style={{float: "right", textDecoration: "none"}}
 *                        onClick={this.handleClose}>
 *                         &#215;
 *                     </a>
 *                 </div>
 *                 <div className="modal-body">Body!</div>
 *             </Modal>;
 *         } else {
 *             return <div />;
 *         }
 *     },
 *     // {{{
 *     handleClose: function() {
 *         this.setState({ clicked: false });
 *     },
 *     handleClick: function() {
 *         this.setState({ clicked: !this.state.clicked });
 *     },
 *     getInitialState: function() {
 *         return { clicked: false };
 *     }
 *     // }}}
 * });
 * 
 * return <ButtonWithDialog />;
 * 
 */
const Modal = React.createClass({
    propTypes: {
        /**
         * @property {PropTypes.node} children
         */
        children: React.PropTypes.node,
        /** 
         * @property {PropTypes.string} className
         */
        className: React.PropTypes.string,
        /**
         * @property {PropTypes.bool} keyboard
         */
        // Close the modal when esc is pressed? Defaults to true.
        keyboard: React.PropTypes.bool,
        /**
         * @property {PropTypes.func} onClose
         */
        onClose: React.PropTypes.func,  
        /**
         * @property {PropTypes.bool|PropTypes.string} backdrop
         */
        // TODO(joel) reimplement
        // Bootstrap modal's backdrop argument: Includes a modal-backdrop
        // element. Alternatively, specify static for a backdrop which doesn't
        // close the modal on click. Defaults to true.
        backdrop: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.string,
        ]),
    },

    getDefaultProps: function() {
        return {
            className: "",
            onClose: () => {},
            keyboard: true,
            backdrop: true,
        };
    },

    componentDidMount: function() {
        window.addEventListener("keydown", this._listenForEsc, true);
    },

    componentWillUnmount: function() {
        window.removeEventListener("keydown", this._listenForEsc, true);
    },

    _listenForEsc: function(event) {
        if (this.props.keyboard &&
                (event.key === "Escape" ||
                 event.keyCode === 27)) {
            this.props.onClose();
        }
    },

    render: function() {
        const className = [
            css(styles.modalStyle),
            this.props.className,
            "modal",
        ].join(" ");
        const modal = <div
            {...this.props}
            tabIndex="-1"
            className={className}
        >
            {this.props.children}
        </div>;

        const backdrop = <div className={css(styles.modalBackdropStyle)} />;
        return <div>
            {modal}
            {backdrop}
        </div>;
    },
});

module.exports = Modal;
