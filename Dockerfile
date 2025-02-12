FROM node:18

# Set the working directory inside the container
WORKDIR /app  # Change from /src to /app to match the correct path

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . . 

# Set the default command to run the server
CMD ["node", "server.js"]
