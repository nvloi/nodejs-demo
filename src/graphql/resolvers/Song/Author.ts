import AlbumRepository from "../../../repositories/album.repository";

export async function album(parent: any, args: any, context: any) {
    const albumId = parent.album_id;
    const album = await AlbumRepository.get(albumId);
    return album;
};