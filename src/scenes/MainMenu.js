export default class MainMenu extends Phaser.Scene {
    constructor() {
        super("MainMenu");
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.add.image(0, 0, "menuBackground")
            .setOrigin(0, 0)
            .setDisplaySize(width, height);

        this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.4);

        this.add.image(width / 2, 120, "logo")
            .setScale(0.6)
            .setDepth(2);

        this.add.text(width / 2, 200, "A Steampunk Physics Adventure", {
            fontSize: "20px",
            fill: "#dddddd",
            fontStyle: "italic"
        }).setOrigin(0.5);

        this.createImageButton(width / 2, 300, "playButton", () => {
            this.scene.start("Level1Intro");
        });

        this.createImageButton(width / 2, 380, "settingsButton", () => {
            this.scene.start("Settings");
        });

        this.createImageButton(width / 2, 460, "helpButton", () => {
            this.scene.start("Help");
        });

        if (!this.sound.get("bgMusic")) {
            this.bgMusic = this.sound.add("bgMusic", {
                loop: true,
                volume: 0.4
            });
            this.bgMusic.play();
        }
    }

    createImageButton(x, y, key, callback) {
        const btn = this.add.image(x, y, key)
            .setScale(0.5)
            .setInteractive({ useHandCursor: true });

        btn.on("pointerover", () => {
            btn.setScale(0.55);
        });

        btn.on("pointerout", () => {
            btn.setScale(0.5);
        });

        btn.on("pointerdown", () => {
            btn.setScale(0.45);
        });

        btn.on("pointerup", () => {
            btn.setScale(0.55);
            callback();
        });

        return btn;
    }
}