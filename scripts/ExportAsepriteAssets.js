const helperFuncs = require('./HelperFunctions');
const { packAsync } = require('free-tex-packer-core');
const fs = require('fs');

let exportAsepriteAssets = async() =>
{
	const buildFilesFolder = await helperFuncs.getBuildFilesFolder();
	const outputFolder = await helperFuncs.getAssetsOutputFolder();
	const tempFilesFolder = await helperFuncs.getTempFilesFolder();
	const sourceFolder = './assets/aseprite/';

	let folders = await helperFuncs.getSubFolders(sourceFolder);

	for (let i = 0; i < folders.length; i++)
	{
		const folder = sourceFolder + folders[i] + '/';
		const output = tempFilesFolder + folders[i] + '/';

		const files = await helperFuncs.getAllFilesOfType(folder, '.aseprite');

		for (let j = 0; j < files.length; j++)
		{
			// Save all aseprite files as png's
			let name = files[j].split('.aseprite')[0];
			await helperFuncs.runCommand('aseprite -b ' + folder + files[j] + ' --save-as ' + output + name + '.png');
		}
	}

	folders = await helperFuncs.getSubFolders(tempFilesFolder);

	for (let i = 0; i < folders.length; i++)
	{
		console.log(folders[i]);

		const folder = tempFilesFolder + folders[i] + '/';

		const packerOptions = {
			textureName: folders[i],
			width: 1024,
			height: 1024,
			fixedSize: false,
			padding: 2,
			allowRotation: false,
			detectIdentical: true,
			allowTrim: true,
			exporter: "Phaser3",
			removeFileExtension: true,
			prependFolderName: true
		};

		const files = await helperFuncs.getAllFilesOfType(folder, '.png');
		let images = [];

		for (let j = 0; j < files.length; j++)
		{
			console.log('- ' + files[j]);

			images.push({
				path: folder + files[j],
				contents: fs.readFileSync(folder + files[j])
			});
		}

		let resultFiles = await packAsync(images, packerOptions);

		// JSON
		const jsonOutput = resultFiles[0];
		let jsonString = jsonOutput.buffer.toString();
		jsonString = jsonString.replaceAll(folder, '');

		await helperFuncs.writeFile(outputFolder + jsonOutput.name, jsonString);

		// IMAGE
		const imageOutput = resultFiles[1];
		await helperFuncs.writeFile(outputFolder + imageOutput.name, imageOutput.buffer);
	}
}

console.log('\x1b[35m%s\x1b[0m', 'Start exporting aseprites assets... ^o^');
exportAsepriteAssets().then(() => console.log('\x1b[33m%s\x1b[0m', 'Exporting aseprites assets done UwU'));