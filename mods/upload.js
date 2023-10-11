const { Octokit } = require("@octokit/core");
const config = require("./../gh_config.json");
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

module.exports = {
    push: async function (file, payload) {
        console.log()
        try {
            const request = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
                owner: "Benjamin-Del",
                repo: "gtfsc",
                path: file,
                message: 'Update ' + file + ' via GH API',
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