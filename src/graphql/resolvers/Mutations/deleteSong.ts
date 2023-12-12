import songRepository from "../../../repositories/song.repository";

export async function deleteSong(parent: any, args: any, context: any){
    const result = await songRepository.delete(args.id);
    console.log(result);
    return result;
};