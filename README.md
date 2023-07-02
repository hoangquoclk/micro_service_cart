<div align="center">
  <h1>Cart Microservice</h1>
</div>
<div>
  <strong>This project is using the microservice architecture, API gateway, message queue patterns, Docker, and built with Nests.js + typescript.</strong>
</div>

<div align="center">
  <sub>Built with :purple_heart: by
  <a href="https://www.linkedin.com/in/vinicius-spada-melo/">Vinicius Spada Melo</a>
</div>

## Requirements
The application can be run locally or in a docker container, the requirements for each setup are listed below.

> - **Node** with version equal or higher than 18 - [Node Donwload](https://nodejs.org/pt-br/download/)
> - **Npm** with version equal or higher than 9 - [Npm Download](https://www.npmjs.com/package/download)
> - **Git** with version equal or higher than 2.25.1 - [Git Donwload](https://git-scm.com/downloads)
> - **Docker** with version equal or higher than 20.10.21 - [Docker download](https://docs.docker.com/get-docker/)
> - **Docker-compose** with version equal or higher than 1.25.0 - [Docker compose download](https://docs.docker.com/compose/install/)

## How to run
- Docker:
>- At the project root, run the ```docker-compose up``` command;
>- The docker-compose.yml is configured to provide:
>>- Mongo DB image with replicaset;
>>- Two postgres database image;
>>- Kafka interface on ```http://localhost:8080/```;

- Application:
  > - [Api authentication](https://github.com/ViniciussMelo/cart-microservice/blob/master/api.authentication/README.md)
  > - [Api Gateway](https://github.com/ViniciussMelo/cart-microservice/blob/master/api.gateway/README.md)
  > - [Api cart](https://github.com/ViniciussMelo/cart-microservice/blob/master/api.cart/README.md)
  > - [Api Product](https://github.com/ViniciussMelo/cart-microservice/blob/master/api.product/README.md)

## Services

By now, the functional services are still decomposed into four core services. Each of them can be tested, built and deployed independently and has its own swagger documentation.

<div align="center">
  <img src="https://github.com/ViniciussMelo/cart-microservice/assets/25934151/af23206b-c692-4713-a08f-6643fd144dcd"/>
</div>

### [Api Authentication](https://github.com/ViniciussMelo/cart-microservice/tree/master/api.authentication)
- Provides several API for user authentication and authorization with JWT tokens;
- Provides endpoints for user registration, login, and token generation;
- Has its own postgres database to store and control users data.

| Method | Path                          | Description            |
|--------|-------------------------------|------------------------|
|GET     | /health                       | Get application health |
|GET     | /autehentication/refresh-token| Get new JWT token      |
|POST    | /user/register                | Create new user        |
|POST    | /user/login                   | Get user's JWT token   |
|DELETE  | /user/delete                  | Delete the current user|

### [Api Gateway](https://github.com/ViniciussMelo/cart-microservice/tree/master/api.gateway)
- Acts as a single entry point for client requests;
- Responsible for authenticate and unify the ```api.cart``` and ```api.product``` into one URL.

| Method | Path           | Description                                      |
|--------|----------------|--------------------------------------------------|
|POST    | /carts         | Call ```api.cart``` and add a item to a cart     |
|DELETE  | /carts/{id}    | Call ```api.cart``` and delete a item from a cart|
|GET     | /carts/{id}    | Call ```api.cart``` and get the cart by id       |
|POST    | /products      | Call ```api.product``` and create a new product  |
|GET     | /products      | Call ```api.product``` and get all products      |
|GET     | /products/{id} | Call ```api.product``` and get product by id     |
|GET     | /health        | Get application health                           |

### [Api Cart](https://github.com/ViniciussMelo/cart-microservice/tree/master/api.cart)
- Provides endpoints to manipulate the cart;
- Listen the ```product.created``` topic from ```api.product``` to get new products;
- Has its own postgres database to store and control cart data.

| Method | Path           | Description              |
|--------|----------------|--------------------------|
|POST    | /carts         | Add a item to a cart     |
|DELETE  | /carts/{id}    | Delete a item from a cart|
|GET     | /carts/{id}    | Get the cart by id       |

### [Api Product](https://github.com/ViniciussMelo/cart-microservice/tree/master/api.product)
- Provides endpoints to manipulate the products;
- Send the ```product.created``` event when a new product is created;
- Has its own mongoDB database to store and control product data.

| Method | Path           | Description           |
|--------|----------------|-----------------------|
|POST    | /products      | Create a new product  |
|GET     | /products      | Get all products      |
|GET     | /products/{id} | Get product by id     |

## IMPROVEMENTS
- Add 100% test coverage;
- Add more endpoints to the microservices;
- Remove duplicate files/features by creating an internal package and installing/sharing that package across projects that are using the same files/features.
