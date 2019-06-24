import * as faker from "faker";

const admin = {
    email: "test@test.com",
    password: "123456"
};

const user = () => {
    const randomEmail = faker.internet.email(
        undefined,
        undefined,
        "ip-5236.sunline.net.ua"
    );
    return {
        username: randomEmail,
        email: randomEmail,
        password: randomEmail,

    };
};

const board = () => {
    return {
        title: "Board_" + Date.now(),
        permission: "private",
        owner: "ownerId",
    };
};

const swimline = () => {
    return {
        "title": "Swimline_" + Date.now(),
    };
};

const list = () => {
    return {
        "title": "List_" + Date.now(),
    };
};

const card = () => {
    return {
        title: "Card_" + Date.now(),
        description: "Card description text",
        authorId: "userId",
        swimlaneId: "swimlaneId"
    };
};

export const dataHelper = { admin, user, board, swimline, list, card };