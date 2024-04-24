# Node.js Express Backend - Rick And Morty API
- This project provides a Node.js backend API built with Express & TypeScript.
It's Uses JWT For Authenticating Users And Give authencated Data manipulation for BTB Exercise in Node.js

## How To Use This Project
1. Run `git clone` to clone the repository to your local Machine.
2. Run `npm install` to install all dependencies of the project.
3. Run `npm start` to Use this Backend in PORT of .production.env (3001- **don't change environement varaibles- It's makes project unavaible to use**)


## Sign In for *Regular* User
``
UserName: amir12061969@gmail.com
Password: Amirbena1204
``


## SignIn for *ADMIN* User
``
UserName: amir12061970@gmail.com
Password: Amirbena1205
``

* **Method:** GET
* **URL:** /api/v1/users
* **Description:** Get a list of all users.
* **Response:** JSON array of user objects.

* **Method:** POST
* **URL:** /api/v1/users
* **Request Parameters:** (body) name: string, email: string
* **Description:** Create a new user.
* **Response:** JSON object representing the created user.
Note: You can replace [Project Name] with the actual name of your project throughout this readme.
