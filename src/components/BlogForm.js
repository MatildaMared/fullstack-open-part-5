import React, { useState } from "react";
import blogService from "./../services/blogs";

const BlogForm = ({
	blogs,
	setBlogs,
	setNotificationMessage,
	setIsErrorMessage,
}) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const newBlogHandler = async (e) => {
		e.preventDefault();
		const newBlog = { title, author, url };
		const createdBlog = await blogService.create(newBlog);
		if (createdBlog.error) {
			setNotificationMessage(createdBlog.error);
			setIsErrorMessage(true);
			setTimeout(() => {
				setNotificationMessage("");
				setIsErrorMessage(false);
			}, 5000);
		} else {
			setBlogs([createdBlog, ...blogs]);
			setNotificationMessage(`a new blog ${title} by ${author} added`);
			setTimeout(() => {
				setNotificationMessage("");
			}, 5000);
		}
		setAuthor("");
		setTitle("");
		setUrl("");
	};

	return (
		<form onSubmit={newBlogHandler}>
			<div>
				<label htmlFor="title">Title: </label>
				<input
					type="text"
					name="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="author">Author: </label>
				<input
					type="text"
					name="author"
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="url">Url: </label>
				<input
					type="text"
					name="url"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
				/>
			</div>
			<button type="submit">Create</button>
		</form>
	);
};

export default BlogForm;
