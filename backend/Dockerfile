# Use an official Node.js image as the base
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code to JavaScript
RUN npm run build

# Use a minimal Node.js image to run the application in production
FROM node:18-slim AS production

# Set the working directory inside the container
WORKDIR /app

# Copy only the built files and node_modules from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# Expose the port your application will run on
EXPOSE 3000

# Start the application in production mode
CMD ["node", "./dist/index.js"]
