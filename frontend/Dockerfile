# Stage 1: Build the React app
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
# --- FIX: Move the config copy here ---
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built files from the previous stage to Nginx's folder
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]