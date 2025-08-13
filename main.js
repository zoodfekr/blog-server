import chalk from 'chalk';
import os from 'os';
import fs from 'fs'; // این خط اضافه شود

export const logger = (name) => {
    console.log(`سلام تست ${chalk.blue(name)}`);
}

export const logMemoryUsage = () => {
    const formatMemory = (bytes) => (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB'
    // System Memory Info
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const memoryUsagePercent = ((usedMemory / totalMemory) * 100).toFixed(2);
    // Process Memory Info
    console.log(chalk.green('\nSystem Memory:'));
    console.log(`Total Memory: ${formatMemory(totalMemory)}`);
    console.log(`Used Memory: ${formatMemory(usedMemory)} (${memoryUsagePercent}%)`);
    console.log(`Free Memory: ${formatMemory(freeMemory)}`);
}

export const writeMemoryUsageToFile = (value) => {
    fs.writeFileSync('memory-usage.txt', value, (error) => {
        if (error) {
            console.error(chalk.red('Error writing memory usage to file:'), error);
        } else {
            console.log(chalk.green('Memory usage written to file successfully.'));
        }
    });
}