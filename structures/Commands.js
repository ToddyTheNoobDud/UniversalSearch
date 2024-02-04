import { ApplicationCommandType, REST, Routes } from 'discord.js'
import { Filereader } from '../util/Filereader.js'
import { token, id } from '../../config.js'

export const CommandManager = async (client, rootPath) => {
    const AllFiles = await Filereader(`${rootPath}/src/commands`);
    const rest = new REST({ version: '10' }).setToken(token);
    const CommandsArray = [];

    if (AllFiles.length > 0) {
        const commandsPromises = AllFiles.map(async (CommandFile) => {
            const { Command } = await import(`file://${CommandFile}`) || {};
            if (Command && !Command.ignore && Command.name && Command.description) {
                client.slashCommands?.set(Command.name, Command);
                CommandsArray.push({
                    name: Command.name,
                    nsfw: Command.nsfw ?? false,
                    description: Command.description,
                    type: ApplicationCommandType.ChatInput,
                    options: Command.options ?? []
                });
            }
        });
        await Promise.all(commandsPromises);

        try {
            console.log('Started refreshing application (/) commands.');
            await rest.put(Routes.applicationCommands(id), { body: CommandsArray });
            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
        console.log('commands loaded');
    }
}