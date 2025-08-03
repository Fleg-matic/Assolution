# inscriptions/inscription-frontend/Dockerfile (Development)

FROM node:22-alpine

# Install Angular CLI globally
RUN npm install -g @angular/cli@19

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S angular -u 1001

# Change ownership of app directory
RUN chown -R angular:nodejs /app

# Switch to non-root user
USER angular

# Expose port
EXPOSE 4200

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:4200/ || exit 1

# Start development server
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--poll=2000"]