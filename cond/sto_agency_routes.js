require('dotenv').config()

const gh = require("../mods/upload")

const dwldr = require("../mods/dwldr")

module.exports = {
    parse: async function () {
        const data = await dwldr.file("trips.txt", "sto")
        const trips = []
        data.forEach((x) => {
            const trip = x.split(",")
            if (trip[0] !== "route_id" && trip[0] !== "") {
                trips.push({
                    route_id: trip[0].split("-")[0],
                    headsign: trip[3].replace(/\"/g, ""),
                    shape_id: trip[6].replace("\r", "")
                })
            }
        })
        const uniqueTrips = trips.reduce((acc, trip) => {
            if (acc[trip.route_id]) {
                if (!acc[trip.route_id].shape_ids.includes(trip.shape_id)) {
                    acc[trip.route_id].shape_ids.push(trip.shape_id);
                }
                if (!acc[trip.route_id].headsigns.includes(trip.headsign)) {
                    acc[trip.route_id].headsigns = acc[trip.route_id].headsigns ? `${acc[trip.route_id].headsigns} - ${trip.headsign}` : trip.headsign;
                }
            } else {
                acc[trip.route_id] = { shape_ids: [trip.shape_id], headsigns: trip.headsign };
            }
            return acc;
        }, {});

        const result = Object.keys(uniqueTrips).map(route_id => ({ route_id, shape_id: uniqueTrips[route_id].shape_ids, headsign: uniqueTrips[route_id].headsigns })); 
        //console.log("result", result)

        console.log("HELPER (TRIPS): File condensed")
        return { agency: "STO", routes: result }
    }
}