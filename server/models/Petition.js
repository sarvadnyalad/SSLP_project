const mongoose = require("mongoose");

const PetitionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  petitioner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["open", "closed"], default: "open" },
  signatures: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  response: { type: String, default: "" },
});

module.exports = mongoose.model("Petition", PetitionSchema);
