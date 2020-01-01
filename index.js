// NPM package I made to do simple functions like, get requests and write files. 
// More here: https://github.com/NicmeisteR/Node-Essentials
const node = require("node-essentials");

// The Halo 5 API key, can be found here: https://developer.haloapi.com/products/560af1e42109182040fb56fc
// I moved it to a seprate file so I don't commit mine, just replace the placeholder in the
// apiKey.js file with your own.
const { apiKey } = require("./apiKey")

// Global Variable for the Players Service Record object.
let serviceRecord;

// Async function to retrieve the player Service Record.
async function get(gamertag){
    try {
        serviceRecord = await node.get(
            // The below link is the api that I'm targetting and I'm passing through the gamertag.
            `https://www.haloapi.com/stats/h5/servicerecords/arena?players=${gamertag}&=`,
            // These are the headers being passed through with the API key we set above.
            ["Ocp-Apim-Subscription-Key", apiKey]
        )
    .then(console.log("done"));
    }
    finally{

        // Here we parse the json response so we can use it as an object
        serviceRecord = JSON.parse(serviceRecord);

        // Here we print out the total xp the player has earned in the terminal
        console.log(serviceRecord.Results[0].Result.Xp);

        // Once we recieve the promise we print it to a file in the output folder called serviceRecord.json
        node.writeToFile("output", "serviceRecord", "json", JSON.stringify(serviceRecord));
    }
};

// Exectue the above Async get method with the gamertag of your choice.
get("Final Necessity");