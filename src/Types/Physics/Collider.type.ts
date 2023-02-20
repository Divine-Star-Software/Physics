import { DimensionsVector3 } from "divine-voxel-engine/Math/";

export type ColliderReturnData = {
    name : string,
    boundingBox : DimensionsVector3,
    position : [number,number,number]
    
}[];


export type ColliderObject = {
 id: string;
 getColliderData(x: number,y:number,z:number) : ColliderReturnData
};
