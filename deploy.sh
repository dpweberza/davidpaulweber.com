#!/bin/bash

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

# Build the project.
hugo # if using a theme, replace by `hugo -t <yourtheme>`

# Push latest source code
git add -A
msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg" --no-verify
git push origin master

# Push compiled site
cd public
git add -A
git commit -m "$msg" --no-verify
git push origin master

# Come Back
cd ..
