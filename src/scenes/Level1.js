// src/scenes/Level1.js
import Player from "../objects/Player.js";
import Toolbox from "../objects/Toolbox.js";

export default class Level1 extends Phaser.Scene {
    constructor() {
        super("Level1");
        this.rampUsed = false;
        this.won = false;
        this.ramps = [];
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;
        const floorHeight = 64;

        // ── Background ───────────────────────
        this.add.image(0, 0, "lvl1bg").setOrigin(0, 0).setDisplaySize(width, height);

        // ── Floor ─────────────────────────────
        const floorTop = height - floorHeight;
        this.floor = this.add.tileSprite(0, floorTop, width, floorHeight, "floorTile").setOrigin(0,0);
        this.matter.add.rectangle(width / 2, floorTop + floorHeight/2, width, floorHeight, { isStatic: true, label: "floor" });

        // ── Story caption ───────────────────
        this.add.rectangle(width / 2, 48, width, 48, 0x000000, 0.6);
        this.add.text(width / 2, 48,
            "The Boiler Room — Annuelra wakes up. Steam hisses. He must find a way out.",
            { fontSize: "13px", fill: "#ffffff", align: "center" }
        ).setOrigin(0.5);

        // ── Platforms ───────────────────────
        // properly spaced and reachable
        this.addPlatform(300, floorTop - 80, "platform"); // first platform
        this.addPlatform(500, floorTop - 140, "platform"); // second platform
        this.addPlatform(700, floorTop - 200, "platform"); // third platform

        // ── Goal ────────────────────────────
        this.goal = this.matter.add.image(800, floorTop - 260, "winplatform", null, { isStatic: true, label: "goal" });

        // ── Player ──────────────────────────
        this.player = new Player(this, 100, floorTop - 60);
        this.player.sprite.body.label = "player";
        this.player.sprite.setFrictionAir(0.02);

        // ── Toolbox ─────────────────────────
        this.toolbox = new Toolbox(this, ["ramp"], 5);
        this.toolbox.events.on("toolPlaced", (toolName, toolObject) => {
            if (toolName === "ramp") {
                if (!toolObject.body) {
                    this.matter.add.gameObject(toolObject, { isStatic: true, label: "ramp" });
                } else {
                    toolObject.body.label = "ramp";
                }
                this.ramps.push(toolObject);
            }
        });

        // ── Collision detection ─────────────
        this.matter.world.on("collisionstart", (event) => {
            event.pairs.forEach(pair => {
                const labels = [pair.bodyA.label, pair.bodyB.label];

                if (labels.includes("player") && labels.includes("ramp")) {
                    this.rampUsed = true;
                    console.log("Ramp used");
                }

                if (labels.includes("player") && labels.includes("goal")) {
                    this.triggerWin();
                }
            });
        });

        // ── UI ──────────────────────────────
        this.buildUI("THE BOILER ROOM", "Level 1 / 3");
    }

    addPlatform(x, y, texture) {
        const platSprite = this.add.image(x, y, texture);
        platSprite.setDisplaySize(150, 20); // scale platforms to playable width
        this.matter.add.rectangle(x, y, platSprite.displayWidth, platSprite.displayHeight, { isStatic: true, label: "platform" });
    }

    buildUI(roomName, levelLabel) {
        const width = this.scale.width;

        this.add.text(width / 2, 78, roomName, { fontSize: "17px", fill: "#ffffff", stroke: "#000", strokeThickness: 3 }).setOrigin(0.5);
        this.add.text(width / 2, 96, levelLabel, { fontSize: "12px", fill: "#888888" }).setOrigin(0.5);

        this.playBtn = this.makeBtn(700, 50, "▶ PLAY", "#228822", () => this.startSim());
        this.resetBtn = this.makeBtn(700, 100, "↺ RESET", "#882222", () => this.scene.restart());
        this.menuBtn = this.makeBtn(700, 150, "⌂ MENU", "#334455", () => this.scene.start("MainMenu"));
    }

    makeBtn(x, y, label, color, cb) {
        return this.add.text(x, y, label, { fontSize: "18px", fill: "#fff", backgroundColor: color, padding: { x: 8, y: 5 } })
            .setOrigin(0.5).setInteractive().setDepth(11)
            .on("pointerdown", cb);
    }

    update() {
        this.player.update();
    }

    startSim() {
        this.player.isSimulating = true;
        this.toolbox.lock();
        this.events.emit("simulate");
        this.playBtn.setAlpha(0.4).disableInteractive();
    }

    triggerWin() {
        if (this.won) return;
        this.won = true;

        const width = this.scale.width;
        const height = this.scale.height;

        this.add.rectangle(width / 2, height / 2, 460, 100, 0x000000, 0.8).setDepth(20);
        this.add.text(width / 2, height / 2 - 16, "Room Cleared!", { fontSize: "32px", fill: "#cc8800", fontStyle: "bold" }).setOrigin(0.5).setDepth(21);
        this.add.text(width / 2, height / 2 + 20, "Annuelra moves deeper into the factory...", { fontSize: "14px", fill: "#dddddd" }).setOrigin(0.5).setDepth(21);

        this.time.delayedCall(2500, () => this.scene.start("Level2Intro"));
    }
}