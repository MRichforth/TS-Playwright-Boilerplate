# TS Playwright Boilerplate

[![Playwright Tests](https://github.com/MRichforth/TS-Playwright-Boilerplate/actions/workflows/deploy-and-run-in-docker.yml/badge.svg?branch=main)](https://github.com/MRichforth/TS-Playwright-Boilerplate/blob/main/.github/workflows/deploy-and-run-in-docker.yml)

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
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

## Technologies Stack

The following technologies were used to develop the project:
 - **Programming Language**: `TypeScript`
 - **Automation Framework**: `Playwright`
 - **Reporting tool**: `Allure`, `Playwright`
 - **Additional technologies used**:
   - `GH Actions`
   - `Docker`
   - `Amazon S3`
***

### Project configuration

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

| **NAME**   |                       **VALUE**                       | **Required** |                                                                                                                                                                      **Purpose**              |
|------------|:-----------------------------------------------------:|-------------:|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| `CI`       |                        `true`                         |        false |                                                                                                                                              Responsible for running tests in `HEADLESS` mode |
| `ENV_URL`  | **https://the-internet.herokuapp.com** or `localhost` |         true | Responsible for URL of web application to be tested. In case the environment is deployed using Docker on your local machine, you need to specify the port, for example http://localhost:7080. |

***

### Project structure
***

### Run tests
***

### Observe results
***

### GitHub Actions
***

## CREDITS

This project uses the following Docker images:

1. **gprestes/the-internet**
    - Source: [**Docker Hub**](https://hub.docker.com/r/gprestes/the-internet)


2. **mcr.microsoft.com/playwright**
    - Source: [**Microsoft Playwright**](https://playwright.dev/)
    - Official Image: [**Microsoft Container Registry**](https://mcr.microsoft.com/en-us/artifact/mar/playwright)

These images are used in accordance with their respective licenses. Please refer to their respective repositories for license details.

 