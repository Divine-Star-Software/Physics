//types
import type { ColliderObject } from "Types/Physics/Collider.type.js";
//objects
import { VoxelMath } from "divine-voxel-engine/Math/index.js";
import { CollisionsHanlder } from "./Collisions/CollisionsHandler.js";
import { EntityBase } from "./Entities/Entity.base.js";
import { ColliderManager } from "./Colliders/ColliderManager.js";
import { DataTool } from "divine-voxel-engine/Tools/Data/DataTool.js";
//functions
import { RegisterDefaultColliders } from "./Colliders/Functions/RegisterDefaultColliders.js";
export const DVP = {
 math: VoxelMath,
 collisions: CollisionsHanlder,
 colliders: ColliderManager,
 _dataTool: new DataTool(),
 getCollider(
  x: number,
  y: number,
  z: number,
  dimension: number = 0
 ): false | ColliderObject {
  if (!this._dataTool.loadInAt(x, y, z)) return false;
  if (!this._dataTool.checkCollisions()) return false;
  if (this._dataTool.getSubstance() == "#dve_liquid") return false;
  let collider = this._dataTool.getCollider();
  return this.colliders.getCollider(collider != "none" ? collider : "Box");
 },
};
RegisterDefaultColliders(DVP.colliders);
export type DivineVoxelEnginePhysics = typeof DVP;
