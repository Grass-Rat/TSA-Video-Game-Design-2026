import { createTool } from "./Tools.js";

export default class Toolbox {

    constructor(scene) {

        this.scene = scene;

        this.toolCount = {
            ramp: 2,
            lever: 1,
            wheel: 1,
            rock: 1,
            pulley: 1
        };

        this.createUI();

        // Rotate w/ R
        this.scene.input.keyboard.on("keydown-R", () => {
            if (this.ghost) this.ghost.angle += 15;
        });

        // cancel with right click (a nice touch if I do say so myself)
        this.scene.input.on("pointerdown", (pointer) => {
            if (pointer.rightButtonDown() && this.ghost) {
                this.ghost.destroy();
                this.ghost = null;
            }
        });
    }

    createUI() {
        this.createToolIcon(50, 50, "ramp");
        this.createToolIcon(50, 120, "lever");
        this.createToolIcon(50, 260, "wheel");
        this.createToolIcon(50, 330, "rock");
        this.createToolIcon(50, 400, "pulley");
    }

    createToolIcon(x, y, type) {

        let icon = this.scene.add.image(x, y, type).setInteractive();
        icon.setScale(0.5);

        this.scene.input.setDraggable(icon);

        icon.on("dragstart", (pointer) => {

            if (this.toolCount[type] <= 0) return;

            this.ghost = this.scene.add.image(pointer.x, pointer.y, type);
            this.ghost.setAlpha(0.5);
            this.ghost.setScale(0.7);

            this.currentType = type;
        });

        icon.on("drag", (pointer) => {

            if (!this.ghost) return;

            this.ghost.x = pointer.x;
            this.ghost.y = pointer.y;

        });

        icon.on("dragend", (pointer) => {

            if (!this.ghost) return;

            if (pointer.x < 100) {
                this.ghost.destroy();
                this.ghost = null;
                return;
            }

            createTool(
                this.scene,
                this.currentType,
                pointer.x,
                pointer.y,
                this.ghost.angle
            );

            this.toolCount[this.currentType]--;

            this.ghost.destroy();
            this.ghost = null;
        });
    }
}