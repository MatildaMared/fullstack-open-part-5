import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs }) => {
	const [showDetails, setShowDetails] = useState(false);

	const toggleShowDetails = () => {
		setShowDetails(!showDetails);
	};

	const addLike = async (blog) => {
		const blogObj = {
			user: blog.user.id,
			likes: (blog.likes += 1),
			author: blog.author,
			title: blog.title,
			url: blog.url,
		};
		const updatedBlog = await blogService.update(blog.id, blogObj);
		const blogIndex = blogs.findIndex((b) => b.id === blog.id);
		const newBlogsArray = [...blogs];
		newBlogsArray[blogIndex] = updatedBlog;
		setBlogs(newBlogsArray);
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
					<p>
						{blog.title} {blog.author}{" "}
						<button onClick={toggleShowDetails}>Hide</button>
					</p>
					<p>{blog.url}</p>
					<p>
						Likes: {blog.likes}{" "}
						<button onClick={() => addLike(blog)}>Like</button>
					</p>
					<p>{blog.user.name}</p>
					<button onClick={() => removeBlog(blog.id)}>Remove</button>
				</div>
			) : (
				<div className="blog">
					{blog.title} {blog.author}{" "}
					<button onClick={toggleShowDetails}>View</button>
				</div>
			)}
		</>
	);
};

export default Blog;
