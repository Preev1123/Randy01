const Discord = require('discord.js');
const Util = require('discord.js');

const getYoutubeID = require('get-youtube-id');

const fetchVideoInfo = require('youtube-info');

const YouTube = require('simple-youtube-api');

const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");

const queue = new Map();

const ytdl = require('ytdl-core');

const fs = require('fs');

const gif = require("gif-search");

const client = new Discord.Client({disableEveryone: true});

const prefix = "M";
/////////////////////////
////////////////////////

client.on('disconnect', () => console.log('??? ?? ?????? ...'));
 
client.on('reconnecting', () => console.log('????? ?? ???? ..'));
 
client.on('message', async msg => { 
    if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(prefix)) return undefined;
    const args = msg.content.split(' ');
    const searchString = args.slice(1).join(' ');
    const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    const serverQueue = queue.get(msg.guild.id);
 
    if (msg.content.startsWith(`${prefix}play`)) {
        console.log(`${msg.author.tag} has been used the ${prefix}play command in ${msg.guild.name}`);
 
        const voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel) return msg.channel.send({embed: {
            color: 15158332,
            fields: [{
                name: "? ???",
                value: '??? ?? ???? ?? ??? ????'
              }
            ]
          }
        });
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has('CONNECT')) {
            return msg.channel.send({embed: {
                color: 15158332,
                fields: [{
                    name: "? ???",
                    value: '?? ???? ??? ???????? ????? ??? ????? '
                  }
                ]
              }
            });
        }
        if (!permissions.has('SPEAK')) {
            return msg.channel.send({embed: {
                color: 15158332,
                fields: [{
                    name: "? ???",
                    value: '?? ?????? ?????? ?? ??? ????? ???? ?? ?????? ????????? ????????'
                  }
                ]
              }
            });
        }
       
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                await handleVideo(video2, msg, voiceChannel, true) // eslint-disable-line no-await-in-loop
            }
            return msg.channel.send({embed: {
                color: 15158332,
                fields: [{
                    name: "? ??? ?????? ??? ????? ???????",
                    value: `????? ???????: **${playlist.title}** ??? ?????? `
                  }
                ]
              }
            });
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    let index = 0;
                    msg.channel.send({embed: {
                        color: 15158332,
                        fields: [{
                            name: "?? ?????? ???????",
                            value: `${videos.map(video2 => `\`${++index}\` **-** ${video2.title}`).join('\n')}`
                          },
                          {
                              name: "???? 10 ?????",
                              value: "??? ?? ????? ????? "
                          }
                        ]
                      }
                    })
                    try {
                        var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                            maxMatches: 1,
                            time: 10000,
                            errors: ['time']
                        });
                    } catch (err) {
                        console.error(err);
                        return msg.channel.send({embed: {
                            color: 15158332,
                            fields: [{
                                name: "? ???",
                                value: '?? ????? ???? ??? ????? .. ???? ????? ???????'
                              }
                            ]
                          }
                        })
                    }
                    const videoIndex = (response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    return msg.channel.send({embed: {
                        color: 15158332,
                        fields: [{
                            name: "? ???",
                            value: '?? ?????? ?????? ??? ????? ???? ????? '
                          }
                        ]
                      }
                    })
                }
            }
 
            return handleVideo(video, msg, voiceChannel);
        }
    } else if (msg.content.startsWith(`${prefix}skip`)) {
        console.log(`${msg.author.tag} has been used the ${prefix}skip command in ${msg.guild.name}`);
        if (!msg.member.voiceChannel) return msg.channel.send({embed: {
            color: 15158332,
            fields: [{
                name: "? ???",
                value: '??? ??? ?? ??? ????'
              }
            ]
          }
        })
        if (!serverQueue) return msg.channel.send({embed: {
            color: 15158332,
            fields: [{
                name: "? ???",
                value: '?? ???? ?? ??? ??????? ???? ?????'
              }
            ]
          }
        })
        serverQueue.connection.dispatcher.end();
        return undefined;
    } else if (msg.content.startsWith(`${prefix}stop`)) {
        console.log(`${msg.author.tag} has been used the ${prefix}stop command in ${msg.guild.name}`);
        if (!msg.member.voiceChannel) return msg.channel.send({embed: {
            color: 15158332,
            fields: [{
                name: "? ???",
                value: '??? ??? ?? ??? ????'
              }
            ]
          }
        })
        if (!serverQueue) return msg.channel.send({embed: {
            color: 15158332,
            fields: [{
                name: "? ???",
                value: '?? ???? ?? ??? ??????? ???? ??????'
              }
            ]
          }
        })
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end('Stop command has been used!');
        return undefined;
    } else if (msg.content.startsWith(`${prefix}volume`)) {
        console.log(`${msg.author.tag} has been used the ${prefix}volume command in ${msg.guild.name}`);
        if (!msg.member.voiceChannel) return msg.channel.send({embed: {
            color: 15158332,
            fields: [{
                name: "? ???",
                value: '??? ??? ?? ??? ????'
              }
            ]
          }
        })
        if (!serverQueue) return msg.channel.send({embed: {
            color: 15158332,
            fields: [{
                name: "? ???",
                value: '?? ???? ?? ??? ???????'
              }
            ]
          }
        })
        if (!args[1]) return msg.channel.send({embed: {
            color: 15158332,
            fields: [{
                name: "?? ?????",
                value: `???? ????? ????: **${serverQueue.volume}**`
              }
            ]
          }
        })
        serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
        return msg.channel.send({embed: {
            color: 15158332,
            fields: [{
                name: "?? ?????",
                value: `?? ????? ???? ????? ???: **${args[1]}**`
              }
            ]
          }
        })
    } else if (msg.content.startsWith(`${prefix}np`)) {
        console.log(`${msg.author.tag} has been used the ${prefix}np command in ${msg.guild.name}`);
        if (!serverQueue) return msg.channel.send({embed: {
            color: 15158332,
            fields: [{
                name: "? ???",
                value: '?? ???? ?? ??? ??????? ???? ?????'
              }
            ]
          }
        })
        return msg.channel.send({embed: {
            color: 15158332,
            fields: [{
                name: "?? ??? ???????",
                value: `**${serverQueue.songs[0].title}**`
              }
            ]
          }
        })
    } else if (msg.content.startsWith(`${prefix}queue`)) {
        console.log(`${msg.author.tag} has been used the ${prefix}queue command in ${msg.guild.name}`);
        if (!serverQueue) return msg.channel.send({embed: {
            color: 15158332,
            fields: [{
                name: "? ???",
                value: '?? ???? ?? ??? ??????? ???? ????? '
              }
            ]
          }
        })
        return msg.channel.send({embed: {
            color: 15158332,
            fields: [{
                name: "?? ????? ???????",
                value: `${serverQueue.songs.map(song => `**- ${song.title}**`).join('\n')}`
              },
              {
                  name: "?? ??? ???????",
                  value: `**${serverQueue.songs[0].title}**`
              }
            ]
          }
        })
        } else if(msg.content.startsWith(`${prefix}help`)) {
        console.log(`${msg.author.tag} has been used the ${prefix}help command in ${msg.guild.name}`);
 
        msg.channel.send('?? ????? ??????? ?? ????? :inbox_tray:')
 
        msg.react('?');
 
        msg.author.send({embed: {
            color: 15158332,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            fields: [{
                name: "????? ?????:",
                value: `**${prefix}help** - This message!\n\
**${prefix}play** - ????? ?????.\n\
**${prefix}skip** - ??????.\n\
**${prefix}stop** - ???????.\n\
**${prefix}volume** - ?????? ?? ???? ?????.\n\
**${prefix}np** - ??? ??????? .\n\
**${prefix}queue** - ????? ??????? .\n\
**${prefix}pause** - ????? ????.\n\
**${prefix}resume** - ????? ???????`
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "made by : taino"
            }
          }
        });
    } else if (msg.content.startsWith(`${prefix}pause`)) {
        console.log(`${msg.author.tag} has been used the ${prefix}pause command in ${msg.guild.name}`);
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        return msg.channel.send({embed: {
            color: 15158332,
            fields: [{
                name: "?? ?????",
                value: '?? ????? ??????? ?????'
              }
            ]
          }
        })
        }
        return msg.channel.send({embed: {
            color: 15158332,
            fields: [{
                name: "? ???",
                value: '?? ???? ?? ??? ???????'
              }
            ]
          }
        })
    } else if (msg.content.startsWith(`${prefix}resume`)) {
        console.log(`${msg.author.tag} has been used the ${prefix}resume command in ${msg.guild.name}`);
 
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing =  true;
            serverQueue.connection.dispatcher.resume();
            return msg.channel.send({embed: {
                color: 15158332,
                fields: [{
                    name: "?? ?????",
                    value: '?? ????? ????? ???????'
                  }
                ]
              }
            })
        }
        return msg.channel.send({embed: {
            color: 15158332,
            fields: [{
                name: "? ???",
                value: '?? ???? ?? ??? ??????? ?? ?? ???? ????? ??? ??????? ??????'
              }
            ]
          }
        })
    }
 
    return undefined;
});
 
 
async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
        const song = {
            id: video.id,
            title: Util.escapeMarkdown(video.title),
            url: `https://www.youtube.com/watch?v=${video.id}`
        };
        if (!serverQueue) {
            const queueConstruct = {
                textChannel: msg.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            };
            queue.set(msg.guild.id, queueConstruct);
 
            queueConstruct.songs.push(song);
 
            try {
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(msg.guild, queueConstruct.songs[0]);
            } catch (error) {
                console.error(`I could not join the voice channel: ${error}`);
                queue.delete(msg.guild.id);
                return msg.channel.send({embed: {
                    color: 15158332,
                    fields: [{
                        name: "? ???",
                        value: `?? ????? ?????? ??? ??? ?????: ${error}`
                      }
                    ]
                  }
                });
            }
        } else {
            serverQueue.songs.push(song);
            if (playlist) return undefined;
            else return msg.channel.send({embed: {
                color: 15158332,
                fields: [{
                    name: "? ????? ?????",
                    value: `**${song.title}** ??? ????? ????? : `
                  }
                ]
              }
            })
        }
        return undefined;
}
 
function play(guild, song) {
    const serverQueue = queue.get(guild.id);
 
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
 
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', () => {
            console.log('Song ended.');
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.log(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
 
    serverQueue.textChannel.send({embed: {
        color: 15158332,
        fields: [{
            name: "? ??? ???????",
            value: `??? ??????? ????: **${song.title}**`
          }
        ]
      }
    })
}
 

client.on('ready',async () => {
console.log("Starting..");
let g = client.guilds.get("497527465787392016");
let c = g.channels.get("497529295258779659");
if(c.type === 'voice') {
c.join();
setInterval(() => {
if(!g.me.voiceChannel) c.join();
}, 1);
} else {
console.log("Failed To Join:\n The Channel Type isn't \"text\"");
}
});

client.on('message', message => {
  if (!message.content.startsWith(prefix)) return;
  var args = message.content.split(' ').slice(1);
  var argresult = args.join(' ');
  if (message.author.id !== "485917652120764429") return;
 
if (message.content.startsWith(prefix + 'setstream')) {
  client.user.setGame(argresult, "https://www.twitch.tv/taino18");
     console.log('test' + argresult);
    message.channel.sendMessage(`Streaming: **${argresult}`)
}
	});

client.login(process.env.BOT_TOKEN);