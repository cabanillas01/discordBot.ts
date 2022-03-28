import discordJS, { IntegrationApplication, Intents } from 'discord.js';
import WOKCommands from 'wokcommands';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const client = new discordJS.Client({
    intents: 32767
});

client.on('ready', () => {
    console.log('Bot is online');


    new WOKCommands(client,{
        commandsDir: path.join(__dirname, 'commands'),
        typeScript: true,
        testServers: ['938149387408920607'],
    })

    const guildId = '301728474404749312'
    const guild = client.guilds.cache.get(guildId)
    let commands



    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    commands?.create({

        name: 'ping',
        description: 'Replies pong',
    })

    commands?.create({
        name: 'add',
        description: 'Add two numbers',
        options: [
        {
            name: 'num1',
            description: 'First number',
            required: true,
            type: discordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: 'num2',
            description: 'Second number',
            required: true,
            type: discordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        }


        ]
    })


    client.on('interactionCreate', async (interaction) => {
        if(!interaction.isCommand()) {
            return
        }

        const { commandName, options } = interaction;

        if (commandName === 'ping') {
            interaction.reply({
             content: 'pong',
             //ephemeral: true, se deixar ephemeral true não fica visível para todos(TESTES)
            })
        } else if (commandName === 'add'){
            const num1 = options.getNumber('num1')!;
            const num2 = options.getNumber('num2')!;

            await interaction.deferReply({
               // ephemeral: true
            })

            await new Promise(resolve => setTimeout(resolve, 5000)) //ADICIONAR TEMPO DE RESPOSTA AO BOT

            await interaction.editReply({
                content: `The sum is ${num1 + num2}`,
            })

        }
    })


});

//Process to take the token to connect the bot
client.login(process.env.TOKEN);