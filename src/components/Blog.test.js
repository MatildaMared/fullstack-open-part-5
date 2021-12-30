import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog /> component", () => {
	let component;

	let blog = {
		title: "Test blog",
		author: "Matilda Mared",
		url: "http://testurl.com",
		user: {
			name: "Tildolin",
		},
		likes: 3,
	};

	const blogs = [];

	const setBlogs = jest.fn();

	beforeEach(() => {
		component = render(<Blog blog={blog} blogs={blogs} setBlogs={setBlogs} />);
	});

	test("renders title and author initially but not url or likes", () => {
		const details = component.container.querySelector(".blog__details");

		expect(details).toHaveTextContent(`${blog.title} ${blog.author}`);

		const author = component.container.querySelector(".blog__author");
		expect(author).toBe(null);

		const likes = component.container.querySelector(".blog__likes");
		expect(likes).toBe(null);
	});

	test("renders url and number of likes when the view button has been clicked", () => {
		const viewBtn = component.container.querySelector(".blog__viewBtn");

		fireEvent.click(viewBtn);

		const url = component.container.querySelector(".blog__url");
		expect(url).toHaveTextContent(blog.url);

		const likes = component.container.querySelector(".blog__likes");
		expect(likes).toHaveTextContent(blog.likes);
	});
});
