import Preload from "./scenes/Preload.js";
import MainMenu from "./scenes/MainMenu.js";
import Settings from "./scenes/Settings.js";
import Help from "./scenes/Help.js";
import Level1Intro from "./scenes/Level1Intro.js";
import Level2Intro from "./scenes/Level2Intro.js";
import Level3Intro from "./scenes/Level3Intro.js";
import Level1 from "./scenes/Level1.js";
import Level2 from "./scenes/Level2.js";
import Level3 from "./scenes/Level3.js";
import WinScreen from "./scenes/WinScreen.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",
    physics: {
        default: "matter",
        matter: {
            gravity: { y: 1 },
            debug: false
        }
    },
    scene: [Preload, MainMenu, Settings, Help, Level1Intro, Level2Intro, Level3Intro, Level1, Level2, Level3, WinScreen]
};

new Phaser.Game(config);