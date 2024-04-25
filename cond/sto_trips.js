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
                dts.pop()
                return dts.join(",")
            } else {
                return ""
            }
        })
        // Each codn module should return the file as an array
        return tps
    }
}