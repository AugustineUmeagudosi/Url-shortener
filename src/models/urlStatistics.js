import { model, Schema } from 'mongoose';

const urlStatsSchema = new Schema({
    urlId: { 
        type: Schema.Types.ObjectId, 
        ref: "Url", 
        required: true 
    },
    date: Date,
    visitorsCount: { type: Number, default: 1 }
});

const UrlStatistics = model('UrlStatistics', urlStatsSchema);

export default UrlStatistics;