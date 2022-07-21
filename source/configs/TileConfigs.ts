export namespace TileConfigs
{
	export const TILE_WIDTH = 16;
	export const TILE_HEIGHT = 16;

	export const FLIPPED_HORIZONTALLY_FLAG = 0x80000000;
	export const FLIPPED_VERTICALLY_FLAG = 0x40000000;
	export const FLIPPED_DIAGONALLY_FLAG = 0x20000000;

	export const tileIdToFrameId = (tileId: number): number =>
	{
		return tileId &= ~(FLIPPED_HORIZONTALLY_FLAG | FLIPPED_VERTICALLY_FLAG | FLIPPED_DIAGONALLY_FLAG);
	};

	export const getTileRotationById = (tileId: number): number =>
	{
		let flippedH: boolean = (tileId & FLIPPED_HORIZONTALLY_FLAG) > 0;
		let flippedV: boolean = (tileId & FLIPPED_VERTICALLY_FLAG) > 0;
		let flippedD: boolean = (tileId & FLIPPED_DIAGONALLY_FLAG) > 0;

		if (!flippedH && flippedV && flippedD)
		{
			return 1.5 * Math.PI; // 270
		}
		else if (!flippedH && !flippedV && flippedD)
		{
			return 0.5 * Math.PI; // 90
		}
		else if (flippedV && !flippedD)
		{
			return Math.PI;
		}
		return 0;
	};
}