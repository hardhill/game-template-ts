import { Time } from "phaser"
import { TimeEvents } from "./TimeEvents"

export class TimerGame {

    private scene: Phaser.Scene
    private bStart!: Phaser.GameObjects.Image
    private bStop!: Phaser.GameObjects.Image
    private bReset!: Phaser.GameObjects.Image
    private text!: Phaser.GameObjects.Text
    private timedEvent!: Phaser.Time.TimerEvent
    private startTime: number
    private globalCounter:number = 0
    private timeEvents: TimeEvents
    constructor(_scene: Phaser.Scene) {
        this.scene = _scene
        this.startTime = Date.now()
        this.timeEvents = TimeEvents.NonStart
    }
    draw() {
        this.bStart = this.scene.add.image(400, 300, 'button-start').setInteractive()
        this.bStart.on('pointerup', () => {
            this.start()
        })
        this.bReset = this.scene.add.image(400, 370, 'button-reset').setInteractive()
        this.bReset.on('pointerup', () => {
            this.reset()
        })
        this.bStop = this.scene.add.image(400, 370, 'button-stop').setInteractive()
        this.bStop.on('pointerup', () => {
            this.stop()
        })
        this.text = this.scene.add.text(400, 32, '00:00:00.0').setOrigin(0.5, 0)
        this.timedEvent = this.scene.time.addEvent({
            delay: 50,
            callback: this.OnEvent,
            callbackScope: this,
            loop: true,
            paused: true
        })

    }

    OnEvent() {

        let counter = (Date.now() - this.startTime)

        this.text.setText(new Date(this.globalCounter + counter).toISOString().slice(11, -1)).setColor('#000').setFontSize(32)
    }
    start() {
        if(this.timeEvents != TimeEvents.Started ){
            this.startTime = Date.now()
        }
            this.timedEvent.reset({
                delay: 50,
                callback: this.OnEvent,
                callbackScope: this,
                loop: true,
                paused: false
            })
            this.bStop.visible = true
            this.bReset.visible = false
            this.timeEvents = TimeEvents.Started
    }
    stop() {
        if (this.timeEvents == TimeEvents.Started) {
            this.globalCounter = this.globalCounter + Date.now()-this.startTime
            this.timedEvent.reset({
                delay: 50,
                callback: this.OnEvent,
                callbackScope: this,
                loop: true,
                paused: true
            })
            this.timeEvents = TimeEvents.Paused
            this.bStop.visible = false
            this.bReset.visible = true
        }
    }
    reset() {
        this.globalCounter = 0
        this.text.setText(new Date(this.globalCounter).toISOString().slice(11, -1)).setColor('#fff').setFontSize(32)
        this.timeEvents = TimeEvents.NonStart
        this.bStop.visible = true
        this.bReset.visible = false

    }
}
