import { AnimationConfig } from '../configs/AnimationConfigs';
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
		this.load.json(AnimationConfig.ANIMATION_DATA_PATH);
	}

	public create(): void
	{
		super.create();

		AnimationConfig.animationData = this.cache.json.get(AnimationConfig.ANIMATION_DATA_PATH);

		SceneManager.instance.changeScene(SceneNames.GameScene, { levelName: 'playground' });
	}

	public update(): void
	{

	}
}