import { LevelCreator } from '../levels/LevelCreator';
import { BaseScene } from './BaseScene';
import { SceneNames } from './ScenesConfig';

export class GameScene extends BaseScene
{
	private _levelCreator: LevelCreator;

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

		this._levelCreator = new LevelCreator(this);
		this._levelCreator.generateLevel(this._initData.levelName);
	}

	public update(): void
	{

	}
}