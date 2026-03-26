export default class WinScreen extends Phaser.Scene {
    constructor() {
        super("WinScreen");
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // Background image
        this.add.image(0, 0, "winBackground")
            .setOrigin(0, 0)
            .setDisplaySize(width, height);

        // Animated gold bars
        this.add.rectangle(0, 0, width, 8, 0xcc8800).setOrigin(0, 0);
        this.add.rectangle(0, height - 8, width, 8, 0xcc8800).setOrigin(0, 0);

        // Title
        this.add.text(width / 2, 100, "INGEAR", {
            fontSize: "64px",
            fill: "#ffffff",
            fontStyle: "bold",
            stroke: "#000000",
            strokeThickness: 8
        }).setOrigin(0.5);

        this.add.text(width / 2, 170, "— COMPLETE —", {
            fontSize: "24px",
            fill: "#ffffff",
            letterSpacing: 8
        }).setOrigin(0.5);

        // Story ending text
        const ending = [
            "Annuelra stepped out of the factory for the first time.",
            "",
            "The sky was pale and cold, but it was the outside world.",
            "Using nothing but the tools left behind by his creator,",
            "the little robot had solved every puzzle and found freedom.",
            "",
            "Perhaps somewhere, his inventor was smiling."
        ].join("\n");

        const textPadding = 20;
        const textStyle = { fontSize: "15px", fill: "#000000", align: "center", lineSpacing: 8 };

        // Create text offscreen to measure its size
        const endingText = this.add.text(0, 0, ending, textStyle);

        const textWidth = endingText.width + textPadding * 2;
        const textHeight = endingText.height + textPadding * 2;

        const boxX = width / 2;
        const boxY = 280 + endingText.height / 2;

        // Create the white background box first
        const bgBox = this.add.rectangle(boxX, boxY, textWidth, textHeight, 0xffffff, 0.85).setOrigin(0.5);

        // Place the text on top of the box
        endingText.setPosition(boxX - endingText.width / 2, boxY - endingText.height / 2).setDepth(1);

        // Buttons
        this.add.text(width / 2, 490, "▶  PLAY AGAIN", {
            fontSize: "26px",
            fill: "#ffffff",
            backgroundColor: "#cc8800",
            padding: { x: 28, y: 12 },
            fixedWidth: 260,
            align: "center"
        }).setOrigin(0.5).setInteractive().on("pointerdown", () => {
            this.scene.start("Level1");
        });

        this.add.text(width / 2, 554, "⌂  MAIN MENU", {
            fontSize: "22px",
            fill: "#ffffff",
            backgroundColor: "#334455",
            padding: { x: 28, y: 10 },
            fixedWidth: 260,
            align: "center"
        }).setOrigin(0.5).setInteractive().on("pointerdown", () => {
            this.scene.start("MainMenu");
        });

        // Subtle particle-style flicker
        this.time.addEvent({
            delay: 120,
            callback: () => {
                const px = Phaser.Math.Between(50, width - 50);
                const py = Phaser.Math.Between(50, height - 50);
                const spark = this.add.rectangle(px, py, 3, 3, 0xcc8800, 0.8).setDepth(0);
                this.tweens.add({ targets: spark, alpha: 0, duration: 600, onComplete: () => spark.destroy() });
            },
            repeat: -1
        });
    }
}