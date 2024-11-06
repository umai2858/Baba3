/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                                                                                                                                         //
//________/\\\________/\\\________/\\\__/\\\\\\\\\\\\\\\__/\\\\\\\\\\\\\\\__/\\\\\_____/\\\_______________/\\\\\\\\\_____/\\\\\_____/\\\______/\\\\\\\\\\\__/\\\________/\\\____________/\\\\____________/\\\\__/\\\\\\\\\\\\____          //
// _____/\\\\/\\\\____\/\\\_______\/\\\_\/\\\///////////__\/\\\///////////__\/\\\\\\___\/\\\_____________/\\\\\\\\\\\\\__\/\\\\\\___\/\\\_____\/////\\\///__\/\\\_______\/\\\___________\/\\\\\\________/\\\\\\_\/\\\////////\\\__         //
//  ___/\\\//\////\\\__\/\\\_______\/\\\_\/\\\_____________\/\\\_____________\/\\\/\\\__\/\\\____________/\\\/////////\\\_\/\\\/\\\__\/\\\_________\/\\\_____\/\\\_______\/\\\___________\/\\\//\\\____/\\\//\\\_\/\\\______\//\\\_        //
//   __/\\\______\//\\\_\/\\\_______\/\\\_\/\\\\\\\\\\\_____\/\\\\\\\\\\\_____\/\\\//\\\_\/\\\___________\/\\\_______\/\\\_\/\\\//\\\_\/\\\_________\/\\\_____\/\\\_______\/\\\___________\/\\\\///\\\/\\\/_\/\\\_\/\\\_______\/\\\_       //
//    _\//\\\______/\\\__\/\\\_______\/\\\_\/\\\///////______\/\\\///////______\/\\\\//\\\\/\\\___________\/\\\\\\\\\\\\\\\_\/\\\\//\\\\/\\\_________\/\\\_____\/\\\_______\/\\\___________\/\\\__\///\\\/___\/\\\_\/\\\_______\/\\\_      //
//     __\///\\\\/\\\\/___\/\\\_______\/\\\_\/\\\_____________\/\\\_____________\/\\\_\//\\\/\\\___________\/\\\/////////\\\_\/\\\_\//\\\/\\\_________\/\\\_____\/\\\_______\/\\\___________\/\\\____\///_____\/\\\_\/\\\_______\/\\\_     //
//      ____\////\\\//_____\//\\\______/\\\__\/\\\_____________\/\\\_____________\/\\\__\//\\\\\\___________\/\\\_______\/\\\_\/\\\__\//\\\\\\__/\\\___\/\\\_____\//\\\______/\\\____________\/\\\_____________\/\\\_\/\\\_______/\\\__    //
//       _______\///\\\\\\___\///\\\\\\\\\/___\/\\\\\\\\\\\\\\\_\/\\\\\\\\\\\\\\\_\/\\\___\//\\\\\___________\/\\\_______\/\\\_\/\\\___\//\\\\\_\//\\\\\\\\\_______\///\\\\\\\\\/_____________\/\\\_____________\/\\\_\/\\\\\\\\\\\\/___   //
//        _________\//////______\/////////_____\///////////////__\///////////////__\///_____\/////____________\///________\///__\///_____\/////___\/////////__________\/////////_______________\///______________\///__\////////////_____  //
//                                                                                                                                                                                                                                         //
//                                           ===========================================================*CREATED BY GAMING RASH*=====================================================                                                      //
//                                                                                                                                                                                                                                         //       
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "ANJU-MD=vN0nAbYC#2jh77B9WWyJ1UskOlWNs4fyx8oxX1vR6JuGIIK6HjHs",
ALIVE_IMG: process.env.ALIVE_IMG || "https://raw.githubusercontent.com/Mrrashmika/Database/refs/heads/main/WhatsApp%20Image%202024-09-08%20at%209.00.17%20PM.jpeg",
PREFIX: process.env.PREFIX || ".",
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
MODE: process.env.MODE || "public",
BOT_NUMBER: process.env.BOT_NUMBER || "94717775628",
OWNER_REACT: process.env.OWNER_REACT || "🔆",
OMDB_API_KEY: process.env.OMDB_API_KEY || "76cb7f39",
READ_CMD: process.env.READ_CMD || "true",
AUTO_VOICE: process.env.AUTO_VOICE || "true",
AUTO_STICKER: process.env.AUTO_STICKER || "true",
AUTO_REPLY: process.env.AUTO_REPLY || "true",
AUTO_REACT: process.env.AUTO_REACT || "true",
WELCOME: process.env.WELCOME || "false",  //To turn on or off welcome msg and goodbye msg..
ANTI_BAD: process.env.ANTI_BAD || "true",
ANTI_BOT: process.env.ANTI_BOT || "true",
ANTI_LINK: process.env.ANTI_LINK || "true",
ALLWAYS_ONLINE: process.env.ALLWAYS_ONLINE || "true",
MOROCCO_BLOCK: process.env.MOROCCO_BLOCK || "true", // +212 number block..
};
