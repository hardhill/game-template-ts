import { Scene } from 'phaser'

export default class MainScene extends Scene{

    
    constructor(){
        super({key:'MainScene'})
    }
    preload(){
        this.load.image('back','assets/sky.png')

    }
    create(){
        this.add.image(400,300,'back')
    }

}