import Player from "../objects/Player.js";
import Toolbox from "../objects/Toolbox.js";

export default class Level3 extends Phaser.Scene {
    constructor() { super("Level3"); this.won=false; }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;
        const floorTop = height - 64;

        this.world.setbounds(0, 0, width, height);

        this.floor = this.add.tileSprite(0,floorTop,width,64,"floorTile").setOrigin(0,0);
        this.matter.add.rectangle(width/2,floorTop+32,width,64,{isStatic:true,label:"floor"});

        this.add.image(0,0,"lvl3bg").setOrigin(0,0).setDisplaySize(width,height);

        this.add.rectangle(width/2,48,width,48,0x000000,0.6);
        this.add.text(width/2,48,"The Inventor's Room — The exit is near. But the path is the hardest yet. Use all your tools wisely!",{fontSize:"13px",fill:"#ffffff",align:"center",wordWrap:{width:width-40}}).setOrigin(0.5);

        // Platforms
        this.addPlatform(300,floorTop-80,"platform");
        this.addPlatform(420,floorTop-160,"platform");
        this.addPlatform(540,floorTop-160,"platform");
        this.addPlatform(620,floorTop-260,"platform");
        this.addMovableBridge(660,floorTop-260,"platform","lever");
        this.addPlatform(720,floorTop-360,"platform");
        this.addRotatingPlatform(760,floorTop-360,"platform","wheel");

        // Goal
        this.goal = this.matter.add.image(780,floorTop-420,"winplatform",null,{isStatic:true,label:"goal"});
        this.tweens.add({targets:this.goal,alpha:0.5,duration:800,yoyo:true,repeat:-1});

        // Player
        this.player = new Player(this,60,floorTop-60);
        this.player.sprite.body.label="player";
        this.player.sprite.setFrictionAir(0.02);

        this.toolbox = new Toolbox(this,["ramp","lever","wheel"],5);

        this.matter.world.on("collisionstart",event=>{
            event.pairs.forEach(pair=>{
                const labels=[pair.bodyA.label,pair.bodyB.label];
                if(labels.includes("player")&&labels.includes("goal")) this.triggerWin();
            });
        });

        this.buildUI("THE INVENTOR'S ROOM","Level 3 / 3");
    }

    addPlatform(x,y,texture){
        const plat = this.add.image(x,y,texture);
        this.matter.add.rectangle(x,y,plat.width,plat.height,{isStatic:true,label:"platform"});
    }

    addMovableBridge(x,y,texture,tool){
        const bridge = this.add.image(x,y,texture);
        this.matter.add.rectangle(x,y,bridge.width,bridge.height,{isStatic:true,label:"bridge"});
        this.events.on("useTool",(t,obj)=>{ if(t===tool && obj===bridge) bridge.isStatic=false; });
    }

    addRotatingPlatform(x,y,texture,tool){
        const plat = this.add.image(x,y,texture);
        this.matter.add.rectangle(x,y,plat.width,plat.height,{isStatic:true,label:"rotPlatform"});
        this.events.on("useTool",(t,obj)=>{ if(t===tool && obj===plat) this.tweens.add({targets:plat,angle:90,duration:1000}); });
    }

    buildUI(roomName,levelLabel){
        const width = this.scale.width;
        this.add.text(width/2,78,roomName,{fontSize:"17px",fill:"#ffffff",stroke:"#000",strokeThickness:3}).setOrigin(0.5);
        this.add.text(width/2,96,levelLabel,{fontSize:"12px",fill:"#888888"}).setOrigin(0.5);
        this.playBtn = this.makeBtn(700,50,"▶ PLAY","#228822",()=>this.startSim());
        this.resetBtn = this.makeBtn(700,100,"↺ RESET","#882222",()=>this.scene.restart());
        this.menuBtn = this.makeBtn(700,150,"⌂ MENU","#334455",()=>this.scene.start("MainMenu"));
    }

    makeBtn(x,y,label,color,cb){
        return this.add.text(x,y,label,{fontSize:"18px",fill:"#fff",backgroundColor:color,padding:{x:8,y:5}}).setOrigin(0.5).setInteractive().setDepth(11).on("pointerdown",cb);
    }

    update(){ this.player.update(); }
    startSim(){ this.player.isSimulating=true; this.toolbox.lock(); this.events.emit("simulate"); this.playBtn.setAlpha(0.4).disableInteractive(); }

    triggerWin(){
        if(this.won) return; this.won=true;
        const width=this.scale.width,height=this.scale.height;
        this.add.rectangle(width/2,height/2,500,110,0x000000,0.85).setDepth(20);
        this.add.text(width/2,height/2-20,"ANNUELRA IS FREE!",{fontSize:"34px",fill:"#ffffff",fontStyle:"bold"}).setOrigin(0.5).setDepth(21);
        this.add.text(width/2,height/2+20,"The factory doors open. Light floods in...",{fontSize:"14px",fill:"#dddddd"}).setOrigin(0.5).setDepth(21);
        this.time.delayedCall(3000,()=>this.scene.start("WinScreen"));
    }
}