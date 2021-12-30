import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import NotificationMsg from "./components/NotificationMsg";
import "./style.css";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [notificationMessage, setNotificationMessage] = useState("");
	const [isErrorMessage, setIsErrorMessage] = useState(false);
	const [showBlogForm, setShowBlogForm] = useState(false);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const userFromStorage = window.localStorage.getItem("blogUser");
		if (userFromStorage) {
			const user = JSON.parse(userFromStorage);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const loginHandler = async (credentials) => {
		try {
			const response = await loginService.login(credentials);
			if (response.error) {
				setNotificationMessage(response.error);
				setIsErrorMessage(true);
				setTimeout(() => {
					setNotificationMessage("");
					setIsErrorMessage(false);
				}, 5000);
			} else {
				setUser(response);
				blogService.setToken(response.token);
				window.localStorage.setItem("blogUser", JSON.stringify(response));
			}
		} catch (exception) {
			console.log(exception.message);
		}
	};

	const logoutHandler = () => {
		window.localStorage.removeItem("blogUser");
		window.location.reload();
	};

	return (
		<div>
			{user ? (
				<section>
					<h2>Blogs</h2>
					<NotificationMsg
						message={notificationMessage}
						isError={isErrorMessage}
					/>
					<p>{user.name} logged in</p>
					<button onClick={logoutHandler}>Log out</button>
					{showBlogForm ? (
						<div>
							<h2>Create new</h2>
							<BlogForm
								blogs={blogs}
								setBlogs={setBlogs}
								setNotificationMessage={setNotificationMessage}
								setIsErrorMessage={setIsErrorMessage}
							/>
							<button onClick={() => setShowBlogForm(false)}>Cancel</button>
						</div>
					) : (
						<div>
							<button onClick={() => setShowBlogForm(true)}>
								Create new blog
							</button>
						</div>
					)}
					<hr />
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} />
					))}
				</section>
			) : (
				<section>
					<h2>Log in</h2>
					<NotificationMsg
						message={notificationMessage}
						isError={isErrorMessage}
					/>
					<LoginForm loginHandler={loginHandler} />
				</section>
			)}
		</div>
	);
};

export default App;
