const { Octokit } = require("@octokit/core");
const config = require("./../gh_config.json");
const octokit = new Octokit({ auth: "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" });

module.exports = {
    get: async function (file) {
        try {
            const request = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                owner: config.owner,
                repo: config.repo,
                path: file,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })
            return request.data.sha
        } catch (err) {
            console.log("HELPER (GET-SHA): Error getting SHA")
            console.log(err)
            return ""
        }
    }
}