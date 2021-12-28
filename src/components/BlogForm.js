import React, { useState } from "react";
import blogService from "./../services/blogs";

const BlogForm = ({ blogs, setBlogs }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const newBlogHandler = async () => {
		const newBlog = { title, author, url };
		const createdBlog = await blogService.create(newBlog);
		setBlogs([createdBlog, ...blogs]);
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
