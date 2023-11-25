
# User and Order Management

This project is a  CRUD application focused on managing users and orders. Built using Express.js and TypeScript, it leverages the robustness of Mongoose, a MongoDB object modeling tool designed to work in an asynchronous environment.

### Prerequisites
Before running this project locally, ensure you have installed following: 

* Node.js
* npm 

### Installation
First, clone the repo : 
```
git clone https://github.com/Samychowdhury01/CRUD-user-management.git

```
Second, Navigate  to the project directory:

```
cd CRUD-user-management

```
Now Install dependencies:

```
npm install

```

## How to Run the Application
To run the application locally, you need to follow these steps: 

**there are two run script :**

1. **For Production:** Run application in production mode.

```
npm run start:prod

```
2. **For Development:** Run application in development mode.

```
npm run start:dev

```

### Other Scripts:

*  **Build the project:**  Builds the application. (it will convert ts file to js)

```
npm run build

```
*  **Check Errors using EsLint:**  Lints the TypeScript files using ESLint.

```
npm run lint

```
*  **Fix Errors using EsLint:**  Lints and fixes the TypeScript files.

```
npm run lint:fix

```
*  **Check the code formating using Prettier:**  Formats the source code using Prettier.

```
npm run prettier:format

```
*  **Fix the Formating using Prettier:**  Formats and fixes the source code using Prettier.

```
npm run prettier:fix

```
# Additional Information

Keep in mind that you need to create an `.env` file. And you have to provide `PORT`, your `DATABASE_URL` and `BCRYPT_SALT_ROUNDS ` in your `.env` file.


