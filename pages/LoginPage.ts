import { Page, Locator } from "@playwright/test";

export default class LoginPage {
    private readonly page: Page;
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly login: Locator;
    private readonly rememberMe: Locator;
    private readonly forgotPassword: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.getByRole("textbox", { name: "Enter username" });
        this.password = page.getByRole("textbox", { name: "Enter password" });
        this.login = page.getByRole("button", { name: "LOGIN" });
        this.rememberMe = page.getByRole("checkbox", { name: "Remember Customer ID" });
        this.forgotPassword = page.getByRole("button", { name: "Forgot PIN / Password?" });
    }

    async navigateToLoginPage():Promise<void>{
        await this.page.goto("");
    }

    async fillLoginForm(username: string = "", password: string = ""): Promise<void> {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.login.click();
    }

    getUsernameField(): Locator {
        return this.username;
    }

    getPasswordField(): Locator {
        return this.password;
    }

    getLoginButton(): Locator {
        return this.login;
    }


}