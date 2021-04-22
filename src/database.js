import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost/apiProducts", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(db => console.log("Conectada la bbdd!"))
    .catch(error => console.log(error));