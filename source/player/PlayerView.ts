import { SpriteAnimator } from '../animators/SpriteAnimation';
import { SquishAnimator } from '../animators/SquishAnimator';
import { PlayerAnimationsMap, PlayerStates } from './states/PlayerStates';

export class PlayerView
{
	public sprite: Phaser.GameObjects.Sprite;
	public animator: SpriteAnimator;
	public squish: SquishAnimator;

	public constructor(scene: Phaser.Scene)
	{
		this.sprite = scene.add.sprite(64, 64, 'character');
		this.animator = new SpriteAnimator(scene, this.sprite);

		this.animator.createAnimationsFromMap(PlayerAnimationsMap);
		this.animator.changeAnimation(PlayerAnimationsMap[PlayerStates.Walk]);
	}

	public updateVisuals(): void
	{

	}
}