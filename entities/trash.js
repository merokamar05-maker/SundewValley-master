class Trash extends Entity {
    constructor(name, x, y, mapRef) {
        super("trash", "trash", null, x, y, mapRef);
        this.name = name;
        // setSize must come before setBlockX/Y because Entity constructor
        // used undefined tilewidth (JSON not preloaded), making position NaN.
        // Re-setting size then position fixes the coordinates.
        this.setSize(this.getMapReference().getTileSize() * 0.5, this.getMapReference().getTileSize() * 0.5);
        this.setBlockX(x);
        this.setBlockY(y);
    }

    interact(playerRef) {
        playerRef.earnMoney(5);
        this.removeFromWorld = true;
        ASSET_MANAGER.playSound("Gravel_hit1.ogg");
    }

    update() {
        // Trash doesn't need to update state every frame
    }

    display(ctx, offsetX, offsetY) {
        const x = Math.round(this.getPixelX() + offsetX);
        const y = Math.round(this.getPixelY() + offsetY);
        const w = this.getWidth();
        const h = this.getHeight();

        ctx.save();

        // Bag body (dark olive green)
        ctx.fillStyle = "#5a6e3a";
        ctx.beginPath();
        ctx.ellipse(x + w * 0.5, y + h * 0.66, w * 0.38, h * 0.30, 0, 0, Math.PI * 2);
        ctx.fill();

        // Bag upper part
        ctx.fillStyle = "#4a5c2e";
        ctx.beginPath();
        ctx.ellipse(x + w * 0.5, y + h * 0.42, w * 0.26, h * 0.20, 0, 0, Math.PI * 2);
        ctx.fill();

        // Knot/tie on top (yellow-green)
        ctx.fillStyle = "#c8b400";
        ctx.beginPath();
        ctx.arc(x + w * 0.5, y + h * 0.28, w * 0.09, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}
