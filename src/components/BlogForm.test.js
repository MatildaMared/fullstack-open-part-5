import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
	test("submitting calls the event handler with the correct details", () => {
		const newBlogMock = jest.fn();

		const component = render(<BlogForm newBlog={newBlogMock} />);

		const titleInput = component.container.querySelector("#title");
		const authorInput = component.container.querySelector("#author");
		const urlInput = component.container.querySelector("#url");

		fireEvent.change(titleInput, {
			target: { value: "Title" },
		});
		fireEvent.change(authorInput, {
			target: { value: "Author" },
		});
		fireEvent.change(urlInput, {
			target: { value: "Url" },
		});

		const form = component.container.querySelector(".form");

		fireEvent.submit(form);

		expect(newBlogMock.mock.calls).toHaveLength(1);
		expect(newBlogMock.mock.calls[0][0]).toBe("Title");
		expect(newBlogMock.mock.calls[0][1]).toBe("Author");
		expect(newBlogMock.mock.calls[0][2]).toBe("Url");
	});
});
