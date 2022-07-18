export class KeyInput
{
	public get heldDownFrames(): number { return this._heldDownFrames; }
	public set heldDownFrames(f: number)
	{
		this._heldDownFrames = f;
		this._prevHeldDownFrames = Math.max(f - 1, 0);
	}

	public get isDown(): boolean { return this._heldDownFrames > 0; }
	public get justDown(): boolean { return this._heldDownFrames === 1; }
	public get justReleased(): boolean { return this._prevHeldDownFrames > 0 && this._heldDownFrames === 0; }

	public readonly phaserKey: Phaser.Input.Keyboard.Key;

	private _heldDownFrames: number;
	private _prevHeldDownFrames: number;

	public constructor(key: Phaser.Input.Keyboard.Key)
	{
		this.phaserKey = key;
	}

	public update(): void
	{
		this._prevHeldDownFrames = this._heldDownFrames;

		if (this.phaserKey.isDown)
		{
			this._heldDownFrames++;
		}
		else
		{
			this._heldDownFrames = 0;
		}
	}

	public destroy(): void
	{
		this.phaserKey.destroy();
	}
}