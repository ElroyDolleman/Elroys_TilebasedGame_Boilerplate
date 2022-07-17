import { CollisionResult } from '../../collision/CollisionManager';
import { CollisionUtility } from '../../collision/CollisionUtility';
import { IBaseState } from '../../state_machine/IBaseState';
import { StateMachine } from '../../state_machine/StateMachine';
import { PlayerController } from '../PlayerController';
import { Tile } from '../../levels/tile';

export class PlayerGroundedState implements IBaseState<PlayerController>
{
	public machine: StateMachine<PlayerController>;

	public constructor() {}

	public enter(): void
	{

	}

	public update(): void
	{
		if (this.machine.owner.inputs.jump.heldDownFrames === 1)
		{
			// this.machine.changeState(PlayerStates.Jump);
		}
	}

	public leave(): void
	{

	}

	public onCollisionSolved(result: CollisionResult): void
	{
		if (!this._hasGroundUnderneath(result.tiles))
		{
			// this.machine.changeState(PlayerStates.Fall);
		}

		if ((result.collided.onRight && this.machine.owner.speed.x > 0) ||
		(result.collided.onLeft && this.machine.owner.speed.x < 0))
		{
			this.machine.owner.speed.x = 0;
		}
	}

	protected _hasGroundUnderneath(tiles: Tile[]): boolean
	{
		for (let i = 0; i < tiles.length; i++)
		{
			if (!tiles[i].canStandOn)
			{
				continue;
			}
			if (this._isStandingOnTile(tiles[i]))
			{
				return true;
			}
		}
		return false;
	}

	protected _isStandingOnTile(tile: Tile): boolean
	{
		return CollisionUtility.hitboxVerticallyAligned(this.machine.owner.hitbox, tile.hitbox);
	}
}