import { expect } from "chai";
import { Request } from "../helper/request";
import { Steps } from "../helper/steps";


describe("User", function () {
    it("should get user information", async function () {
        const api = await new Steps().loginAsAdmin();
        const userCreateResp = await api.createUser();
        const token = await api.getToken();

        const userInfoResp = await new Request(
            "http://ip-5236.sunline.net.ua:30020/api/users/" + userCreateResp.body["_id"])
            .method("GET")
            .auth(token)
            .send();

        expect(userInfoResp.statusCode).to.equal(200, userInfoResp.statusCode);
        expect(userInfoResp.body, JSON.stringify(userInfoResp.body))
            .to.be.an("object");
        expect(userInfoResp.body.username).to.be.equal(api.getCreatedUser().username);
    });

    it("should NOT get user information without token", async function () {
        const api = await new Steps().loginAsAdmin();
        const userCreateResp = await api.createUser();

        const userInfoResp = await new Request(
            "http://ip-5236.sunline.net.ua:30020/api/users/" + userCreateResp.body["_id"])
            .method("GET")
            .send();

        expect(userInfoResp.statusCode).to.equal(200, userInfoResp.statusCode);
        expect(userInfoResp.body.statusCode).to.equal(401, userInfoResp.body);
        expect(userInfoResp.body, JSON.stringify(userInfoResp.body))
            .to.be.an("object")
            .that.contains.keys(["error", "message"]);
    });
});