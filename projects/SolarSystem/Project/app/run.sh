clear
TS_BIN_PATH="./res/ts/"

echo ""
echo "compile TypeScript to JavaScript ..."
tsc --project src


echo "- completed -"
echo ""

#-----------------------------------------------------

./node_modules/.bin/electron .