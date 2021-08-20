import axios from 'axios';

const MEDICAL_CASE_API_BASE_URL = "http://localhost:8095/cases";

class CaseService {
    getSpecificCase(caseName) {
        return axios.get(MEDICAL_CASE_API_BASE_URL + "/" + caseName);
    }

}

export default new CaseService()