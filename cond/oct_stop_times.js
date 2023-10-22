const download = require('../mods/dwldr');

module.exports = {
    parse: async function() {
        const times = await download.file("stop_times.txt", "oct") // File is automaticly seperated

        if (times.includes("ERROR-")) {
            throw new Error("UPDATE (STOP_TIMES): ERROR: " + times)
        }
        const tms = times.map(x => {
            const dts = x.split(",")
            if (dts[0]) {
            // Modify Collunms
            const tp_id = dts[0].split("-")[0]
            //console.log(tp_id)
            return tp_id + "," + dts[1] + "," + dts[3] + "," +  dts[4]
            
            } else {
                return ""
            }
            
        })
        return tms
    }
}