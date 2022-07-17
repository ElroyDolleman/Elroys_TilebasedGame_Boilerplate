import { InputManager } from '../inputs/InputManager';
import { GameEvent } from '../utils/GameEvent';
import { BaseScene } from './BaseScene';
import { SceneNames } from './ScenesConfig';

type ScenesMap = { [key in SceneNames]: BaseScene; };
type SceneChangeProps = {
	sceneName: string;
	data: any;
}

export class SceneManager
{
	private static _instance: SceneManager;
	public static get instance(): SceneManager
	{
		if (!this._instance)
		{
			this._instance = new SceneManager();
		}
		return this._instance;
	}

	public get currentScene(): BaseScene { return this._scenes[this._currentSceneKey]; }

	public readonly onSceneChanged: GameEvent<SceneChangeProps> = new GameEvent<SceneChangeProps>();

	private _scenes: ScenesMap = {} as ScenesMap;
	private _currentSceneKey: SceneNames;

	private constructor()
	{
		this.onSceneChanged.addListener(this._onSceneChanged, this);
		game.events.addListener('step', this._update, this);
	}

	public addScene(key: SceneNames, scene: BaseScene, isActive: boolean = false): void
	{
		this._scenes[key] = scene;
		if (isActive)
		{
			this._currentSceneKey = key;
		}
	}

	public changeScene(key: SceneNames, data?: any): void
	{
		this.currentScene.scene.start(key, data);
		InputManager.instance.removeAllKeyInputs();
	}

	private _onSceneChanged(props: SceneChangeProps): void
	{

	}

	private _update(): void
	{

	}
}