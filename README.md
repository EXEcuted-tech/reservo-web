# Reservo: An Online Reservation E-commerce Website README

## Creating an online community for catering and ordering businesses within one online platform, Reservo!

Welcome to the Reservo README! This document offers an overview of our online reservation system's features and setup instructions. This guide will help you get started whether you're a developer looking to incorporate this platform into your website or a user interested in making reservations. This project will entail the details of the following functionalities:

* Create an online reservation and e-commerce platform for any businesses in the food industry
* Create a customizable online vendor page for businesses to display themselves
* Automate an organization system for businesses to manage and organize their inventory and workers
* Manage and track reservation statistics and information for businesses to view
* Enable google account login within the website

## Important Links 
1. [Deliverables]
2. [UI Style Guide](https://www.figma.com/files/team/1281278134308421033/Group-3?fuid=1173125573062776141)

## Installation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Setting Up the Project
1. Clone the project in any local directory you like
Example using the git CLI
```
git clone https://github.com/[Name of Project].git
```
2. CD into the root folder
```
cd [Name of Project]
```
3. Install dependencies
```
npm install
```
4. Run the project
```
npm run dev
```
**Bellow are some more detals about NPM scripts and commands**

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

5. ⚠ Please check the `Review` section below ⚠

## Commands To Run During Develompemnt
1. Start your local front-end serve
```
npm run dev

```
2. Make sure to that your XAMPP with the imported database and mySQL server is running as well
```
// TODO: Add commands here
```

## File Structure
1. `src\assets` - This is where you place images (.png, .svg, etc...)
2. `src\components` - Common components to be used throughout the application, you usually don't wanna touch this folder
3. `src\pages` - Pages of the website
4. `src\constants` - Global variables  
5. `src\common` -  Where common utils, style, and colors are compiled and accessed
```
Example for #6:
src
|__modules
        |__reservation
                    |__ index.js - Entry point for the reservation module
                    |__ style.js - Style import for the page
```

## Review
1. When you clone the repository, make sure you are in the `main` branch. You can check by running this command:
```
git status
```
Expected output would be:
```
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```
2.Pull the latest changes
```
git pull
```
3. When you have finished adding your changes, create a branch using the `Card Number` on your assigned task in [Trello](https://trello.com/b/gWZMRm35/app-development)
```
Example for #3:
//1. Create Branch using the command bellow
$ git branch ticket-12

//2. Check if the branch was created
$ git branch
ticket-12
* master

//3. Switch to the newly created branch
$ git checkout ticket-12

//4. Repeat Step 2
$ git branch
* ticket-12
master

//5. Commit your files and either push or pull the changes
$ git add .

$ git commit -m "Testing Push and Pull Request"

$ git push

```
4. Send the pull review link of the new changes you added to the project. The format should look like the link bellow:
`https://github.com/[Name of Project]pull/12`

## Find a bug?

If you found an issue or would like to submit and imporvement to this project, please submit an issue using the issues tab above.

## Known issues (Work in progress)

This project is in its initial stages and currently there are no issues found.

Thank you for choosing the Reservo. If you have any questions or need support, please contact our [Support Team](https://www.facebook.com/juan.deage.1). We hope you find our platform valuable for your reservation needs!