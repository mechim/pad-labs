#!/bin/bash
# get all directory names under `vynild`
directories=$(find vynild -maxdepth 1 -mindepth 1 -type d)

# generate descriptors for each directory
for directory in $directories; do
  # get the name of the directory
  name=$(basename $directory)
  # generate the descriptors
  pnpm exec buf build --path ./vynild/$name -o node/$name/descriptors.binpb
done