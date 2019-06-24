import * as chai from "chai";
chai.use(require("chai-json-schema-ajv"));
const expect = chai.expect;

import UserController from "./../controllers/userController";
import schema from "../json-schemas";


describe("User", function () {
    it("should get information about logged-in user", async function () {
        const userController = await new UserController();
        await userController.loginAsAdmin();
        const loggedUser = userController.getLoggedUser();
        const userInfoResp = await userController.getLoggedIn();

        expect(userInfoResp, JSON.stringify(userInfoResp)).to.be.jsonSchema(schema.user.userInformation);
        expect(userInfoResp._id, JSON.stringify(userInfoResp)).to.equal(loggedUser.id);
    });

    it("should NOT get information about logged-in user without token", async function () {
        const userInfoResp = await new UserController().getLoggedIn( "wrong token");
        expect(userInfoResp.statusCode).to.equal(401);
        expect(userInfoResp, JSON.stringify(userInfoResp)).to.be.jsonSchema(schema.auth.unauthorized);
    });
});