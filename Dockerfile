# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build your TypeScript code
RUN npm run build

# Expose the port that your application will run on
EXPOSE 4000

# Command to start your application
CMD [ "npm", "start" ]
