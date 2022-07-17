import { TimeUtil } from '../utils/TimeUtil';

interface ISquishable {
	setScale(x: number, y: number): void;
}

type SquishProps = {
	timer: number;
	startTime: number;
	reverseTime: number;
	scaleX: number;
	scaleY: number;
}

export class SquishAnimator
{
	public get isSquishing(): boolean { return this._currentSquish.timer > 0; }

	private _currentSquish: SquishProps = {
		timer: 0,
		reverseTime: 0,
		startTime: 0,
		scaleX: 1,
		scaleY: 1
	};

	private _squishable: ISquishable;

	public constructor(squishable: ISquishable)
	{
		this._squishable = squishable;
	}

	public squish(scaleX: number, scaleY: number, duration: number, reverseTime?: number): void
	{
		this._currentSquish = {
			timer: duration,
			reverseTime: reverseTime === undefined ? duration / 2 : reverseTime,
			startTime: duration,
			scaleX: scaleX,
			scaleY: scaleY
		};
	}

	public update(): void
	{
		if (!this.isSquishing)
		{
			return;
		}

		this._currentSquish.timer = Math.max(this._currentSquish.timer - TimeUtil.elapsedSeconds, 0);
		let timeToReverse = this._currentSquish.startTime - this._currentSquish.reverseTime;

		if (this._currentSquish.timer > timeToReverse)
		{
			let t = 1 - (this._currentSquish.timer - timeToReverse) / this._currentSquish.reverseTime;

			this._squishable.setScale(
				Phaser.Math.Linear(1, this._currentSquish.scaleX, t),
				Phaser.Math.Linear(1, this._currentSquish.scaleY, t)
			);
		}
		else
		{
			let t = 1 - this._currentSquish.timer / timeToReverse;

			this._squishable.setScale(
				Phaser.Math.Linear(this._currentSquish.scaleX, 1, t),
				Phaser.Math.Linear(this._currentSquish.scaleY, 1, t)
			);
		}
	}
}