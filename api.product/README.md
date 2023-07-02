## Description

>- Provides endpoints to manipulate the products;
>- Send the product.created event when a new product is created;
>- Has its own mongoDB database to store and control product data.

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
>> npx prisma db push
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
> By default the application will start on ```http://localhost:3001``` and the swagger on ```http://localhost:3001/docs```
