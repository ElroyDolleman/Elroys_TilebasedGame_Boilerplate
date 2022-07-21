import { AnimationConfig } from '../configs/AnimationConfigs';

export class SpriteAnimator
{
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

	public changeAnimation(key: string): void
	{
		let animData = this._getAnimationData(key);
		this._currentAnimKey = key;

		if (animData.isSingleFrame)
		{
			this.sprite.anims.stop();
			this.sprite.setFrame(key);
		}
		else
		{
			if (!this.sprite.anims.exists(key))
			{
				this.createAnimation(key);
			}
			this.sprite.anims.play(key);
		}
	}

	public createAnimationsFromMap(animationNames: { [key: number]: string }): void
	{
		Object.keys(animationNames).forEach(index =>
		{
			let name = animationNames[Number(index)];
			this.createAnimation(name);
		});
	}

	public createAnimation(key: string, repeat: number | boolean = -1, frames?: number, frameRate: number = 16): void
	{
		let animData = this._getAnimationData(key);

		if (!this.scene.textures.exists(animData.texture))
		{
			throw new Error('Failed to create an animation with texture "' + animData.texture +  '" since the texture has not been loaded yet.');
		}

		if (animData.isSingleFrame)
		{
			// No need to generate frames
			return;
		}

		let frameNameConfig = {
			prefix: animData.name + '_',
			start: 0,
			end: (frames ? frames : animData.frames) - 1,
			zeroPad: 2
		};
		let frameNames = this.scene.anims.generateFrameNames(animData.texture, frameNameConfig);

		if (frameNames.length === 0)
		{
			console.log(animData, frameNameConfig);
			throw new Error('Failed to generate frame names for animation ' + key);
		}

		switch(repeat)
		{
		case true: repeat = -1; break;
		case false: repeat = 0; break;
		}

		this.scene.anims.create({
			key,
			frames: frameNames,
			frameRate,
			repeat,
		});
	}

	private _getAnimationData(key: string): any
	{
		let animData = AnimationConfig.animationData[key];
		if (!animData)
		{
			console.log(AnimationConfig.animationData);
			throw new Error('Failed to get animation data for ' + key);
		}
		return animData;
	}
}