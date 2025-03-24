# Base image
FROM node:18 AS build

# Set working directory
WORKDIR /recodepush-web

# Copy package.json and package-lock.json
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the recodepush-web
ARG VITE_APP_API_ENDPOINT

ENV VITE_APP_API_ENDPOINT=$VITE_APP_API_ENDPOINT

RUN npm run build

# Stage 2: Serve recodepush-web with Nginx
FROM nginx:alpine

# Copy build from the previous stage
COPY --from=build /recodepush-web/dist /usr/share/nginx/html

# Copy NGINX configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
