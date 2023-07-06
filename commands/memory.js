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
        // //讀取 players.json 並 parse 成 players
        // const jsonDataIn = fs.readFileSync("player.json");
        // let players = JSON.parse(jsonDataIn);
        // //在所有資料中尋找呼叫此指令玩家的資料
        // let found = 0;
        // let ammount = 0;
        // for (let i = 0; i < players.length; i++) {
        //     //如果有就修改該玩家的 money 並回覆結果
        //     if (players[i].id === interaction.user.id) {
        //         if (earnings) players[i].money += earnings;
        //         ammount = players[i].money;
        //         found = 1;
        //         let diceEmbed = new EmbedBuilder()
        //             .setColor("#353535")
        //             .setTitle(`You win ${earnings}!`)
        //             .setDescription(`You have ${ammount} now!`);
        //         interaction.reply({ embeds: [diceEmbed] });
        //         break;
        //     }
        // }

        // //如果沒有資料就創建一個新的並回覆結果
        // if (!found) {
        //     newPlayer = { id: interaction.user.id, money: earnings };
        //     ammount = newPlayer.money;
        //     players.push(newPlayer);
        // }
        const cards = [
            "😪",
            "🤐",
            "😏",
            "😶",
            "🤔",
            "🤩",
            "🥰",
            "😍",
            "😎",
            "😋",
            "😅",
            "😃",
            "😂",
            "🤣",
            "😁",
            "😀",
        ];
        // const shuffledCards = shuffleArray(cards.concat(cards));
        // console.log(shuffleArray);
        // const buttons = shuffledCards.map((card) =>
        //     new ButtonBuilder().setCustomId(card).setLabel("翻轉").setStyle("Primary"),
        // );
        const button1 = new ButtonBuilder()
            .setCustomId(cards[0])
            .setLabel(cards[0])
            .setStyle("Primary");
        const button2 = new ButtonBuilder()
            .setCustomId(cards[1])
            .setLabel(cards[1])
            .setStyle("Primary");
        const button3 = new ButtonBuilder()
            .setCustomId(cards[2])
            .setLabel(cards[2])
            .setStyle("Primary");
        const button4 = new ButtonBuilder()
            .setCustomId(cards[3])
            .setLabel(cards[3])
            .setStyle("Primary");
        const button5 = new ButtonBuilder()
            .setCustomId(cards[4])
            .setLabel(cards[4])
            .setStyle("Primary");
        const button6 = new ButtonBuilder()
            .setCustomId(cards[5])
            .setLabel(cards[5])
            .setStyle("Primary");
        const button7 = new ButtonBuilder()
            .setCustomId(cards[6])
            .setLabel(cards[6])
            .setStyle("Primary");
        const button8 = new ButtonBuilder()
            .setCustomId(cards[7])
            .setLabel(cards[7])
            .setStyle("Primary");
        const button9 = new ButtonBuilder()
            .setCustomId(cards[8])
            .setLabel(cards[8])
            .setStyle("Primary");
        const button10 = new ButtonBuilder()
            .setCustomId(cards[9])
            .setLabel(cards[9])
            .setStyle("Primary");
        const button11 = new ButtonBuilder()
            .setCustomId(cards[10])
            .setLabel(cards[10])
            .setStyle("Primary");
        const button12 = new ButtonBuilder()
            .setCustomId(cards[11])
            .setLabel(cards[11])
            .setStyle("Primary");
        const button13 = new ButtonBuilder()
            .setCustomId(cards[12])
            .setLabel(cards[12])
            .setStyle("Primary");
        const button14 = new ButtonBuilder()
            .setCustomId(cards[13])
            .setLabel(cards[13])
            .setStyle("Primary");
        const button15 = new ButtonBuilder()
            .setCustomId(cards[14])
            .setLabel(cards[14])
            .setStyle("Primary");
        const button16 = new ButtonBuilder()
            .setCustomId(cards[15])
            .setLabel(cards[15])
            .setStyle("Primary");
        const button17 = new ButtonBuilder()
            .setCustomId(cards[16])
            .setLabel(cards[16])
            .setStyle("Primary");
        // console.log(...buttons);
        const row = new ActionRowBuilder().addComponents(button1, button2);
        const embed = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("記憶卡牌遊戲")
            .setDescription("透過翻轉卡牌來配對相同的卡牌。");

        interaction.reply({
            embeds: [embed],
            components: [row],
        });

        // const: ({ components } = undefined || {}),

        const user = interaction.user;
        const filter = (interaction) => interaction.user.id === user.id && interaction.isButton();

        const matchedCards = new Set();
        let flippedCards = [];

        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            time: 30000,
        });
        collector.on("collect", async (button) => {
            button.deferUpdate();

            if (flippedCards.length === 2) {
                await interaction.channel.send("一次只能翻轉兩張卡牌！");
                return;
            }

            if (matchedCards.has(button.customId)) {
                await interaction.channel.send("這張卡牌已經配對成功！");
                return;
            }

            flippedCards.push(button);

            if (flippedCards.length === 2) {
                const [card1, card2] = flippedCards;

                if (card1.customId === card2.customId) {
                    matchedCards.add(card1.customId);
                    flippedCards = [];
                    if (matchedCards.size === cards.length) {
                        await interaction.channel.send("恭喜！你已經成功配對所有的卡牌！");
                        let earnings = 2 + entrance_fee;
                        collector.stop();
                    }
                } else {
                    setTimeout(() => {
                        card1.setDisabled(true);
                        card2.setDisabled(true);
                        card1.setStyle("SECONDARY");
                        card2.setStyle("SECONDARY");
                        card1.setLabel("❌");
                        card2.setLabel("❌");
                        flippedCards = [];
                        interaction.channel.send("卡牌不相符。再試一次！");
                    }, 1000);
                }
            }
        });

        collector.on("end", () => {
            if (matchedCards.size < cards.length) {
                interaction.channel.send("時間到！遊戲結束。");
            }
        });

        // //在所有資料中尋找呼叫此指令玩家的資料
        // let found = 0;
        // let ammount = 0;
        // for (let i = 0; i < players.length; i++) {
        //     //如果有就修改該玩家的 money 並回覆結果
        //     if (players[i].id === interaction.user.id) {
        //         if (earnings) players[i].money += earnings;
        //         ammount = players[i].money;
        //         found = 1;
        //         let diceEmbed = new EmbedBuilder()
        //             .setColor("#353535")
        //             .setTitle(`You win ${earnings}!`)
        //             .setDescription(`You have ${ammount} now!`);
        //         interaction.reply({ embeds: [diceEmbed] });
        //         break;
        //     }
        // }

        // //如果沒有資料就創建一個新的並回覆結果
        // if (!found) {
        //     newPlayer = { id: interaction.user.id, money: earnings };
        //     ammount = newPlayer.money;
        //     players.push(newPlayer);
        // }
        // //stringify players 並存回 players.json
        // const jsonDataOut = JSON.stringify(players);
        // fs.writeFileSync("player.json", jsonDataOut);
        // await interaction.reply(`add ${earnings} ammount : ${ammount}`);
    },
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
