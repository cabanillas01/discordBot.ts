import { ICommand } from "wokcommands";

export default{
    category: 'Test',
    description: 'Replies Ping with Pong',

    slash: 'both',
    testOnly: true,

    callback: ({ message, interaction }) => {
        return 'Pong'
    },
} as ICommand