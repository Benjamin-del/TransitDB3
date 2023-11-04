require('dotenv').config()
// My Modules
const gh = require("./mods/upload")

// Condense modules 
//const trips = require("./cond/via_trips")
const stop_times = require("./cond/via_stop_times")
const download = require("./mods/dwldr")

/* VIA TRIPS IS ALREADY CONDENSED */

process.argv.forEach(async (x)=>{
    const dts = x.split("=")
    if (dts[0] === "file") {
        console.log("UPDATE (INDEX): File passed to args")
        if (/*dts[1] === "trips.txt" || */dts[1] === "stop_times.txt") {
            console.log("UPDATE (INDEX): Condensing File...")
            /* VIA DOSEN'T NEED TO BE CONDENSED */
           /* if (dts[1] === "trips.txt") {             
                const tps = await trips.parse()
                prepfile("trips.txt",tps)
            } else */if (dts[1] === "stop_times.txt") { /* Special file stop_times.txt */
                const tms = await stop_times.parse()
                prepfile("stop_times.txt",tms)
            } 
        } else {
            const content = await download.file(dts[1], "via")
            prepfile(dts[1], content)
        }
    }
})

//prepfile()
async function prepfile(file,data) {
    console.log("UPDATE (" + file + "): Condensing File...")
    const joined_data = data.join("\n")
    console.log("UPDATE (" + file + "): Condensed File")
    await gh.push("via", file, joined_data)
    console.log("UPDATE (TRIPS): File uploaded! ")
}
