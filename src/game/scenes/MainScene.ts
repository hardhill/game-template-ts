import { Scene } from 'phaser'

export default class MainScene extends Scene{

    private graphics:Phaser.GameObjects.Graphics|null = null
    private shapes:Array<Phaser.Geom.Circle>
    private rect:Phaser.Geom.Rectangle
    constructor(){
        super({key:'MainScene'})
        this.shapes = new Array<Phaser.Geom.Circle>()
        this.rect = new Phaser.Geom.Rectangle()
    }
    preload(){
        this.load.image('back','assets/sky.png')

    }
    create(){
        this.add.image(400,300,'back')
        this.graphics = this.add.graphics();
        this.shapes = new Array(15).fill(null).map(
            () => new Phaser.Geom.Circle(Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 600), Phaser.Math.Between(25, 75))
        );
        let x = this.cameras.main.x
        let y = this.cameras.main.y
        let w = this.cameras.main.width
        let h = this.cameras.main.height
        this.rect = Phaser.Geom.Rectangle.Clone(new Phaser.Geom.Rectangle(x,y,w,h));
    }

}