import {
  parse,
  TSESTreeOptions,
  TSESTree
} from "@typescript-eslint/typescript-estree";

import {TSDocParser} from "@microsoft/tsdoc";

const dts = `
/**
 * Returns the average of two numbers.
 *
 * @remarks
 * This method is part of the 
 *
 */
export type Definition = {
  num: number,
  text: string,
  nested: {
    bool: boolean
  }
}
`;
export const createAST = () => {
  const options: TSESTreeOptions = {
    range: false,
    loc: false,
    tokens: false,
    comment: true,
    jsx: true
  };

  const program = parse(dts, options);
  const parser = new TSDocParser()
  const docs = parser.parseString(dts)

  // arbitrarily get the first exported declaration
  const definition = program.body.find(
    declaration => declaration.type === "ExportNamedDeclaration"
  ) as TSESTree.ExportNamedDeclaration;
  const typeDeclaration = definition.declaration as TSESTree.TSTypeAliasDeclaration;
  const annotation = typeDeclaration.typeAnnotation as TSESTree.TSTypeLiteral;
  return { members: annotation.members, comments: program.comments };
};
