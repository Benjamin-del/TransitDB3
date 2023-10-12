const { Octokit } = require("@octokit/core");
const config = require("./../gh_config.json");

module.exports = {
    push: async function (file, payload) {
        console.log()
        try {
            const octokit = new Octokit({ auth: payload.token });

            const request = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
                owner: config.owner,
                repo: "gtfsc",
                path: "gtfs/" + file,
                message: 'Update ' + file + ' via GH API',
                content: payload.content,
                sha: payload.sha,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })
            console.log("HELPER (UPLOAD): Response Code: " + request.status)
            console.log(request)
        } catch (err) {
            console.log("HELPER (UPLOAD): Error pushing file")
            console.log(err)
            return ""
        }
    }
}