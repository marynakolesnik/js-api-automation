import * as chai from "chai";
chai.use(require("chai-json-schema-ajv"));
const expect = chai.expect;

import BoardController from "./../controllers/boardController";

import schema from "../json-schemas";

describe("List", function () {
    it("creating list should be successful", async function () {
        const response = await new BoardController().createRandomList();
        expect(response).to.be.jsonSchema(schema.list.createListSuccess);
    });
});