import { test, expect } from "../fixtures/bankingFixtures"
import { ticketData } from "../data/randomData"

// Validate that a logged-in customer can create a support ticket and see it in the ticket history.
test(`TC-02: User can create and verify a customer support ticket`, async ({ authenticated, sharedComponents, customerSupportPage }) => {
    // Navigate to the customer support page.
    await sharedComponents.clickOnCustomerSupport();

    // Generate a fresh ticket payload for a dynamic, independent test run.
    const myTicket = ticketData();

    // Fill the ticket form and submit it.
    await customerSupportPage.fillTicketForm(myTicket)

    // Confirm the created ticket is visible and categorized correctly.
    await expect(customerSupportPage.getMyTicket(myTicket.subject)).toBeVisible();
    await expect(customerSupportPage.getMyTicket(myTicket.subject)).toContainText(myTicket.category);
});