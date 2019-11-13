import React from "react";
import * as monaco from "monaco-editor-core";
import { createAST } from "./createAST.ts";
import "./ejs/ejs.contribution";

const ejsSample = `
<%= model.title %>
<div class="section-hero layout-<%= layout.layoutStyle %> <%= layout.height %>">
<div class="title-block">
  <%# comment %>
  <h1><%= model.title %></h1>
  <h2><%= model.subtitle %></h2>
</div>
<% if(true) { %>
  <div>
    <Search />
  </div>
<% } %>
</div>`;

export default class MonacoEditor extends React.PureComponent {
  componentWillMount() {
    window.MonacoEnvironment = {
      getWorkerUrl: () => {
        return URL.createObjectURL(
          new Blob([
            `
                      self.MonacoEnvironment = {
                        baseUrl: 'https://unpkg.com/monaco-editor@0.18.1//min/vs'
                      };
        
                      importScripts('https://unpkg.com/monaco-editor@0.18.1//min/vs/base/worker/workerMain.js');
                    `
          ])
        );
      }
    };
  }

  componentDidMount() {
    const model = monaco.editor.createModel(ejsSample, "ejs");
    monaco.editor.create(document.getElementById("container"), {
      model
    });
    const ast = createAST();
    const props = ast.map(x => x.key.name);
    const createCompletions = props => props.map(prop => ({
      label: prop,
      kind: monaco.languages.CompletionItemKind.Text,
      insertText: prop
    }))
    monaco.languages.registerCompletionItemProvider("ejs", {
      triggerCharacters: ["."],
      provideCompletionItems(model, position) {
        const textUntilPosition = model.getValueInRange({startLineNumber: position.lineNumber, startColumn: 1, endLineNumber: position.lineNumber, endColumn: position.column});
        const match = textUntilPosition.match(/model.$/);
        const suggestions = match ? createCompletions(props) : [];
        debugger
        return {
          suggestions
        };
      }
    });
  }

  render() {
    return <div id="container"></div>;
  }
}
