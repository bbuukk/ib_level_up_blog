# Use Node.js runtime as the base image
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /app

# Copy the application code to the working directory
COPY . .

# Install dependencies using pnpm
RUN pnpm install

# Expose the port on which the server is running
EXPOSE 3000

# Start the server
CMD ["pnpm", "run", "dev"]