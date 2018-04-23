FROM node:9.11-alpine

# Create run user/group
RUN apk add --update shadow && \
    groupadd appuser && \
    useradd -r -g appuser appuser && \
    rm -rf /var/cache/apk/*

# Set source target
WORKDIR /src

# Build packages
ADD package*.json ./
RUN npm i

# Add all the other files
ADD . .

# Downgrade run privileges
USER appuser