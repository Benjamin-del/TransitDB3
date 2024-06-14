require('dotenv').config()

const stop_locations = require("./cond/oct_stops")
const trips = require("./cond/oct_trips")
const stop_times = require("./cond/oct_stop_times")
const routes = require("./cond/oct_routes")
const download = require('./mods/dwldr')

const fs = require('fs')

const agConfig = require("./config.json")

const { PrismaClient } = require('@prisma/client')
const dwldr = require('./mods/dwldr')
const prisma = new PrismaClient()

agConfig.agencies.forEach(async (ag) => {
    // Parse the tables
    await parseTable(ag)
})

async function findParseModule(file) {
    if (file === "stops.txt") {
        return await stop_locations.parse()
    } else if (file === "trips.txt") {
        return await trips.parse()
    } else if (file === "stop_times.txt") {
        return await stop_times.parse()
    } else if (file === "routes.txt") {
        return await routes.parse()
    } else {
        console.log("No parse module found for " + file)
        const data = await dwldr.file(file, "oct")
        
        const rows = data.filter((x) => {
            return x !== ""
        }).map((x) => {
            return x.replace(/\r/g, '')
        })

        
        function transformToObj(keys, rows) {
            return rows.map(row => {
                return row.split(",")
            }).map(row => {
                const resultObj = {};
                keys.forEach((key, index) => {
                    resultObj[key] = row[index].replace(/"/g, '');
                });
                return resultObj;
            });
        }
        return transformToObj(rows[0].split(","), rows)
    }
}
async function parseTable(ag) {

    const tbs = ag.tables.filter((x) => {
        return x.active
    })
    for (const table of tbs) {

        // Delete all rows from the table
        await prisma[table.db_name].deleteMany()
        // Parse the file
        const data = await findParseModule(table.file)
        // Insert the data

        function chunkArray(data, chunkSize) {
            const chunks = [];
            for (let i = 0; i < data.length; i += chunkSize) {
                chunks.push(data.slice(i, i + chunkSize));
            }
            return chunks;
        }

        async function insertDataInChunks(data, chunkSize) {
            const chunks = chunkArray(data, chunkSize);

            for (const chunk of chunks) {
                try {
                    const dataInsert = await prisma[table.db_name].createMany({
                        data: chunk
                    });
                    console.log(`${dataInsert.count} records inserted.`);
                } catch (error) {
                    console.error('Error inserting data chunk:', error);
                    throw new Error('Error inserting data chunk:', error);
                }
            }
        }

        // Example usage
        const chunkSize = 5000; 
        insertDataInChunks(data, chunkSize);

    }
}
