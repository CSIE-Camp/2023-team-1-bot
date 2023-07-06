const {
    SlashCommandBuilder,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    Client,
} = require("discord.js");
const fs = require("node:fs");
module.exports = {
    data: new SlashCommandBuilder().setName("test").setDescription("Play blackjack! (21 點)"),
    /**
     *
     * @param {Client} client
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     */
    async execute(client, interaction) {
        const collector = interaction.channel.createMessageComponentCollector({ time: 60000 });
        const confirm = new ButtonBuilder()
            .setCustomId("confirm")
            .setLabel("Confirm Ban")
            .setStyle(ButtonStyle.Danger);

        const cancel = new ButtonBuilder()
            .setCustomId("cancel")
            .setLabel("Cancel")
            .setStyle(ButtonStyle.Secondary);

        //topic : implementing the action row
        const testRow = new ActionRowBuilder().addComponents(confirm, cancel);
        await interaction.reply({ components: [testRow] });
        collector.on("collect", async (collected) => {
            const newRow = new ActionRowBuilder().addComponents(cancel);
            if (collected.customId === "confirm") {
                await collected.update({ components: [newRow] });
            }
        });
        collector.on("end", async (collected) => {
            console.log("the collect action is over");
        });
    },
};
