import React, { useState } from "react";

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
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="password">Password: </label>
				<input
					type="password"
					name="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button type="submit">Log In</button>
		</form>
	);
};

export default LoginForm;
