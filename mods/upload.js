const fs = require('fs');

module.exports = {
    push: async function (ag, file, data) {
        try {
            //const octokit = new Octokit({ auth: payload.token });
            fs.writeFileSync("gtfs/" + ag + "/" + file, data)
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