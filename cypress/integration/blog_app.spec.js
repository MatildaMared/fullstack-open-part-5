/// <reference types="Cypress" />

describe("Blog app", function () {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3003/api/testing/reset");
		const user = {
			name: "Matilda Mared",
			username: "matilda",
			password: "test1234",
		};
		cy.request("POST", "http://localhost:3003/api/users/", user);
		cy.visit("http://localhost:3000");
	});

	it("Login form is shown initially", function () {
		cy.contains("Log in");
		cy.contains("Username:");
		cy.contains("Password:");
	});

	describe("Login", function () {
		it("succeeds with correct credentials", function () {
			cy.get("#username").type("matilda");
			cy.get("#password").type("test1234");
			cy.get("#loginBtn").click();

			cy.contains("Matilda Mared logged in");
		});

		it("fails with incorrect credentials", function () {
			cy.get("#username").type("matilda");
			cy.get("#password").type("wrong");
			cy.get("#loginBtn").click();

			cy.get(".error")
				.should("contain", "invalid username or password")
				.and("have.css", "color", "rgb(255, 0, 0)");
		});
	});

	describe("When logged in", function () {
		beforeEach(function () {
			cy.request("POST", "http://localhost:3003/api/login", {
				username: "matilda",
				password: "test1234",
			}).then((response) => {
				localStorage.setItem("blogUser", JSON.stringify(response.body));
				cy.visit("http://localhost:3000");
			});
		});

		it("A blog can be created", function () {
			cy.contains("Create new blog").click();

			cy.get("#title").type("A new blog");
			cy.get("#author").type("Author");
			cy.get("#url").type("Url");

			cy.get("#createBlogBtn").click();

			cy.contains("A new blog");
		});

		describe("When there are several blogs", function () {
			beforeEach(function () {
				cy.createBlog({
					title: "A first blog",
					author: "Author",
					url: "Url",
					likes: 5,
				});

				cy.createBlog({
					title: "A second blog",
					author: "Author",
					url: "Url",
					likes: 15,
				});

				cy.createBlog({
					title: "A third blog",
					author: "Author",
					url: "Url",
					likes: 3,
				});

				cy.visit("http://localhost:3000");
			});

			it("A blog can be liked", function () {
				cy.contains("A second blog Author")
					.parent()
					.find(".blog__viewBtn")
					.click();

				cy.get(".blog__likeBtn").click();

				cy.contains("Likes: 16");
			});

			it("A blog can be deleted by its creator", function () {
				cy.contains("A second blog Author")
					.parent()
					.find(".blog__viewBtn")
					.click();

				cy.get(".blog__removeBtn").click();
				cy.on("windows:confirm", () => true);

				cy.contains("A second blog Author").should("not.exist");
			});

			it("Blogs are sorted so the first blog has most likes", function () {
				cy.createBlog({
					title: "Blog with most likes",
					author: "Author",
					url: "Url",
					likes: 25,
				}).then(function () {
					cy.visit("http://localhost:3000");
					cy.get(".blog__viewBtn").eq(0).click();
					cy.get(".blog__viewBtn").eq(0).click();
					cy.get(".blog__viewBtn").eq(0).click();
					cy.get(".blog__viewBtn").eq(0).click();

					cy.get(".blog").eq(0).contains("Likes: 25");
					cy.get(".blog").eq(1).contains("Likes: 15");
					cy.get(".blog").eq(2).contains("Likes: 5");
					cy.get(".blog").eq(3).contains("Likes: 3");
				});
			});
		});
	});
});
