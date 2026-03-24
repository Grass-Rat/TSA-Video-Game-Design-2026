export default class Preload extends Phaser.Scene {

    constructor() {
        super("Preload");
    }

    preload() {

        // background so we know scene is running
        this.cameras.main.setBackgroundColor("#040218");

        // load images from assets/images/images
        this.load.image("robot", "assets/images/aaaa.png");
        this.load.image("ramp", "assets/images/pixil-frame-0(7).png");
        this.load.image("lever", "assets/images/pixil-frame-0(11).png");
        this.load.image("goal", "assets/images/goal.png");
        this.load.image("floorTile", "assets/images/pixil-frame-grass.png");
        this.load.image("wheel", "assets/images/pixil-frame-0(6).png");
        this.load.image("pulley", "assets/images/pixil-frame-0(10).png");
        this.load.image("pulley2", "assets/images/pixil-frame-0(9).png");
        this.load.image("rock", "assets/images/rock.png");

        // loading text
        const loadingText = this.add.text(400, 300, "Loading...", { font: "20px Arial", fill: "#fff" }).setOrigin(0.5);
        this.load.on("progress", (value) => {
            loadingText.setText(`Loading: ${Math.round(value * 100)}%`);
        });
    }

    create() {
        this.scene.start("Level1");
    }
}

//balls