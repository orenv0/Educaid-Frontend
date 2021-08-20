import axios from 'axios';

const TEST_RECORD_API_BASE_URL = "http://localhost:8095/records";

class RecordService {
    postTestRecord(testRecord) {
        return axios.post(TEST_RECORD_API_BASE_URL, testRecord);
    }
    getAllTestRecordsByUserAndCategoryAndTime(userEmail, category, time, page, sortBy, sortOrder) {
        return axios.get(TEST_RECORD_API_BASE_URL + "/byUserAndCategoryAndTime/" + userEmail + "?category=" + category + "&time=" + time + "&page=" + page + "&sortBy=" + sortBy + "&sortOrder=" + sortOrder);
    }
    getAllTestRecordsByUserAndCategory(userEmail, category, page, sortBy, sortOrder) {
        return axios.get(TEST_RECORD_API_BASE_URL + "/byUserAndCategory/" + userEmail + "?category=" + category + "&page=" + page + "&sortBy=" + sortBy + "&sortOrder=" + sortOrder);
    }
    getAllTestRecordsByUserAndTime(userEmail, time, page, sortBy, sortOrder) {
        return axios.get(TEST_RECORD_API_BASE_URL + "/byUserAndTime/" + userEmail + "?time=" + time + "&page=" + page + "&sortBy=" + sortBy + "&sortOrder=" + sortOrder);
    }
    getAllTestRecordsByUser(userEmail, page, sortBy, sortOrder) {
        return axios.get(TEST_RECORD_API_BASE_URL + "/byUser/" + userEmail + "?page=" + page + "&sortBy=" + sortBy + "&sortOrder=" + sortOrder);
    }

    //with size
    getAllTestRecordsByUserAndCategoryAndTimeAndSize(userEmail, category, time, page, size, sortBy, sortOrder) {
        return axios.get(TEST_RECORD_API_BASE_URL + "/byUserAndCategoryAndTime/" + userEmail + "?category=" + category + "&time=" + time + "&page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&sortOrder=" + sortOrder);
    }
    getAllTestRecordsByUserAndCategoryAndSize(userEmail, category, page, size, sortBy, sortOrder) {
        return axios.get(TEST_RECORD_API_BASE_URL + "/byUserAndCategory/" + userEmail + "?category=" + category + "&page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&sortOrder=" + sortOrder);
    }
    getAllTestRecordsByUserAndTimeAndSize(userEmail, time, page, size, sortBy, sortOrder) {
        return axios.get(TEST_RECORD_API_BASE_URL + "/byUserAndTime/" + userEmail + "?time=" + time + "&page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&sortOrder=" + sortOrder);
    }
    getAllTestRecordsByUserAndSize(userEmail, page, size, sortBy, sortOrder) {
        return axios.get(TEST_RECORD_API_BASE_URL + "/byUser/" + userEmail + "?page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&sortOrder=" + sortOrder);
    }

    //statistics
    getStatisticsByUser(action, userEmail) {
        return axios.get(TEST_RECORD_API_BASE_URL + "/statisticsByUser/" + userEmail + "?action=" + action);
    }
    getStatisticsByCategoryAndUser(action, category, userEmail) {
        return axios.get(TEST_RECORD_API_BASE_URL + "/statisticsByCategoryAndUser/" + userEmail + "?category=" + category + "&action=" + action);
    }

}

export default new RecordService()