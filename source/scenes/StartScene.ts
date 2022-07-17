import { TileConfigs } from '../configs/GameConfigs';
import { LevelCreator } from '../levels/LevelCreator';
import { GameEvent } from '../utils/GameEvent';
import { BaseScene } from './BaseScene';
import { SceneManager } from './SceneManager';
import { SceneNames } from './ScenesConfig';

export class StartScene extends BaseScene
{
	public constructor()
	{
		super({ key: SceneNames.StartScene, active: true});
	}

	public init(data: any): void
	{

	}

	public preload(): void
	{

	}

	public create(): void
	{
		let lvlLoader = new LevelCreator(this);
		lvlLoader.generateLevel('playground');
	}

	public update(): void
	{

	}
}