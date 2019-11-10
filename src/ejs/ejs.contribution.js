/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { registerLanguage } from '../register.ts'

registerLanguage({
	id: 'ejs',
	extensions: ['.ejs'],
	aliases: ['EJS'],
	mimetypes: ['text/template', 'text/html'],
	loader: () => import('./ejs')
});