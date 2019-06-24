import * as chai from "chai";
chai.use(require("chai-json-schema-ajv"));
const expect = chai.expect;

import UserController from "./../controllers/userController";
import schema from "../json-schemas";


describe("User", function () {
    it("creating new user should be successful", async function () {
        const userCreateResp = await new UserController().createRandomUser();
        expect(userCreateResp).to.be.jsonSchema(schema.user.createUserSuccess);
    });
});