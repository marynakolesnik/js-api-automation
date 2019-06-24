const cardsList = {
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "_id",
            "title",
            "description",
            "listId"
        ],
        "properties": {
            "_id": {
                "type": "string",
            },
            "title": {
                "type": "string",
            },
            "description": {
                "type": "string",
            },
            "listId": {
                "type": "string",
            }
        }
    }
};


export default { cardsList }