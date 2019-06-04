/* eslint-disable class-methods-use-this */
import callApi from '../helpers/apiHelper';

class GameService {
  getFighters() {
    // eslint-disable-next-line no-useless-catch
    try {
      const endpoint = 'user';
      const apiResult = callApi(endpoint, 'GET');
      return apiResult;
    } catch (error) {
      throw error;
    }
  }
}

export const gameService = new GameService();
