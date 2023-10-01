document.getElementById("mybtn").onclick = function(){


    console.log("working");
//     const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const crypto = require('crypto');

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());

// function generateSHAAndDID(data) {
//     const sha1 = crypto.createHash('sha256').update(data).digest('hex');
//     const sha2 = crypto.createHash('sha256').update(sha1).digest('hex');
//     const did = 'your_did_generation_logic_here'; // Replace with your DID generation logic
//     return [sha1, sha2, did];
// }

// function generateUID() {
//     return 'your_uid_generation_logic_here'; // Replace with your UID generation logic
// }

// app.post('/register', (req, res) => {
//     console.log('In register');
//     const idInfo = req.body.id_info;
//     const bioInfo = req.body.bio_info;

//     const [hash1, hash2, did] = generateSHAAndDID(idInfo);
//     const [hash3, hash4, did2] = generateSHAAndDID(bioInfo);

//     const usid = generateUID();
//     const tup = [hash1, hash2, hash3, hash4, did, usid];
//     console.log(tup);

//     let mappingList = [];

//     if (fs.existsSync('data/mappings.json')) {
//         mappingList = JSON.parse(fs.readFileSync('data/mappings.json', 'utf8'));
//     }

//     for (const mapping of mappingList) {
//         if (mapping[0] === hash1 && mapping[1] === hash2) {
//             return res.json({
//                 "DID already generated": mapping[2],
//                 "UID": mapping[3]
//             });
//         }
//     }

//     mappingList.push(tup);

//     fs.writeFileSync('data/mappings.json', JSON.stringify(mappingList), 'utf8');
//     global.mappingList1 = mappingList;

//     return res.json({
//         "Generated UID": usid
//     });
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

}