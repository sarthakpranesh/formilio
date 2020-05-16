# Formilio - API
## Meet Formilio - form generator for your daily needs!
<p>
Welcome to Formilio! The goal behind formilio is to provide an open source form generation tool ( like google forms ), keeping in
mind ease of access and usability. Using Formilio is simple and straight forward, you create a form and the app will provide you with a unique url. You can share this url to collect responses.
</p>
<p>
This repository holds the nodejs (express) server responsible for almost all the business logic present in Formilio. Some of the functionalities of the server include User Creation, User signing in with custom JWT, form listing, form generation, collection of responses, creation of response files, etc.
</p>
You can fully customize the Formilio React Native app, frontend form and backend api as per your needs and requirements if you wish to implement your own project over it.
Don't forget to star the project 🌟

- [Formilio React Native app](https://github.com/sarthakpranesh/formilioReactNative)
- [Formilio frontend form](https://github.com/sarthakpranesh/formilio-frontend)

## Download App's Latest-Release: [Formilio](https://github.com/sarthakpranesh/formilioReactNative/raw/build/formilio.apk)

## For Developer & Enthusiasts
For running this project locally make sure you have nodejs installed and follow the below steps -
1. `git clone https://github.com/sarthakpranesh/formilio.git`
2. `cd formilio`
3. `npm install && npm install --only=dev`
4. Create a `.env` file in the root of the directory (folder) and add the following content: 
    ```
      PORT = 8080
      MONGO_USER = <YOUR-MONGO-USERNAME>
      MONGO_PASS = <YOUR-MONGO-USER-PASSWORD>
      JWT_KEY = <KEY-FOR-SIGNING-JWT-TOKENS>
      FRONTEND_BASEURL = <YOUR-FRONTEND-URL>
      IV_LENGTH = 16
      ENCRYPTION_KEY = <AN-ENCRYPTION-KEY>
      BCRYPT_SALT = 10
      RECAPTCHA_KEY = <YOUR-RECAPTCHA-SECRET-KEY>
      USER_NAME = <GMAIL-EMAIL>
      USER_PASSWORD = <GMAIL-EMAIL-PASSWORD>
    ```

    - PORT: this will be the port on which your server will run on locally
    - MONGO_USER & MONGO_PASS: our server uses Mongo DB Atlas for storing information, hence you need to create a mongo database. After creating the mongo database create a user access account in `Database Access` and store those details here respectively. This will allow the server to connect to your database securely. Also please add `0.0.0.0/0` in your `Network Access` section in the database
    - JWT_KEY: this secret key will be used for signing and validating the JWT tokens created ( for user login and authentication of users )
    - FRONTEND_BASEURL: this should point to your self hosted frontend url and should be of the format `https://your-url.com/`
    - ENCRYPTION_KEY: this key will be used in the generation of your frontend form urls.
    - RECAPTCHA_KEY: this should be your reCaptcha secret key provided by [Google reCaptcha](https://www.google.com/recaptcha/intro/v3.html), where as the public key should be added to your frontend.
    - USER_NAME & USER_PASSWORD: Formilio utilizes Gmail for email verification of users that register with the app. For this purpose we use `nodemailer`. You need to change your google account settings to allow less secure apps, follow the steps listed [here](https://hotter.io/docs/email-accounts/secure-app-gmail/) in `Turning on 'less secure apps' settings as mailbox user` section. After doing so successfully you need to add your gmail email address and password here respectively.

5. `npm i -g nodemon`
6. `npm run dev` - this will load your environment variables into the server and will start it successfully.

Any contribution towards the project are welcome :)

<br/>

## Route list
### Open Routes
1. Request Form - `/requestForm`
  - request method - `GET`
  - req query param: 
    ```json
      fid: "Part of the form url after /"
    ```
  - response body:
    ```json
      Correct Response:
        {
            "statusCode": 1,
            "form": [
                {
                    "_id": "mongo-id",
                    "name": "field-name",
                    "regEx": "regex-applied-on-field"
                },
            ],
            "formName": "Form Name",
            "description": "Form Description",
            "wasFormFound": true,
            "error": null
        }

      Response when param `fid` missing in request or is invalid ( with status 400 ):
        - Bad Request
    ```

<br/>

2. Add response - `/addResponse`
  - request method - `POST`
  - request body:
    ```json
      {
        "fid": "Part of the form url after /",
        "responseFields": {
          "username": "data",
          "email": "data@gmail.com",
          "regNo": "18BCE0011"
        }
      }
    ```

<br/>

3. Create User - `/createUser`
- request method - `POST`
- request body:
    ```json
      {
        "email": "email@gmail.com",
        "password": "base64 encoded password"
      }
    ```
- response body:
    ```json
      Correct response:
        {
            "status": 200,
            "statusCode": 1,
            "error": null,
            "isUserCreated": true
        }

      When email address is already registered:
        {
            "status": 400,
            "statusCode": 8,
            "error": "email already registered. Try logging in!",
            "isUserCreated": false
        }

      When email is poorly formatted or, email or password or both are missing from request:
        {
            "status": 400,
            "statusCode": 8,
            "error": "Email or Password not provided",
            "isUserCreated": false
        }

      When password doesn't meet the required length:
        {
            "status": 400,
            "statusCode": 8,
            "error": "Password needs to have 6 - 40 characters",
            "isUserCreated": false
        }
    ```

<br/>

4. Sign In User - `/signInUser`
  - request method - `POST`
  - request body:
      ```json
        {
          "email": "sfdjfb@gmail.com",
          "password": "base64 encoded password"
        }
      ```
  - response body:
      ```json
        Correct Request:
          {
              "status": 200,
              "statusCode": 1,
              "error": null,
              "payload": {
                  "isEmailVerified": true, // depends if user has verified his email or not
                  "signInToken": "JWT_TOKEN"
              }
          }

        When user password is incorrect:
          {
              "status": 403,
              "statusCode": 7,
              "error": "Password Incorrect!",
              "payload": null
          }

        When email is badly formatted or, email or password or both are not provided
          {
              "status": 400,
              "statusCode": 8,
              "error": "Email or Password not provided",
              "isUserCreated": false
          }
      ```

<br/>

### Close/Secure route
<p>
All the secured routes need JWT token to access them. Hence all request made to secure routes needs to have *Authorization* header set to `Bearer JWT_TOKEN`, if not then the request will not be accepted by the server.
</p>

1. Create Form - `/auth/createForm`
  - request method - `POST`
  - request body:
    ```json
      {
        "formName": "Form Name",
        "fields": [
          {
            "name": "field name",
            "regEx": "field regex"
          },
          .
          .
          .
        ],
        "description": "Form Description"
      }
    ```
- response body:
    ```json
      Correct response:
        {
            "statusCode": 1,
            "status": 200,
            "error": null,
            "isFormCreated": true
        }

      If form name or description too short:
        {
            "statusCode": 1,
            "status": 400,
            "error": [
                "Form name too short"
            ],
            "isFormCreated": false
        }

      If form name or description too long:
        {
            "statusCode": 1,
            "status": 400,
            "error": [
                "Form name too long"
            ],
            "isFormCreated": false
        }

      If form name or fields are missing:
        {
            "status": 400,
            "statusCode": 8,
            "error": "Bad request",
            "isFormAdded": false
        }
    ```

<br/>

2. Get all forms - `/auth/getAllForm`
  - request method - `GET`
  - request: none
  - response body:
    ```json
      Correct request:
        {
            "status": 200,
            "statusCode": 1,
            "payload": {
                "forms": [
                    {
                        "formName": "Form Name",
                        "description": "Form Description",
                        "_id": "mongo id"
                    },
                    .
                    .
                    .
                ]
            },
            "error": null
        }
    ```

<br/>

3. Get form details - `/auth/getForm`
  - request method - `GET`
  - request query params:
    ```json
      fid: "mongo id of form"
    ```
  - response body:
    ```json
      Correct Request
        {
            "statusCode": 1,
            "form": {
                "description": "Form Description",
                "url": "https://your-url.com/formSpesificEncoding",
                "_id": "mongo id",
                "formName": "Form Name",
                "userId": "Owner Id",
                "fields": [
                    {
                        "_id": "field id",
                        "name": "field name",
                        "regEx": "field regex"
                    },
                    .
                    .
                    .
                ],
                "createOn": "Date of Creation",
                "__v": 0
            },
            "formRetrieved": true,
            "error": null
        }

    When query param `fid` is not provided:
      - Bad Request
    ```

<br/>

4. Download responses (.csv file) - `/auth/getResponse`
  - request method - `GET`
  - request query params:
    ```json
      fid: "mongo id of the form"
    ```
  - response body: the downloaded .csv file

<br/>

5. Delete form - `/auth/deleteForm`
  - request method - `DELETE`
  - request query params:
      ```json
        fid: "mongo form id"
      ```
  - response body:
    ```json
      Correct request:
        {
            "statusCode": 1,
            "status": 200,
            "error": null,
            "isFormDeleted": true
        }
    ```
<br/>

6. Get field validators - `/auth/validators`
  - request method - `GET`
  - request params: none
  - response body:
    ```json
      Correct request:
        {
            "statusCode": 1,
            "status": 200,
            "payload": {
                "validatorNames": [
                    "email",
                    "alpha",
                    "alphaNumeric",
                    "number",
                    "url",
                    "match",
                    "regNo",
                    "username"
                ]
            }
        }
    ```
<br/>

The above request will fail if you do not provide a `Authorization` field in the header with value as the `JWT_TOKEN` received while user signs in. 
- `Authorization` incorrect
  ```json
    400 - Bad request
  ```

## Help Improve Formilio?
This project uses [GitHub Issues](https://github.com/sarthakpranesh/formilio/issues) to track bugs, feature request and more. So feel free to open issues and feature request 😉.
Also help make a better experience and be a part of the project!
