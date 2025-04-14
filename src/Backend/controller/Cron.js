const cron = require('node-cron');

cron.schedule('*/10 * * * *', () => {
    CleanReservedSeats();
});
