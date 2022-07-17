export type LevelJsonData = {
	height: number,
	width: number,

	tileheight: number,
	tilewidth: number,

	layers: (EntityLayerData | TileLayerData)[],
	tilesets: { name: string; }[],
}

type BaseLayerData = {
	name: string;
	type: 'objectgroup' | 'tilelayer';
}

export type EntityLayerData = BaseLayerData & {
	entities: EntityJsonData[];
}

export type TileLayerData = BaseLayerData & {
	tiles: number[];
	width: number;
	height: number;
}

export type EntityJsonData = {
	x: number;
	y: number;
	id: number;
	class: string;
	name: string;
	rotation: number;
}

export type TilesetJsonData = {
	name: string;

	columns: number;
	tilecount: number;
	tilewidth: number;
	tileheight: number;

	margin: number;
	spacing: number;
	imagewidth: number;
	imageheight: number;

	tiles: TileJsonData[];
}

export type TileJsonData = {
	id: number;
	properties: TilePropertyData[];
}

export type TilePropertyData = {
	name: string;
	type: string;
	value: string | number | boolean;
}