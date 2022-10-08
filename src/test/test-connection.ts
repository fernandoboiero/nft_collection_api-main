import {createConnection} from "typeorm"

export const testConnection = (drop: boolean = false) => {
    return createConnection({
        "type": "mongodb",
        "host": "localhost",
        "port": 27017,
        "database": "mixer-test",
        "synchronize": drop,
        "dropSchema": drop,
        "useUnifiedTopology": true,
        "entities": [
            __dirname + "/../entities/*.ts"
        ]
    });
};
