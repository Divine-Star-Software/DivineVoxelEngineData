export const getRandomData = (length) => {
    const buf = new ArrayBuffer(length);
    const array = new Uint8Array(buf);
    for (let i = 0; i < array.length; i++) {
        array[i] = (Math.random() * 256) >> 0;
    }
    return buf;
};
