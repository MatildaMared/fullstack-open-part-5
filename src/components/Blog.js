import React, { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, blogs, setBlogs, updateBlog }) => {
	const [showDetails, setShowDetails] = useState(false);

	const toggleShowDetails = () => {
		setShowDetails(!showDetails);
	};

	const likeHandler = () => {
		const blogObj = {
			user: blog.user.id,
			likes: (blog.likes += 1),
			author: blog.author,
			title: blog.title,
			url: blog.url,
		};
		updateBlog(blog.id, blogObj);
	};

	const removeBlog = async (id) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
			await blogService.remove(id);

			const updatedBlogs = blogs.filter((blog) => blog.id !== id);
			setBlogs(updatedBlogs);
		}
	};

	return (
		<>
			{showDetails ? (
				<div className="blog">
					<p className="blog__details">
						{blog.title} {blog.author}
					</p>
					<button onClick={toggleShowDetails} className="blog__hideBtn">
						Hide
					</button>
					<p className="blog__url">{blog.url}</p>
					<p>
						<span className="blog__likes">Likes: {blog.likes}</span>
						<button onClick={likeHandler} className="blog__likeBtn">
							Like
						</button>
					</p>
					<p className="blog__user">{blog.user.name}</p>
					<button
						onClick={() => removeBlog(blog.id)}
						className="blog__removeBtn"
					>
						Remove
					</button>
				</div>
			) : (
				<div className="blog">
					<p className="blog__details">
						{blog.title} {blog.author}
					</p>
					<button onClick={toggleShowDetails} className="blog__viewBtn">
						View
					</button>
				</div>
			)}
		</>
	);
};

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	blogs: PropTypes.array.isRequired,
	setBlogs: PropTypes.func.isRequired,
};

export default Blog;
