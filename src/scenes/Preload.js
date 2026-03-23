export default class Preload extends Phaser.Scene {

    constructor() {
        super("Preload");
    }

    preload() {

        this.load.image("robot", "aaaa.png");
        this.load.image("ramp", "pixil-frame-0(7).png");
        this.load.image("lever", "pixil-frame-0(11).pngg");
       // this.load.image("spring", "spring.png");
        this.load.image("goal", "assets/images/goal.png");
        this.load.image("floorTile", "pixil-frame-grass.png");
        this.load.image("wheel", "pixil-frame-0(6).png");
        this.load.image("pulley", "pixil-frame-0(10).png");
        this.load.image("pulley2", "pixil-frame-0(9).png");


    }

    create() {
        this.scene.start("Level1");
    }

}

//test