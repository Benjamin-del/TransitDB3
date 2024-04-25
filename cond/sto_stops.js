const download = require('../mods/dwldr');

module.exports = {
    parse: async function () {
        const stops = await download.file("stops.txt", "sto")
        // STO: stop_id,stop_code,stop_name,stop_desc,stop_lat,stop_lon,zone_id,stop_url,location_type,wheelchair_boarding
        // OCT: stop_id,stop_code,stop_name,tts_stop_name,stop_desc,stop_lat,stop_lon,zone_id,stop_url,location_type,parent_station,stop_timezone,wheelchair_boarding,level_id,platform_code
    
        if (stops.includes("ERROR-")) {
            throw new Error("UPDATE (TRIPS): ERROR: " + times)
        }
        return stops.map(x => {
            const dts = x.split(",")
            if (dts[0]) {
                //PERFERED: stop_id,stop_code,stop_name,stop_lat,stop_lon
                return dts[0] + "," + dts[1] + "," + dts[2] + "," + dts[4] + "," + dts[5]
            } else {
                return ""
            }
        })
    }
}