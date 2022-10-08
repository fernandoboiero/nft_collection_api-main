import {graphql, GraphQLSchema} from "graphql"
import {createSchema} from "../core/create-schema"
import {Maybe} from "type-graphql"
import {keycloakAuthChecker} from "../core/authentication/keycloack-auth-checker"

interface Options {
    source: string
    variableValues?: Maybe<{
        [key: string]: any
    }>
}

let schema: GraphQLSchema

export const GCall = async ({source, variableValues}: Options) => {
    if (!schema) schema = await createSchema(keycloakAuthChecker)
    return graphql({
        schema,
        source,
        variableValues
    })
}
