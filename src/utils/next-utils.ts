export type Params<Param extends string> = Promise<Record<Param, string>>

export type PageParams<Param extends string> = { params: Params<Param> }
