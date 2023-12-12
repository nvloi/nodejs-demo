import songRepository from "../../../repositories/song.repository";

export async function getSong(parent: any, args: any, context: any){
    const result = await songRepository.get(parseInt(args.id));
    return result;
};