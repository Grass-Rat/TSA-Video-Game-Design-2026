import TestLoad from "./scenes/TestLoad.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",
    physics: {
        default: "matter",
        matter: { gravity: { y: 1 }, debug: true }
    },
    scene: [TestLoad]  // Only the test scene
};

new Phaser.Game(config);