import { ActivityType } from 'discord.js' 

export const Event = {
    name: 'ready',
    runOnce: true,

    run: async (client) => {
        client.user.setActivity('UniversalSearch 1.0.0', {
            // @ts-ignore
            type: ActivityType.Custom = 4
        })
        console.log(`logged in ${client.user.tag}`)
    }
}

