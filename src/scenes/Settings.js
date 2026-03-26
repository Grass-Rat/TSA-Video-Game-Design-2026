export default class Settings extends Phaser.Scene {
    constructor() {
        super("Settings");
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.add.image(0, 0, "settingsBackground")
            .setOrigin(0, 0)
            .setDisplaySize(width, height);

        // Top bar (keep stylistic accent)
        this.add.rectangle(0, 0, width, 6, 0xcc8800).setOrigin(0, 0);

        // Title
        this.add.text(width / 2, 70, "SETTINGS", {
            fontSize: "40px",
            fill: "#cc8800",
            fontStyle: "bold",
            stroke: "#000000",
            strokeThickness: 6
        }).setOrigin(0.5);

        // Music volume
        this.makeSlider(width / 2, 210, 0.5, (val) => {
            const music = this.sound.get("bgMusic");
            if (music) music.setVolume(val);
        });

        // Mute toggle
        let muted = false;
        const muteBtn = this.add.text(width / 2, 420, "🔊  MUTE", {
            fontSize: "22px",
            fill: "#ffffff",
            backgroundColor: "#555555",
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        muteBtn.on("pointerdown", () => {
            muted = !muted;
            this.sound.mute = muted;
            muteBtn.setText(muted ? "🔇  UNMUTE" : "🔊  MUTE");
        });

        // Back button
        this.add.text(width / 2, 520, "← BACK TO MENU", {
            fontSize: "20px",
            fill: "#ffffff",
            backgroundColor: "#882222",
            padding: { x: 20, y: 8 }
        }).setOrigin(0.5).setInteractive().on("pointerdown", () => {
            this.scene.start("MainMenu");
        });
    }

    makeSlider(x, y, defaultVal, onChange) {
        const trackWidth = 300;

        this.add.rectangle(x, y, trackWidth, 10, 0x555555).setOrigin(0.5);

        const fill = this.add.rectangle(
            x - trackWidth / 2,
            y,
            trackWidth * defaultVal,
            10,
            0xcc8800
        ).setOrigin(0, 0.5);

        const handle = this.add.circle(
            x - trackWidth / 2 + trackWidth * defaultVal,
            y,
            12,
            0xffffff
        ).setInteractive();

        this.input.setDraggable(handle);

        handle.on("drag", (pointer, dragX) => {
            const minX = x - trackWidth / 2;
            const maxX = x + trackWidth / 2;

            const clampedX = Phaser.Math.Clamp(dragX, minX, maxX);
            handle.x = clampedX;
            fill.width = clampedX - minX;

            onChange((clampedX - minX) / trackWidth);
        });
    }
}