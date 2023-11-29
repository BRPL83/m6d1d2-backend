export const genericError = (err, req, res, next) => {
    console.log(err);

    res.status(err.statusCode || 500).send(err. message);
};

//Serve per gestire gli errori e non far crashare il nostro server!!!
//E' una funzione, ha quattro paramentri (err, req, res, next) tra cui il primo ovviamente è l'errore
//nell'ultima parte del codice, quando passa arriva all'errore su checkAuth viene passata direttamente qui l'errore in gestione ( res.status(err.statusCode || 500).send(err.message);