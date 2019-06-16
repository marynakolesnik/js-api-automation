import { Request } from "../helper/request";
import { Steps } from "../helper/steps";
import { expect } from "chai";


describe("User", function () {
    it("deleting user should be successful", async function () {
        const api = await new Steps().loginAsAdmin();
        const token = await api.getToken();
        const userCreateResp = await api.createUser();

        const userDeleteResp = await new Request(
            "http://ip-5236.sunline.net.ua:30020/api/users/" + userCreateResp.body["_id"]
        )
            .method("DELETE")
            .auth(token)
            .send();

        expect(userDeleteResp.statusCode).to.equal(200, userDeleteResp.statusCode);
        expect(userDeleteResp.body, JSON.stringify(userDeleteResp.body))
            .to.be.an("object")
            .that.has.key("_id");
        expect(userDeleteResp.body["_id"]).to.equal(userCreateResp.body["_id"]);
        expect(typeof userDeleteResp.body["_id"], userDeleteResp.body).to.equal(
            "string"
        );
        // check if user exists
        const userInfoResp = await new Request(
            "http://ip-5236.sunline.net.ua:30020/api/users/" + userCreateResp.body["_id"])
            .method("GET")
            .auth(token)
            .send();

        expect(userInfoResp.statusCode).to.equal(200, userInfoResp.statusCode);
        expect(userInfoResp.body, JSON.stringify(userInfoResp.body))
            .to.be.undefined;
    });

    it("should NOT delete user without token", async function () {
        const api = await new Steps().loginAsAdmin();
        const token = await api.getToken();
        const userCreateResp = await api.createUser();

        const userDeleteResp = await new Request(
            "http://ip-5236.sunline.net.ua:30020/api/users/" + userCreateResp.body["_id"]
        )
            .method("DELETE")
            .send();

        expect(userDeleteResp.statusCode).to.equal(200, userDeleteResp.statusCode);
        expect(userDeleteResp.body.statusCode).to.equal(401, userDeleteResp.body);
        expect(userDeleteResp.body, JSON.stringify(userDeleteResp.body))
            .to.be.an("object");

        // check if user exists
        const userInfoResp = await new Request(
            "http://ip-5236.sunline.net.ua:30020/api/users/" + userCreateResp.body["_id"])
            .method("GET")
            .auth(token)
            .send();

        expect(userInfoResp.statusCode).to.equal(200, userInfoResp.statusCode);
        expect(userInfoResp.body, JSON.stringify(userInfoResp.body))
            .to.be.an("object")
            .that.contains.keys(["_id", "username"]);
        expect(userInfoResp.body.username).to.be.equal(api.getCreatedUser().username);
    });

});