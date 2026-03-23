import Player from "../objects/Player.js";
import Toolbox from "../objects/Toolbox.js";

export default class Level1 extends Phaser.Scene {

    constructor() {
        super("Level2");
    }

    create() {

        this.player = new Player(this, 100, 400);

        this.toolbox = new Toolbox(this);

        this.goal = this.physics.add.staticSprite(700, 500, "goal");

        this.physics.add.overlap(this.player.sprite, this.goal, () => {

            this.scene.start("Level3");

        });

    }

    update() {

        this.player.update();

    }

}