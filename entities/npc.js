class Npc extends Character {
    constructor(name, x, y, mapRef) {
        super(name, name.toLowerCase(), x, y, mapRef)
        this.setMovingSpeedX(5)
        this.setMovingSpeedY(5)
        this.setSize(this.getMapReference().getTileSize() * 1, this.getMapReference().getTileSize() * 1.3)
        this.customHitBox = {x: -1, y: -1, width: 3, height: 3}
        this.dailyClosing()
    }

    interact() {
        Dialogues.update(this.getName() + "_interact1", this)
    }

    dailyClosing() {
        if (this.getName().localeCompare("Maya") === 0) {
            this.clearInventory()
            this.setMoney(getRandomIntInclusive(2000, 5000))
            const _allKeys = Object.keys(InventoryItems.PRICES)
            // Filter to only include crops and seeds (exclude animals and tools)
            const _cropsAndKeys = _allKeys.filter(key => 
                key.endsWith("_seed") || 
                ["pumpkin", "cabbage", "carrot", "grain", "potato", "strawberry", "tomato", "eggplant", "lavender", "corn", "pea"].includes(key)
            )
            for (let i = 0; i < 50; i++) {
                this.obtainItem(_cropsAndKeys[_cropsAndKeys.length * Math.random() << 0], getRandomIntInclusive(1, 3))
            }
        } else if (this.getName().localeCompare("Mark") === 0) {
            this.clearInventory()
            this.setMoney(getRandomIntInclusive(5000, 10000))
            const _animalKeys = ["chicken", "cow", "goat", "pig", "sheep"]
            _animalKeys.forEach(key => {
                this.obtainItem(key, 5) // Give Mark 5 of each animal to start with
            })
        }
    }
}