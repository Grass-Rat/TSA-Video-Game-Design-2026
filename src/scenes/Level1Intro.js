export default class Level1Intro extends Phaser.Scene {
    constructor() {
        super("Level1Intro");
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // Background
        this.add.image(0, 0, "lvl1bg").setOrigin(0, 0).setDisplaySize(width, height);

        // Overlay (make it interactive to catch clicks)
        const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.5)
            .setDepth(1)
            .setInteractive();

        // Intro text
        this.add.text(width / 2, height / 2 - 40, "Annuelra wakes up in the Boiler Room. Steam hisses around him.", {
            fontSize: "28px",
            fill: "#ffffff",
            align: "center",
            wordWrap: { width: width - 100 }
        }).setOrigin(0.5).setDepth(2);

        this.add.text(width / 2, height / 2 + 40, "Click anywhere to continue...", {
            fontSize: "20px",
            fill: "#ffffff",
            align: "center"
        }).setOrigin(0.5).setDepth(2);

        // Click to continue
        overlay.once("pointerdown", () => {
            this.scene.start("Level1");
        });
    }
}