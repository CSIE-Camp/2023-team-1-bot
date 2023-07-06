const {
    SlashCommandBuilder,
    Client,
    EmbedBuilder,
    ActionRow,
    ButtonBuilder,
    ActionRowBuilder,
} = require("discord.js");
const { ButtonStyle } = require("discord.js");
// discord.js/typings
module.exports = {
    data: new SlashCommandBuilder().setName("memory2").setDescription("玩一個記憶卡牌遊戲"),
    async execute(client, interaction) {
        let user_name = interaction.user.username;
        const embed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("來猜牌!")
            .setDescription("目前玩家:${user_name}\n" + `你已經翻了:`)
            .setTimestamp();
        interaction.reply({ embeds: [embed] });
        console.log(user_name);
    },
};

// function shuffleArray(array) {
//     let currentIndex = array.length,
//         temporaryValue,
//         randomIndex;

//     // While there remain elements to shuffle...
//     while (1 !== currentIndex) {
//         // Pick a remaining element...
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;

//         // And swap it with the current element.
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }

//     return array;
// }
