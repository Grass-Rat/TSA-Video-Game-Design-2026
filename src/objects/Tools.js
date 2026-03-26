export function createTool(scene, type, x, y, angle = 0) {
    const gridSize = 32;
    x = Math.round(x / gridSize) * gridSize;
    y = Math.round(y / gridSize) * gridSize;

    if (type === "ramp") {
        const ramp = scene.matter.add.image(x, y, "ramp", null, {
            isStatic: true,
            angle: Phaser.Math.DegToRad(angle)
        });
        ramp.setDisplaySize(120, 20);
        ramp.setStatic(true);
    }

    if (type === "lever") {
        const lever = scene.matter.add.image(x, y, "lever");
        lever.setDisplaySize(120, 20);
        const pivot = scene.matter.add.circle(x, y, 5, { isStatic: true, collisionFilter: { mask: 0 } });
        scene.matter.add.constraint(pivot, lever.body, 0, 1);
    }

    if (type === "wheel") {
        const wheel = scene.matter.add.image(x, y, "wheel", null, {
            restitution: 0.4,
            friction: 0.05,
            isStatic: true
        });
        wheel.setDisplaySize(50, 50);
        wheel.setCircle(25);
        // Wheel becomes dynamic when simulation starts
        scene.events.once("simulate", () => {
            wheel.setStatic(false);
        });
    }
}