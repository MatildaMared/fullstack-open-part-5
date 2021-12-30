import React from "react";
import PropTypes from "prop-types";

function NotificationMsg({ message, isError }) {
	if (message) {
		return (
			<p className={isError ? "notification error" : "notification"}>
				{message}
			</p>
		);
	} else {
		return null;
	}
}

NotificationMsg.propTypes = {
	message: PropTypes.string,
	isError: PropTypes.bool,
};

export default NotificationMsg;
