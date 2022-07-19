import { BaseScene } from './BaseScene';
import { SceneManager } from './SceneManager';
import { SceneNames } from './ScenesConfig';

export class StartScene extends BaseScene
{
	public constructor()
	{
		super({ key: SceneNames.StartScene, active: true});
	}

	public preload(): void
	{

	}

	public create(): void
	{
		super.create();

		SceneManager.instance.changeScene(SceneNames.GameScene, { levelName: 'playground' });
	}

	public update(): void
	{

	}
}