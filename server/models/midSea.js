/**
 * Created by kay on 2015-10-23.
 */

var mongoose = require('mongoose');

var midSeaSchema = mongoose.Schema({
    town: {
        first: String,
        second: String,
        third: String
    },
    regId: String,
    midSeaData: {
        date: String,
        time: String,
        regId: String, /* ���� ���� �ڵ� */
        wf3Am: String, /* 3�� �� ���� ���� ���� */
        wf3Pm: String, /* 3�� �� ���� ���� ���� */
        wf4Am: String, /* 4�� �� �������� ���� */
        wf4Pm: String, /* 4�� �� ���� ���� ���� */
        wf5Am: String, /* 5�� �� ���� ���� ���� */
        wf5Pm: String, /* 5�� �� ���� ���� ���� */
        wf6Am: String, /* 6�� �� ���� ���� ���� */
        wf6Pm: String, /* 6�� �� ���� ���� ���� */
        wf7Am: String, /* 7�� �� ���� ���� ���� */
        wf7Pm: String, /* 7�� �� ���� ���� ���� */
        wf8: String, /* 8�� �� ���� ���� */
        wf9: String, /* 9�� �� ���� ���� */
        wf10: String, /* 10�� �� ���� ���� */
        wh3AAm: {type : Number, default : -100}, /* 3�� �� ���� ���� ���� �İ�(m) */
        wh3APm: {type : Number, default : -100}, /* 3�� �� ���� ���� ���� �İ�(m) */
        wh3BAm: {type : Number, default : -100}, /* 3�� �� ���� �ְ� ���� �İ�(m) */
        wh3BPm: {type : Number, default : -100}, /* 3�� �� ���� �ְ� ���� �İ�(m) */
        wh4AAm: {type : Number, default : -100}, /* 4�� �� ���� ���� ���� �İ�(m) */
        wh4APm: {type : Number, default : -100}, /* 4�� �� ���� ���� ���� �İ�(m) */
        wh4BAm: {type : Number, default : -100}, /* 4�� �� ���� �ְ� ���� �İ�(m) */
        wh4BPm: {type : Number, default : -100}, /* 4�� �� ���� �ְ� ���� �İ�(m) */
        wh5AAm: {type : Number, default : -100}, /* 5�� �� ���� ���� ���� �İ�(m) */
        wh5APm: {type : Number, default : -100}, /* 5�� �� ���� ���� ���� �İ�(m) */
        wh5BAm: {type : Number, default : -100}, /* 5�� �� ���� �ְ� ���� �İ�(m) */
        wh5BPm: {type : Number, default : -100}, /* 5�� �� ���� �ְ� ���� �İ�(m) */
        wh6AAm: {type : Number, default : -100}, /* 6�� �� ���� ���� ���� �İ�(m) */
        wh6APm: {type : Number, default : -100}, /* 6�� �� ���� ���� ���� �İ�(m) */
        wh6BAm: {type : Number, default : -100}, /* 6�� �� ���� �ְ� ���� �İ�(m) */
        wh6BPm: {type : Number, default : -100}, /* 6�� �� ���� �ְ� ���� �İ�(m) */
        wh7AAm: {type : Number, default : -100}, /* 7�� �� ���� ���� ���� �İ�(m) */
        wh7APm: {type : Number, default : -100}, /* 7�� �� ���� ���� ���� �İ�(m) */
        wh7BAm: {type : Number, default : -100}, /* 7�� �� ���� �ְ� ���� �İ�(m) */
        wh7BPm: {type : Number, default : -100}, /* 7�� �� ���� �ְ� ���� �İ�(m) */
        wh8A: {type : Number, default : -100}, /* 8�� �� ���� ���� �İ�(m) */
        wh8B: {type : Number, default : -100}, /* 8�� �� �ְ� ���� �İ�(m) */
        wh9A: {type : Number, default : -100}, /* 9�� �� ���� ���� �İ�(m) */
        wh9B: {type : Number, default : -100}, /* 9�� �� �ְ� ���� �İ�(m) */
        wh10A: {type : Number, default : -100}, /* 10�� �� ���� ���� �İ�(m) */
        wh10B: {type : Number, default : -100} /* 10�� �� �ְ� ���� �İ�(m) */
    }
});

midSeaSchema.statics = {
    getSeaData: function(first, second, third, cb){
        this.find({"town" : { "first" : first, "second" : second, "third" : third}})
            .sort({"midLandData.date" : -1, "midLandData.time" : -1}).limit(1).exec(cb);

    },
    setSeaData: function(seaData, regId, cb){
        var self = this;

        var findQuery = self.findOne({"regId": regId}).exec();

        findQuery.then(function(res){
            if(res == null) return;

            self.update({'regId' : regId, 'midSeaData.date' : seaData.date, 'midSeaData.time' : seaData.time},
                {
                    'regId' : regId,
                    'town.third': res.town.third,
                    'town.second': res.town.second,
                    'town.first': res.town.first,
                    'midSeaData' : seaData
                },
                {upsert:true}, cb);
        })
    }
};

module.exports = mongoose.model('midSea', midSeaSchema);
