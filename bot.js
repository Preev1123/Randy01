const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = '#'; 
const premium = ['399353508429824000']
//////////////////////////////////////
client.on('ready', () => {
   console.log(`~~~~~~~~~~~~~~~~~`);
   console.log(`Logging into Discord`);
   console.log(`~~~~~~~~~~~~~~~~~~~~~`);
   console.log(`on  ${client.guilds.size} Servers `);
   console.log(`~~~~~~~~~~~~~~~~~~~~~~~~`);
   console.log(`Logged in as ${client.user.tag}!`);
   client.user.setGame(`#help | #inv`,"http://twitch.tv/y04zgamer")
   client.user.setStatus("dnd")
});
/////////////////////////////////////
client.on('message', message => {
    if(message.content.includes('discord.gg')){
                                            if(!message.channel.guild) return message.reply('**..**');
        if (!message.member.hasPermissions(['ADMINISTRATOR'])){
        message.delete(3000)
    return message.reply(`**🔗يمنع نشر الروابط بالسيرفر 🔗**`)
    }
}
});
/////////////////////////////////////
Client.on('message', message => {
if (message.content.split(' ')[0] == 'obc')
 message.guild.members.forEach( member => {
         if (!message.member.hasPermission("ADMINISTRATOR"))  return;
member.send( `${member} ! ` + "**" + message.guild.name + " : ** " + message.content.substr(3));
                                                            message.delete();
});
});
Client.on("message", message => {
    var prefix = "-";
 
            var args = message.content.substring(prefix.length).split(" ");
            if (message.content.startsWith(prefix - "bc")) {
                         if (!message.member.hasPermission("ADMINISTRATOR"))  return;
 if (!args[1]) {
                                let embed3 = new Discord.RichEmbed()
                                .setDescription(":white_check_mark: | تم ارسال للكل رساله فارغه")
                                .setColor("#FF0000")
                                message.channel.sendEmbed(embed3);
                            } else {
 
                            let embed4 = new Discord.RichEmbed()
                                                            .setDescription(':white_check_mark: | تم ارسال للكل الرساله !')
                                                            .setColor("#008000")
                                message.channel.sendEmbed(embed4);
                                                      message.delete();
                            }
                          }
});
////////////////////////////////////
client.on('message',async message => {
    if(message.content.startsWith(prefix + "restart")) {
        if(message.author.id !== "399353508429824000") return message.reply('You aren't the bot owner.');
        message.channel.send('Restarting.').then(msg => {
            setTimeout(() => {
               msg.edit('Restarting..');
            },1000);
            setTimeout(() => {
               msg.edit('Restarting...');
            },2000);
        });
        console.log(${message.author.tag} [ ${message.author.id} ] has restarted the bot.);
        console.log(Restarting..);
        setTimeout(() => {
            client.destroy();
            client.login('process.env.BOT_TOKEN');
        },3000);
    }
});
////////////////////////////////////
client.on('message', message => {
var prefix = "#";
if(message.channel.type === "dm") return;
if(message.author.bot) return;
  if(!sWlc[message.guild.id]) sWlc[message.guild.id] = {
    channel: "welcome"
}
const channel = sWlc[message.guild.id].channel
  if (message.content.startsWith(prefix + "setwelcome")) {
    if(!message.member.hasPermission(`MANAGE_GUILD`)) return;
    let newChannel = message.content.split(' ').slice(1).join(" ")
    if(!newChannel) return message.reply(`**$setwelcome رجاء كتابت اسم الروم**`)
    sWlc[message.guild.id].channel = newChannel
    message.channel.send(`**${newChannel} تم عمل الترحيب في روم ${message.guild.name}**`);
  }
});
 
 client.on("guildMemberAdd", member => {
      if(!sWlc[member.guild.id]) sWlc[member.guild.id] = {
    channel: "welcome"
  }
  const channel = sWlc[member.guild.id].channel
    const sChannel = sWlc[member.guild.id].channel
    let welcomer = member.guild.channels.find('name', sChannel);
    let memberavatar = member.user.avatarURL
      if (!welcomer) return;
      if(welcomer) {
         moment.locale('ar-ly');
         var h = member.user;
        let heroo = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(h.avatarURL)
        .setAuthor(h.username,h.avatarURL)
        .addField(': تاريخ دخولك الدسكورد',`${moment(member.user.createdAt).format('D/M/YYYY h:mm a')} **\n** \`${moment(member.user.createdAt).fromNow()}\``,true)                  
         .setFooter(`${h.tag}`,"https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif")
     welcomer.send({embed:heroo});          
         
      var Canvas = require('canvas')
      var jimp = require('jimp')
      
      const w = ['w1.png'];
      
              let Image = Canvas.Image,
                  canvas = new Canvas(557, 241),
                  ctx = canvas.getContext('2d');
  
              fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
                  if (err) return console.log(err)
                  let BG = Canvas.Image;
                  let ground = new Image;
                  ground.src = Background;
                  ctx.drawImage(ground, 0, 0, 557, 241);
      
      })
      
                      let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(5, -20) + ".gif" : member.user.displayAvatarURL;
                      jimp.read(url, (err, ava) => {
                          if (err) return console.log(err);
                          ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                              if (err) return console.log(err);
      
                                    ctx.font = '30px Arial Bold';
                              ctx.fontSize = '20px';
                              ctx.fillStyle = "#FFFFFF";
                                ctx.fillText(member.user.username, 245, 150);
                              
                              //NAMEً
                              ctx.font = '30px Arial';
                              ctx.fontSize = '28px';
                              ctx.fillStyle = "#FFFFFF";
      ctx.fillText(`Welcome To ${member.guild.name}`, 245, 80);
      
                              //AVATARً
                              let Avatar = Canvas.Image;
                              let ava = new Avatar;
                              ava.src = buf;
                              ctx.beginPath();
                 ctx.arc(120.8, 120.5, 112.3, 0, Math.PI*2, true);
                   ctx.closePath();
                   
                                 ctx.clip();
                         ctx.drawImage(ava, 7, 8, 227, 225);
                              ctx.closePath();
                             
    welcomer.sendFile(canvas.toBuffer())
      
      
      
      })
      })
      
      }
      });
////////////////////////////////////
client.on('message', message => {
     if (message.content === "-help") {
message.author.send(`  **
__ ● ▬▬▬▬▬▬▬▬▬#Randy#▬▬▬▬▬▬▬▬▬ ● __
⚙ #obc ----- ⚙نشر برودكاست لجميع الاعضاء ⚙ 
⚙ #restart ----- ⚙ اعادة تشغيل البوت ⚙
⚙ #uptime ----- ⚙ معرفة كم البوت شغال ⚙
**`);
    }
});
////////////////////////////////////
client.on('message', message => {
     var prefix = "-"
if (message.content.startsWith(prefix + "uptime")) {
    let uptime = client.uptime;
 
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let notCompleted = true;
 
    while (notCompleted) {
 
        if (uptime >= 8.64e+7) {
 
            days++;
            uptime -= 8.64e+7;
 
        } else if (uptime >= 3.6e+6) {
 
            hours++;
            uptime -= 3.6e+6;
 
        } else if (uptime >= 60000) {
 
            minutes++;
            uptime -= 60000;
 
        } else if (uptime >= 1000) {
            seconds++;
            uptime -= 1000;
 
        }
 
        if (uptime < 1000)  notCompleted = false;
 
    }
 
    message.channel.send("`" + `${days} days, ${hours} hrs, ${minutes} min , ${seconds} sec` + "`");
 
 
}
});
 client.login(process.env.BOT_TOKEN);//
