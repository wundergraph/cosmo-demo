#!/bin/bash

# Define the directories
DIRS=("subgraph-posts" "subgraph-users")

# Loop through each directory
for DIR in "${DIRS[@]}"; do
  echo "Entering $DIR..."
  cd "$DIR" || { echo "Failed to enter $DIR"; exit 1; }

  echo "Installing dependencies..."
  npm install

  echo "Starting development server..."
  npm run dev &

  echo "Returning to parent directory..."
  cd ..
done

echo "All subgraphs started!"
