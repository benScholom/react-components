/* Create a new "layer" on the page, like a modal or overlay.
 *
 * const LayeredComponent = React.createClass({
 *     mixins: [LayeredComponentMixin],
 *     render: function() {
 *         // render like usual
 *     },
 *     renderLayer: function() {
 *         // render a separate layer (the modal or overlay)
 *     }
 * });
 *
 * From http://jsfiddle.net/LBAr8/
 */

const React = require('react');
const ReactDOM = require("react-dom");
/**
 * @description Render another component in a div appended to the page.
 * @example
 * var ButtonWithDialog = React.createClass({
 * 	mixins: [LayeredComponentMixin],
 *     render: function() {
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
 * 	handleClick: function() {
 * 		this.setState({ clicked: !this.state.clicked });
 * 	},
 * 	getInitialState: function() {
 * 		return { clicked: false };
 * 	}
 * 	// }}}
 * });
 * return <ButtonWithDialog />;
 */
const LayeredComponentMixin = {
    componentDidMount: function() {
        // Appending to the body is easier than managing the z-index of
        // everything on the page.  It's also better for accessibility and
        // makes stacking a snap (since components will stack in mount order).
        this._layer = document.createElement('div');
        document.body.appendChild(this._layer);
        this._renderLayer();
    },

    componentDidUpdate: function() {
        this._renderLayer();
    },

    componentWillUnmount: function() {
        this._unrenderLayer();
        document.body.removeChild(this._layer);
    },

    _renderLayer: function() {
        // By calling this method in componentDidMount() and
        // componentDidUpdate(), you're effectively creating a "wormhole" that
        // funnels React's hierarchical updates through to a DOM node on an
        // entirely different part of the page.

        const layerElement = this.renderLayer();
        // Renders can return null, but React.render() doesn't like being asked
        // to render null. If we get null back from renderLayer(), just render
        // a noscript element, like React does when an element's render returns
        // null.
        if (layerElement === null) {
            ReactDOM.render(<noscript />, this._layer);
        } else {
            ReactDOM.render(layerElement, this._layer);
        }

        if (this.layerDidMount) {
            this.layerDidMount(this._layer);
        }
    },

    _unrenderLayer: function() {
        if (this.layerWillUnmount) {
            this.layerWillUnmount(this._layer);
        }

        ReactDOM.unmountComponentAtNode(this._layer);
    },
};

module.exports = LayeredComponentMixin;
