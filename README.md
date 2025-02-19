# TS Playwright Boilerplate

[![Playwright Tests](https://github.com/MRichforth/TS-Playwright-Boilerplate/actions/workflows/deploy-and-run-in-docker.yml/badge.svg?branch=main)](https://github.com/MRichforth/TS-Playwright-Boilerplate/blob/main/.github/workflows/deploy-and-run-in-docker.yml)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/-playwright-%232EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![Amazon S3](https://img.shields.io/badge/Amazon%20S3-FF9900?style=for-the-badge&logo=amazons3&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Dependabot](https://img.shields.io/badge/dependabot-025E8C?style=for-the-badge&logo=dependabot&logoColor=white)

This boilerplate project was implemented in order to create a code base for the Playwright framework and to demonstrate functionality provided by the framework, as well as to investigate possibilities of integrating TypeScript programming language and Playwright automation framework with GitHub actions.

Also during the process of working on this project the following goals were set:
- [x] Using self-hosted runners to run GH Actions
- [x] Using localhost deployment for testing purposes without binding to a remote domain
- [x] Use of docker images to isolate the testing environment from the self-hosted runner
- [x] Using docker-compose to optimize self-hosted runner resource consumption and speed up GH Actions execution time
- [ ] Create an NPM library based on page object files for investigation purposes as well as to address scaling issues of the project using the methods of this project for other repositories 
***

## Technologies stack

The following technologies were used to develop the project:
 - **Programming Language**: `TypeScript`
 - **Automation Framework**: `Playwright`
 - **Reporting tool**: `Allure`, `Playwright`
 - **Additional technologies used**:
   - `GH Actions`
   - `Docker`
   - `Amazon S3`
***

## Project configuration

In order to start executing automated scenarios, the following steps should be performed:
1. Clone repository
```
git clone https://github.com/MRichforth/TS-Playwright-Boilerplate.git
```

2. Install packages
```
npm install
```
3. Install Playwright framework
```
npx playwright install
```
4. Create `.env` file 

The following variables should be added to the .env file for this project to work successfully:

|   **NAME**   |                             **VALUE**                             | **Required**  | **Purpose**                                                                                                                                                                                   |
|:------------:|:-----------------------------------------------------------------:|:-------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|     `CI`     |                              `true`                               |     false     | Responsible for running tests in `HEADLESS` mode                                                                                                                                              |
|  `ENV_URL`   | **https://the-internet.herokuapp.com** <br/>or <br/>`localhost`   |     true      | Responsible for URL of web application to be tested. In case the environment is deployed using Docker on your local machine, you need to specify the port, for example http://localhost:7080. |

***

## Project structure

- [**.github**](.github) folder
  - Contains all github workflow yaml files for using GitHub Actions.
- [**.husky**](.husky) folder
  - Contains a file that is responsible for executing any command specified in this file in the pre-commit hook.

[//]: # (- [**spec**]&#40;specs&#41; folder)

[//]: # (     - In this folder are created spec files that contain scenarios in the order corresponding to sections of the web application The Internet)

[//]: # ( - [**framework**]&#40;framework&#41; folder)

[//]: # (   - [**helpers**]&#40;framework/helpers&#41; folder)

[//]: # (     - Contains all related files required for configuration and correct functioning of the project.)

[//]: # (    - [**pages**]&#40;framework/pages&#41; folder)

[//]: # (      - Contains page files that include classes and methods in the order corresponding to the spec files and sections of The Internet web application.)
- [**src**](src) folder
  - Contains files used in the process of test execution
 - [**docker-compose.yaml**](docker-compose.yml)
   - Responsible for local deployment and running tests using Docker

***

## Run tests
In order to run the Playwright scenarios in the [**package.json**](package.json) files a run configuration has been created for each of them, as well as a general run configuration to run all the scenarios

To run a **single scenario** run the following command in the terminal:
```
npm run test-ab-testing
```
To run **all scenarios** run the following command in the terminal:
```
npm run test-regression-run
```
***

## Observe results
The following folders will be generated in the project root folder as a result of executing the tests: `allure-results` and `playwright-report`

More detailed information on configuring playwright-reporting in [**playwright.config.ts**](playwright.config.ts) file can be found here: **https://playwright.dev/docs/test-reporters**

 - To access the playwright report, open the `index.html` file in the `playwright-report` folder

![Playwright report example](src/playwright-report-example.png)


 - To access the Allure report, execute the following run configuration in the terminal
```
npm run alllure-generate
```

As a result of this command, the `allure-report` folder will be created. Open the `index.html` file inside this folder to see the report generated by Allure

![Allure report example](src/allure-report-example.png)
***

## GitHub Actions
Project has the ability to run scenarios using GitHub Actions

In the `Actions` tab you can see a workflow called “**(Docker-compose) Playwright Regression Tests**”

This workflow is automatically triggered for **each created PR in the project**, as well as for each **subsequent commit** in that PR, and also this workflow can be **triggered manually**

As a result of the workflow trigger, a pipeline is started which consists of three main steps:
- `lint`: checks the code on your branch for errors
- `deploy-and-run`: starts the local deployment of “**The Internet**” application inside the docker container and then starts the run configuration `test-regression-run`.
- `generate-and-publish-report`: after running scenarios, automatically generated report is uploaded to AWS S3 bucket and then a link to Allure report is generated and displayed in Pipeline summary.
  ![GitHub Actions Example](src/github-actions-example.png)

Allure report generated by GitHub Actions also displays the history of all previously executed runs

![AWS Allure report example](src/aws-allure-report-example.png)
***

## Credits

This project uses the following Docker images:

1. **gprestes/the-internet**
    - Source: [**Docker Hub**](https://hub.docker.com/r/gprestes/the-internet)


2. **mcr.microsoft.com/playwright**
    - Source: [**Microsoft Playwright**](https://playwright.dev/)
    - Official Image: [**Microsoft Container Registry**](https://mcr.microsoft.com/en-us/artifact/mar/playwright)

These images are used in accordance with their respective licenses. Please refer to their respective repositories for license details.

 