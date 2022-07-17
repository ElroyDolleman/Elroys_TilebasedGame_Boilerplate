import { BaseScene } from './BaseScene';
import { SceneNames } from './ScenesConfig';

export class GameScene extends BaseScene
{
	public constructor()
	{
		super({ key: SceneNames.GameScene, active: false});
	}

	public init(data: any): void
	{
		super.init(data);
	}

	public preload(): void
	{
		console.log('preload');
	}

	public create(): void
	{
		console.log('create');
	}

	public update(): void
	{

	}
}