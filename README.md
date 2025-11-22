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
2. Install dependencies:
   npm install
3. Install Playwright browsers (if not installed automatically):
   npx playwright install

## Running Tests locally

- On Chrome in headed mode:
` npm run test:headedchrome`
- On all browsers in headless mode:
`npm run test:headlessqa`
- View Report:
`npm run showreport`

## Folder layout
- .github/             — Workflows for github actions
- environment          — env files
- fixtures/            — test data
- pages/               — Page classes for POM
- tests/               — Playwright test files (specs)
- utils/               — Config and common actions
- playwright.config.ts — Playwright configuration files
- package.json         — scripts and dependencies

