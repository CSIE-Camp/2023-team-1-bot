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
        var Column1 = new ButtonBuilder()
            .setCustomId("1")
            .setStyle(ButtonStyle.Primary)
            .setLabel("戳我");
        var Column2 = new ButtonBuilder()
            .setCustomId("2")
            .setStyle(ButtonStyle.Primary)
            .setLabel("戳我");
        var Column3 = new ButtonBuilder()
            .setCustomId("3")
            .setStyle(ButtonStyle.Primary)
            .setLabel("戳我");
        var Column4 = new ButtonBuilder()
            .setCustomId("4")
            .setStyle(ButtonStyle.Primary)
            .setLabel("戳我");
        var Column5 = new ButtonBuilder()
            .setCustomId("5")
            .setStyle(ButtonStyle.Primary)
            .setLabel("戳我");
        var Column6 = new ButtonBuilder()
            .setCustomId("6")
            .setStyle(ButtonStyle.Primary)
            .setLabel("戳我");
        var Column7 = new ButtonBuilder()
            .setCustomId("7")
            .setStyle(ButtonStyle.Primary)
            .setLabel("戳我");
        var Column8 = new ButtonBuilder()
            .setCustomId("8")
            .setStyle(ButtonStyle.Primary)
            .setLabel("戳我");
        var Column9 = new ButtonBuilder()
            .setCustomId("9")
            .setStyle(ButtonStyle.Primary)
            .setLabel("戳我");

        var buttonRow1 = new ActionRowBuilder().addComponents(Column1, Column2, Column3);
        var buttonRow2 = new ActionRowBuilder().addComponents(Column4, Column5, Column6);
        var buttonRow3 = new ActionRowBuilder().addComponents(Column7, Column8, Column9);
        interaction.reply({
            components: [buttonRow1, buttonRow2, buttonRow3],
        });
        const collector = interaction.channel.createMessageComponentCollector({ time: 120000 });
        collector.on("collect", (collected) => {
            let Playerchoice;
            let Playerturn = false;
            if (collected.customId === "1") {
                Column1.setLabel("O").setDisabled(true);
                interaction.followUp({
                    components: [buttonRow1, buttonRow2, buttonRow3],
                });
                Playerchoice = 1;
            } else if (collected.customId === "2") {
                Column2.setLabel("O").setDisabled(true);
                interaction.followUp({
                    components: [buttonRow1, buttonRow2, buttonRow3],
                });
                Playerchoice = 2;
            } else if (collected.customId === "3") {
                Column3.setLabel("O").setDisabled(true);
                interaction.followUp({
                    components: [buttonRow1, buttonRow2, buttonRow3],
                });
                Playerchoice = 3;
            } else if (collected.customId === "4") {
                Column4.setLabel("O").setDisabled(true);
                interaction.followUp({
                    components: [buttonRow1, buttonRow2, buttonRow3],
                });
                Playerchoice = 4;
            } else if (collected.customId === "5") {
                Column5.setLabel("O").setDisabled(true);
                interaction.followUp({
                    components: [buttonRow1, buttonRow2, buttonRow3],
                });
                Playerchoice = 5;
            } else if (collected.customId === "6") {
                Column6.setLabel("O").setDisabled(true);
                interaction.followUp({
                    components: [buttonRow1, buttonRow2, buttonRow3],
                });
                Playerchoice = 6;
            } else if (collected.customId === "7") {
                Column7.setLabel("O").setDisabled(true);
                interaction.followUp({
                    components: [buttonRow1, buttonRow2, buttonRow3],
                });
                Playerchoice = 7;
            } else if (collected.customId === "8") {
                Column8.setLabel("O").setDisabled(true);
                interaction.followUp({
                    components: [buttonRow1, buttonRow2, buttonRow3],
                });
                Playerchoice = 8;
            } else {
                Column9.setLabel("O").setDisabled(true);
                interaction.followUp({
                    components: [buttonRow1, buttonRow2, buttonRow3],
                });
                Playerchoice = 9;
            }
            Playerturn = true;
            const precomputerChoice = new Array();
            var computerChoice = Math.floor(Math.random() * 9) + 1;
            do {
                computerChoice = Math.floor(Math.random() * 9) + 1;
            } while (computerChoice == Playerchoice && computerChoice == precomputerChoice);
            if (computerChoice == 1) {
                Column1.setLabel("X").setDisabled(true);
                interaction.followUp({
                    components: [buttonRow1, buttonRow2, buttonRow3],
                });
                precomputerChoice.push("1");
            } else if (computerChoice === "2") {
                Column2.setLabel("X").setDisabled(true);
                interaction.followUp({
                    components: [buttonRow1, buttonRow2, buttonRow3],
                });
                precomputerChoice.push("2");
            } else if (collected.customId === "3") {
                Column3.setLabel("X").setDisabled(true);
                interaction.followUp({
                    components: [buttonRow1, buttonRow2, buttonRow3],
                });
                precomputerChoice.push("3");
            } else if (collected.customId === "4") {
                Column4.setLabel("X").setDisabled(true);
                interaction.followUp({
                    components: [buttonRow1, buttonRow2, buttonRow3],
                });
                precomputerChoice.push("4");
            } else if (collected.customId === "5") {
                Column5.setLabel("X").setDisabled(true);
                interaction.followUp({
                    components: [buttonRow1, buttonRow2, buttonRow3],
                });
                precomputerChoice.push("6");
            } else if (collected.customId === "6") {
                Column6.setLabel("X").setDisabled(true);
                interaction.followUp({
                    components: [buttonRow1, buttonRow2, buttonRow3],
                });
                precomputerChoice.push("7");
            } else if (collected.customId === "7") {
                Column7.setLabel("X").setDisabled(true);
                interaction.followUp({
                    components: [buttonRow1, buttonRow2, buttonRow3],
                });
                precomputerChoice.push("8");
            } else if (collected.customId === "8") {
                Column8.setLabel("X").setDisabled(true);
                interaction.followUp({
                    components: [buttonRow1, buttonRow2, buttonRow3],
                });
                precomputerChoice.push("8");
            } else {
                Column9.setLabel("X").setDisabled(true);
                interaction.followUp({
                    components: [buttonRow1, buttonRow2, buttonRow3],
                });
                precomputerChoice.push("9");
            }
            Playerturn = false;
        });
    },
};
