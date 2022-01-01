import React, { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ newBlog }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const newBlogHandler = (e) => {
		e.preventDefault();
		newBlog(title, author, url);
		setTitle("");
		setAuthor("");
		setUrl("");
	};

	return (
		<form className="form" onSubmit={newBlogHandler}>
			<div>
				<label htmlFor="title">Title: </label>
				<input
					type="text"
					id="title"
					name="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="author">Author: </label>
				<input
					type="text"
					id="author"
					name="author"
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="url">Url: </label>
				<input
					type="text"
					id="url"
					name="url"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
				/>
			</div>
			<button type="submit" className="form__submitBtn" id="createBlogBtn">
				Create
			</button>
		</form>
	);
};

BlogForm.propTypes = {
	newBlog: PropTypes.func.isRequired,
};

export default BlogForm;
