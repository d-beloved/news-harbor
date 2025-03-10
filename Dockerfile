FROM node:20-alpine

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy all files
COPY . .

# Run tests before building
RUN pnpm test

# Expose the correct preview port
EXPOSE 4173

# Build and start in the same layer
CMD ["sh" ,"-c", "pnpm build && pnpm preview --host --port 4173"]