import { Page ,Locator } from "@playwright/test";
import {ticketSkeleton} from "../utils/interfaces"
import path from "path";

export default class CustomerSupportPage{
    private readonly ticketSubject: Locator;
    private readonly page: Page;
    private readonly ticketCategory: Locator;
    private readonly issueDescription: Locator;
    private readonly attachFile: Locator;
    private readonly submitTicket: Locator;
    private readonly ticketHistory: Locator;

    constructor(page : Page){
        this.page = page;
        this.ticketSubject = page.getByRole('textbox', { name: 'Brief summary of issue' });
        this.ticketCategory = page.locator('#ticket-category');
        this.issueDescription = page.locator('#ticket-details');
        this.attachFile = page.getByLabel('Choose File');
        this.submitTicket = page.getByRole('button', { name: 'Submit Ticket' });
        this.ticketHistory = page.locator("div.ticket-row");
    }


    async fillTicketForm(ticketData : ticketSkeleton): Promise<void>{
        await this.ticketSubject.fill(ticketData.subject);
        await this.ticketCategory.selectOption({value : ticketData.category});
        await this.issueDescription.fill(ticketData.description);
        await this.attachFile.setInputFiles(path.resolve(import.meta.dirname,"../MOCK_DATA.csv"));
        await this.submitTicket.click();
    }

    getMyTicket(ticketName : string): Locator{
        return this.ticketHistory.filter({hasText : ticketName})
    }



}