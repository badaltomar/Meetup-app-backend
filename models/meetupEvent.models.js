const mongoose = require('mongoose')
const meetupEventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    eventStart: {
        type: String,
        required: true
    },
    eventEnd: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        enum: ["Online Event", "Offline Event"],
        required: true
    },
    hostedBy: {
        type: String,
        required: true,
        trim: true
    },
    details: {
        type: String,
        required: true
    },
    dressCode: {
        type: String,
        required: true
    },
    ageRestrictions: {
        type: Number,
        default: 18
    },
    eventTags: {
        type: [String],
        default: []
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    speakers: [{
        speakerName: { type: String, required: true },
        speakerRole: { type: String, required: true },
        speakerImageUrl: { type: String, required: true }
    }],
    imageUrl: {
        type: String,
        required: true  
    }

}, {timestamps: true})

const MeetupEvent = mongoose.model("MeetupEvent", meetupEventSchema)
module.exports = MeetupEvent;