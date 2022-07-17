/**
 * Merge all properties from source to target if that property is undefined for the target
 */
export let mergeObjects = (source: any, target: any): void =>
{
	Object.keys(target)
		.filter((key) => target[key] === undefined)
		.forEach((key) => target[key] = source[key]);
};