import * as monaco from "monaco-editor-core";
import * as ts from "typescript"
import { registerLanguage } from "../register.js";

registerLanguage({
  id: "ejs",
  extensions: [".ejs"],
  aliases: ["EJS"],
  mimetypes: ["text/template", "text/html", "text/javascript"],
  loader: () => import("./ejs")
});
