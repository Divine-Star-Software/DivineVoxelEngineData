export declare type ZeneithSchemaNodeValueTypes = "string" | "boolean" | "number" | "any" | "any[]" | "string[]" | "number[]" | "object";
export declare type ZeneithSchemaNode = {
    name: string;
    valueType: ZeneithSchemaNodeValueTypes;
    index?: boolean;
    isUnique?: boolean;
    children?: ZeneithSchema;
};
export declare type ZeneithSchemaNodes = ZeneithSchemaNode | ZeneithSchemaNode[] | ZeneithSchema[];
export declare type ZeneithSchema = ZeneithSchemaNodes[];
