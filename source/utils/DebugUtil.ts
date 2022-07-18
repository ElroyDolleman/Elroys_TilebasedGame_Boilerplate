import { InputManager } from '../inputs/InputManager';
import { KeyInput } from '../inputs/KeyInput';
import { SceneManager } from '../scenes/SceneManager';
import { IRectangle } from './IRectangle';
import { TimeDelay } from './TimeDelay';

/**
 * Only use for debugging. Makes it easier to draw some stuff.
 */
class DebugUtilClass
{
	private _debugGraphics: Phaser.GameObjects.Graphics;

	private _active: boolean = false;
	private _rects: { rect: IRectangle; color: number; alpha: number, duration?: number }[] = [];

	private _debugInput: KeyInput;

	public constructor() {}

	public initialize(): void
	{
		game.events.addListener('step', this._update, this);
		SceneManager.instance.onSceneChanged.addListener(this._onSceneChanged, this);
	}

	private _onSceneChanged(): void
	{
		this._debugGraphics?.destroy();
		this._rects = [];

		this._debugGraphics = SceneManager.instance.currentScene.add.graphics();

		this._debugInput = InputManager.instance.createKeyInput('U');
	}

	private _toggleActive(): void
	{
		this._active = !this._active;
		this._debugGraphics.clear();
	}

	private _update(): void
	{
		if (this._debugInput?.heldDownFrames === 1)
		{
			this._toggleActive();
		}

		if (this._active)
		{
			this._draw();
		}
	}

	private _draw(): void
	{
		this._debugGraphics.setDepth(100);
		this._debugGraphics.clear();

		for (let i = 0; i < this._rects.length; i++)
		{
			let info = this._rects[i];

			this._debugGraphics.fillStyle(info.color, info.alpha);
			this._debugGraphics.fillRect(info.rect.x, info.rect.y, info.rect.width, info.rect.height);

			if (info.duration)
			{
				info.duration--;
				if (info.duration <= 0)
				{
					this._rects.splice(i, 1);
					i--;
				}
			}
		}
	}

	public fillRect(rect: IRectangle, color: number, alpha: number, duration?: number): void
	{
		this._rects.push({ rect, color, alpha, duration });
	}
}

export const DebugUtil = DEV ? new DebugUtilClass() : undefined;