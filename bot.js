import { Client, GatewayIntentBits, Partials } from 'discord.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { CommandManager } from './src/structures/Commands.js'
import { EventManager } from './src/structures/Events.js'
import { token } from './config.js'

const __dirname = dirname(fileURLToPath(import.meta.url));
export const rootPath = __dirname;

const intents = GatewayIntentBits.Guilds |
    GatewayIntentBits.GuildMessages |
    GatewayIntentBits.GuildPresences |
    GatewayIntentBits.DirectMessages |
    GatewayIntentBits.MessageContent | 
    GatewayIntentBits.DirectMessageReactions |
    GatewayIntentBits.GuildMembers |
    GatewayIntentBits.GuildMessageReactions |
    GatewayIntentBits.GuildWebhooks |
    GatewayIntentBits.GuildVoiceStates |
    GatewayIntentBits.GuildInvites;

const client = new Client({
    intents: intents,
    partials: [Partials.Channel]
})

client.events = new Map()
client.slashCommands = new Map()

await Promise.all([
  EventManager(client, rootPath),
  CommandManager(client, rootPath),
  client.login(token)
]);