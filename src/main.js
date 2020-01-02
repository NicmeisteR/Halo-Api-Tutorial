let $ = function (id) { return document.getElementById(id); };
const apiKey = "YOUR-API-KEY-HERE";

async function search() {
    try {
        response = await get($("gamertag").value);
    }
    finally {
        let stats = response.Results[0].Result;

        let statsObject = {
            Gamertag: stats.PlayerId.Gamertag,
            Kills: stats.ArenaStats.TotalKills,
            Deaths: stats.ArenaStats.TotalDeaths,
            Wins: stats.ArenaStats.TotalGamesWon,
            Losses: stats.ArenaStats.TotalGamesLost,
        }

        Object.keys(statsObject).forEach(function(key){
            $("stats").insertAdjacentHTML('beforeend', `<p>${key}: ${statsObject[key]}</p>`);
        });
    }
}

async function get(gamertag) {
    return new Promise(function (resolve, reject){
        fetch(
            `https://www.haloapi.com/stats/h5/servicerecords/arena?players=${gamertag}&=`, {
            "method": "GET",
            "headers": {
                "ocp-apim-subscription-key": apiKey
            }
        })
        .then(response => {
            console.log(response);
            if (response.ok) { // if HTTP-status is 200-299
                // get the response body (the method explained below)
                let json = response.json();
                resolve(json);
            } else {
                alert("HTTP-Error: " + response.status);
            }
        })
        .catch(err => {
            console.log(err);
        });
    })
}