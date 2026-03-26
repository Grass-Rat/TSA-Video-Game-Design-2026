// src/scenes/Level3Intro.js
export default class Level3Intro extends Phaser.Scene {
    constructor() {
        super("Level3Intro");
    }

    preload() {
        this.load.image("lvl3bg", "assets/lvl3.png"); // adjust path if needed
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // Background
        this.add.image(0, 0, "lvl3bg")
            .setOrigin(0, 0)
            .setDisplaySize(width, height)
            .setDepth(0);

        // Overlay (interactive so clicks register)
        this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.5)
            .setDepth(1)
            .setInteractive();

        // Scene info
        this.add.text(width / 2, height / 2 - 40,
            "Annuelra discovered a new tool: Wheel!\nIt will help you overcome the toughest challenges yet.",
            {
                fontSize: "28px",
                fill: "#cc8800",
                align: "center",
                wordWrap: { width: width - 100 }
            })
            .setOrigin(0.5)
            .setDepth(2);

        this.add.text(width / 2, height / 2 + 80,
            "Click anywhere to continue...",
            {
                fontSize: "20px",
                fill: "#ffffff",
                align: "center"
            })
            .setOrigin(0.5)
            .setDepth(2);

        // Go to Level3 on click
        this.input.once("pointerdown", () => {
            this.scene.start("Level3");
        });
    }
}