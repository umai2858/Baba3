const { fetchJson } = require('../lib/functions')
const { downloadTiktok } = require("@mrnima/tiktok-downloader");
const {facebook} = require("@mrnima/facebook-downloader");
const cheerio = require('cheerio')
const config = require('../config.cjs')
const { igdl } = require('ruhend-scraper')
const axios = require('axios');
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

const sentMsg = await conn.sendMessage(from, {
  image: { url: data.result.image}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
  caption: desc,
  contextInfo: {
      mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
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
          sourceUrl: "https://github.com/Mrrashmika",
          thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
          renderLargerThumbnail: false,
          showAdAttribution: true
      }
  }
});
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
            await conn.sendMessage(from, {
              video: { url: dat.dl_link.download_mp4_1}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
              caption: "QUEEN ANJU MD WHATSAPP BOT",
              contextInfo: {
                  mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
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
                      sourceUrl: "https://github.com/Mrrashmika",
                      thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                      renderLargerThumbnail: false,
                      showAdAttribution: true
                  }
              }
            });
            }
         else if (messageType === '2') {
            // Handle option 2 (wm File)
            await conn.sendMessage(from, {
              video: { url: dat.dl_link.download_mp4_2}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
              caption: "QUEEN ANJU MD WHATSAPP BOT",
              contextInfo: {
                  mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
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
                      sourceUrl: "https://github.com/Mrrashmika",
                      thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                      renderLargerThumbnail: false,
                      showAdAttribution: true
                  }
              }
            }); }
           
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

