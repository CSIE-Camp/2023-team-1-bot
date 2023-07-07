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
        //topic : declare the button
        const type = ["🧑🏻‍💻 Coding", "🩸 爆肝", "🍾快樂水", "🐛 Debug"];
        const coding = new ButtonBuilder()
            .setCustomId("0")
            .setLabel("🧑🏻‍💻 Coding")
            .setStyle("Primary");
        const bump = new ButtonBuilder().setCustomId("1").setLabel("🩸 爆肝").setStyle("Primary");
        const coke = new ButtonBuilder().setCustomId("2").setLabel("🍾快樂水").setStyle("Primary");
        const debug = new ButtonBuilder().setCustomId("3").setLabel("🐛 Debug").setStyle("Primary");

        const buttonRow = new ActionRowBuilder().addComponents(coding, bump, coke, debug);
        const startEmbed = new EmbedBuilder()
            .setTitle("來玩工程師拳！")
            .setColor("#ffff00")
            .setDescription(
                "此遊戲會進行 5 個回合，當雙方皆出同樣的拳種時，就算一個回合結束\n首局由電腦先出拳",
            );
        const endEmbed = new EmbedBuilder().setTitle("工程師拳").setColor("#ffff00");
        await interaction.reply({ embeds: [startEmbed], components: [buttonRow] });

        const collector = interaction.channel.createMessageComponentCollector({ time: 120000 });
        let turn = 0;
        let winDis = 0;
        let computerFirst = false;
        collector.on("collect", async (collected) => {
            computerFirst = !computerFirst;
            if (winDis === 3) {
                endEmbed.setDescription("你贏了");
                collected.reply({ embeds: [endEmbed] });
                collector.stop();
            } else if (turn === 5) {
                endEmbed.setDescription("你輸了");
                collected.reply({ embeds: [endEmbed] });
                collector.stop();
            }
            let computerChoice = Math.floor(Math.random() * 4);
            if (Number(collected.customId) === computerChoice) {
                turn++;
                if (computerFirst) {
                    const overEmbed = new EmbedBuilder()
                        .setTitle("工程師拳")
                        .setColor("#ffff00")
                        .setDescription(`電腦出了 ${type[computerChoice]}, 你在這局輸了`)
                        .addFields({
                            name: "下面一位",
                            value: "換你出拳了",
                            inline: true,
                        });
                    collected.update({ embeds: [overEmbed] });
                } else {
                    const overEmbed = new EmbedBuilder()
                        .setTitle("工程師拳")
                        .setColor("#ffff00")
                        .setDescription(`電腦出了 ${type[computerChoice]}, 你在這局贏了`)
                        .addFields({
                            name: "下面一位",
                            value: "換電腦出拳了",
                            inline: true,
                        });
                    winDis++;
                    collected.update({ embeds: [overEmbed] });
                }
            } else {
                if (computerFirst) {
                    const gameEmbed = new EmbedBuilder()
                        .setTitle("工程師拳")
                        .setColor("#ffff00")
                        .addFields(
                            { name: "電腦出", value: `${type[computerChoice]}`, inline: true },
                            {
                                name: "你出了",
                                value: `${type[Number(collected.customId)]}`,
                                inline: true,
                            },
                            {
                                name: "下面一位",
                                value: "換你出拳了",
                                inline: true,
                            },
                        );
                    collected.update({ embeds: [gameEmbed] });
                } else {
                    const gameEmbed = new EmbedBuilder()
                        .setTitle("工程師拳")
                        .setColor("#ffff00")
                        .addFields(
                            { name: "電腦出", value: `${type[computerChoice]}`, inline: true },
                            {
                                name: "你出了",
                                value: `${type[Number(collected.customId)]}`,
                                inline: true,
                            },
                            {
                                name: "下面一位",
                                value: "換電腦出拳了",
                                inline: true,
                            },
                        );
                    collected.update({ embeds: [gameEmbed] });
                }
            }
        });
        // let tr = 1;
        // let winner = 0;
        // let turn = 0;
        // let remine;
        // remine = 5 - turn;
        // while (turn < 5) {
        //     tr *= -1;
        //     if (tr === -1) {
        //         console.log("現在是電腦的回合\n=======");
        //     } else if (tr === 1) {
        //         console.log("現在是你的回合\n=======");
        //     }
        //     let playerChoice = Number(
        //         prompt("玩家的選擇\n0 : 打code, 1 : 爆肝, 2 : 喝快樂水, 3 : debug\n=======\n"),
        //     );
        //     //電腦隨機出拳
        //     //0 is scissors, 1 is rock, 2 is paper
        //     const computerChoice = Math.floor(Math.random() * 4);

        //     //利用玩家所按按鈕的 customId 來判斷玩家的選擇
        //     //TODO 3: Do the same thing in rock and paper

        //     // if (customId == "code") {
        //     //     playerChoice = 0;
        //     // } else if (customId == "bump") {
        //     //     playerChoice = 1;
        //     // } else if (customId == "drink") {
        //     //     playerChoice = 2;
        //     // } else if (customId == "bug") {
        //     //     playerChoice = 3;
        //     // }
        //     //電腦拳種

        //     //判斷玩家勝利，電腦勝利或平手
        //     //computer first
        //     if (computerChoice === 0) {
        //         type = "打code";
        //     } else if (computerChoice === 1) {
        //         type = "爆肝";
        //     } else if (computerChoice === 2) {
        //         type = "喝快樂水";
        //     } else if (computerChoice === 3) {
        //         type = "debug";
        //     }
        //     if (tr === -1) {
        //         if (playerChoice === computerChoice) {
        //             console.log(`=======\n電腦出的拳是 ${type}\n=======`);
        //             turn++;
        //         } else {
        //             console.log(`=======\n電腦出的拳是 ${type}\n=======`);
        //             console.log(`剩下 ${remine}回合\n=======`);
        //             console.log(`你贏了 ${winner}回合\n=======`);
        //             continue;
        //         }
        //     } else if (tr === 1) {
        //         if (playerChoice === computerChoice) {
        //             console.log(`=======\n電腦出拳的是 ${type}\n=======`);
        //             winner++;
        //             turn++;
        //         } else {
        //             console.log(`=======\n電腦出的拳是 ${type}\n=======`);
        //             console.log(`剩下 ${remine}回合\n=======`);
        //             console.log(`你贏了 ${winner}回合\n=======`);
        //             continue;
        //         }
        //     }

        //     remine = 5 - turn;
        //     console.log(`你贏了 ${winner}回合\n=======`);
        //     console.log(`剩下 ${remine}回合\n=======`);
        // }
        // if (winner >= 3) {
        //     console.log("you win");
        // } else {
        //     console.log("you lose");
        // }
    },
};
