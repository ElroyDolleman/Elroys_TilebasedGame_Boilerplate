const helperFuncs = require('./HelperFunctions');

const levelsPath = './assets/leveleditor/levels/';
const outputPath = helperFuncs.getAssetsOutputFolder();

let exportLevels = async() =>
{
	let files = await helperFuncs.getAllFilesOfType(levelsPath, '.tmx');

	for (let i = 0; i < files.length; i++)
	{
		const file = files[i];
		const outputFile = outputPath + files[i].replace('.tmx', '.json');

		await helperFuncs.runCommand('Tiled --export-map ' + levelsPath + file + ' ' + outputFile);

		let fileData = await helperFuncs.readFile(outputFile);

		let json = JSON.parse(fileData);
		json['type'] = undefined;
		json['version'] = undefined;
		json['infinite'] = undefined;
		json['tiledversion'] = undefined;
		json['orientation'] = undefined;
		json['renderorder'] = undefined;
		json['nextlayerid'] = undefined;
		json['nextobjectid'] = undefined;
		json['compressionlevel'] = undefined;

		let indexToRemove = json['tilesets'].findIndex(element =>
		{
			return element.source.includes('leveleditor/previews/');
		});
		if (indexToRemove)
		{
			json['tilesets'].splice(indexToRemove, 1);
		}

		let jsonString = JSON.stringify(json);
		jsonString = jsonString.replaceAll('../../../assets/leveleditor/tilesets/', '').replaceAll('.tsx', '');
		jsonString = jsonString.replaceAll('"source"', '"name"');
		jsonString = jsonString.replaceAll('"objects"', '"entities"');
		jsonString = jsonString.replaceAll('"data"', '"tiles"');

		await helperFuncs.writeFile(outputFile, jsonString);

		console.log(file);
	}

	console.log('\x1b[33m%s\x1b[0m', 'Exporting levels done :3');
}

console.log('\x1b[35m%s\x1b[0m', 'Start exporting levels... =]');
exportLevels();