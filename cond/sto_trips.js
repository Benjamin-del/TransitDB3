const download = require('../mods/dwldr');

module.exports = {
    parse: async function () {
        const trips = await download.file("trips.txt", "sto") // File is automaticly seperated

        if (trips.includes("ERROR-")) {
            throw new Error("UPDATE (TRIPS): ERROR: " + times)

        }
        const tps = trips.map(x => {
            const dts = x.split(",")
            if (dts[0]) {
                // Modify Collunms
                //route_id,service_id,trip_id,trip_headsign,direction_id,block_id (x) ,shape_id,wheelchair_accessible (x)
                return dts[0] + "," + dts[1] + "," + dts[2] + "," + dts[3] + "," + dts[4] + "," + dts[6]
            } else {
                return ""
            }
        })
        // Each codn module should return the file as an array
        return tps
    }
}