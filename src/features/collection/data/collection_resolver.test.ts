import {testConnection} from "../../../test/test-connection"
import {Connection} from "typeorm"
import {GCall} from "../../../test/g-call"
import faker from "@faker-js/faker"

let connection: Connection;
beforeAll(async () => {
    connection = await testConnection(true);
})

afterAll(async () => {
    await connection.close();
})

describe("CollectionResolver", () => {
    const authorEmail = faker.helpers.userCard().email;
    const authorName = faker.helpers.userCard().name;
    const name = faker.helpers.userCard().name;
    const detail =  faker.helpers.userCard().website;

    const input = {
        authorEmail: authorEmail,
        authorName: authorName,
        name: name,
        detail: detail,
    }

    let itemId: String

    it("should create a new collection", async () => {
        const result = await GCall({source: createMutation, variableValues: {input: input}})
        expect(result.data!!["createCollection"]).toMatchObject(input)
    })

    it("should get paginated collections", async () => {
        const result = await GCall({source: getCollectionsQuery, variableValues: {limit: 2, page: 0}})
        expect(result.data!!["getCollections"]).toHaveLength(1)
        itemId = result.data!!["getCollections"][0]._id
    })

    it("should update a collection", async () => {
        input.name = "updated"
        const result = await GCall({source: updateMutation, variableValues: {id: itemId, input: input}})
        expect(result.data!!["updateCollection"].name).toMatch("updated")
    })

    it("should delete collection", async () => {
        const result = await GCall({source: deleteMutation, variableValues: {id: itemId}})
        expect(result.data!!["deleteCollection"]).toBeTruthy()
    })

    it("should return 0 collections", async () => {
        const result = await GCall({source: getCollectionsQuery, variableValues: {limit: 2, page: 0}})
        expect(result.data!!["getCollections"]).toHaveLength(0)
    })
})
const updateMutation = `
    mutation UpdateCollection($id: String!, $input: UpdateCollectionInput!) {
        updateCollection(id: $id, input: $input) {
            authorEmail
            authorName
            name
            detail
        }
    }
`


const deleteMutation = `
    mutation Result($id: String!) {
      deleteCollection(id: $id)
    }
`

const getCollectionsQuery = `
    query($page: Float!, $limit: Float!) {
      getCollections(page: $page, limit: $limit) {
        _id
        name
      }
    }
`

const createMutation = `
    mutation Result($input: CreateCollectionInput!) {
      createCollection(input: $input) {
        _id,
        authorEmail,
        authorName,
        name,
        detail
      }
    }
`

