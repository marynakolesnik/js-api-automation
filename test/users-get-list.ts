import { expect } from "chai";
import { Request } from "../helper/request";
import { Steps } from "../helper/steps";

describe("User", function () {
    it("should get the user list", async function () {
        const api = await new Steps().loginAsAdmin();
        await api.createUser();
        const token = await api.getToken();

        const userInfoResp = await new Request(
            "http://ip-5236.sunline.net.ua:30020/api/users/")
            .method("GET")
            .auth(token)
            .send();

        expect(userInfoResp.statusCode).to.equal(200, userInfoResp.statusCode);
        expect(userInfoResp.body, JSON.stringify(userInfoResp.body))
            .to.be.an("array");

        const users = userInfoResp.body.map(item => item.username);
        expect(users, JSON.stringify(users)).to.contain(api.getCreatedUser().username);
    });

    it("should NOT get the user list without token", async function () {
        await new Steps().loginAsAdmin();

        const userInfoResp = await new Request(
            "http://ip-5236.sunline.net.ua:30020/api/users/")
            .method("GET")
            .auth("")
            .send();

        expect(userInfoResp.statusCode).to.equal(200, userInfoResp.statusCode);
        expect(userInfoResp.body.statusCode).to.equal(401, userInfoResp.body);
        expect(userInfoResp.body, JSON.stringify(userInfoResp.body))
            .to.be.an("object")
            .that.contains.keys(["error", "message"]);
    });
});