# EZ-Dine

> EZ Dine is a simple web application for in-restaurant ordering to reduce wait staff cost and streamline the overall restaurant service. It was inspired by Nico's dad, who owned a restaurant for over 20 years and constantly vented his frustrations. He didn't think it made sense to have servers, especially considering they make so much money, get to pocket the entirety of the tip, and constantly make mistakes when attending to customers. Nico's dad thought it would make a lot more sense to have an application where people could enjoy their meal without having to deal with going through a server to obtain their food, other necessities, or the paycheck. Our version of EZ Dine obviously isn't what the full version would look like, but gives a good outlook as to what the full version would expect to be like.

### Team Members and Roles
- Nicolas Beard - Backend (Rest API’s)
- Jackson Aguas - Backend (Rest APIs)
- Griffin Reichert - Frontend (React)
- Elliot Scribner - Fullstack Developer 
- Blake Wilkey - Fullstack Developer

## Quick Start/Setup Guide

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

## Details

### API's
There are three API routes: customers, employees, and menu. Every route supports some form of get, post, put, and delete depending on the necessities of the route. The corresponding routes are defined at the top of each javascript file containing the routes, but are /customers, /employees, and /menu for customers, employees, and the menu respectively. The routes build on the route URL's for different API requests.

### Authentication
- We used Okta's authentication platform to ensure secure, manageable registration and login
- Details regarding the Okta credentials can be found in app.config.js
- The `<SecureRoute>` components in App.js ensure any protected pages are not accessible to non-authenticated users
- Okta's dashboard allows us to easily observe and manage all auth-related events within EZ-Dine
- Passwords must be of a certain complexity in order to register
- We also store each user's (customer and employee) record in mongo so we can manage their orders and other information about them. This will occasionally lead to inconsistency issues when Okta rejects a user's registration but it has already been written to mongo (for example, on the basis that the password is not strong enough).
- Okta also manages our two user groups: Customers and Employees, and uses specific group rules to assign each within their system.
- Okta provides us with the user's type, which we then use to selectively render components based on what that user needs to see
    - Customers see a menu and orders menu button that they can use to select menu items, modify any special requests, and "check out"
    - Employees just see a current orders0 menu button, which takes them to the Point of Sale/Kitchen view that employees would typically use while preparing different foods 

### Components
**HomePage** - The home page simply displays "Welcome to EZ Dine" with a gourmet dinner picture below as a simple introduction to the application.

**Menu** - The menu page uses our api route for /menu to pull all the current menu items. As soon as a customer adds a menu item to their order, it triggers an API request that posts that menu item to their orders subcollection, which can then be viewed in the Orders tab from the navigation bar.

**Order** - The Order tab displays all the current orders for the corresponding customer, adding up all the prices for a grand total at the bottom. Customers can remove individual orders and checkout once they're satisfied with their order. Removing individual orders triggers an API request to just delete that particular menu item from the customer's order subcollection while checking out removes all orders from their orders subcollection and sends them through a PUT request to the kitchen with the new status of "in progress."

**Register** - The register component allows both types of users to register. Customers register by filling out the form normally, while Employees can register by clicking the icon on the top right corner of the form container to reveal a field for an 'employee code'. The employee code is currently set to accept 'iamanemployee' (not case-sensitive). 

**Login** - How users who already have accounts can login (both Customers and Employees).

### Deployment
- This project is set up with integrated heroku deployment
- To trigger a deploy, simply merge a pull request into branch `heroku`
- Heroku will then build the app for the production environment, such that both the backend server and front-end react SPA can be hosted from the same dyno

### Database
- This project uses mongodb, but for simplicity (and to avoid unnecessary test data generation), we've included our `.env` file so it should connect to the instance we've already populated

### Live Application Link
https://agile-dusk-39199.herokuapp.com/

## App Info
### Version

1.0.0

### License

This project is licensed under the MIT License
