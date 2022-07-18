import { DebugUtil } from '../utils/DebugUtil';
import { TileConfigs } from '../configs/GameConfigs';
import { TilePropertyData } from './LevelEditorTypes';

export enum TileTypes {
	Empty,
	Solid,
	SemiSolid
}

export interface TileConfig
{
	tilesetName: string;
	tileId: number;
	cellX: number;
	cellY: number;
	posX: number;
	posY: number;
	width: number;
	height: number;
	scene: Phaser.Scene;
	properties: TilePropertyData[];
}

export class Tile
{
	public get isSolid(): boolean { return this.tileType === TileTypes.Solid; }
	public get canStandOn(): boolean { return this.isSolid /**|| this.isSemisolid*/; }

	public readonly cellX: number;
	public readonly cellY: number;

	public sprite?: Phaser.GameObjects.Sprite;
	public position: Phaser.Geom.Point;

	public hitbox: Phaser.Geom.Rectangle;

	public tileType: TileTypes = TileTypes.Empty;

	public constructor(config: TileConfig)
	{
		this.position = new Phaser.Geom.Point(config.posX, config.posY);
		this.cellX = config.cellX;
		this.cellY = config.cellY;

		if (config.tileId >= 0)
		{
			const frameId = TileConfigs.tileIdToFrameId(config.tileId);
			const rotation = TileConfigs.getTileRotationById(config.tileId);

			this.sprite = config.scene.add.sprite(this.position.x + config.width / 2, this.position.y + config.height / 2, config.tilesetName, frameId);
			this.sprite.setRotation(rotation);
			this.sprite.setOrigin(0.5, 0.5);
		}

		this.hitbox = new Phaser.Geom.Rectangle(this.position.x, this.position.y, TileConfigs.TILE_WIDTH, TileConfigs.TILE_HEIGHT);

		this._setProperties(config.properties);

		if (DEV && this.isSolid)
		{
			DebugUtil?.fillRect(this.hitbox, 0xFF0000, 0.5);
		}
	}

	private _setProperties(properties: TilePropertyData[]): void
	{
		properties.forEach(prop =>
		{
			switch(prop.name)
			{
			case 'type':
				this.tileType = TileTypes[prop.value as keyof typeof TileTypes];
				break;
			default:
				(this as any)[prop.name] = prop.value;
				break;
			}
		});
	}

	public destroy(): void
	{
		this.sprite?.destroy();
	}
}