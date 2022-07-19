import { TileConfigs } from '../configs/GameConfigs';
import { AssetLoader } from '../utils/AssetLoader';
import { LevelJsonData, TileLayerData, TilePropertyData, TilesetJsonData } from './LevelEditorTypes';
import { Tile, TileConfig } from './Tile';

export class LevelCreator
{
	private readonly _scene: Phaser.Scene;
	private _cachedTilesets: TilesetJsonData[];

	public constructor(scene: Phaser.Scene)
	{
		this._scene = scene;
	}

	public async generateLevel(name: string): Promise<void>
	{
		let levelData = await AssetLoader.loadJson(name, this._scene) as LevelJsonData;
		this._cachedTilesets = [];

		for (let i = 0; i < levelData.tilesets.length; i++)
		{
			const tilesetInfo = levelData.tilesets[i];

			let tilesetData = await AssetLoader.loadJson(tilesetInfo.name, this._scene) as TilesetJsonData;
			await AssetLoader.loadSpritesheet(tilesetInfo.name, { frameWidth: tilesetData.tilewidth, frameHeight: tilesetData.tileheight }, this._scene);

			this._cachedTilesets.push(tilesetData);
		}

		levelData.layers.forEach(layerData =>
		{
			switch (layerData.type)
			{
			case 'tilelayer':
				this._createTiles(layerData as TileLayerData);
				break;
			case 'objectgroup':
				break;
			}
		});
	}

	private _createTiles(layerData: TileLayerData): Tile[]
	{
		let tiles: Tile[] = [];

		for (let i = 0; i < layerData.tiles.length; i++)
		{
			const tileNum = layerData.tiles[i] - 1;
			const cellX = i % layerData.width;
			const cellY = Math.floor(i / layerData.width);
			const posX = cellX * TileConfigs.TILE_WIDTH;
			const posY = cellY * TileConfigs.TILE_HEIGHT;

			// TODO: Support multiple tilesets?
			// this._cachedTilesets.find(tilesetData =>
			// {
			// 	return tilesetData.name === layerData.name;
			// });

			let tilesetData = this._cachedTilesets[0];
			let tileData = tilesetData.tiles[tileNum];

			let tile = new Tile({
				scene: this._scene,
				tilesetName: tilesetData.name,
				tileId: tileData ? tileData.id : tileNum,
				properties: tileData ? tileData.properties : [],
				width: TileConfigs.TILE_WIDTH,
				height: TileConfigs.TILE_HEIGHT,
				cellX, cellY,
				posX, posY,
			});
			tiles.push(tile);
		}

		return tiles;
	}
}