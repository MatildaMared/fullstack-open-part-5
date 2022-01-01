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
});
