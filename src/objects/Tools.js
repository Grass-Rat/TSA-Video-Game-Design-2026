export function createTool(scene, type, x, y, angle = 0) {

    const gridSize = 32;
    x = Math.round(x / gridSize) * gridSize;
    y = Math.round(y / gridSize) * gridSize;

    // wheel
    if (type === "wheel") {

        let wheel = scene.matter.add.circle(x, y, 32, {
            restitution: 0.5,
            friction: 0.05
        });

        scene.matter.body.setAngularVelocity(wheel, 0.2);
    }

    // ramp
    if (type === "ramp") {

        scene.matter.add.rectangle(x, y, 120, 20, {
            isStatic: true,
            angle: Phaser.Math.DegToRad(angle)
        });
    }

    // lever
    if (type === "lever") {

        let lever = scene.matter.add.rectangle(x, y, 120, 20);

        let pivot = scene.matter.add.circle(x, y, 5, {
            isStatic: true
        });

        scene.matter.add.constraint(pivot, lever, 0, 1);
    }

    // spring (???? just for kicks???)
    if (type === "spring") {

        let spring = scene.matter.add.rectangle(x, y, 40, 20, {
            isStatic: true,
            isSensor: true
        });

        scene.matter.world.on("collisionstart", (event) => {

            event.pairs.forEach((pair) => {

                if (
                    (pair.bodyA === scene.player.sprite.body && pair.bodyB === spring) ||
                    (pair.bodyB === scene.player.sprite.body && pair.bodyA === spring)
                ) {
                    scene.player.sprite.setVelocityY(-15);
                }

            });

        });
    }
}