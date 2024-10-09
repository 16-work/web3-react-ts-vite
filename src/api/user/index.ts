import { DTOVerify, RDVerify } from './types';

export default {
    verify: (dto: DTOVerify) => {
        return http.post<RDVerify>('/user/verify', dto);
    },
};
