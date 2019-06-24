import { Request } from "../helpers/request";
import { dataHelper } from "../helpers/dataHelper";
import BaseController from "./baseController";
import { User } from "../models/User";
import { Board } from "../models/Board";
import { Swimline } from "../models/Swimline";
import { Card } from "../models/Card";
import { List } from "../models/List";
import {expect} from "chai";

export default class BoardController extends BaseController {

    constructor() {
        super();
    };

    async createBoard(board, token):Promise<Board> {
        const response = await new Request(
            this.routes.createBoardUrl
        )
            .method("POST")
            .auth(token)
            .body(board)
            .send();
        console.log("!!!!", JSON.stringify(board));
        expect(response.statusCode).to.equal(200);
        return response.body;
    };

    async createRandomBoard(token=""):Promise<Board> {
        const board = dataHelper.board();
        const auth = token || (await this.getToken());
        const loggedUser = this.getLoggedUser();
        return this.createBoard({ ...board, owner: loggedUser.id }, auth);
    };

    async createSwimline(data:any, token=""):Promise<Swimline> {
        const { swimline, board } = data;
        const response = await new Request(
            this.routes.createSwimline(board)
        )
            .method("POST")
            .auth(token)
            .body(swimline)
            .send();
        expect(response.statusCode).to.equal(200);
        return response.body;
    };

    async createRandomSwimline(token=""):Promise<Swimline> {
        const board = await this.createRandomBoard();
        const swimline = dataHelper.swimline();
        const auth = token || (await this.getToken());
        return this.createSwimline({ swimline, board }, auth);
    };


    async createList(data:any, token=""):Promise<Swimline> {
        const { board, list } = data;
        const response = await new Request(
            this.routes.createList(board)
        )
            .method("POST")
            .auth(token)
            .body(list)
            .send();
        expect(response.statusCode).to.equal(200);
        return response.body;
    };

    async createRandomList(token=""):Promise<Swimline> {
        const board = await this.createRandomBoard();
        const list = dataHelper.list();
        const auth = token || (await this.getToken());
        return this.createList({ list, board }, auth);
    };

    async retrieweCards(data:any, token=""):Promise<Card> {
        const { swimline, board } = data;
        const response = await new Request(
            this.routes.retrieveCards({ board, swimline })
        )
            .method("GET")
            .auth(token)
            .send();
        expect(response.statusCode).to.equal(200);
        return response.body;
    };

    async retrieweRandomCards(token=""):Promise<Card> {
        const auth = token || (await this.getToken());
        const board = await this.createRandomBoard(auth);
        const swimlineData = dataHelper.swimline();
        const swimline = await this.createSwimline({ swimline: swimlineData, board }, auth);
        return this.retrieweCards({ swimline, board }, auth);
    };

    async createCard(data:any, token=""):Promise<Swimline> {
        const { board, list, card } = data;
        const response = await new Request(
            this.routes.createListCard({ board, list })
        )
            .method("POST")
            .auth(token)
            .body(card)
            .send();
        expect(response.statusCode).to.equal(200);
        return response.body;
    };

    async createRandomCard(token=""):Promise<Swimline> {
        const board = await this.createRandomBoard();

        const loggedUser = this.getLoggedUser();
        const auth = token || (await this.getToken());

        const swimlineData = dataHelper.swimline();
        const swimline = await this.createSwimline({ swimline: swimlineData, board }, auth);

        const listData = dataHelper.list();
        const list =  await this.createList({ list: listData, board }, auth);

        const cardData = dataHelper.card();
        const card = {
            ...cardData,
            authorId: loggedUser.id,
            swimlaneId: swimline._id,
        };
        return this.createCard(({ list, swimline, board, card }), auth);
    };

    async createAndretrieweRandomCards(token=""):Promise<Card> {

        const auth = token || (await this.getToken());
        const loggedUser = this.getLoggedUser();
        const board = await this.createRandomBoard(auth);
        const swimlineData = dataHelper.swimline();
        const swimline = await this.createSwimline({ swimline: swimlineData, board }, auth);
        const listData = dataHelper.list();
        const list =  await this.createList({ list: listData, board }, auth);

        const cardData = dataHelper.card();
        const card =  {
                ...cardData,
                authorId: loggedUser.id,
                swimlaneId: swimline._id,
            };

        await this.createCard(({ list, swimline, board, card }), auth);
        return this.retrieweCards({ swimline, board }, auth);
    };
}