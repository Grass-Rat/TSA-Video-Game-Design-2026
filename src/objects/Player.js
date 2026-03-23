export default class Player {

    constructor(scene, x, y) {

        this.scene = scene;

        this.sprite = scene.matter.add.sprite(x, y, "robot");

        // better body
        this.sprite.setRectangle(32, 48);

        // physics tuning (IMPORTANT!! AHHH!)
        this.sprite.setFriction(0.9);     // stops sliding
        this.sprite.setFrictionAir(0.02); // air resistance
        this.sprite.setBounce(0);         // no bouncy player

        // lock rotation so the player doesnt tip over lol
        this.sprite.setFixedRotation();

        this.cursors = scene.input.keyboard.createCursorKeys();

        // ground tracking
        this.isGrounded = false;

        // jump cooldown
        this.canJump = true;

        // collision detection for hitting da ground
        scene.matter.world.on("collisionactive", (event) => {

            this.isGrounded = false;

            event.pairs.forEach((pair) => {

                const bodyA = pair.bodyA;
                const bodyB = pair.bodyB;

                if (
                    bodyA === this.sprite.body ||
                    bodyB === this.sprite.body
                ) {
                    this.isGrounded = true;
                }

            });

        });
    }

    update() {

        const speed = 5;

        // L+R MVMT
        if (this.cursors.left.isDown) {
            this.sprite.setVelocityX(-speed);
        }
        else if (this.cursors.right.isDown) {
           this.sprite.setVelocityX(
                Phaser.Math.Linear(this.sprite.body.velocity.x, speed, 0.2)
            );
        }
        else {
            this.sprite.setVelocityX(0);
        }

        // jump! (ONLY if youre grounded! NO DOUBLE JUMPING!)
        if (this.cursors.up.isDown && this.isGrounded && this.canJump) {

            this.sprite.setVelocityY(-10);

            this.canJump = false;

            // Small delay to prevent spam
            this.scene.time.delayedCall(200, () => {
                this.canJump = true;
            });
        }

    }
}