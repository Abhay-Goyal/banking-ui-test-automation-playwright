import { test as base } from "@playwright/test"
import { projectConfig } from "../config/config";
import LoginPage from "../pages/LoginPage"
import SharedComponents from "../pages/SharedComponents";
import CardControlsPage from "../pages/CardControlsPage";
import FundsTransferPage from "../pages/FundsTransferPage";
import CustomerSupportPage from "../pages/CustomerSupportPage";


interface CustomFixture {
    loginPage: LoginPage;
    sharedComponents : SharedComponents;
    cardControlsPage : CardControlsPage;
    fundsTransferPage : FundsTransferPage;
    customerSupportPage : CustomerSupportPage;
    authenticated : void
}

export const test = base.extend<CustomFixture>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    sharedComponents: async({page} , use) => {
        await use(new SharedComponents(page));
    },
    cardControlsPage: async({page} , use) => {
        await use(new CardControlsPage(page));
    },
    fundsTransferPage: async({page} , use) => {
        await use(new FundsTransferPage(page));
    },
    customerSupportPage: async({page} , use) => {
        await use(new CustomerSupportPage(page));
    },
    authenticated: async ({loginPage} , use) => {
        await loginPage.navigateToLoginPage();
        await loginPage.fillLoginForm(projectConfig.USERNAME,projectConfig.PASSWORD);
        await use()
    }
})

export {expect} from "@playwright/test"