import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const userFromStorage = window.localStorage.getItem("blogUser");
		if (userFromStorage) {
			const user = JSON.parse(userFromStorage);
			setUser(user);
		}
	}, []);

	const loginHandler = async (credentials) => {
		const user = await loginService.login(credentials);
		setUser(user);
		window.localStorage.setItem("blogUser", JSON.stringify(user));
	};

	const logoutHandler = () => {
		window.localStorage.removeItem("blogUser");
		window.location.reload();
	};

	return (
		<div>
			{user ? (
				<section>
					<h2>blogs</h2>
					<p>{user.name} logged in</p>
					<button onClick={logoutHandler}>Log out</button>
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</section>
			) : (
				<LoginForm loginHandler={loginHandler} />
			)}
		</div>
	);
};

export default App;
