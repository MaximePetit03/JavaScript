import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from Game import Game

game = Game(needed_players=1)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup : lance la boucle du jeu
    task = asyncio.create_task(game.game_loop())
    yield
    # Shutdown
    task.cancel()
    print("Server shutting down")

# ON DÉFINIT L'APP UNE SEULE FOIS AVEC LE LIFESPAN
app = FastAPI(lifespan=lifespan)

# CONFIGURATION CORS (Indispensable pour ton Dashboard sur Live Server)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    join_data = await ws.receive_json()
    name = join_data.get("name")
    skin_path = join_data.get("skinPath")
    
    player = game.add_player(ws, name, skin_path)
    player_id = player.id

    try:
        while True:
            data = await ws.receive_json()
            game.handle_input(player_id, data)
    except WebSocketDisconnect:
        game.remove_player(player_id)

@app.get("/api/listPlayers")
async def get_players():
    player_list = []
    # On itère sur les joueurs actuellement dans la partie
    # Note : remplace 'game.players' par le bon nom de variable si différent
    players_dict = game.players if hasattr(game.players, 'values') else {}

    for p_id, p in players_dict.items():
        # On récupère les stats (avec 0 par défaut si non défini)
        kills = getattr(p, 'kills', 0)
        deaths = getattr(p, 'deaths', 0)
        
        player_list.append({
            "name": getattr(p, 'name', f"Player_{p_id}"),
            "totalKills": kills,
            "totalDeaths": deaths,
            "kdRatio": round(kills / max(1, deaths), 2),
            "gamesPlayed": getattr(p, 'games_played', 1)
        })
    
    # Ton JS fait le tri par kills, donc on envoie la liste brute
    return player_list

@app.get("/api/stats")
async def get_player_stats(name: str):
    # On cherche le joueur par son nom dans le jeu
    players_dict = game.players if hasattr(game.players, 'values') else {}
    target = next((p for p in players_dict.values() if getattr(p, 'name', '') == name), None)

    if target:
        kills = getattr(target, 'kills', 0)
        deaths = getattr(target, 'deaths', 0)
        return {
            "totalKills": kills,
            "totalDeaths": deaths,
            "kdRatio": round(kills / max(1, deaths), 2)
            # Ajoute d'autres stats ici si besoin
        }
    
    return {"error": "Joueur non trouvé"}, 404