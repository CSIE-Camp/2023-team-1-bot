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
    data: new SlashCommandBuilder()
        .setName("tic")
        .setDescription("Easy game playing with computer"),
    /**
     *
     * @param {Client} client
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(client, interaction) {
        const Column1 = new ButtonBuilder()
            .setCustomId("1")
            .setStyle(ButtonStyle.Primary)
            .setLabel("戳我");
        const Column2 = new ButtonBuilder()
            .setCustomId("2")
            .setStyle(ButtonStyle.Primary)
            .setLabel("戳我");
        const Column3 = new ButtonBuilder()
            .setCustomId("3")
            .setStyle(ButtonStyle.Primary)
            .setLabel("戳我");
        const Column4 = new ButtonBuilder()
            .setCustomId("4")
            .setStyle(ButtonStyle.Primary)
            .setLabel("戳我");
        const Column5 = new ButtonBuilder()
            .setCustomId("5")
            .setStyle(ButtonStyle.Primary)
            .setLabel("戳我");
        const Column6 = new ButtonBuilder()
            .setCustomId("6")
            .setStyle(ButtonStyle.Primary)
            .setLabel("戳我");
        const Column7 = new ButtonBuilder()
            .setCustomId("7")
            .setStyle(ButtonStyle.Primary)
            .setLabel("戳我");
        const Column8 = new ButtonBuilder()
            .setCustomId("8")
            .setStyle(ButtonStyle.Primary)
            .setLabel("戳我");
        const Column9 = new ButtonBuilder()
            .setCustomId("9")
            .setStyle(ButtonStyle.Primary)
            .setLabel("戳我");
        const O = new ButtonBuilder()
            .setCustomId("O")
            .setStyle(ButtonStyle.Primary)
            .setLabel("O")
            .setDisabled(true);
        const X = new ButtonBuilder()
            .setCustomId("X")
            .setStyle(ButtonStyle.Primary)
            .setLabel("X")
            .setDisabled(true);

        var board = new Array();
        board[0] = Column1;
        board[1] = Column2;
        board[2] = Column3;
        board[3] = Column4;
        board[4] = Column5;
        board[5] = Column6;
        board[6] = Column7;
        board[7] = Column8;
        board[8] = Column9;

        const buttonRow1 = new ActionRowBuilder().addComponents(Column1, Column2, Column3);
        const buttonRow2 = new ActionRowBuilder().addComponents(Column4, Column5, Column6);
        const buttonRow3 = new ActionRowBuilder().addComponents(Column7, Column8, Column9);
        interaction.reply({
            components: [buttonRow1, buttonRow2, buttonRow3],
        });
        const collector = interaction.channel.createMessageComponentCollector({ time: 120000 });
        collector.on("collect", (collected) => {
            if (collected.customId === "1") {
                board[0] = O;
                const buttonRow1 = new ActionRowBuilder().addComponents(
                    board[0],
                    board[1],
                    board[2],
                );
                collected.update({ components: [buttonRow1, buttonRow2, buttonRow3] });
            } else if (collected.customId === "2") {
                board[1] = O;
                const buttonRow1 = new ActionRowBuilder().addComponents(
                    board[0],
                    board[1],
                    board[2],
                );
                collected.update({ components: [buttonRow1, buttonRow2, buttonRow3] });
            } else if (collected.customId === "3") {
                const buttonRow1 = new ActionRowBuilder().addComponents(
                    board[0],
                    board[1],
                    board[2],
                );
                collected.update({ components: [buttonRow1, buttonRow2, buttonRow3] });
            } else if (collected.customId === "4") {
                const buttonRow2 = new ActionRowBuilder().addComponents(O, Column5, Column6);
                collected.update({ components: [buttonRow1, buttonRow2, buttonRow3] });
            } else if (collected.customId === "5") {
                const buttonRow2 = new ActionRowBuilder().addComponents(Column4, O, Column6);
                collected.update({ components: [buttonRow1, buttonRow2, buttonRow3] });
            } else if (collected.customId === "6") {
                const buttonRow2 = new ActionRowBuilder().addComponents(Column4, Column5, O);
                collected.update({ components: [buttonRow1, buttonRow2, buttonRow3] });
            } else if (collected.customId === "7") {
                const buttonRow3 = new ActionRowBuilder().addComponents(O, Column8, Column9);
                collected.update({ components: [buttonRow1, buttonRow2, buttonRow3] });
            } else if (collected.customId === "8") {
                const buttonRow3 = new ActionRowBuilder().addComponents(Column7, O, Column9);
                collected.update({ components: [buttonRow1, buttonRow2, buttonRow3] });
            } else {
                const buttonRow3 = new ActionRowBuilder().addComponents(Column7, Column8, O);
                collected.update({ components: [buttonRow1, buttonRow2, buttonRow3] });
            }
        });
    },
};
