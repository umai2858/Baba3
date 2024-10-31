const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');
const { fetchJson } = require('../lib/functions')
const gifted = require('gifted-dls');



// Function to extract the video ID from youtu.be or YouTube links
function extractYouTubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Function to convert any YouTube URL to a full YouTube watch URL
function convertYouTubeLink(q) {
    const videoId = extractYouTubeId(q);
    if (videoId) {
        return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return q;
}

// .song command
cmd({
    pattern: "song",
    desc: "To download songs.",
    react: "🎵",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please give me a URL or title.");

        q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
⫷⦁[ * '-'_꩜ 𝙌𝙐𝙀𝙀𝙉 𝘼𝙉𝙅𝙐 𝙎𝙊𝙉𝙂 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿𝙀𝙍 ꩜_'-' * ]⦁⫸

🎵 *Song Found!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url} 

🎧 *Enjoy the music brought to you by* *Queen Anju Bot*! 

🔽 *To download send:*

1. *Audio File* 🎶
2. *Document File* 📂

> *Created with ❤️ by Janith Rashmika* 

> *© 𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃 - MD*  
*💻 GitHub:* github.com/Mrrashmika/Queen_Anju-MD    
`;

        // Send the initial message and store the message ID
        const sentMsg = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });
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

                const down = await gifted.ytmp3(url);
                const downloadUrl = down.download_url;

                // React to the upload (sending the file)
                await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

                if (messageType === '1') {
                    // Handle option 1 (Audio File)
                    await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
                } else if (messageType === '2') {
                    // Handle option 2 (Document File)
                    await conn.sendMessage(from, {
                        document: { url: downloadUrl },
                        mimetype: "audio/mpeg",
                        fileName: `${data.title}.mp3`,
                        caption: "*© QUEEN ANJU WHATSAPP BOT MD*"
                    }, { quoted: mek });
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
// .ytmp3 command
cmd({
    pattern: "ytmp3",
    desc: "Download YouTube videos as MP3.",
    react: "🎵",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a YouTube URL or title.");

        q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
🎵 *MP3 Download Found!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url} 

🎧 *Enjoy the audio brought to you by Queen Anju Bot!* 

🔽 *To download send:*

1. *Audio File* 🎶
2. *Document File* 📂

> *Created with ❤️ by Janith Rashmika* 

> *© 𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃 - MD*  
*💻 GitHub:* github.com/Mrrashmika/Queen_Anju-MD
`;

        // Send the initial message and store the message ID
        const sentMsg = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });
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

                const down = await gifted.ytmp3(url);
                const downloadUrl = down.download_url;

                // React to the upload (sending the file)
                await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

                if (messageType === '1') {
                    // Handle option 1 (Audio File)
                    await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
                } else if (messageType === '2') {
                    // Handle option 2 (Document File)
                    await conn.sendMessage(from, {
                        document: { url: downloadUrl },
                        mimetype: "audio/mpeg",
                        fileName: `${data.title}.mp3`,
                        caption: "*© QUEEN ANJU WHATSAPP BOT MD*"
                    }, { quoted: mek });
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

cmd({
    pattern: "yts",
    desc: "To search for videos on YouTube.",
    react: "🎥",
    category: "search",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a search query.");
        
        const search = await yts(q);
        const results = search.videos.slice(0, 10); // Get top 10 search results

        let desc = `
⫷⦁[ * '-'_꩜ 𝙌𝙐𝙀𝙀𝙉 𝘼𝙉𝙅𝙐 𝙔𝙏𝙎 𝙎𝙀𝘼𝙍𝘾𝙃 ꩜_'-' * ]⦁⫸

🔍 *Search Results for:* ${q}

`;

        results.forEach((video, index) => {
            desc += `
${index + 1}. *Title:* ${video.title} 
   *Duration:* ${video.timestamp} 
   *Views:* ${video.views} 
   *Uploaded On:* ${video.ago} 
   *Link:* ${video.url}
`;
        });

        desc += `
> *Created with ❤️ by Janith Rashmika* 
> *© 𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃 - MD* 
*💻 GitHub:* github.com/Mrrashmika/Queen_Anju-MD
`;

        await conn.sendMessage(from, { text: desc }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "video",
    desc: "To download videos.",
    react: "🎥",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please give me a URL or title.");

        q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
⫷⦁[ * '-'_꩜ 𝙌𝙐𝙀𝙀𝙉 𝘼𝙉𝙅𝙐 𝙑𝙄𝘿𝙀𝙊 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿𝙀𝙍 ꩜_'-' * ]⦁⫸ 

🎥 *Video Found!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url} 

🎬 *Enjoy the video brought to you by* *Queen Anju Bot*! 

🔽 *To download send:*

 *Video File* 🎶
   1.1 *360*
   1.2 *480*
   1.3 *720*
   1.4 *1080*
 *Document File* 📂
   2.1 *360*
   2.2 *480*
   2.3 *720*
   2.4 *1080*

> *Created with ❤️ by Janith Rashmika* 

> *© 𝙌𝙐𝙀𝙀𝙉 𝘼𝙉𝙅𝙐 𝘽𝙊𝙏 - MD*  
*💻 GitHub:* github.com/Mrrashmika/Queen_Anju-MD
`;

        // Send the initial message and store the message ID
        const sentMsg = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });
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
                

                if (messageType === '1.1') {
                    const down = await gifted.ytvideo(url, quality="360")
                    const downloadUrl = down.download_url;
                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    // Handle option 1 (Audio File)
                    await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
                }else if (messageType === '1.2') {
                    const down = await gifted.ytvideo(url, quality="480")
                    const downloadUrl = down.download_url;
                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    // Handle option 1 (Audio File)
                    await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
                }else if (messageType === '1.3') {
                    const down = await gifted.ytvideo(url, quality="720")
                    const downloadUrl = down.download_url;
                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    // Handle option 1 (Audio File)
                    await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
                }else if (messageType === '1.4') {
                    const down = await gifted.ytvideo(url, quality="1080")
                    const downloadUrl = down.download_url;
                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    // Handle option 1 (Audio File)
                    await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
                }else if (messageType === '2.1') {
                    const down = await gifted.ytvideo(url, quality="360")
                    const downloadUrl = down.download_url;
                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    // Handle option 1 (Audio File)
                    // Handle option 2 (Document File)
                    await conn.sendMessage(from, {
                        document: { url: downloadUrl },
                        mimetype: "video/mp4",
                        fileName: `${data.title}.mp4`,
                        caption: "*© QUEEN ANJU WHATSAPP BOT MD*"
                    }, { quoted: mek });
                }else if (messageType === '2.2') {
                    const down = await gifted.ytvideo(url, quality="480")
                    const downloadUrl = down.download_url;
                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    // Handle option 1 (Audio File)
                    // Handle option 2 (Document File)
                    await conn.sendMessage(from, {
                        document: { url: downloadUrl },
                        mimetype: "video/mp4",
                        fileName: `${data.title}.mp4`,
                        caption: "*© QUEEN ANJU WHATSAPP BOT MD*"
                    }, { quoted: mek });
                }else if (messageType === '2.3') {
                    const down = await gifted.ytvideo(url, quality="720")
                    const downloadUrl = down.download_url;
                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    // Handle option 1 (Audio File)
                    // Handle option 2 (Document File)
                    await conn.sendMessage(from, {
                        document: { url: downloadUrl },
                        mimetype: "video/mp4",
                        fileName: `${data.title}.mp4`,
                        caption: "*© QUEEN ANJU WHATSAPP BOT MD*"
                    }, { quoted: mek });
                }else if (messageType === '2.4') {
                    const down = await gifted.ytvideo(url, quality="1080")
                    const downloadUrl = down.download_url;
                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    // Handle option 1 (Audio File)
                    // Handle option 2 (Document File)
                    await conn.sendMessage(from, {
                        document: { url: downloadUrl },
                        mimetype: "video/mp4",
                        fileName: `${data.title}.mp4`,
                        caption: "*© QUEEN ANJU WHATSAPP BOT MD*"
                    }, { quoted: mek });} 

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

cmd({
    pattern: "ytmp4",
    desc: "Download YouTube videos as MP4.",
    react: "🎥",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a YouTube URL or title.");

        q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
🎥 *MP4 Download Found!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url} 

🎬 *Enjoy the video brought to you by Queen Anju Bot!* 

🔽 *To download send:*

*Video File* 🎶
   1.1 *360*
   1.2 *480*
   1.3 *720*
   1.4 *1080*
 *Document File* 📂
   2.1 *360*
   2.2 *480*
   2.3 *720*
   2.4 *1080*

> *Created with ❤️ by Janith Rashmika* 

> *© 𝙌𝙐𝙀𝙀𝙉 𝘼𝙉𝙅𝙐 𝘽𝙊𝙏 - MD*  
*💻 GitHub:* github.com/Mrrashmika/Queen_Anju-MD
`;

// Send the initial message and store the message ID
const sentMsg = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });
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

        if (messageType === '1.1') {
            const down = await gifted.ytvideo(url, quality="360")
            const downloadUrl = down.download_url;
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
            // Handle option 1 (Audio File)
            await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
        }else if (messageType === '1.2') {
            const down = await gifted.ytvideo(url, quality="480")
            const downloadUrl = down.download_url;
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
            // Handle option 1 (Audio File)
            await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
        }else if (messageType === '1.3') {
            const down = await gifted.ytvideo(url, quality="720")
            const downloadUrl = down.download_url;
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
            // Handle option 1 (Audio File)
            await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
        }else if (messageType === '1.4') {
            const down = await gifted.ytvideo(url, quality="1080")
            const downloadUrl = down.download_url;
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
            // Handle option 1 (Audio File)
            await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
        }else if (messageType === '2.1') {
            const down = await gifted.ytvideo(url, quality="360")
            const downloadUrl = down.download_url;
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
            // Handle option 1 (Audio File)
            // Handle option 2 (Document File)
            await conn.sendMessage(from, {
                document: { url: downloadUrl },
                mimetype: "video/mp4",
                fileName: `${data.title}.mp4`,
                caption: "*© QUEEN ANJU WHATSAPP BOT MD*"
            }, { quoted: mek });
        }else if (messageType === '2.2') {
            const down = await gifted.ytvideo(url, quality="480")
            const downloadUrl = down.download_url;
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
            // Handle option 1 (Audio File)
            // Handle option 2 (Document File)
            await conn.sendMessage(from, {
                document: { url: downloadUrl },
                mimetype: "video/mp4",
                fileName: `${data.title}.mp4`,
                caption: "*© QUEEN ANJU WHATSAPP BOT MD*"
            }, { quoted: mek });
        }else if (messageType === '2.3') {
            const down = await gifted.ytvideo(url, quality="720")
            const downloadUrl = down.download_url;
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
            // Handle option 1 (Audio File)
            // Handle option 2 (Document File)
            await conn.sendMessage(from, {
                document: { url: downloadUrl },
                mimetype: "video/mp4",
                fileName: `${data.title}.mp4`,
                caption: "*© QUEEN ANJU WHATSAPP BOT MD*"
            }, { quoted: mek });
        }else if (messageType === '2.4') {
            const down = await gifted.ytvideo(url, quality="1080")
            const downloadUrl = down.download_url;
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
            // Handle option 1 (Audio File)
            // Handle option 2 (Document File)
            await conn.sendMessage(from, {
                document: { url: downloadUrl },
                mimetype: "video/mp4",
                fileName: `${data.title}.mp4`,
                caption: "*© QUEEN ANJU WHATSAPP BOT MD*"
            }, { quoted: mek });}

        

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