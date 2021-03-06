import React, { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ loginHandler }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const onLogin = (e) => {
		e.preventDefault();
		loginHandler({ username, password });
		setUsername("");
		setPassword("");
	};

	return (
		<form onSubmit={onLogin}>
			<div>
				<label htmlFor="username">Username: </label>
				<input
					type="text"
					name="username"
					id="username"
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="password">Password: </label>
				<input
					type="password"
					name="password"
					id="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button type="submit" id="loginBtn">
				Log In
			</button>
		</form>
	);
};

LoginForm.propTypes = {
	loginHandler: PropTypes.func.isRequired,
};

export default LoginForm;
