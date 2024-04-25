const download = require('../mods/dwldr');

module.exports = {
    parse: async function () {
        const stops = await download.file("stops.txt", "oct")

        
        if (stops.includes("ERROR-")) {
            throw new Error("UPDATE (TRIPS): ERROR: " + times)
        }
        return stops.map(x => {
            const dts = x.split(",")
            if (dts[0]) {
                //PERFERED: stop_id,stop_code,stop_name,stop_lat,stop_lon
                return dts[0] + "," + dts[1] + "," + dts[2] + "," + dts[5] + "," + dts[6]
            } else {
                return ""
            }
        })
    }
}