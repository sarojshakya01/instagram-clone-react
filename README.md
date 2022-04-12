## About the project Instagram

This project has basic structure of the original [Instagram](https://www.instagram.com/). All the css design has been copied from Original [Instagram](https://www.instagram.com/). But the API data format has different structure than original [Instagram](https://www.instagram.com/). The template database used in this project can be found at data folder of the project root directory. The original data format caan be found inside the apidataformat folder inside data folder. The React Components in this project are also not similar to the original [Instagram](https://www.instagram.com/).

## How to run the projects?

1. Clone or Download zip and extract the project.
2. Host a mongodb server (either in cloud or in local machine)
3. Add database "Instagram" in your mongodb server
4. Add collections "user" and "post" in "Instagram" database
5. import respective data from data folder of project root directory (user.json and posts.json) or you can add your own data according to the schema of those json files.
6. You can add your own image files in public/image/userdata folder of root directory
7. Go to the project directory and make a .env file from .sample.env and place your values
8. run `node server.js` command from commant prompt (You should have already installed NodeJS in your machine))
9. run `npm start` command in another instance of command prompt"
10. install all required modules as suggested in the log of `npm start` command or you can mannually install required libraries and dev dependencies from package.json file untill the App runs in your browser

You can like the post from both photo and like icon, navigate to next photo, add comment, delete comment(only on your post and your comment on other's post), like comment etc.

Enjoy!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand self this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
