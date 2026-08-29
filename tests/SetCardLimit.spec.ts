import { test, expect } from "../fixtures/bankingFixtures"
import { messages } from "../data/constants";
import creditLimits from "../data/creditLimits.json" with { type: "json" };

// Run each credit limit scenario from the JSON data file as its own test case.
for (const [key, value] of Object.entries(creditLimits)) {
    test(`TC-04: Card limit update scenario - ${key}`, async ({ authenticated, sharedComponents, cardControlsPage }) => {
        // Use the scenario data to set the expected card purchase limit.
        const newLimit = value.limit;

        // Navigate to the card controls section.
        await sharedComponents.clickOnCardControls();

        // Intentionally failing scenarios are marked in the data and should fail the test.
        if (value.expectedResult === "fail") {
            test.fail();
        }

        // Apply the new limit and verify the success flow and UI value.
        await cardControlsPage.setPurchaseLimit(newLimit);
        await expect(cardControlsPage.getToastMessage()).toHaveText(messages.CARD_SETTINGS_SUCCESS);
        expect(await cardControlsPage.getCardLimit()).toEqual(newLimit.toString());
        await expect(cardControlsPage.getToastMessage()).not.toBeVisible({ timeout: 4000 });

    })
}