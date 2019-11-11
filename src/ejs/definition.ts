export type Definition = {
    num: number,
    text: string,
    nested: Nested
}

type Nested = {
    prop: any
}