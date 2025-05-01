const { join, resolve, basename } = require('path');
const { copySync, removeSync } = require('fs-extra');

const commonFiles = [
	'./CHANGELOG.md',
	'./README.md',
];

const projectPath = __dirname;
const workspacePath = resolve('.');

const {
	author,
	bugs,
	homepage,
	keywords: parentKeywords,
	license,
	repository,
} = require(join(projectPath, 'package.json'));

const completePackage = require(join(workspacePath, 'package.json'));
const {
	name, private: isPrivate, description, version, keywords,
	type, engines, publishConfig, bin, main, module: modulePath, unpkg, jsdelivr, types, exports: packageExports, sideEffects, files,
	dependencies, peerDependencies, peerDependenciesMeta, devDependencies,
	...restOfPackage
} = completePackage;

delete restOfPackage['//'];
delete restOfPackage.scripts;
delete restOfPackage['clean-package'];
delete restOfPackage.eslintConfig;

repository.directory = workspacePath.replace(new RegExp(`^${projectPath}/?`), '');

// const branch = repository.branch;
delete repository.branch;

module.exports = {
	indent: '\t',
	remove: Object.keys(completePackage),
	replace: {
		name, private: isPrivate, version,
		description, keywords: [...parentKeywords, ...keywords],

		author, license, repository,
		homepage,
		// homepage: homepage.replace('#readme', `/tree/${branch}/${repository.directory}$&`),
		bugs,
		publishConfig,

		type,
		engines,
		bin, main, module: modulePath, unpkg, jsdelivr, types,
		exports: packageExports,
		sideEffects,
		files,

		dependencies,
		peerDependencies,
		peerDependenciesMeta,
		devDependencies,

		...restOfPackage,
	},

	onClean: () => commonFiles.forEach((file) => {
		copySync(join(projectPath, file), moveToPath(file));
	}),

	onRestore: () => commonFiles.forEach((file) => {
		removeSync(moveToPath(file));
	}),

};

const moveToPath = (file) => resolve(workspacePath, basename(file));
