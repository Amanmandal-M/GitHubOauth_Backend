<h1 align="center">Github Oauth Backend</h1>

## About

<br>

This is Github Oauth Backend if any Node.js developer wants to add in own project so they can easily use this repo.

<br>

## Clone Repository

```
git clone https://github.com/Amanmandal-M/GitHubOauth_Backend.git
```

<br>

## Installation

```
npm install
```

<strong>Note : </strong> Don't need to install packages if you only use this command all the packages automatically install if you want to add more packages then you have to write this command `npm install <your package name>`.

## Start the Backend server 

```
npm run start

npm run server

node index.js

nodemon start

nodemon index.js
```

<strong>Note : </strong> You can use any of them .

<br>

##  MVC Structure

```
├── index.js
├── configs
|    └── authDb.js
├── models
|    └── authModel.js
├── routes
|    └── authRoute.js
```

<strong>Note : </strong> 

- Before doing anything first create `.env` file and put :
    - `PORT = <Your PORT Number>`
    - `MONGO_URI            = <Your MONGO URI>`
    - `GITHUB_CLIENT_ID     = <Your GitHub Client ID>`
    - `GITHUB_CLIENT_SECRET = <Your GitHub Client Key Secret>` 
    - `GITHUB_CALLBACK_URL  = <${Your Base URL where your server is running , e.g. http://localhost:8080}/auth/github/callback`>
    - `SESSION_KEY          =  <Your Session key e.g. anything` >`

<br>

## Schema Design

<br>

<h3><strong>User Schema</strong><h3>

```js
{
  _id : ObjectId,
  GithubId: String,
  DisplayName: String,
  Username: String,
  ProfileUrl: String,
  photos: String
}
```

- It is only for storing data of authenticated user.

<br/>

## To generate your own client ID, client secret, and callback URL for GitHub OAuth, you can follow the steps outlined below:

<br>

- Visit the GitHub Developer settings page: Go to https://github.com/settings/developers and log in to your GitHub account.

- Create a new OAuth application: Click on the "New OAuth App" button or the "Register a new OAuth application" link. You may be prompted to re-enter your password for authentication.

- Fill in the application details: Provide the necessary information for your OAuth application, including the following:

    - Application name : Enter a name for your application (e.g., "My GitHub OAuth App").
    - Homepage URL: Enter the URL of your application's homepage or landing page.
    - Application description: Provide a brief description of your application and its purpose.
    - Authorization callback URL: Enter the callback URL where GitHub will redirect users after they authorize your application. This URL must be HTTPS and point to a valid endpoint in your application to handle the authorization response.

- Specify the permissions: Choose the desired scopes or permissions your application requires. These scopes determine what access your application will have on behalf of the authenticated user. You can select one or more scopes based on your application's needs.

- Submit the form and create the application: After filling in all the required information, click on the "Register application" or "Create application" button to create your OAuth application.

- Obtain your client ID and client secret: Once your application is created, you will be redirected to the application's settings page. On this page, you will find your Client ID and Client Secret. These are unique identifiers for your application, and you will need them to authenticate and authorize users through GitHub OAuth.

- Set up your callback URL: Ensure that the callback URL you provided earlier matches the one specified in your application settings. Make sure it is a valid URL pointing to a route or endpoint in your application that can handle the authorization response.

With these steps completed, you now have your own client ID, client secret, and callback URL for GitHub OAuth. You can use these credentials to integrate GitHub OAuth into your application and allow users to authenticate and authorize your application to access their GitHub data.