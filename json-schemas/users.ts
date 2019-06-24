const usersList = {
    "type": "array",
    "items": {
        "required": [
            "_id",
            "username"
        ],
        "type": "object",
        "properties": {
            "_id": {
                "$id": "#/items/properties/_id",
            },
            "username": {
                "type": "string",
            }
        }
    }
};


export default { usersList }