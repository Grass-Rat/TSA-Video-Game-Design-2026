
export default class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        this.isSimulating = false;
        this.onGround = false;

        this.sprite = scene.matter.add.sprite(x, y, "robot");
        this.sprite.setDisplaySize(50, 60);
        this.sprite.setFixedRotation();
        this.sprite.setMass(5);

        // Track ground contact
        scene.matter.world.on("collisionstart", (event) => {
            event.pairs.forEach(pair => {
                if (pair.bodyA === this.sprite.body || pair.bodyB === this.sprite.body) {
                    this.onGround = true;
                }
            });
        });

        scene.matter.world.on("collisionend", (event) => {
            event.pairs.forEach(pair => {
                if (pair.bodyA === this.sprite.body || pair.bodyB === this.sprite.body) {
                    this.onGround = false;
                }
            });
        });

        this.keys = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    update() {
        if (!this.isSimulating) return;

        const speed = 4;

        if (this.keys.left.isDown) {
            this.sprite.setVelocityX(-speed);
        } else if (this.keys.right.isDown) {
            this.sprite.setVelocityX(speed);
        } else {
            this.sprite.setVelocityX(0);
        }

        if (this.keys.up.isDown && this.onGround) {
            this.sprite.setVelocityY(-10);
            this.onGround = false;
        }
    }
}