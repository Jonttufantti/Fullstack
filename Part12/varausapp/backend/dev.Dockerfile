# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose backend port
EXPOSE 3001

# Default command
CMD ["npm start"]
