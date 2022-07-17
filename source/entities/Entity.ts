import { CollisionResult } from '../collision/CollisionManager';
import { ICollidable } from '../collision/ICollidable';
import { TimeUtil } from '../utils/TimeUtil';

export abstract class Entity implements ICollidable
{
	public get nextHitbox(): Phaser.Geom.Rectangle
	{
		return new Phaser.Geom.Rectangle(
			this.x + this.speed.x * TimeUtil.elapsedSeconds,
			this.y + this.speed.y * TimeUtil.elapsedSeconds,
			this.hitbox.width,
			this.hitbox.height
		);
	}

	public get hitbox(): Phaser.Geom.Rectangle { return this._hitbox; }

	public get x(): number { return this._hitbox.x; }
	public set x(x: number) { this._hitbox.x = x; }

	public get y(): number { return this._hitbox.y; }
	public set y(y: number) { this._hitbox.y = y; }

	public get position(): Phaser.Math.Vector2
	{
		return new Phaser.Math.Vector2(this.hitbox.x, this.hitbox.y);
	}

	public speed: Phaser.Math.Vector2;
	private _hitbox: Phaser.Geom.Rectangle;

	public moveX(): void
	{
		this._hitbox.x += this.speed.x * TimeUtil.elapsedSeconds;
	}

	public moveY(): void
	{
		this._hitbox.y += this.speed.y * TimeUtil.elapsedSeconds;
	}

	public abstract update(): void;
	public abstract lateUpdate(): void;

	public abstract destroy(): void;
	public abstract onCollisionSolved(result: CollisionResult): void
}