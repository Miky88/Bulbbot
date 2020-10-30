const Guild = require("../../models/guild");
const moment = require("moment");
const clc = require("cli-color");

module.exports = {
	Mod_action: async (client, guildId, log, file) => {
		Guild.findOne(
			{
				guildID: guildId,
			},
			async (err, res) => {
				if (err) console.error(`[Send Log - Mod Action] ${clc.red(err)}`);
				if (res === null || res.logChannels.modAction === "") return;

				if (file === "")
					client.channels.cache
						.get(res.logChannels.modAction)
						.send(`\`\`[${moment().format("hh:mm:ss a")}]\`\` ${log}`);
				else
					client.channels.cache
						.get(res.logChannels.modAction)
						.send(`\`\`[${moment().format("hh:mm:ss a")}]\`\` ${log}`, {
							files: [file],
						});
			}
		);
	},

	Message_Log: async (client, guildId, log) => {
		Guild.findOne(
			{
				guildID: guildId,
			},
			async (err, res) => {
				if (err) console.error(`[Send Log - Message Log] ${clc.red(err)}`);
				if (res === null || res.logChannels.message === "") return;

				client.channels.cache
					.get(res.logChannels.message)
					.send(`\`\`[${moment().format("hh:mm:ss a")}]\`\` ${log}`);
			}
		);
	},

	Member_Updates: async (client, guildId, log) => {
		Guild.findOne(
			{
				guildID: guildId,
			},
			async (err, res) => {
				if (err) console.error(`[Send Log - Member Update] ${clc.red(err)}`);
				if (res === null || res.logChannels.member === "") return;

				client.channels.cache
					.get(res.logChannels.member)
					.send(`\`\`[${moment().format("hh:mm:ss a")}]\`\` ${log}`);
			}
		);
	},

	Join_leave_log: async (client, guildId, log) => {
		Guild.findOne(
			{
				guildID: guildId,
			},
			async (err, res) => {
				if (err) console.error(`[Send Log - Join Leave] ${clc.red(err)}`);
				if (res === null || res.logChannels.join_leave === "") return;

				client.channels.cache
					.get(res.logChannels.join_leave)
					.send(`\`\`[${moment().format("hh:mm:ss a")}]\`\` ${log}`);
			}
		);
	},
};