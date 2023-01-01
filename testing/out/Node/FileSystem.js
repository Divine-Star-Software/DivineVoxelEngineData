export const DVEDSystem = {
    fs: {},
    setFS(fs) {
        this.fs = fs;
    },
    async fileExists(path) {
        const fileExists = await this.fs.stat(path);
        if (!fileExists || fileExists.size == 0)
            return false;
        return true;
    },
};
