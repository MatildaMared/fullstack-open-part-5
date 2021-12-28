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

	const loginHandler = async (credentials) => {
		const user = await loginService.login(credentials);
		setUser(user);
	};

	return (
		<div>
			{user ? (
				<section>
					<h2>blogs</h2>
					<p>{user.name} logged in</p>
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
