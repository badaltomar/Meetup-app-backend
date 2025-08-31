const { initializedDatabase } = require("./db/db.connect");
const MeetupEvent = require("./models/meetupEvent.models");
const meetupEventsData = require("./meetupEvents.json")

const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors');
app.use(cors())

const PORT = 3000

initializedDatabase()
// ---- ---- ----

app.get('/events', async (req, res) => {
    try {
        const getAllEvents = await MeetupEvent.find()
        if(getAllEvents.length > 0){
            res.status(200).json(getAllEvents)
        }else{
            res.status(404).json({message: "No Events Available."})
        }
    } catch (error) {
        res.status(500).json({message: "Failed to fetch events data!", error: error.message})
    }
})

app.get('/events/:eventTitle', async (req, res) => {
    try {
        const getByTitle = await MeetupEvent.findOne({title: req.params.eventTitle})
        if(getByTitle){
            res.status(200).json(getByTitle)
        }else{
            res.status(404).json({message: "There is no event available by this title."})
        }
    } catch (error) {
        res.status(500).json({message: "Failed to fetch events data!", error: error.message})
    }
})

app.get('/eventDetails/:eventId', async (req, res) => {
    try {
        const getByEventId = await MeetupEvent.findById(req.params.eventId)
        if(getByEventId){
            res.status(200).json(getByEventId)
        }else{
            res.status(404).json({message: "There is no event available by this id."})
        }
    } catch (error) {
        res.status(500).json({message: "Failed to fetch events data!", error: error.message})
    }
})

// Bulk data seeding:
async function seedEventsData (){
    try {
        // Check if collection already has data
        const existingEvents = await MeetupEvent.find();
        if (existingEvents.length > 0) {
            console.log("Events already exist in the database. Skipping seeding...");
            return;
        }
        await MeetupEvent.insertMany(meetupEventsData)
        console.log(`${meetupEventsData.length} Events uploaded successfully!`);
        
    } catch (error) {
        console.log("Failed to upload seed events!");
        
    }
    
}

// seedEventsData()


// ---- ---- ----
// LISTEN PORT:
app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
    
})