const { Octokit } = require("@octokit/core");
const config = require("./../gh_config.json");
const octokit = new Octokit({ auth: process.env.GH_TOKEN });

module.exports = {
    push: async function (file, payload) {
        console.log()
        try {
            const request = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
                owner: config.owner,
                repo: "gtfsc",
                path: file,
                message: 'Update ' + file + ' via GH API',
                committer: {
                    name: '[GTFC WKLFW] ' + config.owner,
                    email: process.env.email
                },
                content: payload.content,
                sha: payload.sha,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })

        } catch (err) {
            console.log("HELPER (UPLOAD): Error pushing file")
            console.log(err)
            return ""
        }
    }
}