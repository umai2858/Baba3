const {cmd ,command} = require('../command');
const config = require('../config');
const os = require("os")
const {runtime} = require('../lib/functions')
//alive
cmd({
    pattern: "alive",
    desc: "Check bot online or no.",
    react: "🛠️",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const voice = {
    alive: 'https://github.com/Mrrashmika/Database/raw/refs/heads/main/Auto_voice/alive.mp3'
}

let aliveMessage = ` 
⫷⦁[ * '-'_꩜ 𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃 ꩜_'-' * ]⦁⫸ 

*Hey there!* 

 > 🟢 *Queen Anju WhatsApp Bot* is up and running!
           Runtime : ${runtime(process.uptime())}
 > 🛠️ *Created by:* Janith Rashmika 
 
*Here's what I can do:* 
💿 *Download Songs & Videos* 
📰 *Fetch Latest News* 
🎭 *Entertain with Fun Commands* 
🔧 *Manage Groups* 

 *Stay connected and enjoy the services!* 


> *© 𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃 - MD* 
> *💻 GitHub:* github.com/Mrrashmika/Queen_Anju-MD `

await conn.sendMessage(from, { audio: { url: voice.alive }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek })

await conn.sendMessage(from, { text: aliveMessage ,
  contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363299978149557@newsletter',
      newsletterName: "𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃",
      serverMessageId: 999
    },
externalAdReply: { 
title: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
body: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
mediaType: 1,
sourceUrl: "https://github.com/Mrrashmika" ,
thumbnailUrl: config.ALIVE_IMG ,
renderLargerThumbnail: true,
showAdAttribution: true
}
}}, { quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
});

//system
cmd({
    pattern: "system",
    alias: ["status","botinfo"],
    react: "🏷️",
    desc: "To Check uptime , ram and more.",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let status = `
🏷️ SYSTEM STATUS

🔄 UPTIME: ${runtime(process.uptime())}
🔋 RAM USAGE: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
💻 HOST NAME: ${os.hostname()}
👑 BOT OWNER: Janith Rashmika

> *© 𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃 - MD* 
> *💻 GitHub:* github.com/Mrrashmika/Queen_Anju-MD 
`
await conn.sendMessage(from, { text: status ,
    contextInfo: {
      mentionedJid: [ '' ],
      groupMentions: [],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363232588171807@newsletter',
        newsletterName: "𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃",
        serverMessageId: 999
      },
  externalAdReply: { 
  title: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
  body: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
  mediaType: 1,
  sourceUrl: "https://github.com/Mrrashmika" ,
  thumbnailUrl: config.ALIVE_IMG ,
  renderLargerThumbnail: true,
  showAdAttribution: true
  }
  }}, { quoted: mek}) 
}catch(e){
console.log(e)
reply(`${e}`)

}
})

//runtime
cmd({
    pattern: "runtime",
    alias: ["uptime"],
    react: "😇",
    desc: "To Check uptime",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let status = `
😇𝚁𝚄𝙽𝚃𝙸𝙼𝙴😇:  ${runtime(process.uptime())}

> *© 𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃 - MD* 
> *💻 GitHub:* github.com/Mrrashmika/Queen_Anju-MD 
`


await conn.sendMessage(from, { text: status ,
    contextInfo: {
      mentionedJid: [ '' ],
      groupMentions: [],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363232588171807@newsletter',
        newsletterName: "𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃",
        serverMessageId: 999
      },
  externalAdReply: { 
  title: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
  body: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
  mediaType: 1,
  sourceUrl: "https://github.com/Mrrashmika" ,
  thumbnailUrl: config.ALIVE_IMG ,
  renderLargerThumbnail: true,
  showAdAttribution: true
  }
  }}, { quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)

}
})

//ping
cmd({
  pattern: "ping",
  desc: "Check bot's response time.",
  category: "main",
  react: "❤️‍🩹",
  filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
      const startTime = Date.now()
      const message = await conn.sendMessage(from, { text: '𝗣𝗶𝗻𝗴𝗶𝗻𝗴...' })
      const endTime = Date.now()
      const ping = endTime - startTime
      await conn.sendMessage(from, { text: `⏰ 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲 𝗧𝗶𝗺𝗲 : ${ping}ms` }, { quoted: message })
  } catch (e) {
      console.log(e)
      reply(`${e}`)
  }
})

//owner
cmd({
    pattern: "owner",
    react: "👨‍💻",
    alias: ["dev","createor","developer"],
    desc: "Get bot\'s command list.",
    category: "main",
    use: '.menu',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{


let tex = `
*🪄Hello* ${pushname},

*🧚‍♀️𝐈'𝐦 𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃 -𝐌𝐃 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩 𝐁𝐨𝐭💗*

> 👨‍💻 *MY 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢* ⚖️

*⚡ηαмє -: KING RASHMIKA*
*⚡αgє -: 18*
*⚡ηυмвєя* -: +94717775628
*⚡уσυтυвє* -: https://www.youtube.com/@gamingrash2006

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ -: *⚡©GAMING RASH 2024💗*

`

await conn.sendMessage(from, { text: tex ,
  contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363232588171807@newsletter',
      newsletterName: "𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃",
      serverMessageId: 999
    },
externalAdReply: { 
title: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
body: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
mediaType: 1,
sourceUrl: "https://github.com/Mrrashmika" ,
thumbnailUrl: config.ALIVE_IMG ,
renderLargerThumbnail: true,
showAdAttribution: true
}
}}, { quoted: mek})
await conn.sendMessage(from, { 
  contacts: {
      displayName: "Queen Anju MD Owner", // Contact name to display
      contacts: [
          {
              displayName: "Queen Anju MD Owner", // Name to display for the contact
              vcard: `BEGIN:VCARD
VERSION:3.0
FN:Queen Anju MD
TEL;TYPE=CELL:+94717775628
END:VCARD`
          }
      ]
  }
}, { quoted: mek });

}catch(e){
console.log(e)
reply(`${e}`)
}
})

//