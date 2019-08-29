# jootopuncture

This is source code for jootopuncture.herokuapp.com
This repo contains 2 apps. client and servers.

## Tech stack

1. Common Tech

- JavaScript, HTML, CSS
- [reactjs](https://reactjs.org/): UI library
- [NodeJS](https://nodejs.org/en/): NodeJS backend
- [Heroku](https://www.heroku.com/): Hosting

2. Client

- [create-react-app](https://github.com/facebookincubator/create-react-app)
- [Material-UI](https://material-ui.com): React Components library

## Project structure and deployment pipeline

1. Source for UI is under `/client`
2. All source code is hosted in github as a public project
3. There is a hook setup in this project when commits are pushed to master branch, it'll trigger a deploy.

## Local development

This instruction is based on development on OS X or Linux. For Windows, use Linux subsystem and bash shell

### Prerequisites

1. Install [nodejs](https://nodejs.org/en/) 8 or above
2. Install [yarnpkg](https://yarnpkg.com/en/)
3. Clone this repo.

```
$ git clone git@github.com:hansampark/jootopuncture.git
```

4. Change directory to `jootopuncture`

```
$ cd jootopuncture
```

### Regular git workflow

1. Check out `master`
2. Update master (Always start from latest `master`)

```
$ git fetch && git pull origin master
```

3. Create a branch

```
$ git checkout -b <branch_name>
```

4. Make changes
5. Stage changes for commit

```
$ git add .
```

6. Commit changes

```
$ git commit -m "<meaningful commit message>"
```

7. Push branch to remote

```
$ git push origin <branch_name>
```

8. From github, create a pull request. source is `<branch_name>`, and target is `master`
9. Merge pull request after review

### Working with client

1. Make sure you're in `jootopuncture/client`

```
$ cd client
```

2. Install dependencies for site (do this everytime in case there is dependency change)

```
$ yarn install
```

3. Run local development server(Optional)

```
$ yarn start
```

4. Open browser and go to http://localhost:3000
5. Make changes and check result in browser

### Working with server

1. Make sure you're in `jootopuncture`

```
$ cd jootopuncture
```

2. Install dependencies for site (do this everytime in case there is dependency change)

```
$ yarn install
```

3. Run local development server(This will trigger both client and server run concurrently)

```
$ yarn dev
```

4. Open browser and go to http://localhost:3000
5. Make changes and check result in browser
