import cron from 'node-cron';
import { getAllEvents, makePastEventComplete } from '../services/event.service';

const CompleteEventHandler = async () => {
    try {
        const events = await getAllEvents();
        if(!events){
            console.log(`No events found`);
        }

        await makePastEventComplete(events);
    } catch (error) {
        
    }
}

export const eventCronJob = () => {
    cron.schedule('0 0 22 * * *', () => {
    CompleteEventHandler();
});
}