export default class Help extends Phaser.Scene {
    constructor() {
        super("Help");
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.add.image(0, 0, "helpBackground")
            .setOrigin(0, 0)
            .setDisplaySize(width, height);

        // Back button
        this.add.text(width / 2, height - 50, "← BACK TO MENU", {
            fontSize: "20px",
            fill: "#ffffff",
            backgroundColor: "#882222",
            padding: { x: 20, y: 8 }
        }).setOrigin(0.5).setInteractive().on("pointerdown", () => {
            this.scene.start("MainMenu");
        });
    }
}