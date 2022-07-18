import { SceneManager } from './SceneManager';
import { SceneNames } from './ScenesConfig';

export abstract class BaseScene extends Phaser.Scene
{
	public readonly name: SceneNames;
	protected _initData: any;

	public constructor(config: { key: SceneNames; active: boolean })
	{
		super(config);
		this.name = config.key;
		SceneManager.instance.addScene(config.key, this, config.active);
	}

	public init(data: any): void
	{
		this._initData = data;
		SceneManager.instance.onSceneChanged.emit({ sceneName: this.name, data: this._initData });
	}

	public create(): void
	{
		// SceneManager.instance.onSceneChanged.emit({ sceneName: this.name, data: this._initData });
	}
}