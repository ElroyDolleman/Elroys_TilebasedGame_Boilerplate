import { SceneManager } from '../scenes/SceneManager';

export class AssetLoader
{
	private constructor() {}

	public static loadJson(name: string, scene?: Phaser.Scene): Promise<any>
	{
		let sceneToUse = scene || SceneManager.instance.currentScene;

		if (sceneToUse.cache.json.has(name))
		{
			return Promise.resolve(sceneToUse.cache.json.get(name));
		}

		return new Promise<any>((resolve, reject) =>
		{
			sceneToUse.load.json(name, `assets/${name}.json`);
			sceneToUse.load.once(Phaser.Loader.Events.COMPLETE, (test: Phaser.Loader.LoaderPlugin) =>
			{
				if (sceneToUse.cache.json.has(name))
				{
					resolve(sceneToUse.cache.json.get(name));
				}
				else
				{
					reject('Loading ' + name + ' failed.');
				}
			});
			sceneToUse.load.start();
		});
	}

	public static loadSpritesheet(name: string, frameConfig?: Phaser.Types.Loader.FileTypes.ImageFrameConfig, scene?: Phaser.Scene): Promise<void>
	{
		let sceneToUse = scene || SceneManager.instance.currentScene;

		if (sceneToUse.textures.exists(name))
		{
			return Promise.resolve();
		}

		return new Promise<void>(resolve =>
		{
			sceneToUse.load.spritesheet(name, `assets/${name}.png`, frameConfig);
			sceneToUse.load.once(Phaser.Loader.Events.COMPLETE, resolve);
			sceneToUse.load.start();
		});
	}
}