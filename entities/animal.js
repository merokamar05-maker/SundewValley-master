class Animal extends Creature {

    #current_action_count_down
    #spawnBlockX
    #spawnBlockY
    static #SHOP_WANDER_RADIUS = 3

    constructor(type, subType, x, y, mapRef) {
        super("animals", type, subType, x, y, mapRef);
        this.#current_action_count_down = 0
        this.#spawnBlockX = x
        this.#spawnBlockY = y
    }

    update() {
        if (this.#current_action_count_down > 0) {
            this.#current_action_count_down -= 1
        } else {
            this.setCurrentMovingSpeedX(0)
            this.setCurrentMovingSpeedY(0)
            switch (getRandomIntInclusive(0, 4)) {
                case 0:
                    this.setCurrentAction("idle")
                    this.#current_action_count_down = getRandomIntInclusive(50, 200)
                    break
                // up
                case 1:
                    this.setCurrentMovingSpeedY(-this.getMovingSpeedY())
                    this.setCurrentAction("move")
                    this.#current_action_count_down = getRandomIntInclusive(50, 200)
                    break
                // down
                case 2:
                    this.setCurrentMovingSpeedY(this.getMovingSpeedY())
                    this.setCurrentAction("move")
                    this.#current_action_count_down = getRandomIntInclusive(50, 200)
                    break
                // left
                case 3:
                    this.setCurrentMovingSpeedX(-this.getMovingSpeedX())
                    this.setDirectionFacing("l")
                    this.setCurrentAction("move")
                    this.#current_action_count_down = getRandomIntInclusive(50, 200)
                    break
                // right
                case 4:
                    this.setCurrentMovingSpeedX(this.getMovingSpeedX())
                    this.setDirectionFacing("r")
                    this.setCurrentAction("move")
                    this.#current_action_count_down = getRandomIntInclusive(50, 200)
                    break
            }
        }
        super.update()
        // Clamp movement to stay within a circular radius of spawn position
        const isFarm = this.getMapReference() instanceof FarmLevel
        const wanderRadius = isFarm ? 6 : Animal.#SHOP_WANDER_RADIUS
        const tileSize = this.getMapReference().getTileSize()
        const rPixels = wanderRadius * tileSize
        const spawnXPixels = this.#spawnBlockX * tileSize
        const spawnYPixels = this.#spawnBlockY * tileSize
        
        const dx = this.getPixelX() - spawnXPixels
        const dy = this.getPixelY() - spawnYPixels
        const distSq = dx * dx + dy * dy
        
        if (distSq > rPixels * rPixels) {
            const dist = Math.sqrt(distSq)
            this.setPixelX(spawnXPixels + (dx / dist) * rPixels)
            this.setPixelY(spawnYPixels + (dy / dist) * rPixels)
        }
    };

    display(ctx, offsetX, offsetY) {
        super.display(ctx, offsetX, offsetY)
    };
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}