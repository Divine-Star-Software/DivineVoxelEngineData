import { ZeneithSchema } from "./Schema.types";
export declare type ZeneithDatabaseCreationData = {
    databaseName: string;
    collections: {
        name: string;
        schema: ZeneithSchema;
    }[];
};
export declare type ZeneithDatabaseLayout = ZeneithDatabaseCreationData[];
