const download = require('../mods/dwldr');

module.exports = {
    parse: async function () {
        const stops = await download.file("stops.txt", "oct")
        if (stops.includes("ERROR-")) {
            throw new Error("UPDATE (TRIPS): ERROR: " + times)
        }
        return stops.filter((x) => {
            return x !== ""
        }).map(x => {
            const dts = x.split(",")
            return {
                stop_id: dts[0],
                stop_code: dts[1],
                stop_name: dts[2],
                stop_lat: dts[5],
                stop_lon: dts[6]
            }
        })
    }
}