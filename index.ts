import { getObstacleEvents } from './computer-vision';

interface AutonomousCar {
  isRunning: boolean;

  respond: (events: Events) => void;
}

interface AutonomousCarProps {
  isRunning?: boolean;
  steeringControl: Steering;
}

interface Events {
  [events: string]: boolean;
}

interface Control {
  execute: (command: string) => void;
}

interface Steering extends Control {
  turn: (direction: string) => void;
}

class Car implements AutonomousCar {
  isRunning;
  steeringControl: Steering | undefined;

  constructor(props: AutonomousCarProps) {
    this.isRunning = props.isRunning;
    this.steeringControl = props.steeringControl;
  }

  respond(events: Events) {
    if (!this.isRunning) {
      console.log('the car is turned off!');
    } else {
      console.log('the car is running!');

      for (const eventkey in events) {
        if (events[eventkey] === true) {
          if (eventkey === 'ObstacleLeft') {
            this.steeringControl.turn('right');
          } else if (eventkey === 'ObstacleRight') {
            this.steeringControl.turn('left');
          }
        }
      }
    }
  }
};

class SteeringControl implements Steering {

  execute(command: string) {
    console.log(`Executing: ${command}`);
  }

  turn(direction: string) {
    this.execute(`turn ${direction}`)
  }
}

const steering = new SteeringControl();
const autonomousCar = new Car({ isRunning: true, steeringControl: steering});

autonomousCar.respond(getObstacleEvents());
