require('dotenv').config()
// My Modules
const gh = require("./mods/upload")

// Condense modules 
const trips = require("./cond/sto_trips")
const stop_times = require("./cond/sto_stop_times")
const download = require("./mods/dwldr")
const stop_locations = require("./cond/sto_stops")

const parse_routes = require("./cond/sto_agency_routes")
process.argv.forEach(async (x)=>{
    const dts = x.split("=")
    if (dts[0] === "file") {
        console.log("UPDATE (INDEX): File passed to args")
        if (dts[1] === "trips.txt" || dts[1] === "stop_times.txt" || dts[1] === "parse_routes.json" || dts[1] === "stops.txt") {
            console.log("UPDATE (INDEX): Condensing File...")
            if (dts[1] === "trips.txt") {             /* Special file trips.txt */
                const tps = await trips.parse()
                prepfile("trips.txt",tps)
            } else if (dts[1] === "stop_times.txt") { /* Special file stop_times.txt */
                const tms = await stop_times.parse()
                prepfile("stop_times.txt",tms)
            } else if (dts[1] === "stops.txt") { /* Special file stop_times.txt */
                const tms = await stop_locations.parse()
                prepfile("stops.txt",tms)
            } else if (dts[1] === "parse_routes.json") { /* This file is not in the GTFS spec */
                console.log("CUSTOM!")
                const rts = await parse_routes.parse()
                await gh.push("sto", "routes.json", JSON.stringify(rts, null, 4))
            }
        } else {
            const content = await download.file(dts[1], "sto")
            prepfile(dts[1], content)
        }
    }
})

//prepfile()
async function prepfile(file,data) {
    console.log("UPDATE (" + file + "): Condensing File...")
    const joined_data = data.join("\n")
    console.log("UPDATE (" + file + "): Condensed File")
    await gh.push("sto", file, joined_data)
    console.log("UPDATE (TRIPS): File uploaded! ")
}
