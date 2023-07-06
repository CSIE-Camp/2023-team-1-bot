let entrance_fee = 5;
module.exports = {
    data: new SlashCommandBuilder().setName("dice").setDescription("hihiih"),
    async execute(client, interaction) {
        //讀取 players.json 並 parse 成 players
        const jsonDataIn = fs.readFileSync("player.json");
        let players = JSON.parse(jsonDataIn);
        //在所有資料中尋找呼叫此指令玩家的資料
        let found = 0;
        let ammount = 0;
        for (let i = 0; i < players.length; i++) {
            //如果有就修改該玩家的 money 並回覆結果
            if (players[i].id === interaction.user.id) {
                if (entrance_fee) players[i].money += entrance_fee;
                ammount = players[i].money;
                found = 1;
                let diceEmbed = new EmbedBuilder()
                    .setColor("#353535")
                    .setTitle(`入場費 ${entrance_fee}!`)
                    .setDescription(`You have ${ammount} now!`);
                interaction.reply({ embeds: [diceEmbed] });
                break;
            }
        }
        //如果沒有資料就創建一個新的並回覆結果
        if (!found) {
            newPlayer = { id: interaction.user.id, money: 50 - entrance_fee };
            ammount = newPlayer.money;
            players.push(newPlayer);
        }
        //stringify players 並存回 players.json
        const jsonDataOut = JSON.stringify(players);
        fs.writeFileSync("player.json", jsonDataOut);
        await interaction.reply(`add ${earnings} ammount : ${ammount}`);

        //
        //
        //
        //
        //
        //
        // game code............
        //
        //
        //
        //
        //
        //
        //
        //
        //

        let win = false;
        if ((win = true)) {
            let earnings = 5;
        }

        for (let i = 0; i < players.length; i++) {
            if (earnings) players[i].money += earnings;
            ammount = players[i].money;
            found = 1;
            let diceEmbed = new EmbedBuilder()
                .setColor("#353535")
                .setTitle(`You win ${earnings}!`)
                .setDescription(`You have ${ammount} now!`);
            interaction.reply({ embeds: [diceEmbed] });
            break;
        }
        //stringify players 並存回 players.json
        const jsonDataOut2 = JSON.stringify(players);
        fs.writeFileSync("player.json", jsonDataOut2);
        await interaction.reply(`add ${earnings} ammount : ${ammount}`);
    },
};
