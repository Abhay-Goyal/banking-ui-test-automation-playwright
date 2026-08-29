export interface ticketSkeleton {
    subject: string,
    category: "Transactions" | "Cards" | "Security" | "Other",
    description: string
}