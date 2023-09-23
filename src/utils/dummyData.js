// src/dummyData.js
const { MongoClient } = require('mongodb');

async function populateDummyData() {
  const uri = 'mongodb://127.0.0.1:27017'; // Use IPv4 address
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

    const database = client.db('mydatabase'); // Replace with your database name

    // Define your data
    const users = [
      { name: 'User 1', email: 'user1@example.com' },
      { name: 'User 2', email: 'user2@example.com' },
      // Add more data as needed
    ];

    // Insert data into a collection (e.g., 'users')
    await database.collection('users').insertMany(users);

    console.log('Dummy data inserted successfully.');
  } finally {
    await client.close();
  }
}

populateDummyData().catch(console.error);
