export default class Preload extends Phaser.Scene {

    constructor() {
        super("Preload");
    }

    preload() {

        this.load.image("robot", "/assets/images/robot.png");
        this.load.image("ramp", "/assets/images/ramp.png");
        this.load.image("lever", "/assets/images/lever.png");
       // this.load.image("spring", "spring.png");
    
        this.load.image("goal", "/assets/images/goal.png");
        this.load.image("floorTile", "/assets/images/floorTile.png");
        this.load.image("wheel", "/assets/images/wheel.png");
        this.load.image("pulley", "/assets/images/pulley.png");
        this.load.image("pulley2", "/assets/images/pulley2.png");


    }

    create() {
        this.scene.start("Level1");
    }

}

//test