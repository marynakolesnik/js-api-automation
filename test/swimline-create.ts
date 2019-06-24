import * as chai from "chai";
chai.use(require("chai-json-schema-ajv"));
const expect = chai.expect;

import BoardController from "./../controllers/boardController";

import schema from "../json-schemas";

describe("Swimline", function () {
    it("creating swimline should be successful", async function () {
        const response = await new BoardController().createRandomSwimline();
        expect(response).to.be.jsonSchema(schema.swimline.createSwimlineSuccess);
    });
});