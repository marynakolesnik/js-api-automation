import { Request } from "./request";
import { dataHelper } from "./dataHelper";

export class Steps {
    protected token;
    protected loginUrl;
    protected createUserUrl;
    protected loggedUser;
    protected createdUser;

    constructor() {
        this.loginUrl = "http://ip-5236.sunline.net.ua:30020/users/login";
        this.createUserUrl = "http://ip-5236.sunline.net.ua:30020/api/users";
        this.token = false;
        this.loggedUser = {};
        this.createdUser = {};
    };

    async getToken():Promise<string> {
        if (this.token) return this.token;


        const adminLoginResp = await new Request(
            this.loginUrl
        )
            .method("POST")
            .body(dataHelper.admin)
            .send();

        this.loggedUser = adminLoginResp.body;
        return adminLoginResp.body.token;
    };

    setToken(token: String):Steps {
        this.token = token;
        return this;
    };

    async loginAsAdmin():Promise<Steps> {
        const adminToken = await this.getToken();
        await this.setToken(adminToken);
        return this;
    };

    getLoggedUser():Request {
        return this.loggedUser;
    };

    getCreatedUser():any {
        return this.createdUser;
    };

    async createUser():Promise<Request> {
        const user = dataHelper.user();
        const userCreateResp = await new Request(
            this.createUserUrl
        )
            .method("POST")
            .auth(this.token)
            .body(user)
            .send();
        this.createdUser = user;
        return userCreateResp;
    };
}