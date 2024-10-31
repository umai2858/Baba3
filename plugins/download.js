const { fetchJson } = require('../lib/functions')
const { downloadTiktok } = require("@mrnima/tiktok-downloader");
const {facebook} = require("@mrnima/facebook-downloader");
const cheerio = require('cheerio')
const config = require('../config')
const { igdl } = require('ruhend-scraper')
const { cmd, commands } = require('../command')


cmd({
    pattern: "tiktok",
    alias: ["tt"],
    react: "🎥",
    desc: "download tt videos",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("*give me tiktok url ❌*")
        m.react('⬇️')
        //fetch data from api  
        let data = await downloadTiktok(q);
     let desc = `
     🎟️ *QUEEN ANJU-MD TIKTOK DOWNLOADER* 🎟️

🔢 *Please reply with the number you want to select:*

Title * ${data.result.title}

*!.* Tiktok Video

   1 | 📼 SD QUALITY
   2 | 🎟️ HD QUALITY

*!.* Tiktok Audio

   3 | 🎶 Audio file
   
*URL:* ${q}
     
     `

const sentMsg = await conn.sendMessage(from, { image: {url: data.result.image }, caption: desc }, { quoted: mek });
const messageID = sentMsg.key.id; // Save the message ID for later reference


// Listen for the user's response
conn.ev.on('messages.upsert', async (messageUpdate) => {
    const mek = messageUpdate.messages[0];
    if (!mek.message) return;
    const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
    const from = mek.key.remoteJid;
    const sender = mek.key.participant || mek.key.remoteJid;

    // Check if the message is a reply to the previously sent message
    const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

    if (isReplyToSentMsg) {
        // React to the user's reply (the "1" or "2" message)
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
        let dat = data.result;

        // React to the upload (sending the file)
        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

        if (messageType === '1') {
            // Handle option 1 (no wm File)
          await conn.sendMessage(from, { video: { url: dat.dl_link.download_mp4_1}, mimetype: "video/mp4", caption: `> NO-WATERMARK\n\nQUEEN ANJU MD❤️‍🩹` }, { quoted: mek })
       
            }
         else if (messageType === '2') {
            // Handle option 2 (wm File)
            await conn.sendMessage(from, { video: { url: dat.dl_link.download_mp4_hd }, mimetype: "video/mp4", caption: `> WITH-WATERMARK \n\nQUEEN ANJU MD❤️‍🩹` }, { quoted: mek })  
          }
           
          else if (messageType === '3') {
            //Handle option 3 (audio File)  
          await conn.sendMessage(from, { audio: { url: dat.dl_link.download_mp3 }, mimetype: "audio/mpeg" }, { quoted: mek })  
    
          }

        // React to the successful completion of the task
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        console.log("Response sent successfully");
    }
});

} catch (e) {
console.log(e);
reply(`${e}`);
}
});


// Facebook Downloader
cmd({
  pattern: "fb",
  alias: ["facebook"],
  desc: "Download Facebook videos",
  category: "download",
  filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {

  if (!q || !q.startsWith("https://")) {
    return conn.sendMessage(from, { text: "❌ Please provide a valid URL." }, { quoted: mek });
}

await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

const Fb = await facebook(q);


    const captionHeader = `
💢 QUEEN ANJU-MD FB DOWNLOADER 💢

🕑 DURATION : ${Fb.result.duration}🕑

🔢 Please reply the number you want to select

[1] facebook Video
1.1 | 🪫 SD QUALITY
1.2 | 🔋 HD QUALITY

[2] facebook Audio
2.1 | 🎶 Audio file
2.2 | 📂 Document file
2.3 | 🎤 Voice cut [ptt]


Fb-Url: -=-${q} 
`;

const sentMsg = await conn.sendMessage(from, { image: {url: Fb.result.thumbnail }, caption: captionHeader }, { quoted: mek });
const messageID = sentMsg.key.id; // Save the message ID for later reference


// Listen for the user's response
conn.ev.on('messages.upsert', async (messageUpdate) => {
    const mek = messageUpdate.messages[0];
    if (!mek.message) return;
    const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
    const from = mek.key.remoteJid;
    const sender = mek.key.participant || mek.key.remoteJid;

    // Check if the message is a reply to the previously sent message
    const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

    if (isReplyToSentMsg) {
        // React to the user's reply (the "1" or "2" message)
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
        let data = Fb.result;

        // React to the upload (sending the file)
        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

        if (messageType === '1.1') {
            // Handle option 1 (sd File)
          await conn.sendMessage(from, { video: { url: data.links.SD }, mimetype: "video/mp4", caption: `> 🪫 SD QUALITY\n\nQUEEN ANJU MD❤️‍🩹` }, { quoted: mek })
       
          }

          else if (messageType === '1.2') {
            // Handle option 2 (hd File)
            await conn.sendMessage(from, { video: { url: data.links.HD }, mimetype: "video/mp4", caption: `> 🔋 HD QUALITY\n\nQUEEN ANJU MD❤️‍🩹` }, { quoted: mek })  
          }
           
          else if (messageType === '2.1') {
            //Handle option 3 (audio File)  
          await conn.sendMessage(from, { audio: { url: data.links.SD }, mimetype: "audio/mpeg" }, { quoted: mek })
          }
          
          else if (messageType === '2.2') {
            await conn.sendMessage(from, {
              document: { url: data.links.SD },
              mimetype: "audio/mpeg",
              fileName: `ANJU-MD/FBDL.mp3`,
              caption: "*© 𝘘𝘜𝘌𝘌𝘕 𝘈𝘕𝘑𝘜 ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ - ᴍᴅ*"
          }, { quoted: mek });
          }
          
          else if (messageType === '2.3') {
            //Handle option 3 (audio File)  
          await conn.sendMessage(from, { audio: { url: data.links.SD }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek })
    
          }

        // React to the successful completion of the task
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        console.log("Response sent successfully");
    }
  });
} catch (e) {
console.log(e);
reply(`${e}`);
}
})

