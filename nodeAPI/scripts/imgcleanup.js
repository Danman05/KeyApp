/* WARNING - DELETES ALL UNSUSED IMAGES IN THE UPLOADS DIRECTORY,
   THAT IS NOT BEING USED FROM THE DATABASE
    
    If MyImage.png exist in the uploads directory
    But the path is not stored anywhere on the database
    MyImage.Png will be deleted PERMANENTLY    
*/
    
const db = require('..\\db');
const fs = require('fs');

try {
    const fetchData = async function () {
        try {
            const data = await getPicturePath();
            let count = 0;
            let paths = [];
            data.forEach(item => {
                if (item.enhedBillede == null || item.enhedBillede == '' || item.enhedBillede == undefined) {
                }
                else {
                    jsonitem = JSON.parse(item.enhedBillede);

                    jsonitem.enhedBillede.forEach(item => {
                        paths[count] = paths[count] || ''; // Initialize to an empty string if undefined
                    
                        paths[count] += item

                        count++;
                    });
                }
            }); 

            // Specify the directory where your images are stored
            const imageDirectory = 'C:\\xampp\\htdocs\\key-app\\uploads';

            // Read the files in the directory
            fs.readdir(imageDirectory, (err, files) => {
                if (err) throw err;
            
                // Filter out files that are not in the database
                const filesToDelete = files.filter((file) => !paths.includes(`${file}`));

                // Delete files not in the database
                filesToDelete.forEach((file) => {
                    const filePath = `${imageDirectory}/${file}`;

                    fs.unlink(filePath, (unlinkErr) => {
                        if (unlinkErr) throw unlinkErr;

                        console.log(`Deleted file: ${filePath}`);
                    });
                });
            });
        } catch (error) {
            console.log("error while handling data:", error);
        }
    }

    fetchData();
} catch (err) {
    console.log("Error:", err);
}



async function getPicturePath() {
    try {
        const data = db.query(`
        SELECT enhedBillede from enhed`);

        return data;
    } catch (error) {
        console.log("error with DB:", error);
    }

}


