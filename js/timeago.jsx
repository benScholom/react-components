/* The equivalent to jQuery.timeago for react.
 *
 * TimeAgo returns a span containing the amount of time (in English) that has
 * passed since `time`.
 *
 * Takes:
 *     time: an ISO 8601 timestamp
 *     refreshMillis: how often to update, in milliseconds
 *
 * Example:
 *
 *     return <a href={khanAcademy}><TimeAgo time={date} /></a>
 */

const React = require("react");
const SetIntervalMixin = require("./set-interval-mixin.jsx");
const moment = require("moment");
/**
 * @description Human friendly display of how long it's been since an event happened.
 * @example
 * // {{{
 * var FormatCommentBody = React.createClass({
 * 	render: function() {
 * 		return <div>
 * 			{this.props.body}
 * 		</div>;
 * 	}
 * });
 * var UserBadge = React.createClass({
 * 	render: function() {
 * 		return <div>@{this.props.user}</div>;
 * 	}
 * });
 * // }}}
 * var Comment = React.createClass({
 *     render: function() {
 *         return <div>
 *             <FormatCommentBody body={this.props.body} />
 *             <div>
 *                 <UserBadge user={this.props.user} /> -
 *                 <TimeAgo time={this.props.date} />
 *             </div>
 *         </div>;
 *     }
 * });
 * return <Comment body="such time" user="dinojoel" date={new Date()} />;
 */
const TimeAgo = React.createClass({
    propTypes: {
        /**
         * @property {PropTypes.number} refreshMills - how often to update, in milliseconds
         */
        refreshMillis: React.PropTypes.number,
        /**
         * @property {PropTypes.any} time -an ISO 8601 timestamp
         */
        time: React.PropTypes.any.isRequired,
    },
    mixins: [SetIntervalMixin],
    componentDidMount: function() {
        const interval = this.props.refreshMillis || 60000;
        // TODO(joel) why did I have to bind forceUpdate?
        this.setInterval(this.forceUpdate.bind(this), interval);
    },
    render: function() {
        return <span>{moment(this.props.time).fromNow()}</span>;
    },
});

module.exports = TimeAgo;
