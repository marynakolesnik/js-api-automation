const createUserSuccess = {
    type: "object",
    properties: {
        _id: {
            type: "string"
        }
    },
    required: ["_id"]
};

const deleteUserSuccess = {
    type: "object",
    properties: {
        _id: {
            type: "string"
        }
    },
    required: ["_id"]
};

const userInformation = {
        "type": "object",
        "required": [
            "_id",
            "createdAt",
            "services",
            "username",
            "emails",
            "profile",
            "authenticationMethod"
        ],
        "properties": {
            "_id": {
                "type": "string",
            },
            "createdAt": {
                "type": "string",
            },
            "services": {
                "type": "object",
                "properties": {
                    "password": {
                        "type": "object",
                        "properties": {
                            "bcrypt": {
                                "type": "string",
                            }
                        }
                    }
                }
            },
            "username": {
                "type": "string",
            },
            "emails": {
                "type": "array",
                "items": {
                    "type": "object",
                    "required": [
                        "address",
                        "verified"
                    ],
                    "properties": {
                        "address": {
                            "type": "string",
                        },
                        "verified": {
                            "type": "boolean",
                        }
                    }
                }
            },
            "profile": {
                "type": "object",
                "required": [
                    "boardView",
                    "templatesBoardId",
                    "cardTemplatesSwimlaneId",
                    "listTemplatesSwimlaneId",
                    "boardTemplatesSwimlaneId"
                ],
                "properties": {
                    "boardView": {
                        "type": "string",
                    },
                    "templatesBoardId": {
                        "type": "string",
                    },
                    "cardTemplatesSwimlaneId": {
                        "type": "string",
                    },
                    "listTemplatesSwimlaneId": {
                        "type": "string",
                    },
                    "boardTemplatesSwimlaneId": {
                        "type": "string",
                    }
                }
            },
            "authenticationMethod": {
                "type": "string",
            }
        }
    };

export default {
    createUserSuccess,
    deleteUserSuccess,
    userInformation,
};