if [ -e "$DEPLOYMENT_TARGET/package.json" ]; then
  cd "$DEPLOYMENT_TARGET"
  eval $NPM_CMD rebuild node-sass
  exitWithMessageOnError "npm failed"
  cd - > /dev/null
fi