import { Request } from "../helpers/request";
import { dataHelper } from "../helpers/dataHelper";
import BaseController from "./baseController";
import { User } from "../models/User";
import {expect} from "chai";

export default class UserController extends BaseController {

    async createUser(user, token):Promise<User> {
        const response = await new Request(
            this.routes.createUserUrl
        )
            .method("POST")
            .auth(token)
            .body(user)
            .send();
        expect(response.statusCode).to.equal(200);
        return response.body;
    };

    async createRandomUser(token=""):Promise<User> {
        const user = dataHelper.user();
        const auth = token || (await this.getToken());
        return this.createUser(user, auth);
    };

    async deleteUser(user, token=""):Promise<User> {
        const auth = token || (await this.getToken());
        const response = await new Request(
            this.routes.deleteUser(user)
        )
            .method("DELETE")
            .auth(auth)
            .send();
        expect(response.statusCode).to.equal(200);
        return response.body;
    };

    async getUser(user, token=""):Promise<User> {
        const auth = token || (await this.getToken());
        const response = await new Request(
            this.routes.getUser(user)
        )
            .method("GET")
            .auth(auth)
            .send();
        expect(response.statusCode).to.equal(200);
        return response.body;
    };

    async getUsers(token=""):Promise<Array<User>> {
        const auth = token || (await this.getToken());
        const response = await new Request(
            this.routes.getUsersUrl
        )
            .method("GET")
            .auth(auth)
            .send();
        expect(response.statusCode).to.equal(200);
        return response.body;
    };

    async getLoggedIn(token=""):Promise<User> {
        const auth = token || (await this.getToken());
        const response = await new Request(
            this.routes.getUserLoggedUrl
        )
            .method("GET")
            .auth(auth)
            .send();
        expect(response.statusCode).to.equal(200);
        return response.body;
    };
}