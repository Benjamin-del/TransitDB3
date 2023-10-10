const { Octokit } = require("@octokit/core");
const config = require("./../gh_config.json");
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

module.exports = {
    push: async function(file,payload) {
        const request = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: config.owner,
            repo: config.repo,
            path: file,
            message: 'my commit message',
            committer: {
              name: config.owner + " (via GH API)",
              email: config.email
            },
            content: payload.content,
            sha: payload.sha,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })
          
    }
}