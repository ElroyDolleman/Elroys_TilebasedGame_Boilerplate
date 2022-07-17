import { Level } from '../levels/Level';
import { Tile, TileTypes } from '../levels/tile';
import { IRectangleSides } from '../utils/IRectangle';
import { ICollidable } from './ICollidable';

export type CollisionResult = {
	previousHitbox: IRectangleSides;
	tiles: Tile[];
	collided: {
		onLeft: boolean;
		onRight: boolean;
		onTop: boolean;
		onBottom: boolean;
	}
}

enum CollisionSide {
	None,
	Top,
	Left,
	Right,
	Bottom,
}

export class CollisionManager
{
	private readonly _level: Level;

	public constructor(level: Level)
	{
		this._level = level;
	}

	public moveCollidable(collidable: ICollidable): CollisionResult
	{
		let result = this._getDefualtResult(collidable);
		result.tiles = this._level.map.getTilesFromRect(collidable.nextHitbox, 2);

		collidable.moveX();
		for (let i = 0; i < result.tiles.length; i++)
		{
			if (!this._overlapsNonEmptyTile(result.tiles[i], collidable))
			{
				continue;
			}

			let collideResult = this._solveHorizontalCollision(result.tiles[i], collidable);

			switch(collideResult)
			{
			case CollisionSide.Right: result.collided.onRight = true; break;
			case CollisionSide.Left: result.collided.onLeft = true; break;
			}
		}

		collidable.moveY();
		for (let i = 0; i < result.tiles.length; i++)
		{
			if (!this._overlapsNonEmptyTile(result.tiles[i], collidable))
			{
				continue;
			}

			let collideResult = this._solveVerticalCollision(result.tiles[i], collidable);

			switch(collideResult)
			{
			case CollisionSide.Top: result.collided.onTop = true; break;
			case CollisionSide.Bottom: result.collided.onBottom = true; break;
			}
		}

		collidable.onCollisionSolved(result);
		return result;
	}

	private _solveHorizontalCollision(tile: Tile, collidable: ICollidable): CollisionSide
	{
		if (collidable.speed.x > 0)
		{
			collidable.hitbox.x = tile.hitbox.x - collidable.hitbox.width;
			return CollisionSide.Right;
		}
		else if (collidable.speed.x < 0)
		{
			collidable.hitbox.x = tile.hitbox.right;
			return CollisionSide.Left;
		}
		return CollisionSide.None;
	}

	private _solveVerticalCollision(tile: Tile, collidable: ICollidable): CollisionSide
	{
		if (collidable.speed.y > 0)
		{
			collidable.hitbox.y = tile.hitbox.y - collidable.hitbox.height;
			return CollisionSide.Bottom;
		}
		else if (collidable.speed.y < 0)
		{
			collidable.hitbox.y = tile.hitbox.bottom;
			return CollisionSide.Top;
		}
		return CollisionSide.None;
	}

	private _overlapsNonEmptyTile(tile: Tile, collidable: ICollidable): boolean
	{
		return tile.tileType !== TileTypes.Empty && Phaser.Geom.Rectangle.Overlaps(tile.hitbox, collidable.hitbox);
	}

	private _getDefualtResult(collidable: ICollidable): CollisionResult
	{
		return {
			tiles: [],
			previousHitbox: {
				left: collidable.hitbox.left,
				right: collidable.hitbox.right,
				top: collidable.hitbox.top,
				bottom: collidable.hitbox.bottom,
			},
			collided: {
				onLeft: false,
				onRight: false,
				onTop: false,
				onBottom: false,
			}
		};
	}
}