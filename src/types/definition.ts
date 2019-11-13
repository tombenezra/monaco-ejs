export type Definition = {
    /**
     * represents the number
     */
    num: number,
    text: string,
    nested: Nested
}

export type Nested = {
    prop: boolean
}