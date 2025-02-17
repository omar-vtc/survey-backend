FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project into the container
COPY . . 

# Set the default command to run the server
CMD ["node", "src/server.js"]
