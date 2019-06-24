import {Request} from "../helpers/request";
import {dataHelper} from "../helpers/dataHelper";
import { Login } from "../models/Login";
import { expect } from "chai";
import swimline from "../json-schemas/swimline";

export default class BaseController {
    protected baseUrl;
    protected token;
    protected loggedUser;
    protected routes;

    constructor() {
        this.baseUrl = "http://localhost:38021";
        this.routes = {
            baseUrl: this.baseUrl,
            loginUrl: this.baseUrl + "/users/login",
            createUserUrl: this.baseUrl + "/api/users",
            deleteUser: user => this.baseUrl + "/api/users/" + user._id,
            getUser: user => this.baseUrl + "/api/users/" + user._id,
            getUsersUrl: this.baseUrl + "/api/users",
            getUserLoggedUrl: this.baseUrl + "/api/user",
            createBoardUrl: this.baseUrl + "/api/boards",
            createSwimline: board => this.baseUrl + `/api/boards/${board._id}/swimlanes`,
            retrieveCards: ({ board, swimline }) => this.baseUrl + `/api/boards/${board._id}/swimlanes/${swimline._id}/cards`,
            createListCard: ({ board, list }) => this.baseUrl + `/api/boards/${board._id}/lists/${list._id}/cards`,
            createList: board => this.baseUrl + `/api/boards/${board._id}/lists`,
        };
        this.token = "";
        this.loggedUser = {};
    };

    async getToken():Promise<string> {
        if (this.token) return this.token;
        const adminLoginResp = await this.loginAsAdmin();
        return adminLoginResp.token;
    };

    async loginAsAdmin():Promise<Login> {
        const response = await new Request(
            this.routes.loginUrl
        )
            .method("POST")
            .body(dataHelper.admin)
            .send();
        expect(response.statusCode).to.equal(200);
        this.loggedUser = response.body;
        this.setToken(this.loggedUser.token);
        return this.loggedUser;
    };

    setToken(token: String):BaseController {
        this.token = token;
        return this;
    };

    getLoggedUser():Login {
        return this.loggedUser;
    };
}