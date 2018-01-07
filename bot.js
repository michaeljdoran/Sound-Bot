const Discord = require('discord.js');
const bot = new Discord.Client();
var auth = require('./auth.json');
const ytdl = require('ytdl-core');

const token = auth.token;
var isReady = true;

bot.on('message', (message) => {
  if(message.content.startsWith('$') && isReady) {
    isReady = false;
    if(message.member.voiceChannel) {
      var channel = message.member.voiceChannel;

      channel.join().then(connection => {
        var sound = 'C:/Users/Michael/Desktop/Discord-Bot/Sounds/' + message.content.substring(1) + '.mp3';
        const dispatcher = connection.playFile(sound);
        dispatcher.on('end', end => {
          channel.leave();
        });
      }).catch(err => console.log(err));
    }
  }
  isReady = true;

});
bot.login(token);
