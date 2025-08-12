// filepath: c:\Users\ramin\Desktop\blog-server-nodejs-ts\src\main.ts
const chalk = require('chalk');

const logger = (name: string) => {
    console.log(`سلام ${chalk.blue(name)}`);
}

module.exports = { logger };