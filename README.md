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

* WIP...

##### Support Libraries:

- [Axios](https://github.com/axios/axios)
- [Secure-ls](https://softvar.github.io/secure-ls)
- WIP...

#### Backend

The backend informations can be found in the link bellow. I've used a simple approach on the backend, using a simple in memory storage to focus on the frontend features.

**Both applications (frontend and backend) are running on Heroku. It's important to notice that Heroku stops the instance after 30 minutes of inactivity, so we lose all in memory data on that moment, like user registrations.**

Repository:
[https://github.com/marceloadsj/dashboard-test-backend](https://github.com/marceloadsj/dashboard-test-backend)
