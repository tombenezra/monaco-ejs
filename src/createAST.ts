import {
  parse,
  TSESTreeOptions,
  TSESTree
} from "@typescript-eslint/typescript-estree";

export const createAST = () => {
  const options: TSESTreeOptions = {
    range: false,
    loc: false,
    tokens: false,
    comment: true,
    jsx: true
  };

  const program = parse(
    `
export type Definition = {
  /**
    * represents the number
  */
  num: number,
  text: string,
  nested: {
    bool: boolean
  }
}
`,
    options
  );

  debugger

  // arbitrarily get the first exported declaration
  const definition = program.body.find(
    declaration => declaration.type === "ExportNamedDeclaration"
  ) as TSESTree.ExportNamedDeclaration;
  const typeDeclaration = definition.declaration as TSESTree.TSTypeAliasDeclaration;
  const annotation = typeDeclaration.typeAnnotation as TSESTree.TSTypeLiteral;
  return annotation.members;
};
