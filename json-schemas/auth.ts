const unauthorized = {
    "type": "object",
    "required": [
        "isClientSafe",
        "error",
        "reason",
        "message",
        "errorType",
        "statusCode"
    ],
    "properties": {
        "isClientSafe": {
            "type": "boolean",
        },
        "error": {
            "type": "string",
        },
        "reason": {
            "type": "string",
        },
        "message": {
            "type": "string",
        },
        "errorType": {
            "type": "string",
            "pattern": "^(.*)$"
        },
        "statusCode": {
            "type": "integer",
            "default": 401,
        }
    }
};

export default { unauthorized };