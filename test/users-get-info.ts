import * as chai from "chai";
chai.use(require("chai-json-schema-ajv"));
const expect = chai.expect;

import UserController from "./../controllers/userController";
import schema from "../json-schemas";


describe("User", function () {
    it("should get user information", async function () {
        const userCreateResp = await new UserController().createRandomUser();
        const userInfoResp = await new UserController().getUser(userCreateResp);

        expect(userInfoResp, JSON.stringify(userInfoResp)).to.be.jsonSchema(schema.user.userInformation);
        expect(userInfoResp._id).to.be.equal(userCreateResp._id);
    });

    it("should NOT get user information without token", async function () {
        const userCreateResp = await new UserController().createRandomUser();
        const userInfoResp = await new UserController().getUser(userCreateResp, "wrong token");

        expect(userInfoResp.statusCode).to.equal(401);
        expect(userInfoResp, JSON.stringify(userInfoResp)).to.be.jsonSchema(schema.auth.unauthorized);
    });
});