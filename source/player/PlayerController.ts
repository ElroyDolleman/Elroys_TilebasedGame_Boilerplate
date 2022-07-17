import { CollisionResult } from '../collision/CollisionManager';
import { PlayerConfig } from '../configs/PlayerConfig';
import { Entity } from '../entities/Entity';
import { StateMachine } from '../state_machine/StateMachine';
import { PlayerInputManager } from './PlayerInputManager';

export class PlayerController extends Entity
{
	public inputs: PlayerInputManager;

	private _stateMachine: StateMachine<PlayerController>;

	public constructor()
	{
		super();
	}

	public update(): void
	{

	}

	public lateUpdate(): void
	{

	}

	public onCollisionSolved(result: CollisionResult): void
	{

	}

	public destroy(): void
	{

	}
}