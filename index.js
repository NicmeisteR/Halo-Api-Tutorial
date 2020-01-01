// NPM package I made to do simple functions like, get requests and write files. 
// More here: https://github.com/NicmeisteR/Node-Essentials
const node = require("node-essentials");

// Global Variable for the Players Service Record object.
let serviceRecord;

// The Halo 5 API key, can be found here: https://developer.haloapi.com/products/560af1e42109182040fb56fc
const apiKey = "API-KEY-COMES-HERE"


// Async function to retrieve the player Service Record.
async function get(gamertag){
    try {
        serviceRecord = await node.get(
            // The below link is the api that I'm targetting and I'm passing through the gamertag.
            `https://www.haloapi.com/stats/h5/servicerecords/arena?players=${gamertag}&=`,
            ["Ocp-Apim-Subscription-Key", apiKey]
        )
    .then(console.log("done"));
    }
    finally{
        // Once we recieve the promise we print it to a file in the output folder called serviceRecord.json
        node.writeToFile("output", "serviceRecord", "json", serviceRecord);
    }
};

// Exectue the above Async get method with the gamertag of your choice.
get("Final Necessity");