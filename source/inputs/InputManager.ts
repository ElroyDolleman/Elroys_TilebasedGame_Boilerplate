import { SceneManager } from '../scenes/SceneManager';
import { KeyInput } from './KeyInput';

export class InputManager
{
	private static _instance: InputManager;
	public static get instance(): InputManager
	{
		if (!this._instance)
		{
			this._instance = new InputManager();
		}
		return this._instance;
	}

	private _inputs: KeyInput[] = [];

	private constructor()
	{
		game.events.addListener('step', this._update, this);
	}

	public createKeyInput(key: string | number | Phaser.Input.Keyboard.Key): KeyInput
	{
		let phaserKey = SceneManager.instance.currentScene.input.keyboard.addKey(key);
		let input = new KeyInput(phaserKey);

		this.addKeyInput(input);
		return input;
	}

	public addKeyInput(input: KeyInput): void
	{
		this._inputs.push(input);
	}

	public removeAllKeyInputs(): void
	{
		this._inputs.forEach(input => input.destroy());
		this._inputs = [];
	}

	private _update(): void
	{
		this._inputs.forEach(input => input.update());
	}
}