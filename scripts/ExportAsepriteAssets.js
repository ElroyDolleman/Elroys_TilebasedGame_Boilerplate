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
			await helperFuncs.runCommand('aseprite -b ' + folder + files[j] + ' --save-as ' + output + name + '_00.png ');
		}
	}

	folders = await helperFuncs.getSubFolders(tempFilesFolder);
	let animations = {};

	for (let i = 0; i < folders.length; i++)
	{
		const textureName = folders[i];
		const folder = tempFilesFolder + textureName + '/';

		const packerOptions = {
			textureName,
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

		console.log(textureName);

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
		let jsonResult = resultFiles[0];
		let jsonString = jsonResult.buffer.toString();
		jsonString = jsonString.replaceAll(folder, '');

		let jsonOutput = JSON.parse(jsonString);
		let frames = jsonOutput.textures[0].frames;

		frames.forEach(element =>
		{
			if (!element.filename.includes('_00')) {
				return;
			}

			let animName = element.filename.split('_00')[0];

			let copyArray = frames.filter(f => {
				return f.filename.includes(animName);
			});

			animations[animName] = {
				name: animName,
				frames: copyArray.length,
				isSingleFrame: copyArray.length === 1,
				texture: textureName
			};

			if (copyArray.length === 1) {
				element.filename = animName;
			}
		});

		await helperFuncs.writeFile(outputFolder + jsonResult.name, JSON.stringify(jsonOutput));

		// IMAGE
		let imageOutput = resultFiles[1];
		await helperFuncs.writeFile(outputFolder + imageOutput.name, imageOutput.buffer);
	}

	await helperFuncs.writeFile(outputFolder + 'animation_data.json', JSON.stringify(animations));
}

console.log('\x1b[35m%s\x1b[0m', 'Start exporting aseprites assets... ^o^');
exportAsepriteAssets().then(() => console.log('\x1b[33m%s\x1b[0m', 'Exporting aseprites assets done UwU'));