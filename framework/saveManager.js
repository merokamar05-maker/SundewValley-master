class SaveManager {
    static SAVE_KEY = "sundew_valley_save";

    static save() {
        if (!Level.PLAYER) return;

        const currentLevelName = GAME_ENGINE.getCurrentLevelName();
        const data = {
            player: {
                money: Level.PLAYER.getMoney(),
                karma: Level.PLAYER.getKarma(),
                inventory: Level.PLAYER.getInventory(),
                itemBar: Level.PLAYER.getItemBar(),
                pos: { x: Level.PLAYER.getBlockX(), y: Level.PLAYER.getBlockY() },
                level: currentLevelName
            },
            time: {
                timestamp: DateTimeSystem.getDateObject().getTime(),
                realTime: Date.now()
            },
            world: {
                chests: Chest.CHESTS,
                farmModifications: this.#getFarmModifications(),
                townEvent: SaveManager.townEvent || { lastSpawnDay: 0, caughtCount: 0 }
            }
        };

        localStorage.setItem(this.SAVE_KEY, JSON.stringify(data));
        console.log("Game Saved!");
    }

    static load() {
        const savedData = localStorage.getItem(this.SAVE_KEY);
        if (!savedData) return null;

        try {
            const data = JSON.parse(savedData);
            // Restore Chests
            Chest.CHESTS = data.world.chests || Chest.CHESTS;
            if (!Chest.CHESTS.TradingBox) Chest.CHESTS.TradingBox = {};

            console.log("Game Loaded successfully!");
            
            // Restore town event state globally so Level can access it
            if (data.world && data.world.townEvent) {
                SaveManager.townEvent = data.world.townEvent;
            }

            return data;
        } catch (e) {
            console.error("Failed to load save:", e);
            return null;
        }
    }

    static reset() {
        localStorage.removeItem(this.SAVE_KEY);
        window.location.reload();
    }

    static #getFarmModifications() {
        // Find the farm level if it exists in the engine's cache
        // We need to iterate through all pre-loaded levels to save all farm states
        // But for now let's focus on the active level if it's a farm
        const farm = GAME_ENGINE.getCurrentLevel();
        if (!(farm instanceof FarmLevel)) return null;

        const modifications = {
            tiles: [],
            crops: [],
            animals: []
        };

        // Save crops
        farm.getEntities().forEach(e => {
            if (e instanceof Crop) {
                modifications.crops.push({
                    type: e.getType(),
                    x: e.getBlockX(),
                    y: e.getBlockY(),
                    stage: e.getStage(),
                    timePlanted: e.getTimePlanted().getTime()
                });
            } else if (e instanceof Animal && !(e instanceof Player)) {
                modifications.animals.push({
                    type: e.getType(),
                    subType: e.getSubType(),
                    x: e.getBlockX(),
                    y: e.getBlockY()
                });
            }
        });

        // Save dirt/watered dirt tiles
        for (let y = 0; y < farm.getRow(); y++) {
            for (let x = 0; x < farm.getColumn(); x++) {
                const layers = farm.getTile(x, y);
                for (let i = 0; i < layers.length; i++) {
                    const id = layers[i];
                    if (id === 0) continue;
                    // Note: We check if it's dirt OR watered dirt
                    if (DirtTiles.isDirt(id) || WateredDirtTiles.isWateredDirt(id)) {
                        modifications.tiles.push({x, y, layerIndex: i, id: id});
                    }
                }
            }
        }
        return modifications;
    }

    static applyModifications(level, modifications) {
        if (!modifications) return;
        
        if (level instanceof FarmLevel) {
            // Apply tiles
            modifications.tiles.forEach(t => {
                const targetTile = level.getTile(t.x, t.y);
                if (targetTile) targetTile[t.layerIndex] = t.id;
            });
            // Apply crops
            modifications.crops.forEach(c => {
                const crop = new Crop(c.type, c.x, c.y, level);
                crop.setStage(c.stage);
                crop.setTimePlanted(new Date(c.timePlanted));
                level.addEntity(crop);
            });
            // Apply animals
            modifications.animals.forEach(a => {
                // Map the animal type to the correct class
                const animalClasses = {
                    "chicken": Chicken,
                    "cow": Cow,
                    "goat": Goat,
                    "pig": Pig,
                    "sheep": Sheep
                };
                const AnimalClass = animalClasses[a.type];
                if (AnimalClass) {
                    const animal = new AnimalClass(a.subType, a.x, a.y, level);
                    level.addEntity(animal);
                }
            });
        }
    }
}
