const { Octokit } = require("@octokit/core");
const config = require("./../gh_config.json");
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

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
            return ""
        }
    }
}