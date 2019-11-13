/**
 * definition
 */
export type Definition = {
    num: number,
    text: string,
    nested: Nested
}

export type Nested = {
    prop: boolean
}