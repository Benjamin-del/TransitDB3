const { Octokit } = require("@octokit/core");
const config = require("./../gh_config.json");
const octokit = new Octokit({ auth: "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" });

module.exports = {
    push: async function(file,payload) {
        try {
        const request = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: config.owner,
            repo: config.repo,
            path: file,
            message: 'Update ' + file + ' via GH API',
            committer: {
              name: config.owner + " (API)",
              email: config.email
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