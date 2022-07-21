
export namespace AnimationConfig
{
	export const ANIMATION_DATA_PATH = './assets/animation_data';

	export type AnimationJsonDataMap = { [key: string]: AnimationJsonData };
	export type AnimationJsonData = {
		name: string
		frames: number,
		isSingleFrame: boolean,
		texture: string
	}

	export let animationData: AnimationJsonDataMap;
}