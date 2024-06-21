const download = require('../mods/dwldr');

module.exports = {
    parse: async function() {
        const times = await download.file("stop_times.txt", "oct") // File is automaticly seperated

        if (times.includes("ERROR-")) {
            throw new Error("UPDATE (STOP_TIMES): ERROR: " + times)
        }
        const tms = times.filter((x) => {
            return x !== ""
        }).map(x => {
            const dts = x.split(",")
            const tp_id = dts[0].split("-")[0]
            //trip_id,arrival_time,stop_id,stop_sequence

            return {
                trip_id: dts[0],
                arrival_time: dts[1],
                stop_id: dts[3],
                stop_sequence: dts[4]
            }         
        })
        return tms
    }
}