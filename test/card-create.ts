import * as chai from "chai";
chai.use(require("chai-json-schema-ajv"));
const expect = chai.expect;

import BoardController from "./../controllers/boardController";

import schema from "../json-schemas";

describe("Card", function () {
    it("creating card should be successful", async function () {
        const response = await new BoardController().createRandomCard();
        expect(response).to.be.jsonSchema(schema.card.createCardSuccess);
    });
});