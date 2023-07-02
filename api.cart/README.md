## Description

>- Provides endpoints to manipulate the cart;
>- Listen the product.created topic from api.product to get new products;
>- Has its own postgres database to store and control cart data.

## Installation
> Install the dependencies with the following command:
> ```
> npm install
> ```

## Run
> Before you run the application:
> - Create a .env file and provide the environment values, by startcopying the .env.example;
> - Run database migrations to create the database structure by:
>> ```
>> npm run typeorm:up
>> ```
> 
> After provide the environments values and create the database structure, just start the application with:
> ```
> npm run start
>
> or
>
> npm run start:dev
> ```
> 
> By default the application will start on ```http://localhost:3002``` and the swagger on ```http://localhost:3002/docs```
