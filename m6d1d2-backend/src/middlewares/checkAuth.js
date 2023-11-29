export const checkAuth = (req, res, next) => {
    //console.log(req.headers.authorization);
    if (req.headers.authorization === "password molto sicura") {
        next();
        } else {
            //res.status(401).json({        // questa parte non in codice restituisce un errore direttamente
            //   error: "password sbagliata", 
            //});
        
        
        //questa parte da "in gestione" l'errore ad un middleware
            const error = new Error("password sbagliata");

        error.statusCode = 401;
        next (error);
        }
};