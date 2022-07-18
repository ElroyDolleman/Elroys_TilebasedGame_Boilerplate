import { BaseScene } from './BaseScene';
import { SceneNames } from './ScenesConfig';

export class GameScene extends BaseScene
{
	public constructor()
	{
		super({ key: SceneNames.GameScene, active: false});
	}

	public preload(): void
	{

	}

	public create(): void
	{
		super.create();
	}

	public update(): void
	{

	}
}