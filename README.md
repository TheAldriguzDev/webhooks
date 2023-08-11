# Discord webhooks
The aim of this repo is help you to avoid or handle the discord webhooks ratelimit with two different modes: 
- With webhook queue
- Without webhook queue

## Installation
- git clone https://github.com/TheAldriguzDev/webhooks
- cd Path/to/the/folder
- npm install

## Usage
You can copy and paste the discord.js and logger.js code in your project and import there where you need and use them.
To import the packages you have to do like so:

```javascript
// For the logger:
const Logger = require("../log/logger")
let log = new Logger("Discord") // "Discord" is the location

// For discord webhooks:
const Discord = require("./packages/discord/discord")
let discord = new Discord()
```

## Example
To run this discord webhooks package you have the possibility to choose two modes:
- with queue
- without queue

### With queue:
```javascript
// ... Webhook info code

// Start checking the queue
discord.CheckQueue()

for (let index = 0; index < 100; index++) {
    try {
        discord.WebhookHandler(url, webhookPayload, true) // True means queue on
    } catch (error) {
        console.log(error)
    }
}
```

### Without queue:
```javascript
// ... Webhook info code

for (let index = 0; index < 100; index++) {
    try {
        discord.WebhookHandler(url, webhookPayload, false) // False means queue off
    } catch (error) {
        console.log(error)
    }
}
```

## Credits
This repo has been made by me, if you need support or you have any suggestion feel free to dm me on discord: aldriguz

If you found this repo useful, please leave a star!
