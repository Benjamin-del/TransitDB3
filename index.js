require('dotenv').config()

// My Modules
const download = require('./mods/dwldr');
const getsha = require('./mods/getsha');
const gh = require("./mods/upload")

prepfile()
async function prepfile() {
    console.log("UPDATE (TRIPS): Condensing File...")
    const trips = await download.file("trips.txt") // File is automaticly seperated
    if (trips.includes("ERROR-")) {
        console.log(trips)
    }
    const tps = trips.map(x => {
        const dts = x.split(",")
        if (dts[0]) {
            // Modify Collunms
            const rt_id = dts[0].split("-")[0]
            const tp_id = dts[2].split("-")[0]
            //route_id,service_id,trip_id,direction_id,shape_id
            return rt_id + "," + dts[1] + "," + tp_id + "," + dts[4] + "," + dts[6]
        } else {
            return ""
        }
    })
    console.log("UPDATE (TRIPS): Condensed File")
    const sha = await getsha.get("trips.txt")
    
    console.log("UPDATE (TRIPS): Uploading to GH...")
    const tps_j = tps.join("\n")
    console.log(sha)
    gh.push("trips.txt", {
        sha: sha,
        content: Buffer.from(tps_j).toString('base64')
    })

    console.log("UPDATE (TRIPS): File uploaded! ")
}
