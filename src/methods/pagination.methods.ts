export function getPagination(query: any){
    const size = query.size;
    const page = query.page;
    const limit = size ? +size : 10;
    const offset = page ? +page * limit : 0;

    return { limit, offset };
};
