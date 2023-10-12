const fs = require('fs');

const data = {
    update: new Date().toISOString()
}

console.log("Update done!")
fs.writeFileSync("update.json", JSON.stringify(data))