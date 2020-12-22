// const jwt = require('jsonwebtoken');
// const config = require('../config');

// const { JWT_SECRET } = config;

// module.exports = (req, res, next) => {
//   const token = req.header('x-auth-token');

//   // Check for token
//   if (!token)
//     return res.status(401).json({ msg: 'No token, authorizaton denied' });

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, JWT_SECRET);
//     // Add user from payload
//     req.user = decoded;
//     next();
//   } catch (e) {
//     res.status(400).json({ msg: 'Token is not valid' });
//   }
// };
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tardy-b59dc.firebaseio.com"
});

async function decodeIDToken(req, res, next) {
  const header = req.headers.authorization;
  if (header !== 'Bearer null' && req.headers.authorization.startsWith('Bearer ')) {
  const idToken = req.headers.authorization.split('Bearer ')[1];

  try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req['currentUser'] = decodedToken;
    } catch (err) {
      console.log(err);
    }
  }  
next();
}

module.exports = decodeIDToken;