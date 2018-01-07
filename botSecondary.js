const Discord = require('discord.js');
const bot = new Discord.Client();
var auth = require('./auth.json');
const ytdl = require('ytdl-core');

const token = auth.token;
var isReady = true;

bot.on('message', (message) => {
	switch(message.content) {
		case '$ping':
			message.channel.send('pong');
			break;

		case '$spaghet':
			if(isReady) {
				isReady = false;
				if(message.member.voiceChannel) {
					var channel = message.member.voiceChannel;

					channel.join().then(connection => {
						const dispatcher = connection.playFile('C:/Users/Michael/Desktop/Discord-Bot/Spaghet.mp3');
						dispatcher.on('end', end => {
							channel.leave();
						});
					}).catch(err => console.log(err));
				}
			}
			isReady = true;
			break;

		case '$oof':
		if(isReady) {
			isReady = false;
			if(message.member.voiceChannel) {
				var channel = message.member.voiceChannel;

				channel.join().then(connection => {
					const dispatcher = connection.playFile('C:/Users/Michael/Desktop/Discord-Bot/Oof.mp3');
					dispatcher.on('end', end => {
						channel.leave();
					});
				}).catch(err => console.log(err));
			}
		}
		isReady = true;
		break;

		case '$drums':
		if(isReady) {
			isReady = false;
			const streamOptions = { seek: 0, volume: 1 };
			const broadcast = bot.createVoiceBroadcast();

				message.member.voiceChannel.join().then(connection => {
    		const stream = ytdl('https://www.youtube.com/watch?v=GV2Lw3oBxfI', { filter : 'audioonly' });
    		broadcast.playStream(stream);
    		const dispatcher = connection.playBroadcast(broadcast);
				dispatcher.on('end', end => {
					message.member.voiceChannel.leave();
				});
  				}).catch(console.error);
		}
		isReady = true;
		break;
	}

});
bot.login(token);
