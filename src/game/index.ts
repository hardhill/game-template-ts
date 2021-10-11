import Phaser from "phaser";
import MainScene from "./scenes/MainScene";

export function launcher(_container:string){
    return new Phaser.Game({
        type:Phaser.AUTO,
        width:800,
        height:600,
        parent:_container,
        scene:[MainScene]
    })
}


