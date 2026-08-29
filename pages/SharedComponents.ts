import { Page , Locator } from "@playwright/test";

export default class SharedComponents{
    private readonly page: Page;
    private readonly accountSummary: Locator;
    private readonly fundTransfer: Locator;
    private readonly cardControls: Locator;
    private readonly loansCenter: Locator;
    private readonly customerSupport: Locator;
    private readonly preferences: Locator;
    private readonly profileImage: Locator;
    private readonly signOut: Locator;
    private readonly welcomeBanner: Locator;


    constructor(page : Page){
        this.page = page;
        this.accountSummary = page.getByRole("button" , {name: "Accounts Summary"});
        this.fundTransfer = page.getByRole("button" , {name : "Funds Transfer"});
        this.cardControls = page.getByRole("button" , {name : "Cards Controls"});
        this.loansCenter = page.getByRole("button" , {name : "Loans Center"});
        this.customerSupport = page.getByRole("button" , {name : "Customer Support"});
        this.preferences = page.getByRole("button" , {name : "Preferences"});
        this.profileImage = page.getByTitle("Apex User Profile");
        this.signOut = page.getByRole("button" , {name: "Sign Out"});
        this.welcomeBanner = page.getByRole('heading', { name: /Welcome back,/ })
    }

    getAccountSummary() : Locator{
        return this.accountSummary;
    }

    getFundTransfer() : Locator{
        return this.fundTransfer;
    }

    getProfileImage() : Locator{
        return this.profileImage;
    }

    getSignOut() : Locator{
        return this.signOut;
    }

    getWelcomeBanner(): Locator{
        return this.welcomeBanner;
    }

    async clickOnCardControls() : Promise<void>{
        await this.cardControls.click();
    }

    async clickOnCustomerSupport() : Promise<void>{
        await this.customerSupport.click();
    }

}