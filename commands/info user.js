// This code is still beign made, Bugs  and crashes will occur!
// Todo: Make 2 versions (1 for users and 1 for bot), Optimize the code, Make an error handler
// Done: Version for users, Versions for bots, Optimized Code, Crash handler [Beta] (Extra: fixed some crashes)
// This code will only work in servers, Universal version will work on servers, dms, etc
import {
  ApplicationCommandOptionType,
  EmbedBuilder,
} from "discord.js";

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
    try {
      const subcommand = interaction.options.getSubcommand();
      if (subcommand === "server_user") {
        const user = interaction.options.getUser("user") || interaction.user;
        if (user.bot === true) {
          return await interaction.reply({
            content: "Please select a user, not a bot",
            ephemeral: true,
          });
        }
        if (!interaction.inGuild()) {
          return await interaction.reply({
            content: "This command can only be used in guilds",
            ephemeral: true,
          });
        }
        const userCheck = interaction.guild.members.cache.get(user.id);
        if (!userCheck) {
          return await interaction.reply({
            content: "User not found on server",
            ephemeral: true,
          });
        }
        const flags = {
          ActiveDeveloper: "👨‍💻・Active Developer",
          BugHunterLevel1: "🐛・Discord Bug Hunter",
          BugHunterLevel2: "🐛・Discord Bug Hunter",
          CertifiedModerator: "👮‍♂️・Certified Moderator",
          HypeSquadOnlineHouse1: "🏠・House Bravery Member",
          HypeSquadOnlineHouse2: "🏠・House Brilliance Member",
          HypeSquadOnlineHouse3: "🏠・House Balance Member",
          HypeSquadEvents: "🏠・HypeSquad Events",
          PremiumEarlySupporter: "👑・Early Supporter",
          Partner: "👑・Partner",
          Staff: "👨‍💼・Discord Staff",
          TeamPseudoUser: "👨‍💼・Discord Team",
          VerifiedBot: "🤖・Verified Bot",
          VerifiedDeveloper: "👨‍💻・(early)Verified Bot Developer",
        };
        const userFlags = user.flags.toArray() || [];
        const createdatt = (user.createdTimestamp / 1000).toFixed(0);
        const joinedat = (user.joinedTimestamp / 1000).toFixed(0); //this code don't work, don't try using it, it will return NaN

        const embed = new EmbedBuilder()
          .setColor("Aqua")
          .setDescription(
            `
          **• Username: ** ${`\``}${user.username}${`\``}
                **• ID: ** ${`\``}${user.id}${`\``}
          **• Discriminator: ** ${`\``}${user.discriminator}${`\``}
          **• Avatar URL: ** [URL](${user.avatarURL({
            dynamic: true,
            extension: "png",
          })})
          **• Bot: ** ${user.bot ? "Yes" : "No"}
          **• Created At: ** <t:${createdatt}>
          **• Joined At: ** Still in development
          **• Flags: ** ${
            userFlags.length
              ? userFlags.map((flag) => flags[flag]).join(", ")
              : "None"
          }
          `
          )
          .setAuthor({
            name: `info about ${user.username}`,
            iconURL: user.avatarURL({ dynamic: true, extension: "png" }),
          })
          .setFooter({
            text: "made by mushroom0162",
            iconURL: client.user.avatarURL({ dynamic: true, extension: "png" }),
          });

        await interaction.reply({ embeds: [embed] });
      } else if (subcommand === "server_bot") {
        
        if (!interaction.inGuild()) {
          return await interaction.reply({
            content: "This command can only be used in guilds",
            ephemeral: true,
          });
        }
        const bot = interaction.options.getUser("bot");
        if (!bot.bot === true) {
          return await interaction.reply({
            content: "Please select a bot, not a user",
            ephemeral: true,
          });
        }
        const botCheck = interaction.guild.members.cache.get(bot.id);
        if (!botCheck) {
          return await interaction.reply({
            content: "Bot not found on server",
            ephemeral: true,
          });
        }
        const createdatt = (bot.createdTimestamp / 1000).toFixed(0);
        const embed = new EmbedBuilder()
          .setColor("Aqua")
          .setAuthor({
            name: bot.username,
            iconURL: bot.avatarURL({ dynamic: true, extension: "png" }),
          })
          .setFooter({
            text: "made by mushroom0162",
            iconURL: client.user.avatarURL({ dynamic: true, extension: "png" }),
          }).setDescription(`
            **• Username: ** ${`\``}${bot.username}${`\``}
            **• ID: ** ${`\``}${bot.id}${`\``}
             **• Discriminator: ** ${`\``}${bot.discriminator}${`\``}
            **• Avatar URL: ** [URL](${bot.avatarURL({
              dynamic: true,
              extension: "png",
            })})
            **• Created At: ** <t:${createdatt}>
            **• Added At: ** Still in development
            **• Is System: ** ${bot.system ? "Yes" : "No"}
            **• Is Partial: ** ${bot.partial ? "yes" : "no"}
            `);
        await interaction.reply({ embeds: [embed] });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
