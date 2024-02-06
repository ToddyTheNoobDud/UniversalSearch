// This code is still beign made, Bugs  and crashes will occur!
// Todo: Make 2 versions (1 for users and 1 for bot), Optimize the code, Make an error handler
// Done: Version for users, Versions for bots, Optimized Code (Extra: fixed some crashes)
// This code will only work in servers, Universal version will work on servers, dms, etc
import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";

export const Command = {
  name: "info",
  description: "info related stuff",
  options: [
    {
      name: "server_user",
      description: "Info about some user on a server (guild)",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "user",
          description: "User",
          type: ApplicationCommandOptionType.User,
          required: false,
        },
      ],
    },
    {
      name: "server_bot",
      description: "info about some bot on the server (guild)",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "bot",
          description: "Bot",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
      ],
    },
  ],
  //@ts-ignore
  run: async (client, interaction) => {
    const subcommand = interaction.options.getSubcommand();
    if (!interaction.inGuild()) {
      return await interaction.reply({
        content: "This command can only be used in guilds",
        ephemeral: true,
      });
    }
    if (subcommand === "server_user") {
      const user = interaction.options.getUser("user") || interaction.user;
      if (user.bot) {
        return await interaction.reply({
          content: "Please select a user, not a bot",
          ephemeral: true,
        });
      }

      const embed = new EmbedBuilder()
        .setColor("NotQuiteBlack")
        .setAuthor({
            name: user.username,
            iconURL: user.avatarURL({ dynamic: true, extension: 'png' })
        })
        .setFooter({
            text: 'made by mushroom0162',
            iconURL: client.user.avatarURL({ dynamic: true, extension: 'png' })
        })
        .addFields(
          { name: "Username", value: user.username, inline: true },
          {
            name: "Created At",
            value: user.createdAt.toDateString(),
            inline: true,
          },
          {
            name: "Flags",
            value: user.flags.toArray().join(", ") || "None",
            inline: true,
          },
          { name: "Id", value: user.id, inline: true },
          {
            name: "Is from System",
            value: user.system ? "Yes" : "No",
            inline: true,
          },
          {
            name: "Is verified",
            value: user.verified ? "Yes" : "No",
            inline: true,
          },
          {
            name: "Is a partial",
            value: user.partial ? "Yes" : "No",
            inline: true,
          },
          {
            name: "Avatar URL",
            value: `[Avatar URL](${user.avatarURL({
              dynamic: true,
              extension: "png",
            })})`,
            inline: true,
          },
          {
            name: "Banner URL",
            value: user.bannerURL({ dynamic: true, extension: "png" || "gif" })
              ? `[Banner](${user.bannerURL({
                  dynamic: true,
                  extension: "png" || "gif",
                })})`
              : "No URL",
            inline: true,
          }
        );

      await interaction.reply({ embeds: [embed] });
    } else if (subcommand === "server_bot") {
      const bot = interaction.options.getUser("bot");
      if (!bot.bot) {
        return await interaction.reply({
          content: "Please select a bot, not a user",
          ephemeral: true,
        });
      }

      const embed = new EmbedBuilder()
        .setColor("NotQuiteBlack")
        .setAuthor({
            name:  bot.username,
            iconURL:  bot.avatarURL({ dynamic: true, extension: "png" })
        }
        )
        .setFooter({
            text: "made by mushroom0162",
           iconURL: client.user.avatarURL({ dynamic: true, extension: "png" })
        })
        .addFields(
          { name: "Username", value: bot.username, inline: true },
          { name: "ID", value: bot.id, inline: true },
          { name: "Is System", value: bot.system ? "Yes" : "No", inline: true },
          {
            name: "Created At",
            value: bot.createdAt.toDateString(),
            inline: true,
          },
          {
            name: "Avatar URL",
            value: `[Avatar URL](${bot.avatarURL({
              dynamic: true,
              extension: "png",
            })})`,
            inline: true,
          },
          {
            name: "is a Partial",
            value: bot.partial ? "yes" : "no",
            inline: true,
          }
        );
      await interaction.reply({ embeds: [embed] });
    }
  },
};
