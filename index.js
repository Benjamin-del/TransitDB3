require('dotenv').config()

// Config Vars

// My Modules
const getsha = require('./mods/getsha');
const gh = require("./mods/upload")

// Condense modules 
const trips = require("./cond/trips")
const stop_times = require("./cond/stop_times")
var token = ""
process.argv.forEach(async (x)=>{
    const dts = x.split("=")
    if(dts[0] === "token" ) {
        if (dts[1] === "env") {
            console.log("UPDATE (INDEX): Using Env Token (GH_TOKEN)")
            token = process.env.GH_TOKEN
        } else {
            console.log("UPDATE (INDEX): Using Token from Args (token)")
            token = dts[1]
        }
    } else if (dts[0] === "file") {
        console.log("UPDATE (INDEX): File passed to args")
        if (dts[1] === "trips.txt" || dts[1] === "stop_times.txt") {
            console.log("UPDATE (INDEX): Condensing File...")
            if (dts[1] === "trips.txt") {
                const tps = await trips.parse()
                prepfile("trips.txt",tps)
            } else if (dts[1] === "stop_times.txt") {
                const tms = await stop_times.parse()
                prepfile("stop_times.txt",tms)
            }
        }
    }
})
// Check variables
if (token === "") {
    throw new Error('Token is not defined');
} 

//prepfile()
async function prepfile(file,data) {
    console.log("UPDATE (" + file + "): Condensing File...")
    console.log("UPDATE (" + file + "): Condensed File")
    const sha = await getsha.get(file)
    
    console.log("UPDATE (" + file + "): Uploading to GH...")
    const joined_data = data.join("\n")
    //console.log(sha)
    gh.push("trips.txt", {
        sha: sha,
        content: Buffer.from(joined_data).toString('base64'),
        token: token
    })

    console.log("UPDATE (TRIPS): File uploaded! ")
}