const sentMsg = await conn.sendMessage(from, {
  image: { url: Fb.result.thumbnail}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
  caption: captionHeader,
  contextInfo: {
      mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
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
          sourceUrl: "https://github.com/Mrrashmika",
          thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
          renderLargerThumbnail: false,
          showAdAttribution: true
      }
  }
});
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
            await conn.sendMessage(from, {
              video: { url: data.links.SD}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
              caption: "QUEEN ANJU MD WHATSAPP BOT",
              contextInfo: {
                  mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
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
                      sourceUrl: "https://github.com/Mrrashmika",
                      thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                      renderLargerThumbnail: false,
                      showAdAttribution: true
                  }
              }
            });
          }

          else if (messageType === '1.2') {
            // Handle option 2 (hd File)
            await conn.sendMessage(from, {
              video: { url: data.links.HD}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
              caption: "QUEEN ANJU MD WHATSAPP BOT",
              contextInfo: {
                  mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
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
                      sourceUrl: "https://github.com/Mrrashmika",
                      thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                      renderLargerThumbnail: false,
                      showAdAttribution: true
                  }
              }
            });
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
              caption: "*© QUEEN ANJU WHATSAPP BOT MD*",
              contextInfo: {
                mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
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
                    sourceUrl: "https://github.com/Mrrashmika",
                    thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
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

cmd({
    pattern: "twitter",
    alias: ["tweet", "twdl"],
    desc: "Download Twitter videos",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!q || !q.startsWith("https://")) {
      return conn.sendMessage(from, { text: "❌ Please provide a valid Twitter URL." }, { quoted: mek });
    }

    // React to indicate processing start
    await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

    // Fetch video information from Dark Yasiya Twitter API
    const twitterData = await axios.get(`https://www.dark-yasiya-api.site/download/twitter?url=${q}`);
    const data = twitterData.data;

    if (!data || !data.status || !data.result) {
      return m.reply("Failed to retrieve Twitter video. Please check the link and try again.");
    }

    const { desc, thumb, video_sd, video_hd } = data.result;
    const captionHeader = `
💢 QUEEN ANJU-MD TWITTER DOWNLOADER 💢

📝 Description: ${desc || "No description"}

🔢 Please reply with the number for your selection:

[1] Twitter Video
  1.1 | 🪫 SD QUALITY
  1.2 | 🔋 HD QUALITY

[2] Twitter Audio
  2.1 | 🎶 Audio file
  2.2 | 📂 Document file
  2.3 | 🎤 Voice (ptt)

Twitter URL: ${q}
`;

    const sentMsg = await conn.sendMessage(from, {
      image: { url: thumb}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
      caption: captionHeader,
      contextInfo: {
          mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
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
              sourceUrl: "https://github.com/Mrrashmika",
              thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
              renderLargerThumbnail: false,
              showAdAttribution: true
          }
      }
    });
    const messageID = sentMsg.key.id;

    // Listen for the user's response
    conn.ev.on('messages.upsert', async (messageUpdate) => {
      const mek = messageUpdate.messages[0];
      if (!mek.message) return;
      const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
      const from = mek.key.remoteJid;

      // Check if the message is a reply to the previously sent message
      const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

      if (isReplyToSentMsg) {
        // React to the user's selection
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

        if (messageType === '1.1') {
          // Send SD video
          await conn.sendMessage(from, {
            video: { url: video_sd}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
            caption: "QUEEN ANJU MD",
            contextInfo: {
                mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
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
                    sourceUrl: "https://github.com/Mrrashmika",
                    thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
          });
        } else if (messageType === '1.2') {
          // Send HD video
          await conn.sendMessage(from, {
            video: { url: video_hd}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
            caption: "QUEEN ANJU MD WHATSAPP BOT",
            contextInfo: {
                mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
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
                    sourceUrl: "https://github.com/Mrrashmika",
                    thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
          });
        } else if (messageType === '2.1') {
          // Send audio as an audio file
          await conn.sendMessage(from, { audio: { url: video_sd }, mimetype: "audio/mpeg" }, { quoted: mek });
        } else if (messageType === '2.2') {
          // Send audio as a document file
          await conn.sendMessage(from, {
            document: { url: video_sd },
            mimetype: "audio/mpeg",
            fileName: `ANJU-MD/TWDL.mp3`,
            caption: "*© QUEEN ANJU WHATSAPP BOT MD*",
            contextInfo: {
                mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
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
                    sourceUrl: "https://github.com/Mrrashmika",
                    thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
          }, { quoted: mek });
        } else if (messageType === '2.3') {
          // Send audio as a voice note (ptt)
          await conn.sendMessage(from, { audio: { url: video_sd }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek });
        }

        // React to completion
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        console.log("Twitter response sent successfully");
      }
    });
  } catch (e) {
    console.log(e);
    reply(`An error occurred: ${e}`);
  }
});




cmd({
    pattern: "mediafire",
    desc: "To download MediaFire files.",
    react: "🎥",
    category: "download",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!q) return m.reply("Please provide a valid MediaFire link.");
        
        // React to indicate download start
        m.react('⬇️');
        
        // Fetch file information from the Dark Yasiya API
        const response = await axios.get(`https://www.dark-yasiya-api.site/download/mfire?url=${q}`);
        const resData = response.data;

        if (!resData || !resData.status || !resData.result || !resData.result.dl_link) {
            return m.reply("Failed to fetch MediaFire download link. Ensure the link is valid and public.");
        }

        const fileUrl = resData.result.dl_link;
        const fileName = resData.result.fileName || "mediafire_download";
        const fileType = resData.result.fileType || "application/octet-stream";
        
        // React to indicate file is being sent
        m.react('⬆️');

        let msg = `
        QUEEN ANJU MD MEDIAFIRE DL

        File Name : ${fileName}

        File Type : ${fileType}
        `

        // Send file to chat without downloading
        await conn.sendMessage(from, {
          document: { url: fileUrl},
          mimetype: fileType,
          fileName: fileName, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
          caption: msg,
          contextInfo: {
              mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
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
                  sourceUrl: "https://github.com/Mrrashmika",
                  thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                  renderLargerThumbnail: false,
                  showAdAttribution: true
              }
          }
        });

    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
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
          await conn.sendMessage(from,{
            video: {url:downloadurl},
            mimetype:"video/mp4",
            caption: `> *© 𝘘𝘜𝘌𝘌𝘕 𝘈𝘕𝘑𝘜 ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ - ᴍᴅ*`,
            contextInfo: {
                mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
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
                    sourceUrl: "https://github.com/Mrrashmika",
                    thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }},{quoted:mek})
           m.react('✅')
       }

}catch(e){
console.log(e)
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
  await conn.sendMessage(from, { 
    video: { url: res.result.files.high },
     caption: title,
     contextInfo: {
        mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
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
            sourceUrl: "https://github.com/Mrrashmika",
            thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
            renderLargerThumbnail: false,
            showAdAttribution: true
        }
    }}, { quoted: mek })
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


