
module.exports = class Show {
    constructor(id) {
        this.id = id;
    }
    // metode show data
    showData(data) {
        return data.find(item => item.id === this.id);
    }
};