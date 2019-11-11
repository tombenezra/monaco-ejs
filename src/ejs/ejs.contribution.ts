import * as monaco from "monaco-editor-core";
import * as ts from "typescript"
import { registerLanguage } from "../register";
import { Definition } from "./definition";

registerLanguage({
  id: "ejs",
  extensions: [".ejs"],
  aliases: ["EJS"],
  mimetypes: ["text/template", "text/html"],
  loader: () => import("./ejs")
});

monaco.languages.registerCompletionItemProvider("ejs", {
  triggerCharacters: ["."],
  provideCompletionItems(
    model,
    position
  ): monaco.languages.ProviderResult<monaco.languages.CompletionList> {
    return {
      suggestions: []
    };
  }
});
