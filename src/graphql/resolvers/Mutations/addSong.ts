import songRepository from "../../../repositories/song.repository";

export async function addSong(parent: any, args: any, context: any){
    const result = await songRepository.create({ ...args.input });
    return result;
};