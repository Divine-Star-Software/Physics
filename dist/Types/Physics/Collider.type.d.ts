import { DimensionsVector3 } from "divine-voxel-engine/Math/";
export declare type ColliderReturnData = {
    name: string;
    boundingBox: DimensionsVector3;
    position: [number, number, number];
}[];
export declare type ColliderObject = {
    id: string;
    getColliderData(x: number, y: number, z: number): ColliderReturnData;
};
export declare type CollisionData = {
    h: number;
    nx: number;
    ny: number;
    nz: number;
};
