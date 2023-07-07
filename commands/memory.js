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
    data: new SlashCommandBuilder().setName("memory").setDescription("玩一個記憶卡牌遊戲"),
    async execute(client, interaction) {
        //topic : generate the card and shuffle them
        const cardsType = ["🐶", "🐱", "🐭", "🐹", "🐰", "🐻", "🐼", "🐨", "🐯", "🦁"];
        const cards = [...Array(20).keys()];
        const cardsData = shuffleArray(cards);

        //topic : get the initial buttons
        const startRow = new Array();
        cardsData.forEach((element) => {
            const cardButton = new ButtonBuilder()
                .setCustomId(`${element}`)
                .setLabel("🂠")
                .setStyle("Secondary");
            startRow.push(cardButton);
        });
        console.log(...startRow);
        const startButtonRow = updateButtonRow(startRow);
        const startEmbed = new EmbedBuilder().setTitle("來猜牌").setColor("#ffff00");
        await interaction.reply({ embeds: [startEmbed], components: [...startButtonRow] });
        const collector = interaction.channel.createMessageComponentCollector({ time: 200000 });

        //topic : basic variable of the game
        let count = 2;
        let positionOne = -1;
        let positionTwo = -1;
        let turns = 0;
        let pairs = 0;
        collector.on("collect", async (collected) => {
            if (count === 0) {
                if (cardsData[positionOne] % 10 === cardsData[positionTwo] % 10) {
                    startRow[positionOne].setDisabled(true);
                    startRow[positionTwo].setDisabled(true);
                    pairs++;
                } else {
                    startRow[positionOne].setLabel("🂠");
                    startRow[positionTwo].setLabel("🂠");
                }
                count = 2;
                positionOne = -1;
                positionTwo = -1;
            }
            cardsData.forEach((card, i) => {
                if (Number(collected.customId) === card) {
                    if (positionOne < 0) positionOne = i;
                    else {
                        positionTwo = i;
                        turns++;
                    }
                    const type = card % 10;
                    startRow[i].setLabel(cardsType[type]);
                    count--;
                }
            });
            if (count === 0 && pairs === 9) {
                const endEmbed = new EmbedBuilder()
                    .setTitle("來猜牌")
                    .setColor("#ffff00")
                    .setDescription(`恭喜你在第 ${turns} 回合時完成配對挑戰！`);
                await interaction.followUp({ embeds: [endEmbed] });
                collector.stop();
            }
            const gameEmbed = new EmbedBuilder()
                .setTitle("來猜牌")
                .setColor("#ffff00")
                .addFields(
                    { name: "目前回合數", value: `${turns}`, inline: true },
                    { name: "成功猜對數", value: `${pairs}`, inline: true },
                );
            const ButtonRow = updateButtonRow(startRow);
            await collected.update({ embeds: [gameEmbed], components: [...ButtonRow] });
        });
    },
};
function updateButtonRow(array) {
    const ButtonRow = new Array();
    for (let i = 0; i < 4; i++) {
        const fiveRow = new Array();
        for (let j = 0; j < 5; j++) {
            fiveRow.push(array[i * 5 + j]);
        }
        const fiveActionRow = new ActionRowBuilder().addComponents(...fiveRow);
        ButtonRow.push(fiveActionRow);
    }
    return ButtonRow;
}

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
