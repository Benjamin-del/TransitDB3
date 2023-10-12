require('dotenv').config()
// My Modules
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

//prepfile()
async function prepfile(file,data) {
    console.log("UPDATE (" + file + "): Condensing File...")
    const joined_data = data.join("\n")
    console.log("UPDATE (" + file + "): Condensed File")
    await gh.push(file, joined_data)
    console.log("UPDATE (TRIPS): File uploaded! ")
}
