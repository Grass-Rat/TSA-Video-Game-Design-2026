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

        // initially static until play
        wheel.isStatic = true;
        wheel.playSpin = () => {
            wheel.isStatic = false;
            scene.matter.body.setAngularVelocity(wheel, 0.2);
        };
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

    // rock
    if (type === "rock") {
        let rock = scene.matter.add.circle(x, y, 20, {
            restitution: 0.2,
            friction: 0.8,
            isStatic: true
        });

        rock.drop = () => {
            rock.isStatic = false;
        };

        scene.rock = rock; // store globally to trigger on Play
    }

    // pulley
    if (type === "pulley") {

        // simple pulley: bucket platform with pivot
        let bucket = scene.matter.add.rectangle(x, y, 60, 20);
        let pivot = scene.matter.add.circle(x, y - 10, 5, { isStatic: true });
        scene.matter.add.constraint(bucket, pivot, 0, 0.9);

        scene.pulley = bucket; // store globally
    }

}