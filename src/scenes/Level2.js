import Player from "../objects/Player.js";
import Toolbox from "../objects/Toolbox.js";

export default class Level2 extends Phaser.Scene {
    constructor() {
        super("Level2");
        this.won = false;
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.world.setbounds(0, 0, width, height);

        const floorTop = height - 64; // floorTile PNG height
        this.floor = this.add.tileSprite(0, floorTop, width, 64, "floorTile").setOrigin(0,0);
        this.matter.add.rectangle(width/2, floorTop+32, width, 64, { isStatic: true, label: "floor" });

        this.add.image(0, 0, "lvl2bg").setOrigin(0,0).setDisplaySize(width, height);

        this.add.rectangle(width/2, 48, width, 48, 0x000000, 0.6);
        this.add.text(width/2, 48, "The Clockwork Room — Gears grind overhead. The path is broken and full of gaps.", { fontSize: "13px", fill: "#cc8800", align: "center" }).setOrigin(0.5);

        // Platforms
        this.addPlatform(160, floorTop - 50, "platform");
        this.addPlatform(460, floorTop - 50, "platform");
        this.addPlatform(320, floorTop - 160, "platform");
        this.addPlatform(520, floorTop - 250, "platform");
        this.addPlatform(660, floorTop - 340, "platform");

        // Goal
        this.goal = this.matter.add.image(730, floorTop - 380, "winplatform", null, { isStatic: true, label: "goal" });

        // Player
        this.player = new Player(this, 60, floorTop - 60);
        this.player.sprite.body.label = "player";
        this.player.sprite.setFrictionAir(0.02);

        this.toolbox = new Toolbox(this, ["ramp","lever"],5);

        this.matter.world.on("collisionstart", (event) => {
            event.pairs.forEach(pair => {
                const labels = [pair.bodyA.label, pair.bodyB.label];
                if (labels.includes("player") && labels.includes("goal")) this.triggerWin();
            });
        });

        this.buildUI("THE CLOCKWORK ROOM", "Level 2 / 3");
    }

    addPlatform(x, y, texture) {
        const platSprite = this.add.image(x, y, texture);
        this.matter.add.rectangle(x, y, platSprite.width, platSprite.height, { isStatic: true, label: "platform" });
    }

    buildUI(roomName, levelLabel) {
        const width = this.scale.width;
        this.add.text(width/2, 78, roomName, { fontSize:"17px", fill:"#ffffff", stroke:"#000", strokeThickness:3 }).setOrigin(0.5);
        this.add.text(width/2, 96, levelLabel, { fontSize:"12px", fill:"#888888" }).setOrigin(0.5);
        this.playBtn = this.makeBtn(700,50,"▶ PLAY","#228822",()=>this.startSim());
        this.resetBtn = this.makeBtn(700,100,"↺ RESET","#882222",()=>this.scene.restart());
        this.menuBtn = this.makeBtn(700,150,"⌂ MENU","#334455",()=>this.scene.start("MainMenu"));
    }

    makeBtn(x, y, label, color, cb) {
        return this.add.text(x,y,label,{fontSize:"18px",fill:"#fff",backgroundColor:color,padding:{x:8,y:5}})
            .setOrigin(0.5).setInteractive().setDepth(11).on("pointerdown",cb);
    }

    update() { this.player.update(); }
    startSim() { this.player.isSimulating = true; this.toolbox.lock(); this.events.emit("simulate"); this.playBtn.setAlpha(0.4).disableInteractive(); }

    triggerWin() {
        if (this.won) return;
        this.won = true;
        const width = this.scale.width; const height = this.scale.height;
        this.add.rectangle(width/2,height/2,460,100,0x000000,0.8).setDepth(20);
        this.add.text(width/2,height/2-16,"Room Cleared!",{fontSize:"32px",fill:"#cc8800",fontStyle:"bold"}).setOrigin(0.5).setDepth(21);
        this.add.text(width/2,height/2+20,"One last room stands between Annuelra and freedom...",{fontSize:"14px",fill:"#dddddd"}).setOrigin(0.5).setDepth(21);
        this.time.delayedCall(2500,()=>this.scene.start("Level3Intro"));
    }
}