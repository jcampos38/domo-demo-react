import query from './../utils/query';
import SERVICE_ENDPOINTS from './ServiceEndpoints';

class UserService {
    static authenticate(payload) {
        return query({
            endpoint: SERVICE_ENDPOINTS.USER_AUTH,
            data: payload
        });
    }

    static getEmbedToken() {
        
    }
}

export default UserService;
