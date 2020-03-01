# [WIP] Dashboard Test

This is a testing project, building a dashboard with some specific features.

You can visit the application clicking here [https://mjr-dashboard-test.herokuapp.com](https://mjr-dashboard-test.herokuapp.com).

---

### How to run this project locally on your machine

_This project was bootstrapped with: [Create React App](https://github.com/facebook/create-react-app)._

1. Install the LTS version of [NodeJs](https://nodejs.org/en/), the javascript runtime;
2. Install [Yarn](https://yarnpkg.com/), the package manager;
3. Clone this repository to your machine;
4. Inside the project folder, run `yarn install`;
5. After that, run `yarn start`;
6. Now you can access `http://localhost:3000` on your browser;

**In order to have access of all features, you should run the backend, following the steps of the [https://github.com/marceloadsj/dashboard-test-backend](https://github.com/marceloadsj/dashboard-test-backend) repository as well**

You can run `yarn test` run start the testing console and run all tests of the project.

---

### Technical Decisions

I'm following an approach, focused to build a highly scalable and easily maintanable application. Using a Domain Driven Approach to separate the main features, I'm using Mobx to create shared stores to control the central data, like informations of the logged user.

**I'm not preventing the same user to login twice, so we can have a scenario where the user receives a login message of the same user**

#### Main Libraries:

- [Ant Design](https://ant.design/) - The main ui library, one of the most famous React libraries with the largest component availability. Fully React hooks compatible in the [version 4, launched on 27/02/20](https://github.com/ant-design/ant-design/releases/tag/4.0.0);

- [Mobx](https://mobx.js.org/) - The state manager that runs based on proxy and observables. Using the [Mobx React Lite](https://github.com/mobxjs/mobx-react-lite) wrapper to connect the stores and components using hooks;

- [React Router](https://reacttraining.com/react-router) - Library responsible to structure the routing system of the SPA application in a declarative way.

- [Socket.io](https://socket.io/) - The main library to work with websockets. We can send and receive realtime messages between clients and server. It take care of upgrading from pooling to pure websocket when available.

- [Nivo](https://nivo.rocks/) - The chart library build on top of d3, with easy and standard api between different components.

##### Support Libraries:

- [Axios](https://github.com/axios/axios)
- [Secure-ls](https://softvar.github.io/secure-ls)
- [Moment](https://momentjs.com/)

#### Structure

I would like to present some of the structural decisions I used on the repo, and the main points of the application:

1. [Store Provider](https://github.com/marceloadsj/dashboard-test/blob/master/src/contexts/StoreProvider.js)
   That's a React Context and Provider to create some global stores to use all over the application, like User Store for example.
   I've used like this to be easier to access any global store in any component, without need to go for prop drilling or something like that. The stores are created inside each domain (current, only one exists, UserStore). The idea to scale better is to create a good isolation, but we can inject the stores we need here without much pain.

2. [Socket Provider](https://github.com/marceloadsj/dashboard-test/blob/master/src/contexts/SocketProvider.js)
   This is our global socket.io instance Provider, so we can add events and listeners to any page or component only injecting using useContext (or useSocket, hook already created). If we go for more than one instance of the socket.io, we can implement a multiple approach here on that component.

3. [Domains](https://github.com/marceloadsj/dashboard-test/tree/master/src/domains)
   I used a Domain Driven Design approach to separate each big part of the application. Currently, we have only a few components, so we can handle easily inside that folder.
   As the project grows, would be good to have something like Feature Folders inside each domain, isolating specific features, and sharing reusable components.

4. [User Store](https://github.com/marceloadsj/dashboard-test/blob/master/src/domains/user/useUserStore.js)
   That's our User Store, holding all logged user data and actions to trigger on components. I just created that store thinking on logged user data, but we can split between logged user and other users data stores, to consume and edit users inside the dashboard. You can see that we are using a encryption package to hash the user token and store it inside local storage. Currently, the token never expires, but we can have a short term token and, that encryption layer can delay any attack.

5. [Charts](https://github.com/marceloadsj/dashboard-test/blob/master/src/domains/dashboard/ChartPage.js)
   I actually created two different charts, one following the stats.json file, and other using random generated data. You can use the range picker on top to navigate between dates of the chart, but limited to a range of maximum 5 days, only to avoid huge process on client side. This can be improved with some kind of virtualization, only processing what's on the screen and, if the user scrolls the chart, render the other parts.

6. [List](https://github.com/marceloadsj/dashboard-test/blob/master/src/domains/dashboard/ListPage.js)
   The list page shows a table with the data from items.json. I created some functions and features like sorting, filtering and an input to search any data. It's a simple table with pagination on client side, but it can be improved loading the data partially from backend, everytime the user clicks to go to the next page.

7. [App](https://github.com/marceloadsj/dashboard-test/blob/master/src/App.js)
   All the main routes are being registered on the entry App component. It's okay for that size of application, but we can improve moving the registration inside the domains folder, so each domain can register their own pages. We can improve even more splitting the bundle, maybe per route, so the client don't need to download the whole js bundle when entering the app, only when navigating to each page.

#### Tests

I created some tests for the biggest and most critical components, like the pages and the entry points. They are rendering tests, looking to see if the component renders properly on the screen and track the data-testid attribute.

#### Backend

The backend informations can be found in the link bellow. I've used a simple approach on the backend, using a simple in memory storage to focus on the frontend features.

**Both applications (frontend and backend) are running on Heroku. It's important to notice that Heroku stops the instance after 30 minutes of inactivity, so we lose all in memory data on that moment, like user registrations.**

Repository:
[https://github.com/marceloadsj/dashboard-test-backend](https://github.com/marceloadsj/dashboard-test-backend)
