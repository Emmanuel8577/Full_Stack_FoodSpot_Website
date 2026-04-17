# Use the official Node.js 22 image as the base
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (optimizes caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your backend code
COPY . .

# Expose the port your server runs on (from your code, it's 4000)
EXPOSE 4000

# Start the application
CMD ["npm", "start"]