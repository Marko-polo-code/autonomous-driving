"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const computer_vision_1 = require("./computer-vision");
class Car {
    constructor(props) {
        this.isRunning = props.isRunning;
        this.steeringControl = props.steeringControl;
    }
    respond(events) {
        if (!this.isRunning) {
            console.log('the car is turned off!');
        }
        else {
            console.log('the car is running!');
            for (const eventkey in events) {
                if (events[eventkey] === true) {
                    if (eventkey === 'ObstacleLeft') {
                        this.steeringControl.turn('right');
                    }
                    else if (eventkey === 'ObstacleRight') {
                        this.steeringControl.turn('left');
                    }
                }
            }
        }
    }
}
;
class SteeringControl {
    execute(command) {
        console.log(`Executing: ${command}`);
    }
    turn(direction) {
        this.execute(`turn ${direction}`);
    }
}
const steering = new SteeringControl();
const autonomousCar = new Car({ isRunning: true, steeringControl: steering });
autonomousCar.respond((0, computer_vision_1.getObstacleEvents)());