let xv_info = await fetchJson(`https://www.dark-yasiya-api.site/download/xvideo?url=${q}`)
const msg = `
         🔞 *XVIDEO DOWNLOADER* 🔞

     
• *Title* - ${xv_info.result.title}

• *Views* - ${xv_info.result.views}

• *Like* - ${xv_info.result.like}

• *Deslike* - ${xv_info.result.deslike}

• *Size* - ${xv_info.result.size}`



await conn.sendMessage(from, {
  video: { url: xv_info.result.dl_link}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
  caption: msg,
  contextInfo: {
      mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
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
          sourceUrl: "https://github.com/Mrrashmika",
          thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
          renderLargerThumbnail: false,
          showAdAttribution: true
      }
  }
});
// SEND VIDEO

} catch (e) {
reply('*Error !!*')
console.log(e)
}
})


const fs = require('fs');
const path = require('path');


// Command handler for searching Avatar episodes
cmd({
    pattern: "baiscope",
    react: '📑',
    category: "download",
    desc: "baiscope.lk",
    filename: __filename
}, async (conn, m, mek, { from, q, isDev, reply }) => {
    try {
        if (!q) return await reply('*Please provide a search query! (e.g., Avatar)*');

        // Construct the search URL
        const searchUrl = `https://www.baiscope.lk/?s=${encodeURIComponent(q)}`;
        const response = await axios.get(searchUrl);
        const $ = cheerio.load(response.data);

        let episodes = [];

        // Scrape episode details (title, link, and image)
        $("article.elementor-post").each((index, element) => {
            const title = $(element).find("h5.elementor-post__title > a").text().trim();
            const episodeLink = $(element).find("h5.elementor-post__title > a").attr("href");
            const imgUrl = $(element).find(".elementor-post__thumbnail img").attr("src");

            if (title && episodeLink && imgUrl) {
                episodes.push({
                    title,
                    episodeLink,
                    imgUrl
                });
            }
        });

        // If no episodes found
        if (episodes.length === 0) {
            return await reply(`No results found for: ${q}`);
        }

        // Prepare message info
        let info = `📺 Search Results for *${q}:*\n\n`;
        episodes.forEach((ep, index) => {
            info += `*${index + 1}.* ${ep.title}\n🔗 Link: ${ep.episodeLink}\n\n`;
        });

        // Send the compiled information
        const sentMsg = await conn.sendMessage(from,
            { text: info,
                contextInfo: {
                    mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
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
                        sourceUrl: "https://github.com/Mrrashmika",
                        thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                        renderLargerThumbnail: false,
                        showAdAttribution: true
                    }
                }
             }, { quoted: mek });
        const messageID = sentMsg.key.id; // Save the message ID for later reference

        // Listen for the user's response
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const mek = messageUpdate.messages[0];
            if (!mek.message) return;
            const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
            const from = mek.key.remoteJid;

            // Check if the message is a reply to the previously sent message
            const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;
            if (isReplyToSentMsg) {
                const selectedNumber = parseInt(messageType.trim());
                if (!isNaN(selectedNumber) && selectedNumber > 0 && selectedNumber <= episodes.length) {
                    const selectedEpisode = episodes[selectedNumber - 1];

                    // Fetch the download link from the selected episode page
                    const episodeResponse = await axios.get(selectedEpisode.episodeLink);
                    const $episodePage = cheerio.load(episodeResponse.data);
                    const downloadLink = $episodePage("a.dlm-buttons-button").attr("href");

                    if (downloadLink) {
                        // Send the image of the selected episode along with the details
                        await conn.sendMessage(from, {
                            image: { url: selectedEpisode.imgUrl },
                            caption: `🎬 *${selectedEpisode.title}*\n🔗 Link: ${selectedEpisode.episodeLink}\n⬇️ Download will follow.`,
                            contextInfo: {
                                mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
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
                                    sourceUrl: "https://github.com/Mrrashmika",
                                    thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                                    renderLargerThumbnail: false,
                                    showAdAttribution: true
                                }
                            }
                        }, { quoted: mek });

                        // Download the ZIP file
                        const zipFilePath = path.join(__dirname, 'downloaded_episode.zip');
                        const writer = fs.createWriteStream(zipFilePath);

                        const downloadResponse = await axios({
                            url: downloadLink,
                            method: 'GET',
                            responseType: 'stream'
                        });
downloadResponse.data.pipe(writer);

                        writer.on('finish', async () => {
                            // Once the download is complete, send the ZIP file to the user
                            await conn.sendMessage(from, {
                                document: { url: zipFilePath },
                                mimetype: 'application/zip',
                                fileName: `${selectedEpisode.title}.zip`,
                                caption: `*${selectedEpisode.title}*\n\n> QUEEN ANJU MD V2`,
                                contextInfo: {
                                    mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
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
                                        sourceUrl: "https://github.com/Mrrashmika",
                                        thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                                        renderLargerThumbnail: false,
                                        showAdAttribution: true
                                    }
                                }
                            }, { quoted: mek });

                            // Optionally delete the downloaded ZIP file after sending
                            fs.unlinkSync(zipFilePath);
                        });

                        writer.on('error', (err) => {
                            console.error('Error downloading ZIP file:', err);
                            reply('*Error downloading the episode ZIP file.*');
                        });

                    } else {
                        await reply('*Download link not found for the selected episode.*');
                    }
                } else {
                    await reply('*Invalid selection. Please choose a valid number.*');
                }
            }
        });

    } catch (error) {
        console.error(error);
        await reply('*An error occurred while scraping the data.*');
    }
});

