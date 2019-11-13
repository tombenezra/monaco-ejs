import * as monaco from 'monaco-editor-core'

let languageDefinitions = {};
let languagePromises = {};

function _loadLanguage(languageId) {
	const loader = languageDefinitions[languageId].loader;
	return loader().then((mod) => {
		monaco.languages.setMonarchTokensProvider(languageId, mod.language);
		monaco.languages.setLanguageConfiguration(languageId, mod.conf);
	});
}


export function loadLanguage(languageId) {
	if (!languagePromises[languageId]) {
		languagePromises[languageId] = _loadLanguage(languageId);
	}
	return languagePromises[languageId];
}

export function registerLanguage(def) {
	let languageId = def.id;

	languageDefinitions[languageId] = def;
	monaco.languages.register(def);
	monaco.languages.onLanguage(languageId, () => {
		loadLanguage(languageId);
	});
}