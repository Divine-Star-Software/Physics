import { DataTool } from "divine-voxel-engine/Tools/Data/DataTool";
import { Vector3 } from "divine-voxel-engine/Math";
export declare class EntityBase {
    dataTool: DataTool;
    active: boolean;
    position: Vector3;
    direction: Vector3;
    previousPosiiton: Vector3;
    hitBox: {
        w: number;
        h: number;
        d: number;
    };
    speed: number;
    velocity: Vector3;
    onGround: boolean;
    veloctiy: Vector3;
    boundingBox: {
        w: number;
        h: number;
        d: number;
    };
    doCollision(colliderName: string, collisionData: {
        h: number;
        nx: number;
        ny: number;
        nz: number;
    }): void;
    setPosition(x: number, y: number, z: number): void;
    syncPosition(position: Vector3): void;
    cachePosition(): void;
    setVelocity(x: number, y: number, z: number): void;
    applyVelocity(): void;
    beforeUpdate(): void;
    afterUpdate(): void;
    update(): void;
}
