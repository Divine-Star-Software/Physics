import type { ColliderObject } from "../../Types/Physics/Collider.type";
export declare const ColliderManager: {
    colliders: Record<string, ColliderObject>;
    registerCollider(collider: ColliderObject): void;
    getCollider(id: string): ColliderObject;
};
