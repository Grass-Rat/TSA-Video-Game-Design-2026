// src/objects/Toolbox.js
import { createTool } from "./Tools.js";

export default class Toolbox {
    constructor(scene, allowedTools = ["ramp"], maxTools = 5) {
        this.scene = scene;
        this.allowedTools = allowedTools;
        this.maxTools = maxTools;
        this.selectedTool = null;
        this.placedCount = 0;
        this.isLocked = false;

        this.events = scene.events;

        const panelX = 60;

        // Panel
        scene.add.rectangle(panelX, 200, 110, 180, 0x222222, 0.85)
            .setDepth(10)
            .setScrollFactor(0)
            .setInteractive()
            ._isUI = true;

        scene.add.text(panelX, 120, "TOOLBOX", {
            fontSize: "13px",
            fill: "#cc8800",
            fontStyle: "bold"
        }).setOrigin(0.5).setDepth(11)._isUI = true;

        // Counter
        this.counterText = scene.add.text(panelX, 145, `Tools: 0/${maxTools}`, {
            fontSize: "12px",
            fill: "#aaaaaa"
        }).setOrigin(0.5).setDepth(11)._isUI = true;

        // Buttons
        this.toolButtons = {};

        allowedTools.forEach((tool, i) => {
            const btn = scene.add.text(panelX, 170 + i * 40, tool.toUpperCase(), {
                fontSize: "14px",
                fill: "#ffffff",
                backgroundColor: "#444444",
                padding: { x: 8, y: 5 }
            })
            .setOrigin(0.5)
            .setInteractive()
            .setDepth(11);

            btn._isUI = true;
            this.toolButtons[tool] = btn;

            btn.on("pointerdown", (pointer) => {
                pointer.event.stopPropagation();

                if (this.isLocked) return;

                this.selectedTool = tool;

                Object.entries(this.toolButtons).forEach(([t, b]) => {
                    b.setStyle({ backgroundColor: t === tool ? "#cc8800" : "#444444" });
                });
            });
        });

        // Placement
        scene.input.on("pointerdown", (pointer) => {
            if (this.isLocked || !this.selectedTool) return;
            if (this.placedCount >= this.maxTools) return;

            if (pointer.x < 120) return;

            // Create tool
            const toolObject = createTool(scene, this.selectedTool, pointer.x, pointer.y);

            if (!toolObject) return;

            this.placedCount++;
            this.counterText.setText(`Tools: ${this.placedCount}/${this.maxTools}`);

            console.log("Tool placed:", this.selectedTool, this.placedCount);

            // Emit event
            this.events.emit("toolPlaced", this.selectedTool, toolObject);
        });
    }

    lock() {
        this.isLocked = true;
        this.counterText.setText("Simulation running...");
    }
}