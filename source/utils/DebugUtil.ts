import { IRectangle } from './IRectangle';
import { TimeDelay } from './TimeDelay';

/**
 * Only use for debugging. Makes it easier to draw some stuff.
 */
export class DebugUtil
{
	private static _debugGraphics: Phaser.GameObjects.Graphics;
	private static _activeScene: Phaser.Scene;

	private static _active: boolean = false;
	private static _rects: { rect: IRectangle; color: number; alpha: number, duration?: number }[] = [];

	private constructor() {}

	private static _isActive(): boolean
	{
		if (DEBUG_MODE && this._active === false)
		{
			this._active = true;

			TimeDelay.afterFrames(1).then(() =>
			{
				game.events.addListener('step', DebugUtil._draw, DebugUtil);

				this._activeScene = game.scene.getScenes(true)[0];
				this._debugGraphics = this._activeScene.add.graphics();

				let original = game.scene.start;
				game.scene.start = (key: string | Phaser.Scene, data?: object | undefined): Phaser.Scenes.SceneManager =>
				{
					this._debugGraphics?.destroy();
					this._rects = [];

					let scene = original.call(game.scene, key, data);

					this._activeScene = game.scene.getScene(key);
					this._debugGraphics = this._activeScene.add.graphics();

					return scene;
				};
			});
		}
		return this._active;
	}

	private static _draw(): void
	{
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

	public static fillRect(rect: IRectangle, color: number, alpha: number, duration?: number): void
	{
		if (this._isActive())
		{
			this._rects.push({ rect, color, alpha, duration });
		}
	}
}