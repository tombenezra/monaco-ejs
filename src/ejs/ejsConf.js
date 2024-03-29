export const config = {
	"comments": {
		// symbols used for start and end of a block comment.
		"blockComment": [ "<%#", "%>", "<%/*", "*/%>", "<?#", "?>", "<?/*", "*/?>" ],
	},

	// symbols used as brackets
	"brackets": [
		["<!--", "-->"],
		["<", ">"],
		["{", "}"],
		["[", "]"],
		["(", ")"],
	],

	// symbols that are auto closed when typing
	"autoClosingPairs": [
		{ "open": "{", "close": "}" },
		{ "open": "[", "close": "]" },
		{ "open": "(", "close": ")" },
		{ "open": "'", "close": "'" },
		{ "open": "\"", "close": "\"" },
		{ "open": "`", "close": "`", "notIn": ["string", "comment"] },
		{ "open": "/*", "close": " */", "notIn": ["string"] },
		{ "open": "/**", "close": " */", "notIn": ["string"] },
		{ "open": "<!--", "close": "-->", "notIn": [ "comment", "string" ]},
		{ "open": "<%", "close": "%>" },
	],

	// symbols that that can be used to surround a selection
	"surroundingPairs": [
		["<", ">"],
		["{", "}"],
		["[", "]"],
		["(", ")"],
		["'", "'"],
		["\"", "\""],
		["`", "`"],
	],

	"folding": {
		"markers": {
			"start": "^\\s*(?:<[%?][_-#]?(?:\\s*#)?region\\b.*[_-#]?[%?]>|<!--\\s*#region\\b.*-->)",
			"end": "^\\s*(?:<[%?][_-#]?(?:\\s*#)?endregion\\b.*[_-#]?[%?]>|<!--\\s*#endregion\\b.*-->)",
		}
	}
}