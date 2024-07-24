import axios from "axios";
import { baseUrl } from "../constants";

import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

const getAll = async () => {
    const { data } = await axios.get<NonSensitiveDiaryEntry[]>(
        `${baseUrl}/api/diaries`
    );
    console.log(data)
    return data;
};

const create = async (entry: NewDiaryEntry) => {
    const { data } = await axios.post<DiaryEntry>(
        `${baseUrl}/api/diaries`,
        entry
    );
    return data;
};


export default {
    getAll,
    create
}