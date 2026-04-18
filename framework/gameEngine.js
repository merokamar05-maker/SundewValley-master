// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {

    #levels
    #currentLevelName
    #ui
    paused = false

    constructor() {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;
        this.#ui = null;
        this.#levels = {}
        this.saveData = null;
    };

    getCurrentLevel() {
        return this.#levels[this.#currentLevelName]
    }

    getPlayerUi() {
        return this.#ui
    }

    getCurrentLevelName() {
        return this.#currentLevelName
    }

    enterLevel(name) {
        this.#currentLevelName = name
        if (this.#currentLevelName.localeCompare("farm") === 0) {
            this.#currentLevelName += `_${DateTimeSystem.getSeason()}`
        }
        if (this.getCurrentLevel() == null) {
            const levelPath = `./levels/${this.#currentLevelName}.json`
            this.#levels[this.#currentLevelName] = this.#currentLevelName.startsWith("farm_") ? new FarmLevel(levelPath) : this.#currentLevelName.startsWith("bedroom") ? new Bedroom(levelPath) : new Level(levelPath)
            this.getCurrentLevel().initEntities()
        }
        
        // Apply save data if it exists for this level
        if (this.saveData && this.saveData.world && this.saveData.world.farmModifications && this.#currentLevelName.startsWith("farm_")) {
            SaveManager.applyModifications(this.getCurrentLevel(), this.saveData.world.farmModifications);
        }

        this.getCurrentLevel().onEnter()
        this.getCurrentLevel().updateLevelMusic()
        
        // Restore player position and stats if this is the initial load
        if (this.saveData && this.saveData.player && Level.PLAYER && name !== "main_menu") {
            const p = this.saveData.player;
            Level.PLAYER.setMoney(p.money);
            if (Level.PLAYER.addKarma) Level.PLAYER.addKarma(p.karma - Level.PLAYER.getKarma());
            
            // Restore inventory and itemBar safely
            if (p.inventory) {
                const currentInv = Level.PLAYER.getInventory();
                Object.keys(p.inventory).forEach(key => currentInv[key] = p.inventory[key]);
            }
            if (p.itemBar) {
                const currentBar = Level.PLAYER.getItemBar();
                Object.keys(p.itemBar).forEach(key => currentBar[key] = p.itemBar[key]);
            }

            if (name === p.level || (name.startsWith("farm_") && p.level.startsWith("farm_"))) {
                Level.teleportPlayer(p.pos.x, p.pos.y);
            }
            this.saveData.player = null; // Clear so it only happens once
        }

        this.#ui = new UserInterfaces();
    }

    init(ctx) {
        this.ctx = ctx;
        DateTimeSystem.init(2023);
        InventoryItems.init()
        LevelData.init()
        
        this.saveData = SaveManager.load();
        
        if (this.saveData) {
            // Restore Time and handle Offline Progress
            const savedRealTime = this.saveData.time.realTime;
            const elapsedRealTimeMs = Date.now() - savedRealTime;
            
            // Game progresses at 2 minutes per real second = 120 times faster
            const catchUpGameMs = elapsedRealTimeMs * 120;
            
            DateTimeSystem.getDateObject().setTime(this.saveData.time.timestamp);
            DateTimeSystem.advanceTime(catchUpGameMs);

            // Restore Chests
            Chest.CHESTS = this.saveData.world.chests;
        }

        this.enterLevel("main_menu");
        UserInterfaces.displayTitle = true; 


        Controller.startInput(this.ctx)
        this.timer = new Timer();
        Debugger.switchDebugMode();
    };

    start() {
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };


    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // Draw the latest things first
        this.getCurrentLevel().draw(this.ctx)
        // Draw all the ui onto screen
        this.#ui.draw(this.ctx)
        // draw dialogue ui
        Dialogues.draw(this.ctx)
        // Draw transition animation is it is activated
        Transition.draw(this.ctx)
    };

    update() {
        Debugger.update()
        DateTimeSystem.update(this.clockTick)
        if (Debugger.isDebugging) {
            Debugger.pushInfo(`current in game time: ${Math.round(this.timer.gameTime)}s`)
            Debugger.pushInfo(`Date: ${DateTimeSystem.toLocaleString()} ${DateTimeSystem.getSeason()}`)
            Debugger.pushInfo(`In Transition: ${!Transition.isNotActivated()}`)
        }
        this.getCurrentLevel().update()
        this.#ui.update()
    };

    togglePause() {
        this.paused = !this.paused;
        const pauseMenu = document.getElementById("pauseMenu");
        if (pauseMenu) {
            pauseMenu.style.display = this.paused ? "flex" : "none";
        }
    }

    loop() {
        this.clockTick = this.timer.tick();
        if (!this.paused) {
            this.update();
        }
        this.draw();
        //Controller needs to be updated at the very end!
        Controller.update();
    };

}

// KV Le was here :)