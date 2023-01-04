export declare type DVEDLocationData = [
    dimension: string,
    x: number,
    y: number,
    z: number
];
export declare type DVEDDataTypes = "world-data" | "rich-data" | "entities" | "dbo";
export declare type DVEDFile = {
    getSize(): number;
    clear(byteStart: number, byteLength: number): boolean;
    write(byteStart: number, data: ArrayBuffer): boolean;
    read(byteStart: number, byteLength: number): ArrayBuffer | false;
    close(): void;
    rename(newPath: string): boolean;
    move(newPath: string): boolean;
    reOpen(): boolean;
    getPath(): string;
    delete(): boolean;
};
