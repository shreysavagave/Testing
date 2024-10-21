document.addEventListener("DOMContentLoaded", () => {
    const matchesContainer = document.querySelector('.matches');
    const apikey = '65b8a0bf-336b-43f1-8839-26bdaaa32f54';
    const matchesapi = `https://api.cricapi.com/v1/matches?apikey=${apikey}&offset=0`;
  
    // Fetch match IDs with fantasyEnabled
    const getids = async () => {
      try {
        const response = await fetch(matchesapi);
        const data = await response.json();
        
        // Check if data exists
        if (!data || !data.data) {
          throw new Error("No data available from the API.");
        }
        
        const allmatches = data.data;
        const fantasyMatches = allmatches.filter(match => match.fantasyEnabled);
  
        const ids = fantasyMatches.map(match => match.id);
        return ids;
  
      }catch (error) {
        console.error("Error fetching match IDs:", error);
      }
    };
  
    const fetchMatches = async () => {
      try {
        matchesContainer.innerHTML = "";
        const ids = await getids();  // Fetch match ids
        console.log(ids);
  
        // Loop over match ids and fetch scorecard for each
        for (const id of ids) {
          const matchapi = `https://api.cricapi.com/v1/match_bbb?apikey=${apikey}&id=${id}`;
          const response = await fetch(matchapi);
          const data = await response.json();
  
          // Check if data exists for the match
          if (!data || !data.data) {
            console.warn(`No data available for match ID: ${id}`);
            continue; // Skip this iteration if no match data
          }
  
          const match = data.data;

          const matchName = match.name;
          const team1 = match.teams[0];
          const team2 = match.teams[1];
          const team1Img = match.teamInfo[0].img;
          const team2Img = match.teamInfo[1].img;

          const matchElement = `
            <a href="/contest.html?matchId=${id}">
              <div class="match flex justify-center">
                <button class="border-2 border-zinc-800 bg-zinc-900 m-5 w-full md:w-96 rounded-md hover:bg-zinc-800">
                  <h1 id="series" class="mt-2 text-zinc-400">${matchName}</h1>
                  <div class="teams flex justify-between p-3">
                    <div class="team1 flex items-center">
                      <img src="${team1Img}" alt="Team 1 Logo" class="w-8 h-8 mr-2 object-contain rounded-full">
                      <h4>${team1}</h4>
                    </div>
                    <h4 class="text-red-500">vs</h4>
                    <div class="team2 flex items-center">
                      <h4>${team2}</h4>
                      <img src="${team2Img}" alt="Team 2 Logo" class="w-8 h-8 ml-2 object-contain rounded-full">
                    </div>
                  </div>
                  <h5 class="text-blue-500 pb-2"> time ramaining </h5>
                </button>
              </div>
            </a>
          `;
  
          matchesContainer.innerHTML += matchElement;
        }
  
      }catch (error) {
        console.error("Error fetching matches:", error);
      }
    };
  
    fetchMatches();
  });
  
