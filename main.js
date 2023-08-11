const Discord = require("./packages/discord/discord")

// We need to create the instance for the class
let discord = new Discord()

// Add your webhook here
let url = "YOUR_WEBHOOK_HERE"

// Complete your discord webhook payload as you prefer
let webhookPayload = {
    author: {
        name: "Test name",
        //icon_url: "URL_HERE",
        //url: "URL_HERE",
    },
    title: `Test was successful`,
    color: 16711935, // decimal color code
    //url: URL_HERE,
    timestamp: new Date().toISOString(),
    footer: {
        text: "Your_Name - 0.01",
    },
    fields: [
        // you can add other fields
        {
            name: "Test",
            value: "Success",
            inline: true,
        }
    ],
    //thumbnail: {
    //    url: URL_HERE,
    //},
}

// Case with queue logs
discord.CheckQueue()

for (let index = 0; index < 100; index++) {
    try {
        discord.WebhookHandler(url, webhookPayload, true)   
    } catch (error) {
        console.log(error)
    }
}

// Case without queue logs --> Remove discord.CheckQueue() from your code 
for (let index = 0; index < 100; index++) {
    try {
        discord.WebhookHandler(url, webhookPayload, false)   
    } catch (error) {
        console.log(error)
    }
}
