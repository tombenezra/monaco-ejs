import * as monaco from 'monaco-editor-core'

interface ILang extends monaco.languages.ILanguageExtensionPoint {
	loader: () => Promise<ILangImpl>;
}

interface ILangImpl {
	conf: monaco.languages.LanguageConfiguration;
	language: monaco.languages.IMonarchLanguage;
}

let languageDefinitions: { [languageId: string]: ILang } = {};

function _loadLanguage(languageId: string): Promise<void> {
	const loader = languageDefinitions[languageId].loader;
	return loader().then((mod) => {
		monaco.languages.setMonarchTokensProvider(languageId, mod.language);
		monaco.languages.setLanguageConfiguration(languageId, mod.conf);
	});
}

let languagePromises: { [languageId: string]: Promise<void> } = {};

export function loadLanguage(languageId: string): Promise<void> {
	if (!languagePromises[languageId]) {
		languagePromises[languageId] = _loadLanguage(languageId);
	}
	return languagePromises[languageId];
}

export function registerLanguage(def: ILang): void {
	let languageId = def.id;

	languageDefinitions[languageId] = def;
	monaco.languages.register(def);
	monaco.languages.onLanguage(languageId, () => {
		loadLanguage(languageId);
	});
}