export const Command = {
    name: "ping",
    description: "ping command",
    run: async (client, interaction) => {
        await interaction.reply("pong")
    }
}