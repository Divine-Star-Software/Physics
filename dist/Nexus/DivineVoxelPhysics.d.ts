import type { ColliderObject } from "Types/Physics/Collider.type.js";
import { DataTool } from "divine-voxel-engine/Tools/Data/DataTool.js";
export declare const DVP: {
    math: {
        visitAll: (startPoint: import("divine-voxel-engine").Vector3, endPoint: import("divine-voxel-engine").Vector3, visitor?: ((x: number, y: number, z: number) => boolean) | undefined) => number[];
        getVector3(x: number, y: number, z: number): import("divine-voxel-engine/Math/index.js").Vector3;
        getPlane(pv1: import("divine-voxel-engine/Math/index.js").Vector3, pv2: import("divine-voxel-engine/Math/index.js").Vector3, pv3: import("divine-voxel-engine/Math/index.js").Vector3, pv4: import("divine-voxel-engine/Math/index.js").Vector3): import("divine-voxel-engine/Math/index.js").Plane;
        getSimpleBoundingBox(origin: import("divine-voxel-engine/Math/index.js").Vector3, dimensions: import("divine-voxel-engine/Math/index.js").DimensionsVector3): import("divine-voxel-engine/Math/index.js").SimpleBoundingBox;
        getBoundingBox(data: import("divine-voxel-engine/Math/index.js").BoundingBoxData): import("divine-voxel-engine/Math/index.js").BoundingBox;
        convertToOriginGridSpace(position: number[]): number[];
        distance2D(x1: number, x2: number, y1: number, y2: number): number;
        distance3D(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number;
    };
    collisions: {
        sweepAABB(ax: number, ay: number, az: number, ahx: number, ahy: number, ahz: number, bx: number, by: number, bz: number, bhx: number, bhy: number, bhz: number, dx: number, dy: number, dz: number): {
            h: number;
            nx: number;
            ny: number;
            nz: number;
        };
        lineToPlane(px: number, py: number, pz: number, ux: number, uy: number, uz: number, vx: number, vy: number, vz: number, nx: number, ny: number, nz: number): number;
        between(x: number, a: number, b: number): boolean;
    };
    colliders: {
        colliders: Record<string, ColliderObject>;
        registerCollider(collider: ColliderObject): void;
        getCollider(id: string): ColliderObject;
    };
    _dataTool: DataTool;
    getCollider(x: number, y: number, z: number, dimension?: number): false | ColliderObject;
};
export declare type DivineVoxelEnginePhysics = typeof DVP;
