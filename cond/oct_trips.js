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
                //route_id,service_id,trip_id,trip_headsign,direction_id,block_id,shape_id
                //route_id,service_id,trip_id,direction_id,shape_id
                return rt_id + "," + dts[1] + "," + tp_id + "," + dts[3] + "," + dts[4] + "," + dts[6]
            } else {
                return ""
            }
        })
        // Each codn module should return the file as an array
        return tps
    }
}