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
    data: new SlashCommandBuilder().setName("engineer").setDescription("Earn money with engineer!"),
    /**
     *
     * @param {Client} client
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(client, interaction) {
        //建立 embed 和剪刀石頭布的三個 button
        const buttonEmbed = new EmbedBuilder().setColor("#5865F2").setTitle(`來玩工程師拳！`);

        const bugButton = new ButtonBuilder()
            .setCustomId("bug")
            .setLabel("煩惱")
            .setStyle(ButtonStyle.Primary);

        const drinkButton = new ButtonBuilder()
            .setCustomId("drink")
            .setLabel("喝快樂水")
            .setStyle(ButtonStyle.Primary);

        const bumpButton = new ButtonBuilder()
            .setCustomId("bump")
            .setLabel("爆肝")
            .setStyle(ButtonStyle.Primary);

        const codeButton = new ButtonBuilder()
            .setCustomId("code")
            .setLabel("打code")
            .setStyle(ButtonStyle.Primary);

        //將三個 button 都放入 row 中並回覆 embed 和 row
        //你要做的事很像 row = build row ( components = buttonScissors , buttonRock , buttonPaper )
        //TODO 2: buttonRow 等於什麼呢？
        //const buttonRow = ...

        const buttonRow = new ActionRowBuilder().addComponents(
            bugButton,
            drinkButton,
            bumpButton,
            codeButton,
        );

        interaction.reply({ embeds: [buttonEmbed], components: [buttonRow] });

        //建立 collector
        const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });

        //等待 collector 蒐集到玩家案的按鈕
        collector.on("collect", async (collected) => {
            //電腦隨機出拳
            //0 is scissors, 1 is rock, 2 is paper
            const computerChoice = Math.floor(Math.random() * 4);

            //利用玩家所按按鈕的 customId 來判斷玩家的選擇
            let playerChoice;
            //TODO 3: Do the same thing in rock and paper

            if (collected.customId === "code") {
                playerChoice = 0;
            } else if (collected.customId === "bump") {
                playerChoice = 1;
            } else if (collected.customId === "drink") {
                playerChoice = 2;
            } else if (collected.customId === "bug") {
                playerChoice = 3;
            }

            //判斷玩家勝利，電腦勝利或平手
            let winner;
            // 利用let turn = turn*-1
            //偵測是第幾次用turn -1或1確定
            if (turn == -1) {
                switch (playerChoice) {
                    case 0:
                        switch (computerChoice) {
                            case 0:
                                winner = -1;
                                break;
                            default:
                                break;
                        }
                        break;
                    case 1:
                        switch (computerChoice) {
                            case 1:
                                winner = -1;
                                break;
                            default:
                                break;
                        }
                        break;
                    case 2:
                        switch (computerChoice) {
                            case 2:
                                winner = -1;
                                break;
                            default:
                                break;
                        }
                        break;
                    case 3:
                        switch (computerChoice) {
                            case 3:
                                winner = -1;
                                break;
                            default:
                                break;
                        }
                }
            } else if (turn == 1) {
                switch (computerChoice) {
                    case 0:
                        switch (playerChoice) {
                            case 0:
                                winner = 1;
                                break;
                            default:
                                break;
                        }
                        break;
                    case 1:
                        switch (playerChoice) {
                            case 1:
                                winner = 1;
                                break;
                            default:
                                break;
                        }
                        break;
                    case 2:
                        switch (playerChoice) {
                            case 2:
                                winner = 1;
                                break;
                            default:
                                break;
                        }
                        break;
                    case 3:
                        switch (playerChoice) {
                            case 3:
                                winner = 1;
                                break;
                            default:
                                break;
                        }
                }
            }
            // for迴圈記得判斷winner=1or-1要break

            //從結果計算獲得/失去的 money
            //let earnings = false;
            //switch (winner) {
            //case 0:
            //earnings = 10
            //  break;
            //case 1:
            //    earnings = 0;
            //      break;
            //}

            //讀取 player.json 並 parse 成 players
            //const data = fs.readFileSync("player.json");
            //const players = JSON.parse(data);

            //在所有資料中尋找呼叫此指令玩家的資料
            //let found = false;
            //for (let j = 0; j < players.length; j++) {
            //如果有就修改該玩家的 money 並回覆結果
            //if (players[j].id == interaction.user.id) {
            // found = true;
            //players[j].money += earnings;
            //const resultEmbed = new EmbedBuilder()
            //  .setColor("#5865F2")
            //.setTitle("剪刀石頭布！")
            //.setDescription(`結果：${earnings}元\n你現在有 ${players[j].money} 元!`);
            //collected.update({ embeds: [resultEmbed], components: [] });
            //break;
            //}
            //}

            //如果沒有資料就創建一個新的並回覆結果
            //if (found == false) {
            //players.push({ id: interaction.user.id, money: 500 });
            //const resultEmbed = new EmbedBuilder()
            //.setColor("#5865F2")
            //  .setTitle("剪刀石頭布！")
            //    .setDescription(`結果：${earnings}元\n你現在有 ${500 + earnings} 元!`);
            //  collected.update({ embeds: [resultEmbed], components: [] });
            //}

            //stringify players 並存回 player.json
            //const json = JSON.stringify(players);
            //fs.writeFileSync("player.json", json);

            //關閉 collector
            //collector.stop();
        });
    },
};
