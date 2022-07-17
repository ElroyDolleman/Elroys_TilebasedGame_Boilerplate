import { KeyInput } from '../inputs/KeyInput';

export class PlayerInputManager
{
	public readonly left: KeyInput;
	public readonly right: KeyInput;
	public readonly jump: KeyInput;

	public constructor(scene: Phaser.Scene)
	{
		this.left = new KeyInput(scene.input.keyboard.addKey('left'));
		this.right = new KeyInput(scene.input.keyboard.addKey('right'));
		this.jump = new KeyInput(scene.input.keyboard.addKey('up'));
	}

	public update(): void
	{
		this.left.update();
		this.right.update();
		this.jump.update();
	}

	public destroy(): void
	{
		this.left.destroy();
		this.right.destroy();
		this.jump.destroy();
	}
}