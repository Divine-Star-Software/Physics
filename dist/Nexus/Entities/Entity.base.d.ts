import { Vector3 } from "divine-voxel-engine/Math/index.js";
import { DataTool } from "divine-voxel-engine/Tools/Data/DataTool.js";
import type { CollisionData } from "Types/index.js";
export declare abstract class EntityBase {
    dataTool: DataTool;
    active: boolean;
    onGround: boolean;
    position: Vector3;
    previousPosiiton: Vector3;
    direction: Vector3;
    speed: number;
    velocity: Vector3;
    hitBox: {
        w: number;
        h: number;
        d: number;
    };
    abstract doCollision(colliderName: string, collisionData: CollisionData): void;
    setPosition(x: number, y: number, z: number): void;
    syncPosition(position: Vector3): void;
    cachePosition(): void;
    setVelocity(x: number, y: number, z: number): void;
    applyVelocity(): void;
    abstract beforeUpdate(): void;
    abstract afterUpdate(): void;
    update(): void;
}
