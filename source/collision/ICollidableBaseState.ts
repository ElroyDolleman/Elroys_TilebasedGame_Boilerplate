import { IBaseState } from '../state_machine/IBaseState';
import { CollisionResult } from './CollisionManager';

export interface ICollidableBaseState<T> extends IBaseState<T>
{
	onCollisionSolved(result: CollisionResult): void;
}