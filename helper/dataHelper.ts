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

export const dataHelper = { admin, user };