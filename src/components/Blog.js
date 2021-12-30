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

	return (
		<>
			{showDetails ? (
				<div className="blog">
					<p>
						{blog.title} {blog.author}{" "}
					</p>
					<p>{blog.url}</p>
					<p>
						Likes: {blog.likes}{" "}
						<button onClick={() => addLike(blog)}>Like</button>
					</p>
					<p>{blog.user.name}</p>
					<button onClick={toggleShowDetails}>Hide</button>
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
