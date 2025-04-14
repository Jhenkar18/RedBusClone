const connection = require("../mysql/mysql.js");

const reserveseats = async (req, res) => {
    let { seats, busid , tripid, date } = req.body;

    // Normalize seats to an array
    if (!Array.isArray(seats)) {
        if (seats && seats.number !== undefined) {
            seats = [seats];
        } else {
            return res.status(400).json({ message: 'Invalid seats data' });
        }
    }

    // Validate that all seats have a number property
    if (seats.length === 0 || !seats.every(seat => seat.number)) {
        return res.status(400).json({ message: 'Each seat must have a number' });
    }

    try {
        // Start the transaction
        await new Promise((resolve, reject) => connection.query('START TRANSACTION', (error) => {
            if (error) return reject(error);
            resolve();
        }));

        for (const seat of seats) {
            // Check if the seat number is valid
            if (!seat.number) {
                await new Promise((resolve, reject) => connection.query('ROLLBACK', (error) => {
                    if (error) return reject(error);
                    resolve();
                }));
                return res.status(400).json({ message: 'Seat number is required' });
            }

                 // Check if the seat is already booked in the BookedSeats table
                 const [bookedRows] = await new Promise((resolve, reject) => {
                    connection.query(
                        `SELECT bs.*
                        FROM BookedSeats bs
                        JOIN Trips t ON bs.trip_id = t.trip_id
                        WHERE bs.seat_number = ?
                        AND bs.bus_id = ?
                        AND bs.trip_id = ?
                        AND DATE(t.departure_time) = ?;`,
                        [seat.number, busid, tripid,date],
                        (error, results) => {
                            if (error) return reject(error);
                            resolve([results]);
                        }
                    );
                });

                // console.log(`Booked Rows for seat ${seat.number}:`, bookedRows); // Debugging log
    
                if (bookedRows.length > 0) {
                    await new Promise((resolve, reject) => connection.query('ROLLBACK', (error) => {
                        if (error) return reject(error);
                        resolve();
                    }));
                    return res.status(400).json({ message:` Seat ${seat.number} is already booked and cannot be reserved `});
                }



            // Query to check if the seat is available
            const [rows] = await new Promise((resolve, reject) => {
                connection.query(
                    `SELECT s.* FROM Seats s
                    JOIN Trips t ON s.bus_id = t.bus_id
                    WHERE s.seat_number = ? 
                    AND s.bus_id = ? 
                    AND t.trip_id = ? 
                    AND DATE(t.departure_time) = ? 
                    AND (s.is_reserved = 0 OR (s.is_reserved = 1 AND s.reservation_expiry < NOW()))
                    FOR UPDATE`,
                    [seat.number, busid ,tripid,date],
                    (error, results) => {
                        if (error) return reject(error);
                        resolve([results]);
                    }
                );
            });

            // Debugging: Log the rows returned from the query
            // console.log("Query result rows:", rows);
            // console.log(`Available Rows for seat ${seat.number}:`, rows); // Debugging log
            // Check if the seat is available
            if (rows.length === 0) {
                await new Promise((resolve, reject) => connection.query('ROLLBACK', (error) => {
                    if (error) return reject(error);
                    resolve();
                }));
                return res.status(404).json({ message: `Seat ${seat.number} not found or already reserved `});
            }

            // Update the seat to be reserved
            const [updateResult] = await new Promise((resolve, reject) => {
                connection.query(
                  `UPDATE Seats s
                     JOIN Trips t ON s.bus_id = t.bus_id
                     SET s.is_reserved = 1, 
                         s.reservation_timestamp = NOW(), 
                         s.reservation_expiry = NOW() + INTERVAL 10 MINUTE 
                     WHERE s.seat_number = ? 
                       AND s.bus_id = ? 
                       AND t.trip_id = ? 
                       AND DATE(t.departure_time) = ?`,

                          
                    [seat.number,busid,tripid, date ],
                    (error, results) => {
                        if (error) return reject(error);
                        resolve([results]);
                    }
                );
            });

            // Debugging: Log the result of the UPDATE query
            // console.log("Update result:", updateResult);

            // Check if the update was successful
            // console.log(`Update Result for seat ${seat.number}:`, updateResult); // Debugging log
            if (updateResult.affectedRows === 0) {
                await new Promise((resolve, reject) => connection.query('ROLLBACK', (error) => {
                    if (error) return reject(error);
                    resolve();
                }));
                return res.status(500).json({ message: `Failed to reserve seat ${seat.number}` });
            }
        }

        // Commit the transaction
        await new Promise((resolve, reject) => connection.query('COMMIT', (error) => {
            if (error) return reject(error);
            resolve();
        }));
        res.status(200).json({ message: 'Seats temporarily reserved successfully' });
    } catch (error) {
        // Rollback in case of error
        await new Promise((resolve, reject) => connection.query('ROLLBACK', (error) => {
            if (error) return reject(error);
            resolve();
        }));
        console.error("Error details:", error);
        res.status(500).json({ error: 'Failed to reserve seats', details: error.message });
    }
};

module.exports = reserveseats;