// Twitter Downloader
cmd({
  pattern: "twitter",
  alias: ["twdl"],
  desc: "Download Twitter videos",
  category: "download",
  filename: __filename
}, async (conn, mek, m, { from, q, pushname }) => {
  
});

// Google Drive Downloader
cmd({
  pattern: "gdrive",
  alias: ["googledrive"],
  desc: "Download Google Drive files",
  category: "download",
  filename: __filename
}, async (conn, mek, m, { from, q, pushname }) => {
  
});


cmd({

  pattern: "ig",
  desc: "To download instagram videos.",
  react: "🎥",
  category: "download",
  filename: __filename

},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try{
  
if (!q) return m.reply(`Please Give Me a vaild Link...`);
m.react('⬇️')

       let res = await igdl(q);
      
       let data = await res.data;
       for (let i = 0; i < 20; i++) {
          let media = data[i];
          let downloadurl = media.url
           m.react('⬆️')
          await conn.sendMessage(from,{video: {url:downloadurl},mimetype:"video/mp4",caption: `> *© 𝘘𝘜𝘌𝘌𝘕 𝘈𝘕𝘑𝘜 ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ - ᴍᴅ*`},{quoted:mek})
           m.react('✅')
       }

}catch(e){
console.log(e)
reply(`${e}`)
}
})



async function xdl(URL) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}`, {method: 'get'}).then((res) => res.text()).then((res) => {
      const $ = cheerio.load(res, {xmlMode: false});
      const title = $('meta[property="og:title"]').attr('content');
      const duration = $('meta[property="og:duration"]').attr('content');
      const image = $('meta[property="og:image"]').attr('content');
      const videoType = $('meta[property="og:video:type"]').attr('content');
      const videoWidth = $('meta[property="og:video:width"]').attr('content');
      const videoHeight = $('meta[property="og:video:height"]').attr('content');
      const info = $('span.metadata').text();
      const videoScript = $('#video-player-bg > script:nth-child(6)').html();
      const files = {
        low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
        high: videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],
        HLS: videoScript.match('html5player.setVideoHLS\\(\'(.*?)\'\\);' || [])[1],
        thumb: videoScript.match('html5player.setThumbUrl\\(\'(.*?)\'\\);' || [])[1],
        thumb69: videoScript.match('html5player.setThumbUrl169\\(\'(.*?)\'\\);' || [])[1],
        thumbSlide: videoScript.match('html5player.setThumbSlide\\(\'(.*?)\'\\);' || [])[1],
        thumbSlideBig: videoScript.match('html5player.setThumbSlideBig\\(\'(.*?)\'\\);' || [])[1]};
      resolve({status: true, result: {title, URL, duration, image, videoType, videoWidth, videoHeight, info, files}});
    }).catch((err) => reject({status: false, result: err}));
  });
}

cmd({
    pattern: "xnxxdown",
    alias: ["dlxnxx","xnxxdl"],
    react: '🫣',
    desc: "Download xnxx videos",
    category: "nsfw",
    use: '.xnxx <xnxx link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 //if (!isMe) return await reply('🚩 You are not a premium user\nbuy via message to owner!!')
 if (!q) return reply('*Please give me url !!*')
  let res = await xdl(q)
  let title = res.result.title
  await conn.sendMessage(from, { video: { url: res.result.files.high }, caption: title}, { quoted: mek })
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})

cmd({
  pattern: "xvdown",
  alias: ["dlxv","xvdl"],
  react: '🫣',
  desc: "Download xvideos videos",
  category: "nsfw",
  use: '.xv <xvideos link>',
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{      
//if (!isMe) return await reply('🚩 You are not a premium user\nbuy via message to owner!!')
if (!q) return reply('*Please give me url !!*')


let xv_info = await fetchJson(`https://dark-yasiya-api-new.vercel.app/download/xvideo?url=${q}`)
const msg = `
         🔞 *XVIDEO DOWNLOADER* 🔞

     
• *Title* - ${xv_info.result.title}

• *Views* - ${xv_info.result.views}

• *Like* - ${xv_info.result.like}

• *Deslike* - ${xv_info.result.deslike}

• *Size* - ${xv_info.result.size}`



await conn.sendMessage( from, { image: { url: xv_info.result.image || '' }, caption: msg }, { quoted: mek })

// SEND VIDEO
await conn.sendMessage(from, { document: { url: xv_info.result.dl_link }, mimetype: "video/mp4", fileName: xv_info.result.title, caption: xv_info.result.title }, { quoted: mek });


} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
