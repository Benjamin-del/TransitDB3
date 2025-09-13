const download = require('../mods/dwldr');

module.exports = {
    parse: async function () {
        const routes = await download.file("routes.txt", "oct") // File is automaticly seperated

        if (routes.includes("ERROR-")) {
            throw new Error("UPDATE (ROUTES): ERROR: " + times)

        }
        const rts = routes.filter((x) => {
            return x !== "" || x.split(",")[0] !== "route_id"
        }).map(x => {
            const dts = x.split(",")
            //route_id,agency_id,route_short_name,route_long_name,route_desc,route_type,route_url,route_color,route_text_color,route_sort_order,continuous_pickup,continuous_drop_off,network_id
            //route_id,route_short_name,route_long_name,route_color,route_text_color

            return {
                route_id: dts[0],
                route_short_name: dts[2],
                route_long_name: dts[3],
                route_color: dts[7],
                route_text_color: dts[8]
            }
        })
        // Each codn module should return the file as an array
        return rts
    }
}


