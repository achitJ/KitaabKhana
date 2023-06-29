import instance from "./config";

export const getGenres = async () => {
    try {
        const { data } = await instance.get("/genres");
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}