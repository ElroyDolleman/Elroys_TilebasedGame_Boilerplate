import { mergeObjects } from '../utils/ExtraUtils';

export type SpriteAnimationConfig = {
	key: string;
	name: string;
	texture: string;

	start?: number;
	end?: number;
	frameRate?: number;
	repeat?: number;
}

export class SpriteAnimator
{
	public readonly defaultAnimationConfig: SpriteAnimationConfig =
		{
			key: '',
			name: '',
			texture: '',
			start: 1,
			end: 2,
			frameRate: 16,
			repeat: -1,
		};

	public get facingDirection(): number { return this.sprite.flipX ? -1 : 1; }
	public set facingDirection(dir: number) { this.sprite.flipX = dir < 0; }

	public get currentAnimKey(): string { return this._currentAnimKey; }

	public readonly sprite: Phaser.GameObjects.Sprite;
	public readonly scene: Phaser.Scene;

	private _currentAnimKey: string = '';

	public constructor(scene: Phaser.Scene, sprite: Phaser.GameObjects.Sprite)
	{
		this.scene = scene;
		this.sprite = sprite;
	}

	public changeAnimation(key: string, isSingleFrame: boolean = false): void
	{
		this._currentAnimKey = key;
		if (isSingleFrame)
		{
			this.sprite.anims.stop();
			this.sprite.setFrame(key);
		}
		else
		{
			this.sprite.anims.play(key);
		}
	}

	public createAnimation(config: SpriteAnimationConfig): void
	{
		mergeObjects(this.defaultAnimationConfig, config);

		let frameNames = this.scene.anims.generateFrameNames(config.texture, {
			prefix: config.name,
			start: config.start,
			end: config.end,
			zeroPad: 1
		});

		if (frameNames.length === 0)
		{
			console.log(config);
			throw new Error('Failed to generate frame names for animation.');
		}

		this.scene.anims.create({
			key: config.key,
			frames: frameNames,
			frameRate: config.frameRate,
			repeat: config.repeat,
		});
	}
}