// Command handler for searching cartoons
cmd({
    pattern: "ginisisila",
    react: '📑',
    category: "download",
    desc: "ginisisilacartoon.net",
    filename: __filename
}, async (conn, m, mek, { from, q, isDev, reply }) => {
    try {
        if (!q) return await reply('*Please provide a search query! (e.g., Garfield)*');

        // Construct the search URL
        const searchUrl = `https://ginisisilacartoon.net/search.php?q=${encodeURIComponent(q)}`;
        const response = await axios.get(searchUrl);
        const $ = cheerio.load(response.data);

        let episodes = [];

        // Scrape episode details
        $("div.inner-video-cell").each((index, element) => {
            const title = $(element).find("div.video-title > a").attr("title");
            const postedTime = $(element).find("div.posted-time").text().trim();
            const episodeLink = $(element).find("div.video-title > a").attr("href");
            const imageUrl = $(element).find("div.inner-video-thumb-wrapper img").attr("src"); // Get episode image URL

            if (title && episodeLink) {
                episodes.push({
                    title,
                    postedTime,
                    episodeLink: `https://ginisisilacartoon.net/${episodeLink}`,
                    imageUrl: imageUrl
                });
            }
        });

        // If no episodes found
        if (episodes.length === 0) {
            return await reply(`No results found for: ${q}`);
        }

        // Prepare message info
        let info = `📺 Search Results for *${q}:*\n\n`;
        episodes.forEach((ep, index) => {
            info += `*${index + 1}.* ${ep.title}\n🗓️ Posted: ${ep.postedTime}\n🔗 Link: ${ep.episodeLink}\n\n`;
        });

        // Send the compiled information
        const sentMsg = await conn.sendMessage(from,{ text: info ,
            contextInfo: {
                mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
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
                    sourceUrl: "https://github.com/Mrrashmika",
                    thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
        }, { quoted: mek });
        const messageID = sentMsg.key.id; // Save the message ID for later reference

        // Listen for the user's response
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const mek = messageUpdate.messages[0];
            if (!mek.message) return;
            const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
            const from = mek.key.remoteJid;
// Check if the message is a reply to the previously sent message
            const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;
            if (isReplyToSentMsg) {
                const selectedNumber = parseInt(messageType.trim());
                if (!isNaN(selectedNumber) && selectedNumber > 0 && selectedNumber <= episodes.length) {
                    const selectedEpisode = episodes[selectedNumber - 1];

                    // Send episode details with image first
                    const episodeInfo = `*🪄 ɴᴀᴍᴇ:-* ${selectedEpisode.title}\n⏳ *ᴅᴀᴛᴇ:-* ${selectedEpisode.postedTime}\n📎 *ᴇᴘɪꜱᴏᴅᴇ ʟɪɴᴋ*:- ${selectedEpisode.episodeLink}\n\n☘ *We are uploading the Movie/Episode you requested.*`;
                    const imageMessage = {
                        image: { url: selectedEpisode.imageUrl },
                        caption: episodeInfo,
                        contextInfo: {
                            mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
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
                                sourceUrl: "https://github.com/Mrrashmika",
                                thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                                renderLargerThumbnail: false,
                                showAdAttribution: true
                            }
                        }
                    };
                    await conn.sendMessage(from, imageMessage, { quoted: mek });

                    // Fetch the episode page to extract the video link (iframe src)
                    const episodePageResponse = await axios.get(selectedEpisode.episodeLink);
                    const $ = cheerio.load(episodePageResponse.data);

                    // Extract the IFRAME src link
                    const iframeSrc = $('div#player-holder iframe').attr('src');

                    if (iframeSrc) {
                        // Call the external API to get the download link using the iframe link
                       const apiUrl = `https://api.fgmods.xyz/api/downloader/gdrive?url=${iframeSrc}&apikey=mnp3grlZ`;

                        try {
                            const downloadResponse = await axios.get(apiUrl);
                            const downloadUrl = downloadResponse.data.result.downloadUrl; // Assuming this is the correct path

                            if (downloadUrl) {
                                // Send the video as a document (.mp4)
                                await conn.sendMessage(from, {
                                    document: { url: downloadUrl },
                                    mimetype: "video/mp4",
                                    fileName: `MR JANIYA | ${selectedEpisode.title}.mp4`,
                                    caption: `${selectedEpisode.title} |  Powered By MR JANIYA\n\n> QUEEN ANJU MD V2`,
                                    contextInfo: {
                                        mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
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
                                            sourceUrl: "https://github.com/Mrrashmika",
                                            thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                                            renderLargerThumbnail: false,
                                            showAdAttribution: true
                                        }
                                    }
                                }, { quoted: mek });
                            } else {
                                await reply('Failed to retrieve the download link for this episode.');
                            }
                        } catch (error) {
                            console.error('Error fetching the download link:', error);
                            await reply('An error occurred while trying to fetch the download link.');
                        }

                    } else {
                        await reply('No downloadable link found for this episode.');
                    }

                } else {
                    await reply(`Please reply with a valid number from the list.`);
                }
            }
        });

    } catch (e) {
        reply('*Error occurred while scraping!*');
        console.error(e);
    }
});


