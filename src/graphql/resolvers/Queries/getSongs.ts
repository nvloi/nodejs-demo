import axios from "axios";
import {config} from "../../../config/config";

export async function getSongs(parent: any, args: any, context: any) {
    const result = await axios.get(config.URL_API + "song",{
        headers: {
            Authorization: `Bearer ${context.headers.authorization}`,
        },
    }).then(response => {
        return response.data.data;
    }).catch(error => {
        throw new Error(error.response.status + ": " + error.response.data);
    });
    return result;
};