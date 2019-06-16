import { Request } from "../helper/request";
import { Steps } from "../helper/steps";
import { dataHelper } from "../helper/dataHelper";
import { expect } from "chai";


describe("User", function () {
    it("creating new user should be successful", async function () {
        const api = await new Steps().loginAsAdmin();
        const token = await api.getToken();
        const newUser = dataHelper.user();

        const userCreateResp = await new Request(
            "http://ip-5236.sunline.net.ua:30020/api/users"
        )
            .method("POST")
            .auth(token)
            .body(newUser)
            .send();

        expect(userCreateResp.statusCode).to.equal(200, userCreateResp.statusCode);
        expect(userCreateResp.body, JSON.stringify(userCreateResp.body))
            .to.be.an("object")
            .that.has.key("_id");
        expect(typeof userCreateResp.body._id, userCreateResp.body).to.equal(
            "string"
        );
    });
});