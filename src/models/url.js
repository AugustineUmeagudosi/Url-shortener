import { model, Schema } from 'mongoose';

const urlSchema = new Schema({
    longUrl: {
        type: String, 
        trim: true, 
        index: { unique: true, lowercase: true, partialFilterExpression: { longUrl: { $type: "string" } } }
    },
    shortUrl: {
        type: String, 
        trim: true, 
        index: { unique: true, partialFilterExpression: { shortUrl: { $type: "string" } } }
    }
}, { timestamps: true });

const Url = model('Url', urlSchema);

export default Url;