const fs = global.nodemodule["fs-extra"];
const axios = require("axios");

module.exports.config = {
  name: "goibot",
  version: "4.3.0",
  hasPermssion: 0,
  credits: "⚡ Henry ⚡",
  description: "Trigger Based Funny + Flirty Bot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 2,
};

module.exports.handleEvent = async function ({ api, event, Users }) {
  const { threadID, messageID, body, senderID } = event;
  if (!body) return;

  const name = await Users.getNameUser(senderID);
  const userInfo = await Users.getData(senderID);
  const gender = userInfo.gender || "MALE";
  const text = body.toLowerCase();

  // ------------------- NORMAL FUNNY REPLIES -------------------
  const randomReplies = [
    `😂 ${name}, Chal Thodi Masti Ho Jaye!`,
    `🔥 ${name}, Aaj Mood Mast Hai!`,
    `😏 ${name}, Tu Fir Se Aa Gya?`,
    `🤣 ${name}, Ab To Friend Ban Gaye Hum!`,
    `👑 ${name}, King Ki Entry Ho Gayi!`,
    `😈 ${name}, Dikkat Kya Hai Bata!`,
    `🥵 ${name}, Thoda Shaant Ho Ja Bhai!`,
    `⚡ ${name}, Mujhe Bulaya? Ab Maja Aayega!`
  ];

  // ------------------- BOT SPECIFIC REPLIES -------------------
  const botReplies = [
    `🤖 ${name}, Bot Hoon Main... But Dil Se Dost 😎`,
    `😂 ${name}, Bot Ko Bula Liya... Ab Masti Dekho!`,
    `🔥 ${name}, Hacker Mode Activated 💻`,
    `😈 ${name}, Ab Main Full Power Me Hoon!`,
    `😜 ${name}, Bot Bhi Thoda Attitude Wala Hai 😉`,
    `🤣 ${name}, Bot Bulane Ka Charge Lagega Ab!`,
    `👾 ${name}, Welcome To Dark Side Of Bot 🔥`,
    `🤭 ${name}, Bot + You = Full Comedy Show!`,
    `🧠 ${name}, Main Sirf Bot Nahi... Smart Bot Hoon 😏`,
    `⚡ ${name}, Arey Bhai... Bot Aagya Hai Maja Lo!`
  ];

  // ------------------- FLIRTY REPLIES (ONLY FOR FEMALE USERS) -------------------
  const flirtyReplies = [
    `😉 ${name}, Tumhari Smile To Dil Chura Legi 😍`,
    `🔥 ${name}, Tum Online Ho To Mood Hi Change Ho Jata Hai 😏`,
    `😘 ${name}, Itni Cute Kyun Ho Yaar?`,
    `🥵 ${name}, Aaj To Dangerous Lag Rahi Ho 🔥`,
    `💘 ${name}, Tumhari DP Dekh Ke Dil Garden-Garden Ho Gaya 🌸`,
    `😜 ${name}, Tumse Milne Ka Fine Lagta Hai Mujhe 😅`,
    `💋 ${name}, Ek Baar Smile Kar Do Pure GC Me Light Aa Jayegi 😍`,
    `🤭 ${name}, Tum Online Ho Bas Din Ban Gaya!`
  ];

  let reply;

  // --- CONDITION CHECK ---
  if (text.includes("bot")) {
    // Agar female hai to flirty reply do
    if (gender.toUpperCase() === "FEMALE") {
      reply = flirtyReplies[Math.floor(Math.random() * flirtyReplies.length)];
    } else {
      reply = botReplies[Math.floor(Math.random() * botReplies.length)];
    }
  } else {
    return; // koi "bot" nahi bola -> kuch reply mat karo
  }

  // --- Typing Animation ---
  api.sendTypingIndicator(threadID, true);
  setTimeout(() => {
    api.sendMessage(reply, threadID, messageID);
  }, 700);

  // --- Sticker/GIF Chance ---
  if (Math.random() < 0.2) {
    try {
      const imgURL = "https://i.ibb.co/3C9t1fr/funny-sticker.png";
      const stream = (await axios.get(imgURL, { responseType: "stream" })).data;
      api.sendMessage({ attachment: stream }, threadID);
    } catch (err) {
      console.log("Sticker send failed:", err.message);
    }
  }
};

module.exports.run = () => {};
