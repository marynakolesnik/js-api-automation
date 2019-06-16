import { expect } from "chai";
import { Request } from "../helper/request";
import { Steps } from "../helper/steps";


describe("User", function () {
    it("should get information about logged user", async function () {
        const api = await new Steps().loginAsAdmin();;
        const token = await api.getToken();

        const userInfoResp = await new Request(
            "http://ip-5236.sunline.net.ua:30020/api/users/" + api.getLoggedUser()["id"])
            .method("GET")
            .auth(token)
            .send();

        expect(userInfoResp.statusCode).to.equal(200, userInfoResp.statusCode);
        expect(userInfoResp.body, JSON.stringify(userInfoResp.body))
            .to.be.an("object")
            .that.contains.keys(["_id", "username"]);
        expect(userInfoResp.body.username).to.equal("Testuser");
    });

    it("should NOT get information about logged user without token", async function () {
        const api = await new Steps().loginAsAdmin();
        const userInfoResp = await new Request(
            "http://ip-5236.sunline.net.ua:30020/api/users/" + api.getLoggedUser()["id"])
            .method("GET")
            .send();

        expect(userInfoResp.statusCode).to.equal(200, userInfoResp.statusCode);
        expect(userInfoResp.body.statusCode).to.equal(401, userInfoResp.body);
        expect(userInfoResp.body, JSON.stringify(userInfoResp.body))
            .to.be.an("object")
            .that.contains.keys(["error", "message"]);
    });
});