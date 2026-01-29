const server = document.querySelector("#server");
const addressInput = document.querySelector("#servInput");
const playerName = document.querySelector("#playerName");
const statsContent = document.querySelector("#statsContent");
const rankingTableBody = document.querySelector("#ranking");

let selectedPlayer = "";

function selectPlayer(name) {
  selectedPlayer = name;
  console.log("Sélection : " + name);
  refreshData(addressInput.value);
}

async function loadRanking(url) {
  try {
    const response = await fetch(`http://${url}/api/listPlayers`);
    const players = await response.json();

    if (players && Array.isArray(players)) {
      const sorted = [...players].sort(
        (a, b) => (b.totalKills || 0) - (a.totalKills || 0),
      );

      rankingTableBody.innerHTML = sorted
        .map((player, index) => {
          const isSelected =
            player.name === selectedPlayer ? 'class="active-row"' : "";

          return `
                    <tr ${isSelected} onclick="selectPlayer('${player.name}')" style="cursor:pointer">
                        <td>#${index + 1}</td>
                        <td><strong>${player.name}</strong></td>
                        <td>${player.totalKills || 0}</td>
                        <td>${player.totalDeaths || 0}</td> 
                        <td>${player.kdRatio || 0}</td>
                        <td>${player.gamesPlayed || 0}</td>
                    </tr>
                `;
        })
        .join("");
      return sorted;
    }
  } catch (e) {
    console.error(e);
  }
}

async function loadPlayerStats(name, url, rankingList) {
  try {
    const response = await fetch(`http://${url}/api/stats?name=${name}`);
    const stats = await response.json();
    const position = rankingList
      ? rankingList.findIndex((p) => p.name === name) + 1
      : "---";

    playerName.textContent = name;
    statsContent.innerHTML = `
            <p>Joueur : <strong>${name}</strong></p>
            <p>Nombre de Kills : <strong>${stats.totalKills ?? 0}</strong></p>
            <p>Nombre de Morts : <strong>${stats.totalDeaths ?? 0}</strong></p>
            <p>Ratio K/D : <strong>${stats.kdRatio ?? 0}</strong></p>
            <p>Position classement : <strong>#${position}</strong></p>
        `;
  } catch (e) {
    console.error(e);
  }
}

async function refreshData(url) {
  if (!url) return;
  const currentRanking = await loadRanking(url);
  if (selectedPlayer) {
    await loadPlayerStats(selectedPlayer, url, currentRanking);
  }
}

server.addEventListener("submit", (e) => {
  e.preventDefault();
  refreshData(addressInput.value);
});

setInterval(() => {
  if (addressInput.value) refreshData(addressInput.value);
}, 5000);
