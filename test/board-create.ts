import * as chai from "chai";
chai.use(require("chai-json-schema-ajv"));
const expect = chai.expect;

import BoardController from "./../controllers/boardController";

import schema from "../json-schemas";

describe("Board", function () {
    it("creating board should be successful", async function () {
        const response = await new BoardController().createRandomBoard();
        expect(response).to.be.jsonSchema(schema.board.createBoardSuccess);
    });
});