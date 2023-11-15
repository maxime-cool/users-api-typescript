import S from 'fluent-json-schema'

export const userCreateSchema = {
    body: S.object()
    .prop('name').required(),
    queryString: S.object(),
    params: S.object(),
    headers: S.object()
}

export const userUpdateSchema = {
    body: S.object()
    .prop('name', S.string())
    .prop('score', S.number()),
    queryString: S.object(),
    params: S.object(),
    headers: S.object()
}