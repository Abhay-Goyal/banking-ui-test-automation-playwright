import { Page, Locator } from "@playwright/test";

export default class CardControlsPage {
    private readonly page: Page;
    private readonly freezeSwitch: Locator;
    private readonly purchaseLimit: Locator;
    private readonly saveSettings: Locator;
    private readonly toastMessage: Locator;
    private readonly saveLimit: Locator;

    constructor(page: Page) {
        this.page = page;
        this.freezeSwitch = page.locator('#freeze-switch');
        this.purchaseLimit = page.getByRole('slider');
        this.saveLimit = page.getByRole('button', { name: 'Save Limits' });
        this.saveSettings = page.getByRole('button', { name: 'Save Settings' });
        this.toastMessage = page.locator('div.toast-success')
    }

    async setPurchaseLimit(targetLimit: number): Promise<void> {
        const maxPurchaseLimit = await this.purchaseLimit.getAttribute("max") ?? "";
        const minPurchaseLimit = await this.purchaseLimit.getAttribute("min")??"";
        const step = parseInt(await this.purchaseLimit.getAttribute("step") ?? "");
        if (parseInt(maxPurchaseLimit) < targetLimit) {
            throw new Error(`Max allowed limit for the user : ${maxPurchaseLimit}`);
        }
        else if(parseInt(minPurchaseLimit) > targetLimit){
            throw new Error(`Min allowed limit for the user : ${minPurchaseLimit}`);
        }
        while (true) {
            const value = await this.purchaseLimit.inputValue();
            const currentPurchaseLimit = parseInt(value);

            if (currentPurchaseLimit > targetLimit) {
                await this.purchaseLimit.fill((currentPurchaseLimit - step).toString());
            }
            else if (currentPurchaseLimit < targetLimit) {
                await this.purchaseLimit.fill((currentPurchaseLimit + step).toString());
            }
            else {
                await this.saveLimit.click();
                break;
            }

        }
    }

    async getCardLimit(): Promise<string> {
        return await this.purchaseLimit.inputValue();
    }

    async saveCardSettings(): Promise<void> {
        await this.saveSettings.click();
    }

    getToastMessage(): Locator {
        return this.toastMessage;
    }

}