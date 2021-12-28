import React from "react";

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

export default NotificationMsg;
