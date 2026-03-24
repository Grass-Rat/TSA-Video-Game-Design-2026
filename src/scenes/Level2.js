import Player from "../objects/Player.js";
import Toolbox from "../objects/Toolbox.js";

export default class Level2 extends Phaser.Scene {

    constructor() {
        super("Level2");
    }

    create() {

        this.player = new Player(this, 100, 400);

        this.toolbox = new Toolbox(this);

        this.goal = this.matter.add.sprite(700, 500, "goal", null, { isStatic: true });

        this.matter.world.on("collisionstart", (event) => {
            event.pairs.forEach(pair => {
                if (
                    pair.bodyA === this.player.sprite.body && pair.bodyB === this.goal.body ||
                    pair.bodyB === this.player.sprite.body && pair.bodyA === this.goal.body
                ) {
                    this.scene.start("Level3");
                }
            });
        });

        this.playButton = this.add.text(650, 50, "Play", { fontSize: "24px", fill: "#fff" }).setInteractive();
        this.resetButton = this.add.text(650, 100, "Reset", { fontSize: "24px", fill: "#fff" }).setInteractive();

        this.playButton.on("pointerdown", () => this.startSimulation());
        this.resetButton.on("pointerdown", () => this.resetLevel());
    }

    update() {
        this.player.update();
    }

    startSimulation() {
        this.player.walking = true;
        if (this.scene.rock) this.scene.rock.drop();
        if (this.scene.pulley) this.scene.pulley.isStatic = false;
    }

    resetLevel() {
        this.scene.restart();
    }
}