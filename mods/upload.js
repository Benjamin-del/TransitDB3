const { Octokit } = require("@octokit/core");
const config = require("./../gh_config.json");
const fs = require('fs');

module.exports = {
    push: async function (file, data) {
        try {
            //const octokit = new Octokit({ auth: payload.token });
            fs.writeFileSync("gtfs/" + file, data)
            console.log("HELPER (UPLOAD): File written to disk")
            //console.log(request)
            return
        } catch (err) {
            console.log("HELPER (UPLOAD): Error pushing file")
            console.log(err)
            return ""
        }
    }
}