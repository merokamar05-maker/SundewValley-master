class UserInterfaces {
    static displayTitle = true
    #UI = {}
    #CURRENT

    constructor() {
        GUI.init()
        this.#UI.chest = null
        this.#UI.itemBar = new ItemBarUI(Level.PLAYER)
        this.#UI.inventory = new InventoryUI(Level.PLAYER)
        this.#CURRENT = this.#UI.itemBar
    }

    openChest(chestRef) {
        this.#UI.chest = new ChestUI(Level.PLAYER, chestRef)
    }

    startATrade(targetUI) {
        this.#UI.trade = new TradeUI(Level.PLAYER, targetUI)
    }

    noUiIsOpening() {
        return this.#UI.chest == null && this.#UI.trade == null
    }

    closeChest() {
        this.#UI.chest = null
    }

    update() {
        if (UserInterfaces.displayTitle === true) return
        if (this.#UI.chest != null) {
            this.#CURRENT = this.#UI.chest
        } else if (this.#UI.trade != null) {
            if (this.#UI.trade.isOpening) {
                this.#CURRENT = this.#UI.trade
            } else {
                this.#UI.trade = null
            }
        } else if (!this.#UI.inventory.isOpening) {
            if (Controller.keys["KeyI"]) {
                this.#CURRENT = this.#UI.inventory
                this.#UI.inventory.isOpening = true
            } else {
                this.#CURRENT = this.#UI.itemBar
            }
        }
    }

    draw(ctx) {
        if (UserInterfaces.displayTitle === true) {
            const _width = ctx.canvas.width * 0.8
            const _height = ctx.canvas.height * 0.2
            ctx.drawImage(ASSET_MANAGER.getImage("ui", "title.png"), (ctx.canvas.width - _width) / 2, ctx.canvas.height * 0.2, _width, _height)
            if (MessageButton.draw(ctx, "Start", ctx.canvas.height * 0.05, ctx.canvas.width * 0.425, ctx.canvas.height * 0.6) && !Controller.mouse_prev.leftClick && Controller.mouse.leftClick) {
                Transition.start(() => {
                    GAME_ENGINE.enterLevel("farm")
                    Level.PLAYER.setMapReference(GAME_ENGINE.getCurrentLevel())
                    GAME_ENGINE.getCurrentLevel().goToSpawn()
                    UserInterfaces.displayTitle = false
                })
            }
        } else {
            this.#CURRENT.draw(ctx)
            this.drawMoney(ctx)
        }
    }

    drawMoney(ctx) {
        const money = Level.PLAYER.getMoney();
        const moneyStr = `${money}`;
        const padding = 20;
        const iconSize = 28;
        
        ctx.save();
        
        // 0. Calculate precise text width to avoid overlap
        ctx.font = "bold 24px Verdana";
        const textMetrics = ctx.measureText(moneyStr);
        const textWidth = textMetrics.width;
        
        // Dynamic box width based on measured text
        // Left Padding (15) + Coin Space (iconSize) + Middle Gap (15) + Text Space (textWidth) + Right Padding (20)
        const boxWidth = Math.max(140, 50 + iconSize + textWidth);
        const boxHeight = 45;
        const x = ctx.canvas.width - padding - boxWidth;
        const y = padding;

        // 1. Draw Outer Glow / Background Shadow
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        
        // 2. Draw Main Background (Glassmorphism)
        const bgGradient = ctx.createLinearGradient(x, y, x, y + boxHeight);
        bgGradient.addColorStop(0, "rgba(40, 40, 40, 0.85)");
        bgGradient.addColorStop(1, "rgba(20, 20, 20, 0.95)");
        ctx.fillStyle = bgGradient;
        
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(x, y, boxWidth, boxHeight, 12);
        } else {
            ctx.rect(x, y, boxWidth, boxHeight);
        }
        ctx.fill();

        // 3. Draw Dual Border (Light inner, dark outer)
        ctx.shadowBlur = 0; // Reset shadow for borders
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.stroke();
        
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
        ctx.stroke();

        // 4. Draw Gold Coin icon
        const coinX = x + 15 + iconSize / 2;
        const coinY = y + boxHeight / 2;
        const coinRadius = iconSize / 2;

        // Coin Shadow
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(0,0,0,0.6)";
        ctx.shadowOffsetY = 2;

        // Coin Body Gradient
        const coinGradient = ctx.createRadialGradient(coinX - 4, coinY - 4, 2, coinX, coinY, coinRadius);
        coinGradient.addColorStop(0, "#fff59d"); // Shimmer / highlight
        coinGradient.addColorStop(0.3, "#ffeb3b"); // Bright gold
        coinGradient.addColorStop(1, "#f57f17"); // Deep gold / orange-ish
        
        ctx.fillStyle = coinGradient;
        ctx.beginPath();
        ctx.arc(coinX, coinY, coinRadius, 0, Math.PI * 2);
        ctx.fill();

        // Coin Rim
        ctx.strokeStyle = "#ffb300";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Coin Shine Reflect (The "Premium" touch)
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(coinX, coinY, coinRadius * 0.7, -Math.PI * 0.7, -Math.PI * 0.3);
        ctx.stroke();

        // Inner '$' detail
        ctx.fillStyle = "#8d6e63"; // Darker brown for contrast on gold
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 16px 'Trebuchet MS', sans-serif";
        ctx.fillText("$", coinX, coinY + 1);

        // 5. Render Money Text
        const textX = x + boxWidth - 15; // Position at the far right of the box
        const textY = y + boxHeight / 2 + 8;
        
        // Text Shadow / Glow
        ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
        ctx.shadowBlur = 4;
        
        // Set alignment to right so the text grows to the left
        ctx.textAlign = "right";
        
        // Use Font class but with the calculated persistent alignment
        Font.draw(ctx, moneyStr, 24, textX, textY, "#ffffff", "rgba(0,0,0,0.4)", "Verdana", "bold", true);

        ctx.restore();
    }
}