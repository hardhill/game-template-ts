import { Scene } from 'phaser'
import { TimerGame } from '../classes/TimerGame'

export default class MainScene extends Scene{

    private timergame:TimerGame
    
    constructor(){
        super({key:'MainScene'})
        this.timergame = new TimerGame(this)
        
        
    }
    preload(){
        this.load.image('back','assets/sky.png')
        this.load.image('button-start','assets/start.png')
        this.load.image('button-stop','assets/stop.png')
        this.load.image('button-reset','assets/reset.png')
    }
    create(){
        this.add.image(400,300,'back')
        this.timergame.draw()
    }

}