<h1 align="center">
  Divine Voxel Engine Physics
</h1>

<p align="center">
<img src="https://divine-star-software.github.io/DigitalAssets/images/logo-small.png">
</p>

---

This is the offical physics library for Divine Voxel Engine.

```ts
import type { CollisionData } from "dve-plugins-phsycis/Types/";
import { EntityBase } from "dve-plugins-phsycis/Nexus";

import { PlayerManager } from "../../../Shared/Player/PlayerManager.js";
import { Vector3 } from "divine-voxel-engine/Math";
import {
  PlayerPhysicsData,
  PlayerPhysicsStatesValues,
} from "@data/shared/Player/PlayerPhysicsData.js";
import { PlayerStatsData } from "@data/shared/Player/PlayerStatsData.js";

export class NexusPlayer extends EntityBase {
  states = {
    cilmbingStair: false,
    inWater: false,
    onLadder: false,
    gravity: -0.1,
    jumpMaxDefault: 10,
  };
  msterialStandingOn = "none";
  finalDirection = new Vector3(0, 0, 0);
  sideDirection = new Vector3(0, 0, 0);
  speed = 0.04;
  runSpeed = 0.03;
  hitBox = { w: 0.8, h: 1.8, d: 0.8 };
  jumpStates = {
    count: 0,
    max: 10,
    jumping: false,
    canJump: true,
  };
  movementFunctions = <Record<number, Function>>{};
  gravityAcceleration = 0;

  constructor(
    public physics: PlayerPhysicsData,
    public stats: PlayerStatsData
  ) {
    super();
    this.movementFunctions[PlayerPhysicsStatesValues.still] = () => {
      this.direction.scaleXYZ(0);
    };
    this.movementFunctions[PlayerPhysicsStatesValues.secondaryStill] = () => {
      this.sideDirection.scaleXYZ(0);
    };
    this.movementFunctions[PlayerPhysicsStatesValues.walkingForward] = () => {};
    this.movementFunctions[PlayerPhysicsStatesValues.walkingBackward] = () => {
      this.direction.scaleXYZ(-1);
    };
    this.movementFunctions[PlayerPhysicsStatesValues.walkingLeft] = () => {};
    this.movementFunctions[PlayerPhysicsStatesValues.walkingRight] = () => {
      this.sideDirection.scaleXYZ(-1);
    };
  }

  $INIT() {
    this.setPosition(10, 80, 7);
    this.cachePosition();
    this.velocity.y = this.states.gravity;
    //@ts-ignore
    this.syncPosition(PlayerManager.physics.position);
  }

  controlsUpdate() {
    //reset direction
    this.finalDirection.scaleXYZ(0);
    //get forward direction from where the player is looking
    this.direction.updateVector(
      this.physics.direction.x,
      0,
      this.physics.direction.z
    );
    this.direction.normalize();
    //get side direction from where the player is looking
    this.sideDirection.updateVector(
      this.physics.sideDirection.x,
      0,
      this.physics.sideDirection.z
    );
    this.sideDirection.normalize();
    //apply any changes on the direction vector based on player's state
    this.movementFunctions[this.physics.states.movement]();
    this.movementFunctions[this.physics.states.secondaryMovement]();

    //finally add, nomalize, then scale
    this.finalDirection.addFromVec3(this.direction);
    this.finalDirection.addFromVec3(this.sideDirection);
    if (!this.finalDirection.isZero()) {
      this.finalDirection.normalize();
    }
    this.finalDirection.scaleXYZ(this.getSpeed());

    //set the player's velcoity based on their state
    if (this.physics.states.movement || this.physics.states.secondaryMovement) {
      this.velocity.x = this.finalDirection.x;
      this.velocity.z = this.finalDirection.z;
    }

    if (this.onGround || this.states.inWater) {
      this.gravityAcceleration = 0;
    }
    if (this.onGround) {
      this.velocity.y = this.states.gravity;
    }

    //player jump
    if (
      this.physics.states.jumping &&
      !this.jumpStates.jumping &&
      (this.onGround || this.states.inWater)
    ) {
      this.jumpStates.jumping = true;
      this.jumpStates.max = this.states.jumpMaxDefault;
      this.velocity.y = 0.1 + this.stats.jumpPower / 1000;
      this.physics.states.jumping = 0;
    }

    if (this.jumpStates.jumping) {
      if (this.jumpStates.count >= this.jumpStates.max) {
        this.jumpStates.count = 0;
        this.jumpStates.jumping = false;
      } else {
        this.jumpStates.count++;
      }
    }

    //player in air or water
    if (!this.onGround && !this.jumpStates.jumping) {
      this.gravityAcceleration += 0.0025;
      if (this.states.inWater) {
        this.velocity.y -= 0.0025;
        if (this.velocity.y < -0.01) {
          this.velocity.y = -0.01;
        }
      } else {
        if (this.velocity.y <= this.states.gravity) {
          this.velocity.y = this.states.gravity;
        }
        this.velocity.y -= this.gravityAcceleration;
      }
    }
  }

  getSpeed() {
    return (
      this.physics.states.running * this.runSpeed +
      //for every level of speed add a tenth of the player's base speed
      (this.speed + this.stats.speed * this.speed * 0.1)
    );
  }

  beforeUpdate() {
    this.controlsUpdate();
  }

  afterUpdate() {
    //@ts-ignore
    this.syncPosition(this.physics.position);
  }

  doCollision(colliderName: string, collisionData: CollisionData): void {
  }

};

````