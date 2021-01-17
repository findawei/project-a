const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrganizationSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = Org = mongoose.model("organizations", OrganizationSchema);
