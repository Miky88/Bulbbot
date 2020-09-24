const mongoose = require("mongoose");
var clc = require("cli-color");

const Infraction = require("../models/infraction");

module.exports = {
  // Add a new infraction to the database
  Add: async (guildId, action, targetId, moderatorId, reason) => {
    const inf = new Infraction({
      _id: mongoose.Types.ObjectId(),
      guildID: guildId,
      action: action,
      targetID: targetId,
      moderatorID: moderatorId,
      reportReason: reason,
      date: new Date(),
    });
    inf.save().catch((err) => console.error(clc.red(err)));
  },

  Remove: async (id, guildId) => {
    Infraction.findOneAndDelete(
      {
        _id: id,
        guildID: guildId,
      },
      (err, _res) => {
        if (err) console.error(clc.red(err));
      }
    );
  },

  Claim: async (id, guildId, moderatorId) => {
    Infraction.findOneAndUpdate(
      { _id: id, guildID: guildId },
      { moderatorID: moderatorId },
      function (err) {
        if (err) {
          console.error(clc.red(err));
        }
      }
    );
  },

  Update: async (id, guildId, reason) => {
    Infraction.findOneAndUpdate(
      { _id: id, guildID: guildId },
      { reportReason: reason },
      function (err) {
        if (err) {
          console.error(clc.red(err));
        }
      }
    );
  },
};
