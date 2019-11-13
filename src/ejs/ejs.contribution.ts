import * as monaco from "monaco-editor-core";
import * as ts from "typescript"
import { registerLanguage } from "../register";

registerLanguage({
  id: "ejs",
  extensions: [".ejs"],
  aliases: ["EJS"],
  mimetypes: ["text/template", "text/html"],
  loader: () => import("./ejs")
});
