import { projectConfig } from "../config/config";
import { test, expect } from "../fixtures/bankingFixtures"

// Validate the happy path for a valid user login and successful dashboard access.
test("TC-01: User can log in with valid credentials and access the dashboard", async ({ page, loginPage, sharedComponents }) => {
    // Open the login page and confirm the form is ready for input.
    await loginPage.navigateToLoginPage();

    const usernameField = loginPage.getUsernameField();
    const passwordField = loginPage.getPasswordField();
    const loginButton = loginPage.getLoginButton();

    await expect(usernameField).toBeEditable();
    await expect(passwordField).toBeEditable();
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();

    // Submit valid credentials from the environment config.
    await loginPage.fillLoginForm(projectConfig.USERNAME, projectConfig.PASSWORD);

    // Verify the user lands on the authenticated dashboard.
    await expect(page).toHaveURL(projectConfig.BASE_URL);
    await expect(sharedComponents.getProfileImage()).toBeVisible();
    await expect(sharedComponents.getWelcomeBanner()).toBeVisible();
    await expect(sharedComponents.getAccountSummary()).toBeVisible();
    await expect(sharedComponents.getAccountSummary()).toHaveCSS("background-color", "rgb(11, 44, 116)");
    await expect(sharedComponents.getSignOut()).toBeVisible();

})