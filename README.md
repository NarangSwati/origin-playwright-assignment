# Origin Playwright Assignment

Playwright-based test workspace to automate web-UI flow for Origin Energy pricing/plans

## Overview
This repository contains Playwright tests and supporting scripts to validate web flows.

## Prerequisites
- Node.js 16+ (LTS recommended)
- npm
- Git
- Optional: Visual Studio Code and the Playwright extension

## Setup (local)
1. Clone the repo:
   git clone https://github.com/NarangSwati/origin-playwright-assignment.git
2. Create file inside `environment` folder as `.env.<YourEnv>` using the sample file `example.env.qa` 
3. Install dependencies: `npm run setup`

## Running tests on local
- Scripts in `package.json` to run tests on QA Env.   
   - `npm run test:AllHeadlessQAEnv`   
   - `npm run test:allHeadedChromeQAEnv`   
   - `npm run test:accessibilityChromeQAEnv` 

- In oder to run the tests from your local machine.
   - Provide your environment as `NODE_ENV` in scripts example: `NODE_ENV=<YourEnv>`
   - If `NODE_ENV` not provided, default value from config.js would be used. 

- View Report: `npm run showreport`

## Current setup git-hubactions
- Environment variable `BASE_URL` is set to as `https://www.originenergy.com.au/pricing.html` for QA environment on github.

- Workflow - `origin price Plan` runs based on a corn expression(i.e. every weekday at 9 am), merge to main and PR. This workflow can be run manualy where user can select the desired environment and execute the tests on demand.

- Corresponding script in `package.json` used in `origin price Plan` is
` npm run test:CI`

- Each test run produce github action detailed summary, artefacts(playwright repots, traces and screenshots on failure) which is persited for 7 days and can be downloaded for analysis.

## Tools & Language
 - `Playwright` & `TypeScript`

#### Why playwright & TS?
 - Playwright offers auto-waiting which reduces flakiness.
 - Playwright natively supports Chromium, Firefox, WebKit with a single API.
 - Playwright built-in test runner supports parallel execution
 - TS is type safe hence no runtime errors.



## Usage of AI assitance 
#### What's asked?
- Troubleshoot issue with firefox browser failures.
- Write up first draft of `README.md` 
- How to enable workflow to accept environment as input and using it Workflow 

#### What is kept/edited?
- Kept suggestion after understanding the rationale for issue with firefox browser failures.
- Kept initial draft of `README.md` and updated the content to align with the implemntation details.  
- Updated the workflow to use either user provided environment variable or default value via statement `environment: ${{ github.event_name == 'workflow_dispatch' && inputs.environment || 'QA' }}`

## TODO's & Improvements
