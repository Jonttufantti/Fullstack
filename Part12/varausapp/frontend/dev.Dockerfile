# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose frontend port
EXPOSE 3000

# Start the frontend
CMD ["npm", "start"]
