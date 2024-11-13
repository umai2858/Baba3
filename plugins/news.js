let lastNewsTitles = {
    hiru: {},
    sirasa: {},
    derana: {}
};
const axios = require('axios');

// Function to get the latest news from Hiru
async function getHiruNews() {
    try {
        const response = await axios.get('https://dark-yasiya-news-apis.vercel.app/api/hiru');
        if (response.data.status) {
            const news = response.data.result;
            return {
                title: news.title,
                content: news.desc,
                date: news.date,
                url: news.url,
                image: news.image
            };
        }
        return null;
    } catch (err) {
        console.error(`Error fetching Hiru News: ${err.message}`);
        return null;
    }
}

// Function to get the latest news from Sirasa
async function getSirasaNews() {
    try {
        const response = await axios.get('https://dark-yasiya-news-apis.vercel.app/api/sirasa');
        if (response.data.status) {
            const news = response.data.result;
            return {
                title: news.title,
                content: news.desc,
                date: news.date,
                url: news.url,
                image: news.image
            };
        }
        return null;
    } catch (err) {
        console.error(`Error fetching Sirasa News: ${err.message}`);
        return null;
    }
}

// Function to get the latest news from Derana
async function getDeranaNews() {
    try {
        const response = await axios.get('https://dark-yasiya-news-apis.vercel.app/api/derana');
        if (response.data.status) {
            const news = response.data.result;
            return {
                title: news.title,
                content: news.desc,
                date: news.date,
                url: news.url,
                image: news.image
            };
        }
        return null;
    } catch (err) {
        console.error(`Error fetching Derana News: ${err.message}`);
        return null;
    }
}

// Function to send news to a group
async function sendNews(conn, groupId, news, source) {
    if (news) {
        // Check if the title is different before sending
        if (lastNewsTitles[source][groupId] !== news.title) {
            lastNewsTitles[source][groupId] = news.title; // Update the last news title sent to the group
            
            // Constructing the message
            let message = `📰 *${source} News*\n\n*Title:* ${news.title}\n\n*Description:* ${news.content}\n\n*Published On:* ${news.date}`;
            if (news.url) message += `\n\n*Read more:* ${news.url}`;
            message += `\n\n> *POWERD BY QUEEN ANJU MD*`; // Add caption

            // Check if there is an image to send
            if (news.image) {
                await conn.sendMessage(groupId, {
                    image: { url: news.image },
                    caption: message,
                    contextInfo: {
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
            } else {
                await conn.sendMessage(groupId, { 
                    text: message,
                    contextInfo: {
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
        }
    }
}

async function checkAndPostNews(conn, groupId) {
    const hiruNews = await getHiruNews();
    const sirasaNews = await getSirasaNews();
    const deranaNews = await getDeranaNews();

    // Send Hiru News
    await sendNews(conn, groupId, hiruNews, 'hiru');

    // Send Sirasa News
    await sendNews(conn, groupId, sirasaNews, 'sirasa');

    // Send Derana News
    await sendNews(conn, groupId, deranaNews, 'derana');
}

// Export function to start the news interval for external use
function startNewsService(conn, nsjid) {
    if (!startNewsService.interval) {
        startNewsService.interval = setInterval(async () => {
            if (nsjid) { // Check if nsjid (group ID) is provided
                await checkAndPostNews(conn, nsjid);
            }
        }, 60000); // Runs every 60 seconds
    }
}

module.exports = { startNewsService, checkAndPostNews, sendNews };