cmd({
    pattern: "apk",
    desc: "Download apk.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
try {

await m.react("⬇")
      
const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${q}/limit=1`;
const response = await axios.get(apiUrl);
const data = response.data;

let step1 = data.datalist.list[0].size % 1000000
let step2 = `.` + step1
let step3 = data.datalist.list[0].size / 1000000
let correctsize = step3 - step2
    
let desc = `
*「 🗃️𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐀𝐏𝐊 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑🗃️ 」*

*╭──📦 APK Details 📦──◦•◦❥•*
*╎*
*╎* *🏷️ Nᴀᴍᴇ :* ${data.datalist.list[0].name}
*╎* *📦 Sɪᴢᴇ :* ${correctsize}MB
*╎* *🔖 Pᴀᴄᴋᴀɢᴇ :* ${data.datalist.list[0].package}
*╎* *📆 Lᴀꜱᴛ Uᴘᴅᴀᴛᴇ :* ${data.datalist.list[0].updated}
*╎* *👤 Dᴇᴠᴇʟᴏᴘᴇʀꜱ :* ${data.datalist.list[0].developer.name}
*╎*
*╰────────────────────◦•◦❥•*
* 𝙏𝙝𝙖𝙣𝙠𝙨 𝙁𝙤𝙧 𝙐𝙨𝙞𝙣𝙜 𝙌𝙐𝙀𝙀𝙉 𝘼𝙉𝙅𝙐 𝙈𝘿`
await m.react("⬆")
await conn.sendMessage(from,{
    document: {url: data.datalist.list[0].file.path_alt},
    fileName: data.datalist.list[0].name,
    mimetype: 'application/vnd.android.package-archive',
    caption: desc,
    contextInfo: {
        mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
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
            sourceUrl: "https://github.com/Mrrashmika",
            thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
            renderLargerThumbnail: false,
            showAdAttribution: true
        }
    }},{quoted: mek})
        
await m.react("✅")

}catch(e){
console.log(e)
reply(`${e}`)
}
})

const { sinhalaSub } = require('mrnima-moviedl'); // Make sure mrnima-moviedl is installed and supports search

cmd({
    pattern: "sinhalasub",
    react: '📑',
    category: "download",
    desc: "Search movies on sinhalasub and get download links",
    filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
    try {
        if (!q) return await reply('*Please provide a search query! (e.g., Deadpool)*');
        
        var movie = await sinhalaSub();
        const results = await movie.search(q);
        const searchResults = results.result.slice(0, 10);
        
        if (!searchResults || searchResults.length === 0) {
            return await reply(`No results found for: ${q}`);
        }

        let resultsMessage = `📽️ *Search Results for* "${q}":\n\n`;
        searchResults.forEach((result, index) => {
            resultsMessage += `*${index + 1}.* ${result.title}\n🔗 Link: ${result.link}\n\n`;
        });

        const sentMsg = await conn.sendMessage(from, { text: resultsMessage }, { quoted: mek });
        const messageID = sentMsg.key.id;

        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const replyMek = messageUpdate.messages[0];
            if (!replyMek.message) return;
            const messageType = replyMek.message.conversation || replyMek.message.extendedTextMessage?.text;
            const isReplyToSentMsg = replyMek.message.extendedTextMessage && replyMek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

            if (isReplyToSentMsg) {
                const selectedNumber = parseInt(messageType.trim());
                if (!isNaN(selectedNumber) && selectedNumber > 0 && selectedNumber <= searchResults.length) {
                    const selectedMovie = searchResults[selectedNumber - 1];

                    const apiUrl = `https://api-site-2.vercel.app/api/sinhalasub/movie?url=${encodeURIComponent(selectedMovie.link)}`;
                    try {
                        const response = await axios.get(apiUrl);
                        const movieData = response.data.result;

                        // Only use `dl_links1` for PixelDrain links
                        const pixelDrainLinks = movieData.dl_links || [];
                        if (pixelDrainLinks.length === 0) {
                            return await reply('No PixelDrain links found.');
                        }

                        let downloadMessage = `🎥 *${movieData.title}*\n\n`;
                        downloadMessage += `*Available PixelDrain Download Links:*\n`;

                        pixelDrainLinks.forEach((link, index) => {
                            downloadMessage += `*${index + 1}.* ${link.quality} - ${link.size}\n🔗 Link: ${link.link}\n\n`;
                        });

                        const pixelDrainMsg = await conn.sendMessage(from, { text: downloadMessage }, { quoted: replyMek });
                        const pixelDrainMessageID = pixelDrainMsg.key.id;

                        conn.ev.on('messages.upsert', async (pdUpdate) => {
                            const pdReply = pdUpdate.messages[0];
                            if (!pdReply.message) return;
                            const pdMessageType = pdReply.message.conversation || pdReply.message.extendedTextMessage?.text;
                            const isReplyToPixelDrainMsg = pdReply.message.extendedTextMessage && pdReply.message.extendedTextMessage.contextInfo.stanzaId === pixelDrainMessageID;

                            if (isReplyToPixelDrainMsg) {
                                const qualityNumber = parseInt(pdMessageType.trim());
                                if (!isNaN(qualityNumber) && qualityNumber > 0 && qualityNumber <= pixelDrainLinks.length) {
                                    const selectedPixelDrainLink = pixelDrainLinks[qualityNumber - 1];
                                    const fileId = selectedPixelDrainLink.link.split('/').pop();
                                    await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

                                    const directDownloadUrl = `https://pixeldrain.com/api/file/${fileId}`;

                                    await conn.sendMessage(from, { react: { text: '⬆', key: mek.key } });

                                    await conn.sendMessage(from, {
                                        document: { url: directDownloadUrl },
                                        mimetype: "video/mp4",
                                        fileName: `${movieData.title} - ${selectedPixelDrainLink.quality}.mp4`,
                                        caption: `${movieData.title}\nQuality: ${selectedPixelDrainLink.quality}\nPowered by SinhalaSub`,
                                        contextInfo: {
                                            mentionedJid: [],
                                            externalAdReply: {
                                                title: movieData.title,
                                                body: 'Download powered by SinhalaSub',
                                                mediaType: 1,
                                                sourceUrl: selectedMovie.link,
                                                thumbnailUrl: movieData.image
                                            }
                                        }
                                    }, { quoted: pdReply });

                                    await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
                                } else {
                                    await reply('Invalid selection. Please reply with a valid number.');
                                }
                            }
                        });

                    } catch (error) {
                        console.error('Error fetching movie details:', error);
                        await reply('An error occurred while fetching movie details. Please try again.');
                    }
                } else {
                    await reply('Invalid selection. Please reply with a valid number.');
                }
            }
        });

    } catch (error) {
        console.error('Error during search:', error);
        reply('*An error occurred while searching!*');
    }
});



