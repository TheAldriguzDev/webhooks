const chalk = require('chalk');

class Logger {

    constructor(location) {
        this.location = location
    }

    getFormattedTime() {
        // Formatted date, in this way we get prettyfied logs
        let now = new Date();
        let day = String(now.getDate()).padStart(2, '0');
        let hours = String(now.getHours()).padStart(2, '0');
        let minutes = String(now.getMinutes()).padStart(2, '0');
        
        return `[${day}:${hours}:${minutes}]`;
    }

    // General logs

    Success(message){
        console.log(chalk.green(`${this.getFormattedTime()} [${this.location}] ${message}`))
    }

    Error(message){
        console.log(chalk.red(`${this.getFormattedTime()} [${this.location}] ${message}`))
    }

    Warn(message){
        console.log(chalk.yellow(`${this.getFormattedTime()} [${this.location}] ${message}`))
    }

    Alert(message){
        console.log(chalk.magenta(`${this.getFormattedTime()} [${this.location}] ${message}`))
    }

    // Tasks logs

    TaskSuccess(message, id){
        console.log(chalk.green(`${this.getFormattedTime()} [${this.location}] [${id}] ${message}`))
    }

    TaskError(message, id){
        console.log(chalk.red(`${this.getFormattedTime()} [${this.location}] [${id}] ${message}`))
    }

    TaskWarn(message, id){
        console.log(chalk.yellow(`${this.getFormattedTime()} [${this.location}] [${id}] ${message}`))
    }

    TaskAlert(message, id){
        console.log(chalk.magenta(`${this.getFormattedTime()} [${this.location}] [${id}] ${message}`))
    }
}

module.exports = Logger;
