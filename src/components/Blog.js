import React, { useState } from "react";

const Blog = ({ blog }) => {
	const [showDetails, setShowDetails] = useState(false);

	const toggleShowDetails = () => {
		setShowDetails(!showDetails);
	};

	return (
		<>
			{showDetails ? (
				<div className="blog">
					<p>
						{blog.title} {blog.author}{" "}
					</p>
					<p>{blog.url}</p>
					<p>Likes: {blog.likes}</p>
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
