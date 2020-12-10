# EZ-Dine

> EZ Dine is a simple web application for in-restaurant ordering to reduce wait staff cost and streamline the overall restaurant service. It was inspired by Nico's dad, who owned a restaurant for over 20 years and constantly vented his frustrations. He didn't think it made sense to have servers, especially considering they make so much money, get to pocket the entirety of the tip, and constantly make mistakes when attending to customers. Nico's dad thought it would make a lot more sense to have an application where people could enjoy their meal without having to deal with going through a server to obtain their food, other necessities, or the paycheck. Our version of EZ Dine obviously isn't what the full version would look like, but gives a good outlook as to what the full version would expect to be like.

### Team Members and Roles
Nicolas Beard - Backend (Rest API’s)
Jackson Aguas - Backend (Rest APIs)
Griffin Reichert - Frontend (React)
Elliot Scribner - Fullstack Developer 
Blake Wilkey - Fullstack Developer

## Quick Start

``` bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

### API's
There are three API routes: customers, employees, and menu. Every route supports some form of get, post, put, and delete depending on the necessities of the route. The corresponding routes are defined at the top of each javascript file containing the routes, but are /customers, /employees, and /menu for customers, employees, and the menu respectively. The routes build on the route URL's for different API requests.

### Authentication

### Components

### Database
- This project uses mongodb, but for simplicity (and to avoid unnecesary test data generation), we've included our `.env` file so it should connect to the instance we've already populated
- /customers                  -  routes for handling requests for all customer users
- /customers/...              -  routes for handling requests for a unique customer user
- /customers/.../orders       -  routes for handling requests for a unique customer users orders
- /customers/.../orders/...   -  routes for handling requests for a unique customer users unique order
- /employees                  -  routes for handling requests for employee users
- /customers/...              -  routes for handling requests for a unique employee user
- /customers/.../orders       -  routes for handling requests for a unique employee users orders
- /menu                       -  routes for handling requests for menu

### Deployment


## App Info
### Version

1.0.0

### License

This project is licensed under the MIT License
