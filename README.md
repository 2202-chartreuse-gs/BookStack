# BookStack
## _An Ebook Marketplace App_

BookStack is a full-stack E-Commerce site build in [Node.js](https://nodejs.org) and deployed on [Heroku](https://www.heroku.com). The app utilizes [Auth0 jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) for authentication and authorization. The frontend features a cart that persists locally for guests and cross-browser for logged in users. Backend models and api's allow for full order history and cart functionality. Through tables allow for quick access of past purchases and unpurchased items (cart), as well as REST APIs for updating items as needed. The database seed includes 125 unique items and 12 users.

[BookStack Live Link](https://bookstack-fs.herokuapp.com/)


<img src="https://raw.githubusercontent.com/justinduplain/BookStack/main/public/bookstack-logo.png" width="600">

## Tech

### Frontend
* [React.js](https://reactjs.org/)
* [Redux](https://redux.js.org)
* [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

### Backend
* [Sequelize](https://nextjs.org/)
* [Express](https://supabase.com)
* [Node.js](https://nodejs.org)
* [PostgreSQL](https://www.postgresql.org)
 
### Deployment and Auth
* [Heroku](https://www.heroku.com)
* [Auth0 jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

## Features

- [x] access a deployed version of the website so I can browse and purchase products.
- [x] view all available products so I can pick from a variety.
- [x] view a single product so I can see more details.
- [x] add a product to my cart so I can collect my desired products in one place.
- [ ] edit my cart if I change my mind:
  - [ ] change the quantity of a product in my cart.
  - [ ] remove a product in my cart.
  - [ ] No one else should be able to edit my cart except me._
- [x] "checkout" the items in my cart so I can purchase my desired goods.
  - [x] Starts with by simulating the experience of checking out with a simple confirmation page._
- [x] create an account so I can have a logged-in experience.

### As a logged-in customer, I want to be able to:

- [x] have a persistent cart so I can revisit and pick up where I left off.
  - [x] Logged-in-user across multiple devices: I'm logged in on my mobile device and add some items to my cart. When I open the browser on my laptop and log in, I want to see those items in my cart._
  - [x] No one else should be able to edit my cart except me._

### As an administrator, I want to be able to:

- [x] have validated data to ensure reliability.
  - [x] ie. each customer that creates an account should only be able to do so once with a single email address._
- [x] have full rights to make backend requests to ✅ add, ✅ edit, and ✅ remove products.
  - [x] No one else should have access.
- [x] view user information.
  - [x] No one else should have access.

### As an engineer, I want to:

- [x] have a well-seeded database so that I am able to simulate a number of different scenarios for the user stories below.
  - [x] By doing this, you really set yourselves up to tackle many of the points throughout the tiers. In the long run, this will save you, potentially, tons of time._
  - [x] For example, seed hundreds of products with dummy data so that when you get to the “pagination” user story, you won’t have to worry about adding more products.
 - [x] Likewise, add a bunch of users with products in their carts so editing the cart can be worked on without already having the “add to cart” functionality built out._
- [x] user data should be secure so that no one can unrightfully manipulate information.

