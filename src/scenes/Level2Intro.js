// src/scenes/Level2Intro.js
export default class Level2Intro extends Phaser.Scene {
    constructor() {
        super("Level2Intro");
    }

    preload() {
        // Preload your level 2 background image
        this.load.image("lvl2bg", "assets/lvl2.png"); // adjust path if needed
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // ── Background image ─────────────────────
        this.add.image(0, 0, "lvl2bg")
            .setOrigin(0, 0)
            .setDisplaySize(width, height)
            .setDepth(0);

        // ── Semi-transparent overlay for text readability ─────────
        this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.5)
            .setDepth(1)
            .setInteractive(); // ← makes clicks register

        // ── Tool announcement / scene info ─────────
        this.add.text(width / 2, height / 2 - 40,
            "Annuelra discovered a new tool: Lever!\nUse it wisely to solve the next puzzle.",
            {
                fontSize: "28px",
                fill: "#ffffff",
                align: "center",
                wordWrap: { width: width - 100 }
            })
            .setOrigin(0.5)
            .setDepth(2);

        // ── Instruction to continue ─────────
        this.add.text(width / 2, height / 2 + 80,
            "Click anywhere to continue...",
            {
                fontSize: "20px",
                fill: "#ffffff",
                align: "center"
            })
            .setOrigin(0.5)
            .setDepth(2);

        // ── On click, go to Level2 ─────────
        this.input.once("pointerdown", () => {
            this.scene.start("Level2");
        });
    }
}