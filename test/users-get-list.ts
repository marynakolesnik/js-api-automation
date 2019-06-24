import * as chai from "chai";
chai.use(require("chai-json-schema-ajv"));
const expect = chai.expect;

import UserController from "./../controllers/userController";
import schema from "../json-schemas";

describe("User", function () {
    it("should get the user list", async function () {
        const  userCreateResp = await new UserController().createRandomUser();
        const  userInfoResp = await new UserController().getUsers();

        expect(userInfoResp, JSON.stringify(userInfoResp)).to.be.jsonSchema(schema.users.usersList);
        expect(userInfoResp).to.be.not.empty;

        const users = userInfoResp.map(user => user._id);
        expect(users, JSON.stringify(users)).to.contain(userCreateResp._id);
    });

    it("should NOT get the user list without token", async function () {
        const  userInfoResp = await new UserController().getUsers("wrong token");

        expect(userInfoResp["statusCode"]).to.equal(401);
        expect(userInfoResp, JSON.stringify(userInfoResp)).to.be.jsonSchema(schema.auth.unauthorized);
    });
});