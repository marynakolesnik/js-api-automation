import * as chai from "chai";
chai.use(require("chai-json-schema-ajv"));
const expect = chai.expect;

import BoardController from "./../controllers/boardController";

import schema from "../json-schemas";

describe("Cards", function () {
    it("can retrieve cards by :boardId and :swimlineId", async function () {
        const response = await new BoardController().createAndretrieweRandomCards();
        expect(response).to.be.jsonSchema(schema.cards.cardsList);
        expect(response).to.be.not.empty;
    });
});