/// <reference types="Cypress" />

describe("Blog app", function () {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3003/api/testing/reset");
		const user = {
			name: "Matilda Mared",
			username: "matilda",
			password: "test1234",
		};
		cy.request("POST", "http://localhost:3001/api/users/", user);
		cy.visit("http://localhost:3000");
	});

	it("Login form is shown", function () {
		cy.contains("Log in");
		cy.contains("Username:");
		cy.contains("Password:");
	});
});
