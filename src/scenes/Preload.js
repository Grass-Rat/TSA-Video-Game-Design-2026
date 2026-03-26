export default class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
    }

    preload() {
        // Robot character
       this.load.image("robot", "/assets/images/robot.png", {
        frameWidth: 32,  // adjust to your frame size
        frameHeight: 32
        });

        // Tools
        this.load.image("ramp", "/assets/images/ramp.png");
        this.load.image("lever", "/assets/images/lever.png");
        this.load.image("wheel", "/assets/images/wheel.png");

        // Buttons
        this.load.image("settingsButton", "/assets/images/settingsbutton.png");
        this.load.image("helpButton", "/assets/images/helpbutton.png");
        this.load.image("playButton", "/assets/images/playbutton.png");

        // Logo
        this.load.image("logo", "/assets/images/LOGO.png");


        // Floor
        this.load.image("floorTile", "/assets/images/floorTile.png");

        // Level backgrounds — replace with your actual steampunk art
        this.load.image("lvl1bg", "/assets/images/lvl1.png");       // Boiler Room
        this.load.image("lvl2bg", "/assets/images/lvl2.png");       // Clockwork Room
        this.load.image("lvl3bg", "/assets/images/lvl3.png");       // Inventor's Room

        // Win platform / goal
        this.load.image("winplatform", "/assets/images/winplatform.png");
        this.load.image("platform", "/assets/images/platform1.png");

        // Menu backgrounds
        this.load.image("menuBackground", "/assets/images/backgroundmenu.png");
        this.load.image("settingsBackground", "/assets/images/settings.png");
        this.load.image("helpBackground", "/assets/images/help.png");
        this.load.image("winBackground", "/assets/images/win.png");

        // Audio
        this.load.audio("bgMusic", "/assets/audio/5653940192018432(1).wav");
    }

    create() {
        this.scene.start("MainMenu");
    }
}