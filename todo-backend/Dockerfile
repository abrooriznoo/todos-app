# 1. Base image
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package.json & package-lock.json
COPY package*.json ./

# 4. Install dependencies
RUN npm install --omit=dev

# 5. Copy source code
COPY . .

# 6. Build NestJS app
RUN npm run build

# 7. Expose port
EXPOSE 3000

# 8. Start server
CMD ["node", "dist/main.js"]
