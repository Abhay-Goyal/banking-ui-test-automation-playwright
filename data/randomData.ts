import { faker, fakerEN_IE, fakerEN_IN } from "@faker-js/faker"
import { ticketSkeleton } from "../utils/interfaces"

export function ticketData(): ticketSkeleton {
    return {
        subject: fakerEN_IN.lorem.sentence({ min: 1, max: 5 }),
        category: faker.helpers.arrayElement(["Transactions", "Cards", "Security", "Other"]),
        description: faker.lorem.sentences(2)
    }
}