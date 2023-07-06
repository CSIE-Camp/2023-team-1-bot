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
//         let user_name = interaction.user.username;
//         const embed = new EmbedBuilder()
//             .setColor(0x0099ff)
//             .setTitle("來猜牌!")
//             .setDescription(`目前玩家:${user_name}\n` + `你已經翻了:`)
//             .setTimestamp();
//         interaction.reply({ embeds: [embed] });
//         const cardsData = ["🐶", "🐱", "🐭", "🐹", "🐰", "🐻", "🐼", "🐨", "🐯", "🦁"];
//         const cards = [...Array(20).keys()];
//         // let cardMap = new Array();
//         // let cardFlap = new Array(20);
//         function shuffleArray(array) {
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
//         const shuffleCards = shuffleArray(cards);
//         let cardMap = new Array();
//         let firstCard = 
//         let SecondCard = interaction.
//         let initialization
//         let counter = 0
//         for (let i = 0; i < 4; i++) {
//             let row = new ActionRowBuilder();
//             for (let j = 0; j < 5; j++) {
//                 let card = new ButtonBuilder()
//                     .setCustomId(shuffleCards[i * 5 + j].toString())
//                     .setEmoji(cardsData[shuffleCards[i * 5 + j] % 10])
//                     .setStyle("Primary");
//                 row.addComponents(card);
//             }
//             cardMap[i] = row;
//         }
//         interaction.reply({
//             embeds: [embed],
//             components: [...cardMap],
//         });
//         for(let i = 0; i < 11; i++){
//             if(firstCard === SecondCard){
//                 counter += 1
//             };
//             if(firstCard !== SecondCard){
//                 initialization
//             }
//             if(counter >= 10){
//             const win_embed = new EmbedBuilder()
//                 .setColor(0x0099ff)
//                 .setTitle("你贏了")
//                 .setDescription(`餘額:`)
//                 .setTimestamp();
//             interaction.reply({ embeds: [win_embed] });
//             }
//         }
//     },
let counter = 0
for (let i = 0; i < 11; i++) {
    let firstCard = prompt('first\n')
    let SecondCard = prompt('second\n')
    if (firstCard === SecondCard){
        counter += 1
        console.log(counter)
    };
    if(firstCard !== SecondCard){
        // initialization
    }
    if(counter >= 10){
        console.log('winer')
    }
}
};

function shuffleArray(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While there remain elements to shuffle...
    while (1 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
