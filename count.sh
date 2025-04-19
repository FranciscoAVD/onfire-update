#!/bin/bash

# # Set your target directory (current by default)
TARGET_DIR=${1:-.}

# File extensions to include (customize as needed)
EXTENSIONS=("ts" "tsx" "css")

# Directories to ignore
IGNORE_DIRS=("node_modules" ".git" "dist" ".next")

# Build the find command
FIND_CMD="find \"$TARGET_DIR\""
for dir in "${IGNORE_DIRS[@]}"; do
  FIND_CMD+=" -path \"$TARGET_DIR/$dir\" -prune -o"
done

# Add conditions for extensions
FIND_CMD+=" -type f \\("
for i in "${!EXTENSIONS[@]}"; do
  if [ $i -ne 0 ]; then FIND_CMD+=" -o"; fi
  FIND_CMD+=" -name \"*.${EXTENSIONS[$i]}\""
done
FIND_CMD+=" \\) -print"

# Execute and count lines
echo "Counting lines of code in: $TARGET_DIR"
eval $FIND_CMD | xargs wc -l | tail -n 1