cmd({

    pattern: "gdrive",
    desc: "To download Gdrive files.",
    react: "🌐",
    category: "download",
    filename: __filename
  
  },
  
  async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
  
  try{
    await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
  if (!q) return m.reply(`Please Give Me a vaild Link...`);
  
  const apiUrl = `https://api.fgmods.xyz/api/downloader/gdrive?url=${q}&apikey=mnp3grlZ`;

  const downloadResponse = await axios.get(apiUrl);
                            const downloadUrl = downloadResponse.data.result.downloadUrl; // Assuming this is the correct path

                            if (downloadUrl) {
                                // Send the video as a document (.mp4)
                                await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                                await conn.sendMessage(from, {
                                    document: { url: downloadUrl },
                                    mimetype: downloadResponse.data.result.mimetype,
                                    fileName: downloadResponse.data.result.fileName,
                                    caption: `|  Powered By MR JANIYA\n\n> QUEEN ANJU MD V2`,
                                    contextInfo: {
                                        mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
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
                                            sourceUrl: "https://github.com/Mrrashmika",
                                            thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                                            renderLargerThumbnail: false,
                                            showAdAttribution: true
                                        }
                                    }
                                }, { quoted: mek });
                            }
         
                            await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
  }catch(e){
  console.log(e)
  }
  });
  
  