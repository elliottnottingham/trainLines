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

//YOUR CODE GOES HERE

class Line {
    constructor(color) {
        this.color = color;
        this.connections = [];
    }
    
    addConnections(lines) {
        this.connections.push(...lines);
    }
}

class Person {
    constructor(startingLine) {
        this.name = null;
        this.currentLine = startingLine
    }

    transferLines(line) {
        this.currentLine = line;
    }
}

let blue = new Line("blue");
let green = new Line("green");
let yellow = new Line("yellow");
let red = new Line("red");
let purple = new Line("purple");

blue.addConnections([green, red]);
green.addConnections([blue, yellow]);
yellow.addConnections([purple, green, red]);
red.addConnections([blue, yellow]);
purple.addConnections([yellow]);

let user = new Person(blue);

async function main() {
    console.log("Hello! Welcome to our subway!")
    user.name = await ask("What is your name? ");
    console.log(`Hello ${user.name}! You are on the ${user.currentLine.color} line.`)

    let destLine = undefined;
    do {
    const destination = await ask("Where would you like to go? ");
    destLine = user.currentLine.connections.find((line)=> line.color === destination);
        if (destLine === undefined) {
        console.log(`You can't go from ${user.currentLine.color} to ${destination}.`);
    }
    }while (destLine === undefined)

    user.transferLines(destLine);
    console.log(`You are now on the ${user.currentLine.color} line.`)
        process.exit();
    }

main();
