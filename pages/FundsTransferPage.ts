import { Page , Locator } from "@playwright/test";

export default class FundsTransferPage{
    private readonly page: Page;
    private readonly transferType: Locator;
    private readonly fromAccount: Locator;
    private readonly toAccount: Locator;
    private readonly transferAmount: Locator;
    private readonly executeTransfer: Locator;
    private readonly recipientBeneficiary: Locator;
    private readonly successfulTransferMessage: Locator;
    private readonly insufficientFundsMessage: Locator;


    constructor(page : Page){
        this.page = page;
        this.transferType = page.locator('#transfer-type');
        this.fromAccount = page.locator('#from-acc');
        this.toAccount = page.locator('#to-acc');
        this.transferAmount = page.getByRole('spinbutton', { name: '0.00' });
        this.executeTransfer =page.getByRole('button', { name: 'Execute Transfer' });
        this.recipientBeneficiary = page.locator('#bene-select');
        this.successfulTransferMessage = page.locator("div.transfer-success-msg");
        this.insufficientFundsMessage = page.locator('div.transfer-error-msg.error-feedback');
    }

     async getSavingsAccountBalance() : Promise<number>{
        const account = await this.fromAccount.locator('option[value="savings"]').textContent();
        if(!account){
            throw new Error ("Falsy value is returned")
        }
         return parseFloat(account?.replace(/[^0-9.]/g, ""))
    }

    async getCurrentAccountBalance(): Promise<number>{
          const account = await this.fromAccount.locator('option[value="checking"]').textContent();
        if(!account){
            throw new Error ("Falsy value is returned")
        }
         return parseFloat(account?.replace(/[^0-9.]/g, ""));
    }


    async internalTransferProcess(fromValue : "savings" | "checking" , toValue : "savings" | "checking", transferAmount : number): Promise<void>{
        await this.fromAccount.selectOption({value : fromValue});
        await this.toAccount.selectOption({value : toValue});
        await this.transferAmount.fill(transferAmount.toString());
        await this.executeTransfer.click();
    }

   getSuccessfulTransferMessage(): Locator{
    return this.successfulTransferMessage;
   }

   getInsufficientFundsMessage(): Locator{
    return this.insufficientFundsMessage;
   }




   



}