# graphql-api


## Project Setup

1. Unpack this zip file.
2. Navigate to the project directory.
3. Run `npm install` to install project dependencies.

## Database Setup

1. Ensure you have MongoDB installed and running locally.
2. Create a MongoDB database named `mydatabase`.
3. Ensure MongoDB is using the default connection URL (`127.0.0.1:27017`).

## Populating the Database

1. Run the following command to populate the database with dummy data:
   ```shell
   node util/dummyData.js
## JWT TOKEN
  1. To get your jwt token start the dev server, it will prompt the Token in console, use this token in util/RealTimeUserUpdates.js client

## Accessing GraphQL

1. After starting the development server using `npm run dev`, you can access GraphQL at [http://localhost:4000/graphql](http://localhost:4000/graphql).

## Example Queries

### Hello Query

Use this query to check if the server is running:

```graphql
query Hello {
  hello
}

query FindUser{
    users{
        id,
        name,
        email
    }
}
mutation CreateUser {
  createUser(name: "RandomName", email: "randomName@RandomMail.com") {
    id
    name
    email
  }
}
