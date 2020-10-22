import query from '../utils/query';
import SERVICE_ENDPOINTS from './ServiceEndpoints';
import config from '../assets/config.json';

class EmbedService {
    static getItems() {
        return query({
            method: 'GET',
            endpoint: SERVICE_ENDPOINTS.EMBED_ITEMS,
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem(config.name_session) }
        });
    }

    static getEmbedToken(id) {
        return query({
            method: 'GET',
            endpoint: SERVICE_ENDPOINTS.EMBED_TOKEN + id,
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem(config.name_session) }
        });
    }
}

export default EmbedService;
