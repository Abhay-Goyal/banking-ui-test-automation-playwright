import { test, expect } from "../fixtures/bankingFixtures"
import { faker } from "@faker-js/faker";

// Validate an internal transfer between accounts and confirm the balance updates are correct.
test(`TC-03: User can transfer funds from savings to checking and balances update correctly`, async ({ authenticated, sharedComponents, fundsTransferPage }) => {

    // Open the funds transfer page.
    await sharedComponents.getFundTransfer().click();

    // Record balances before the transfer so the expected result can be validated precisely.
    const savingsAccountBalance = await fundsTransferPage.getSavingsAccountBalance();
    const currentAccountBalance = await fundsTransferPage.getCurrentAccountBalance();
    const transferAmount = faker.number.float({ min: 0.01, max: savingsAccountBalance, fractionDigits: 2 });

    // Perform a valid transfer from savings to checking.
    await fundsTransferPage.internalTransferProcess("savings", "checking", transferAmount);

    // Recheck the balances and validate the success message and accounting logic.
    const updatedSavingsAccountBalance = await fundsTransferPage.getSavingsAccountBalance();
    const updatedCurrentAccountBalance = await fundsTransferPage.getCurrentAccountBalance();
    await expect(fundsTransferPage.getSuccessfulTransferMessage()).toHaveText(`Transfer of $${transferAmount.toFixed(2)} completed successfully.`);
    expect(updatedCurrentAccountBalance).toEqual(currentAccountBalance + transferAmount);
    expect(updatedSavingsAccountBalance).toEqual(savingsAccountBalance - transferAmount);


})
