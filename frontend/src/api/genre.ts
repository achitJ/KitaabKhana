import instance from "./config";

export const getGenres = async () => {
    const { data } = await instance.get("/genres");
    return data;
}