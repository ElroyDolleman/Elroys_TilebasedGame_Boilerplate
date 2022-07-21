import { LevelCreator } from '../levels/LevelCreator';
import { PlayerController } from '../player/PlayerController';
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
		this.load.atlas('character', 'assets/character.png', 'assets/character.json');
	}

	public create(): void
	{
		super.create();

		this._levelCreator = new LevelCreator(this);
		this._levelCreator.generateLevel(this._initData.levelName);

		let playerController = new PlayerController(this, { x: 64, y: 64 });
	}

	public update(): void
	{

	}
}