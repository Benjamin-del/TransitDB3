const download = require('../mods/dwldr');

module.exports = {
    parse: async function () {
        const trips = await download.file("trips.txt", "oct") // File is automaticly seperated

        if (trips.includes("ERROR-")) {
            throw new Error("UPDATE (TRIPS): ERROR: " + times)

        }
        const tps = trips.map(x => {
            const dts = x.split(",")
            if (dts[0]) {
                // Modify Collunms
                const rt_id = dts[0].split("-")[0]
                const tp_id = dts[2].split("-")[0]
                //route_id (0),service_id (1),trip_id (2),trip_headsign (3) ,trip_short_name (4),direction_id (5),block_id (6),shape_id (7),wheelchair_accessible,bikes_allowed
                //route_id,service_id,trip_id,trip_headsign,direction_id,block_id,shape_id
                return rt_id + "," + dts[1] + "," + tp_id + "," + dts[3] + "," + dts[5] + "," + dts[6] + "," + dts[7]
            } else {
                return ""
            }
        })
        // Each codn module should return the file as an array
        return tps
    }
}