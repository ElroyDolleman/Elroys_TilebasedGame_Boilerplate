const fs = require('fs');
const cmd = require('node-cmd');

module.exports = {
	getAllFilesOfType: (directory, extension) =>
	{
		return new Promise((resolve, reject) =>
		{
			fs.readdir(directory, (err, files) =>
			{
				if (err) {
					reject(err);
				}
				else {
					resolve(files.filter(file => { return file.includes(extension); }));
				}
			});
		});
	},

	runCommand: command =>
	{
		return new Promise((resolve, reject) =>
		{
			cmd.run(command, err =>
			{
				if (err) {
					reject(err);
				}
				else {
					resolve();
				}
			});
		});
	},

	readFile: filepath =>
	{
		return new Promise((resolve, reject) =>
		{
			fs.readFile(filepath, 'utf8', (err, data) =>
			{
				if (err) {
					reject(err);
				}
				else {
					resolve(data);
				}
			});
		});
	},

	writeFile: (filepath, data) =>
	{
		return new Promise(resolve => fs.writeFile(filepath, data, resolve));
	},

	copyFile: (source, destination) =>
	{
		return new Promise((resolve, reject) =>
		{
			fs.copyFile(source, destination, (err) =>
			{
				if (err) {
					reject(err);
				}
				else {
					resolve();
				}
			});
		});
	}
};