const Logger = require("../log/logger")

const log = new Logger("Discord")

class Discord {
    constructor() {
        this.webhook

        // It's better that we pass all the info in a single json
        this.webhookQueue = [] 
    }

    async WebhookHandler(webhook, webhookData, queue) {
        // We have to check if there are some error with the params
        if (typeof webhook !== "string" || webhook === undefined || webhook === "") {
            throw new Error("Webhook is required, but it's not given!")
        }

        if (typeof webhookData !== "object" || webhookData === undefined) {
            throw new Error("Webhook data is required, but it's not given")
        }

        if (typeof queue !== "boolean" || queue === undefined) {
            throw new Error("Queue boolean is required, but it's missing!")
        }

        // Now we can proceed

        let tempJson = {
            webhook: webhook,
            webhookData: webhookData
        }

        if (queue === true) {
            // Queue steps
            this.webhookQueue.push(tempJson)
            return
        } else {
            // Send immediately the webhook
            let sent = false
            while (!sent) {
                let whResult = await this.SendWebhook(tempJson)

                switch (whResult) {
                    case "Webhook has been ratelimited!":
                        log.Warn("Error while sending the webhook! [Ratelimited]")
                        break
                    case "Webhook has been sent!":
                        log.Success("Webhook has been sent!")
                        sent = true
                        break
                    default:
                        log.Error(whResult)
                        break
                }
            }
        }
    }

    async CheckQueue() {
        while (true) {
            if (this.webhookQueue.length != 0) {
                let whResult = await this.SendWebhook(this.webhookQueue[0])
                switch (whResult) {
                    case "Webhook has been ratelimited!":
                        log.Warn("Error while sending the webhook! [Ratelimited]")
                        break
                    case "Webhook has been sent!":
                        log.Success("Webhook has been sent!")
                        await this.sleep(500) // You can add your custom delay here
                        break
                    default:
                        log.Error(whResult)
                        await this.sleep(500) // You can add your custom delay here
                        break
                }
            } else {
                await this.sleep(1000) // You can add your custom delay here
            }
        }
    }

    async SendWebhook(webhookInfo) {
        const params = {
            embeds: [webhookInfo.webhookData]
        };

        try {
            let response = await fetch(webhookInfo.webhook, {
                method: 'POST',
                headers: {
                    "referer": "https://discohook.org/",
                    "referrerPolicy": "strict-origin",
                    "accept": "application/json",
                    "accept-language": "en",
                    "content-type": "application/json",
                    "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"macOS\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "cross-site"
                },
                body: JSON.stringify(params)
            });

            let resStatus = response.status;

            switch (resStatus) {
                case 200:
                case 204:
                    return "Webhook has been sent!"
                case 429:
                    if (response.headers.has('retry-after')) {
                        let timeOut = parseInt(response.headers.get('retry-after'));
                        await this.sleep(timeOut); // We wait for the discord ratelimit delay
                        return "Webhook has been ratelimited!"
                    } else {
                        return "Webhook has been ratelimited!"
                    }
                default:
                    return `An error occured while sending the webhook: [${resStatus}]`
            }
        } catch (error) {
            return error.message
        }
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = Discord
