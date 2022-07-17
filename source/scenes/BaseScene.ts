import { SceneManager } from './SceneManager';
import { SceneNames } from './ScenesConfig';

export abstract class BaseScene extends Phaser.Scene
{
	public readonly name: SceneNames;

	public constructor(config: { key: SceneNames; active: boolean })
	{
		super(config);
		this.name = config.key;
		SceneManager.instance.addScene(config.key, this, config.active);
	}

	public init(data: any): void
	{
		SceneManager.instance.onSceneChanged.emit({ sceneName: this.name, data });
	}
}