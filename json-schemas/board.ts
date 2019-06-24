const createBoardSuccess = {
    "type": "object",
    "required": [
        "_id",
        "defaultSwimlaneId"
    ],
    "properties": {
        "_id": {
            "type": "string",
        },
        "defaultSwimlaneId": {
            "type": "string",
        }
    }
};

export default { createBoardSuccess };