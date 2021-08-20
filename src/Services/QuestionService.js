import axios from 'axios';

const QUESTION_API_BASE_URL = "http://localhost:8095/questions";

class QuestionService {
    getRandomQuestion(category, difficulty) {
        return axios.get(QUESTION_API_BASE_URL + "/byCategoryAndDifficulty?category=" + category + "&difficulty=" + difficulty);
    }
    getSpecificQuestion(id) {
        return axios.get(QUESTION_API_BASE_URL + "/" + id)
    }
}

export default new QuestionService()