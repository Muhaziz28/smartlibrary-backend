import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

interface Message {
    chat: {
        id: number;
        type: string;
    };
}
@Injectable()
export class TelegramService implements OnModuleInit {

    bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

    onModuleInit() {
        this.bot.on(
            'message',
            this.onRecievedMessageHandler.bind(this) as
            (message: TelegramBot.Message, metadata: TelegramBot.Metadata) => void,
        );
    }

    async checkHasCorrectAccess(message: TelegramBot.Message) {
        console.log(message)
        if (message.chat.type == 'private') {
            await this.bot.sendMessage(message.chat.id, 'Maaf, bot ini hanya bisa digunakan di grup ⚠️');
            throw new Error('Anda tidak memiliki akses');
        }

        await this.bot.sendMessage(message.chat.id, 'Terima kasih, bot ini hanya bisa digunakan di grup ⚠️');
    }

    private async onRecievedMessageHandler(message: TelegramBot.Message, metadata: TelegramBot.Metadata) {
        try {
            await this.checkHasCorrectAccess(message);
        } catch (error) {
            await this.bot.sendMessage(message.chat.id, 'Maaf, bot ini hanya bisa digunakan di grup ⚠️');
        }

        const chatId = message.chat.id;
    }

    async sendAdminMessage(message: string) {
        // Gantilah 'adminChatId' dengan ID obrolan admin yang sesuai
        try {
            await this.bot.sendMessage(process.env.ID_ADMIN, message);
        } catch (error) {
            console.error('Gagal mengirim pesan ke admin:', error);
        }
    }
}
