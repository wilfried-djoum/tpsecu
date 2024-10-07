const mongoose = require('mongoose');

// Fonction pour connecter à MongoDB
mongoose.set('strictQuery', true); 
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/users', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error: ', err);
        process.exit(1); // Arrête l'application en cas d'erreur
    }
};

module.exports = connectDB;
