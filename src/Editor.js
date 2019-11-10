import React from "react";
import * as monaco from "monaco-editor-core";
import './ejs/ejs.contribution'

const ejsSample = `<div class="section-hero layout-<%= layout.layoutStyle %> <%= layout.height %>">
<div class="title-block">
  <#/* this is ejs comment */#>
  <h1><%= elementsAndContent.title %></h1>
  <h2><%= elementsAndContent.subtitle %></h2>
</div>
<% if(elementsAndContent.showSearchBar) { %>
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
  }

  render() {
    return <div id="container"></div>;
  }
}
