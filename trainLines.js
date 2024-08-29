//setting up async/await ask functionality for the command line
const readline = require("readline");
const readlineInterface = readline.createInterface(
    process.stdin,
    process.stdout
);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        readlineInterface.question(questionText, resolve);
    });
}