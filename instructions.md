# Instructions for setting up before workshop


## Set up a running server

### Here I'll describe in detail the exact steps to take in order to set up a running server the architecture that will be used during the workshop

1. open cmd, cd to root and create development directory

    ``` bash
    cd c:\ && mkdir dev
    ```

2. cd to directory

    ``` bash
    cd dev
    ```

3. create project directory and cd to it

    ```bash
    mkdir first-app && cd first-app
    ```

4. open vscode
  
    ```bash
    code .
    ```

5. open terminal
6. Initialize git
  
    ```bash
    git init
    ```

7. create file called `.gitignore`

8. copy node ignore file content from [node-gitignore](https://github.com/github/gitignore/blob/master/Node.gitignore )

9. initialize package

    ```bash
    npm init
    ```

10. create a folder for server and cd to it

    ```bash
    mkdir server && cd server
    ```

11. install [cross-env](https://www.npmjs.com/package/cross-env) as dev dependency

    This package will allow us to define environment variables in our scripts ignoring the os we are running on

    ```bash
    npm install cross-env --save-dev
    ```

12. install [nodemon](https://www.npmjs.com/package/nodemon) as dev dependency

    This package will allow us to automatically restarting the node application when file changes in the directory are detected.

    ```bash
    npm install nodemon --save-dev
    ```

13. initialize package

    ```bash
      npm init
    ```

14. install the following dependencies
    * [body-parser](https://www.npmjs.com/package/body-parser)
    * [cookie-parser](https://www.npmjs.com/package/cookie-parser)
    * [express](https://expressjs.com/)
    * [pg](https://node-postgres.com/)
    * [pg-hstore](https://www.npmjs.com/package/pg-hstore)
    * [sequelize](https://sequelize.org/)
    * aws-sdk
    * validator

    ```bash
      npm i body-parser cookie-parser express pg pg-hstore sequelize aws-sdk validator
    ```

    The `package.json` file should now lock as following

    ```json
      "dependencies": {
        "body-parser": "^1.19.0",
        "cookie-parser": "^1.4.5",
        "express": "^4.17.1",
        "pg": "^8.5.1",
        "pg-hstore": "^2.3.3",
        "sequelize": "^6.3.5",
        "aws-sdk": "2.828.0",
        "validator": "^13.5.2"
      },
      "devDependencies": {
        "cross-env": "^7.0.3",
        "nodemon": "^2.0.7"
      }
    ```

15. under server create a file called `index.js`

16. copy the [express hello world example](https://expressjs.com/en/starter/hello-world.html) to the file

    ```javascript
      const express = require('express')
      const app = express()
      const port = 3000

      app.get('/', (req, res) => {
        res.send('Hello World!')
      })

      app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
      })
    ```

17. run the server

    ```bash
    node .
    ```

    you should see the following output

    `Example app listening at http://localhost:3000`

18. open browser and hit localhost:3000

    should print `Hello World`

## Using a rest client

### This section will provide instructions for using the built in vscode rest client

1. under the server folder create a file called `rest.http`
2. add the following lines to the file

    ```wget
      GET http://localhost:3000 HTTP/1.1

      ###
    ```

3. if you have installed the [rest-client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) plugin a `Send Request` button will appear above.

    click it, you should get the following results in a separate tab

    ```wget
      HTTP/1.1 200 OK
      X-Powered-By: Express
      Content-Type: text/html; charset=utf-8
      Content-Length: 12
      ETag: W/"c-Lve95gjOVATpfV8EL5X4nxwjKHE"
      Date: Fri, 15 Jan 2021 12:50:24 GMT
      Connection: close

      Hello World!
    ```

## scripts

### In this section I will describe ways for making it easier to build and debug a server while developing

1. in the server folder, this `package.json` file add the following script

    ```json
      "start": "cross-env DEBUG=* nodemon ."
    ```

2. run the script

    ```bash
      npm start
    ```

3. go into the index.js file and change the text from `Hello World` to `Hello Fullstack Course`

4. save the file and run request from `rest.http` file, the content should change

## Set the port from environment variables

### In order to have the ability to control the port the server is running on without changing the code we will set the port from an environment variable

1. in the start script add the following environment variable

    ```bash
      "cross-env DEBUG=* PORT=3001 nodemon ./index.js"
    ```

2. in the index.js file change the port to be assigned from the environment variable

    ```javascript
    const port = process.env.PORT || 3000
    ```

### debugging the server

In the server `package json` you should have a debug button above the scripts section. clicking the debug button will allow you to run any of the scripts.

1. choose the start script

2. add a breakpoint in the `index.js` file on the middleware handling the request

3. send request from `rest.http` file

4. server should break.

## setting up the client

### in ths section Ill describe how to set up the react application for the client

1. open console on root of project

2. initialize a react project, this might take some time so go grab a coffee (;

    ```bash
    npx create-react-app client
    ```

3. open the client `package.json` file and install the following dependencies

* @material-ui/core
* @material-ui/icons
* axios
* react-material-ui-carousel

```bash
  npm i  @material-ui/core @material-ui/icons axios react-material-ui-carousel aws-sdk
```

Your dependencies section should look as following

  ```json
  "dependencies": {
    "@material-ui/core": "^4.11.2",
    "@material-ui/icons": "^4.11.2",
    "@testing-library/jest-dom": "^5.11.6",
    "@testing-library/react": "^11.2.2",
    "@testing-library/user-event": "^12.6.0",
    "axios": "^0.21.1",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-material-ui-carousel": "^2.1.1",
    "react-scripts": "4.0.1",
    "react-scroll": "^1.8.1",
    "web-vitals": "^0.2.4",
    "aws-sdk"
  },
  ```
  
## Good Luck
