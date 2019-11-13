import React from "react";
import * as monaco from "monaco-editor-core";
import { createAST } from "./ast.ts";
import "./ejs/ejs.contribution";

const ejsSample = `
<%= console.log %>
<div class="section-hero layout-<%= layout.layoutStyle %> <%= layout.height %>">
<div class="title-block">
<%# comment %>
<# second comment %>
<## yet another comment %>
  <h1><%= model.title %></h1>
  <h2><%= model.subtitle %></h2>
</div>
<% if(true) { %>
  <div>
    <Search />
  </div>
<% } %>
</div>`;

const createCompletionSuggestions = (members) => members.map(member => ({
    label: member,
    kind: monaco.languages.CompletionItemKind.Field,
    insertText: member,
    documentation: 'this is doc'
  }))


export default class MonacoEditor extends React.PureComponent {
  constructor(props) {
    super(props)
  }

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
    const { members, comments } = createAST();
    console.log(comments)
    monaco.languages.registerCompletionItemProvider("ejs", {
      triggerCharacters: ["."],
      provideCompletionItems(model, position) {
        const textUntilPosition = model.getValueInRange({startLineNumber: position.lineNumber, startColumn: 1, endLineNumber: position.lineNumber, endColumn: position.column});
        const match = textUntilPosition.match(/model.$/); // set global 
        return {
          suggestions: match ? createCompletionSuggestions(members.map(x => x.key.name)) : []
        };
      }
    });
  }

  render() {
    return <div id="container"></div>;
  }
}
