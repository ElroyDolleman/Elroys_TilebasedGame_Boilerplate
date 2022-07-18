const helperFuncs = require('./HelperFunctions');

const tilesetsPath = './assets/leveleditor/tilesets/';
const outputPath = helperFuncs.getAssetsOutputFolder();

let exportLevels = async() =>
{
	const tilesetFiles = await helperFuncs.getAllFilesOfType(tilesetsPath, '.tsx');

	for (let i = 0; i < tilesetFiles.length; i++)
	{
		const file = tilesetFiles[i];
		const outputFile = outputPath + tilesetFiles[i].replace('.tsx', '.json');

		await helperFuncs.runCommand('Tiled --export-tileset ' + tilesetsPath + file + ' ' + outputFile);

		let fileData = await helperFuncs.readFile(outputFile);

		let json = JSON.parse(fileData);
		json['type'] = undefined;
		json['image'] = undefined;
		json['version'] = undefined;
		json['tiledversion'] = undefined;

		await helperFuncs.writeFile(outputFile, JSON.stringify(json));

		console.log(file);
	}

	const imageFiles = await helperFuncs.getAllFilesOfType(tilesetsPath, '.png');

	for (let i = 0; i < imageFiles.length; i++)
	{
		const file = imageFiles[i];
		await helperFuncs.copyFile(tilesetsPath + file, outputPath + file);
	}

	console.log('\x1b[33m%s\x1b[0m', 'Exporting tilesets done :D');
}

console.log('\x1b[35m%s\x1b[0m', 'Start exporting tilesets... :O');
exportLevels();