const connection = require('../mysql/mysql'); 

// Function to get all cities
const CityController = async (req, res) => {
    try {
        const query = 'SELECT city_name FROM Cities';
        const [rows] = await new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) return reject(error);
                resolve([results]);
            });
        });

        const cities = rows.map(row => row.city_name);
        res.json({ cities });
       
    } catch (error) {
        console.error('Error fetching cities:', error.message);
        res.status(500).send('Error fetching cities');
    }
};

module.exports=CityController;