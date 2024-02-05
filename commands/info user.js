// This code is still beign made, Bugs  and crashes will occur!, Not optimized yet
// Todo: Make 2 versions (1 for users and 1 for bot), Optimize the code, Make an error handler
// This code will only work in servers, Universal version will work on servers, dms, etc
import discord from 'discord.js';

export const Command = {
    name: 'info',
    description: 'info related stuff',
    options: [
        {
            name: 'user_guild',
            description: 'Info about some user on a server (guild)',
            type: discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'user',
                    description: 'User',
                    type: discord.ApplicationCommandOptionType.User,
                    required: false
                }
            ]
        }
    ],
    //@ts-ignore
    run: async (client, interaction) => {
        const subcommand = interaction.options.getSubcommand();
        if (subcommand === 'user_guild') {
            if (interaction.inGuild() === false ) return await interaction.reply({ content: 'This command can only be used in guilds', ephemeral: true })
            const user = interaction.options.getUser('user')  || interaction.user || interaction.member?.user.id || interaction.member?.user.tag
            const embed = new discord.EmbedBuilder()
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
            //@ts-ignore
            .addFields([
                {
                    name: 'User ID',
                    value: user.id,
                    inline:true
                },
                {
                    name: 'Username',
                    value: user.username,
                    inline: true
                },
                {
                    name: 'Created At',
                    value: user.createdAt.toDateString(Date.UTC),
                    inline: true
                },
                {
                    name: 'is a bot',
                    value: user.bot ? 'Yes' : 'No',
                    inline: true
                },
                {
                    name: 'is system',
                    value: user.system ? 'Yes' : 'No',
                    inline: true
                }
            ])
            .setColor('Green')
        await interaction.reply({ embeds: [embed] })
        }
    }
}
