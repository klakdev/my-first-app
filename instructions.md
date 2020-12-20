# Instructions

## Preparing the workspace

1. Create dev directory `mkdir my-first-app`
2. Initialize git `git init`
3. Add ignore files from [node-gitignore](https://github.com/github/gitignore/blob/master/Node.gitignore )
4. Install node-env [cross-env](https://www.npmjs.com/package/cross-env)
5. Create gitignore file `mkdir .gitignore`
6. Install nodemon npm i save-dev nodemon [nodemon](https://www.npmjs.com/package/nodemon)
7. Create folder for client and for server `mkdir client && mkdir server`
8. Go into the server folder cd server
9. Initialize node Npm init
10. Add express to package.json
11. Npm i. node modules appears, color is different since it is ignored by git.
12. Create an index file
13. Import [express](https://expressjs.com/ )
14. Run [express hello world example](https://expressjs.com/en/starter/hello-world.html)
15. show the example on the browser
16. add the run server command in package.json using node nodemon
17. add command to main package.json
18. add a test.http file
19. run request on test file
20. show how to debug it.

## Basic project structure

1. draw the basic structure of the project. TODO
2. explain about different types of http methods

## building a router for managing user information

1. create a users folder
2. create user route on "/user"
3. create an array of users - will be are db for now
4. add a route to get a user. it will search in the array and return the user object
5. test from http client [http://localhost:3000/user/123456](http://localhost:3000/user/123456)
6. add [body-parser](https://www.npmjs.com/package/) middleware
7. create a post method for creating a user
8. explain about the importance of data validation
9. install [validator](https://www.npmjs.com/package/validator) for validations - `npm i validator`
10. create a validation function for user
11. create a patch method for updating a user
12. test the post and patch methods
