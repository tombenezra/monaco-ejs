/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import * as monaco from 'monaco-editor-core'

export const conf: monaco.languages.LanguageConfiguration = {
};

export const language = <monaco.languages.IMonarchLanguage>{
	defaultToken: '',
	tokenPostfix: '.ejs',
	ignoreCase: true,
	tokenizer: {
		root: [
			[/<([%?](?:(?!php))[_=-]?)/, 'metatag.ejs', '@ejs']
		],
		ejs: [
			// [/^([_-]?[%?])>]+/, 'metatag.content.html'],
			[/([_-]?[%?])>/, 'metatag.ejs', '@pop']
		]
	}
};