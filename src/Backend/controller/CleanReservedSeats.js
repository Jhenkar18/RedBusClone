const connection = require('../mysql/mysql'); 

const CleanReservedSeats = async () => {
    try {
        // Update seats where the reservation has expired
        const query = `
            UPDATE Seats 
            SET is_reserved = 0, 
                reservation_timestamp = NULL, 
                reservation_expiry = NULL 
            WHERE is_reserved = TRUE 
            AND reservation_expiry IS NOT NULL 
            AND reservation_expiry < NOW()
        `;

        await new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    console.error('Error cleaning up expired reservations:', error.message);
                    return reject(error);
                }
                // console.log('Expired reservations cleaned up:', results.affectedRows, 'rows affected.');
                resolve(results);
            });
        });
    } catch (error) {
        console.error('Error in cleanup process:', error.message);
    }
};

// Schedule this function to run periodically, e.g., every 10 minutes
setInterval(CleanReservedSeats, 10 * 60 * 1000);

module.exports = CleanReservedSeats;
