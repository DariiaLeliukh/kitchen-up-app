## Install yarn

Run `npm install yarn -g` to install yarn globally

## Database

Run psql and create database final with `CREATE DATABASE final`. Connect to the database `\c final`

## Project Setup

### Front-end

(In a separate tab)
enter the front-end folder
`cd react-front-end`
and install yarn
`yarn`

### Back-end

Enter the back-end folder
`cd ../express-back-end`
and install yarn
`yarn`

### Set database connection variables

Copy and rename `.env.example` to `.env`

Set the following environment variables accordingly:

- DB_HOST
- DB_USER
- DB_PASS
- DB_NAME

### Reset db

While in back-end folder, reset database
`yarn db:reset`

### Set the Twilio SendGrid API key

`Kitchen up` uses the SendGrid API to send invitations to cooking sessions by e-mail. In order to use the API, you need to:

- Register for an [SendGrid account](https://signup.sendgrid.com/)
- Configure the `SENDGRID_API_KEY` environment variable in the `.env` file with your [SendGrid api key](https://app.sendgrid.com/guide/integrate/langs/nodejs).

### Set the spoonacular API key

`Kitchen up` uses the spoonacular API to fetch recipes and ingredients information. In order to use the API, you need to:

- Register for an [spoonacular account](https://spoonacular.com/food-api/console)
- Configure the `RECIPE_API_KEY` environment variable in the `.env` file with your [spoonacular api key](https://spoonacular.com/food-api/console#Profile).

### Launch Kitchen Up (back-end and front-end)

`yarn go` from the back-end folder
