import * as chai from "chai";
chai.use(require("chai-json-schema-ajv"));
const expect = chai.expect;

import UserController from "./../controllers/userController";
import schema from "../json-schemas";

describe("User", function () {
    it("deleting user should be successful", async function () {
        const userCreateResp = await new UserController().createRandomUser();
        const userDeleteResp = await new UserController().deleteUser(userCreateResp);

        expect(userDeleteResp, JSON.stringify(userDeleteResp)).to.be.jsonSchema(schema.user.deleteUserSuccess);

        // check if user exists
        const userInfoResp = await new UserController().getUser(userCreateResp);
        expect(userInfoResp, JSON.stringify(userInfoResp))
            .to.be.undefined;
    });

    it("should NOT delete user without token", async function () {
        const userCreateResp = await new UserController().createRandomUser();
        const userDeleteResp = await new UserController().deleteUser(userCreateResp, "wrong token");

        expect(userDeleteResp.statusCode).to.equal(401);
        expect(userDeleteResp, JSON.stringify(userDeleteResp)).to.be.jsonSchema(schema.auth.unauthorized);

        // check if user exists
        const userInfoResp = await new UserController().getUser(userCreateResp);
        expect(userInfoResp, JSON.stringify(userInfoResp))
            .to.be.an("object")
            .that.contains.keys(["_id", "username"]);
        expect(userInfoResp._id).to.be.equal(userCreateResp._id);
    });

});