## Introduction

An anonymous songs recommendation api where you can post your favorite song from youtube videos!

## About

The following endpoints are available:

-   Add song recommendation.
-   Up and down votes on recommendations.
-   Check the most recommended songs.
-   Check a random song recommendation.

## Technologies

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/>
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"/>
<img src="https://img.shields.io/badge/axios%20-%2320232a.svg?&style=for-the-badge&color=informational"/>

## How to run

1. Clone this repository

2. Install dependencies

```bash
npm i
```

3. Add .env file on the root with the following content

```bash
DATABASE_URL=postgres://postgres:123456@localhost:5432/sing-me-a-song
NODE_ENV=development
```

4. Add .env.test file on the root with the following content

```bash
DATABASE_URL=postgres://postgres:123456@localhost:5432/sing-me-a-song-test
NODE_ENV=test
```

5.  Run the application with

```bash
npm run dev
```

6. In case you gonna test the back-end run

```bash
npm test
```

7. If you're running the end to end test we recommend you to run

```bash
npm run test:e2e
```
