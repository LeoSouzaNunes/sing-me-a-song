## Introduction

An anonymous songs recommendation app where you can post your favorite song from youtube videos!

<img src="https://user-images.githubusercontent.com/93560377/167341897-14446a7c-bf24-4734-b5ae-f95b9b0ec209.gif" alt="App gif" width="300" height="600"> 

## About

The following features are available:

-   Add song recommendation.
-   Up and down votes on recommendations.
-   Check the most recommended songs.
-   Check a random song recommendation.

## Technologies

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/>
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"/>
<img src="https://img.shields.io/badge/axios%20-%2320232a.svg?&style=for-the-badge&color=informational"/>
<img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white"/>

## How to run

Firstly you will need to run the [back-end](https://github.com/LeoSouzaNunes/sing-me-a-song/tree/main/back-end), then just follow the next steps.

1. Clone this repository

2. Install dependencies

```bash
npm i
```

3. Add .env file on the root with the following content

```bash
REACT_APP_API_BASE_URL=http://localhost:5000
```

4.  Run the application with

```bash
npm run start
```

5. To test the app just run

```bash
npx cypress open
```
