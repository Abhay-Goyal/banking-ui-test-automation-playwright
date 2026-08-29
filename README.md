# Banking App Automation Framework

This project is a Playwright-based UI automation framework for a banking web application. It is designed to validate core customer journeys such as login, funds transfer, card limit configuration, and customer support ticket creation.

## Overview

The framework follows a maintainable automation architecture using the Page Object Model (POM), reusable fixtures, environment configuration, and data-driven scenarios. It is structured to showcase practical QA automation skills for a resume, portfolio, or interview discussion.

## Tech Stack

- TypeScript
- Playwright
- Faker.js
- dotenv

## Project Structure

```text
BankingApp/
├── config/
│   └── config.ts
├── data/
│   ├── constants.ts
│   ├── creditLimits.json
│   ├── randomData.ts
│   └── transferFunds.json
├── fixtures/
│   └── bankingFixtures.ts
├── pages/
│   ├── CardControlsPage.ts
│   ├── CustomerSupportPage.ts
│   ├── FundsTransferPage.ts
│   ├── LoginPage.ts
│   └── SharedComponents.ts
├── tests/
│   ├── CreateASupportTicket.spec.ts
│   ├── SetCardLimit.spec.ts
│   ├── TransferFunds.spec.ts
│   └── ValidLoginTest.spec.ts
├── utils/
│   └── interfaces.ts
├── MOCK_DATA.csv
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── .env/default
├── playwright-report/
├── test-results/
└── README.md
```

## Automation Design

### Page Object Model
Each page in the pages folder encapsulates the UI selectors and actions related to a specific screen or feature. This keeps test files focused on behavior rather than UI implementation details.

### Reusable Fixtures
The custom fixture layer centralizes browser/page initialization and common app setup. This reduces duplication and makes the tests easier to maintain.

### Data-Driven Testing
Card limit behaviors are driven from JSON data in the data folder. This pattern allows new scenarios to be added without modifying the test logic itself.

### Environment Configuration
Configuration values such as the base URL, username, and password are loaded from environment variables to keep credentials and app settings separate from the code.

## Test Coverage

The framework currently includes checks for:

- Valid login flow
- Funds transfer between accounts
- Card limit update validations
- Customer support ticket creation and verification

## Prerequisites

- Node.js installed
- npm installed
- A valid .env/default file with the following values:

```env
BASE_URL=
USERNAME=
PASSWORD=
```

## Setup

Install dependencies:

```bash
npm install
```

## Run Tests

Run the full suite:

```bash
npm test
```

Run a single test file:

```bash
npx playwright test tests/ValidLoginTest.spec.ts
```

Run in headed mode for debugging:

```bash
npx playwright test --headed
```

Open the HTML report:

```bash
npm run show-report
```

## Reporting

The Playwright configuration includes:

- HTML report for visual execution review
- JUnit XML output for CI or tool integration

## Resume Summary

This project demonstrates practical QA automation experience in:

- end-to-end UI test automation
- test architecture and maintainability
- real-world business flow validation
- cross-browser execution
- reusable page object design
- data-driven testing

## Notes

This project is built for learning, portfolio presentation, and QA automation practice. It is suitable for showcasing foundational automation engineering skills in a resume or interview setting.
