import express from "express";
import { User } from "./models/users.js"; 
import { checkAuth } from "./middlewares/checkAuth.js";


const userRouter = express.Router();
//const user = await User.findById("655bb165f47dc0bbbd21a6b5");

//userRouter.use(checkAuth); Serve per mettere l'autenticazione all'inizio degli endpoints creati, senza questo uno potrebbe entrare senza la richiesta della password impostata

userRouter.get("/test", async (req, res, next) => {
    res.json({message: "User router working! :P"})
});

userRouter.get("/", async (req, res) => {

    try {

        const users = await User.find({});
        res.json(users);

    } catch (error) {
        next(error)
    }
});

userRouter.get("/:id", async (req, res, next) => {
    try {

    const { id } = req.params
    const user = await User.findById(id);

    if (!user) {
        return res.status(404).send();
    }
    res.json(user);

    } catch (error) {
        next(error);
    }
});

userRouter.post("/", checkAuth, async (req, res, next) => {
    
    
    try { // try & catch: gestione dell'errore del middleware alla fine

        const newUser = new User(req.body);
    
        await newUser.save();

        res.status(201).send(newUser);
        
    } catch (error) {
        error.statusCode = 400;
      next(error);  

    }
  
});


userRouter.put("/:id", checkAuth, async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
});

userRouter.delete("/:id", checkAuth, async (req, res, next) => {
    try {

        const deletedDocument = await User.findByIdAndDelete(req.params.id)
    
    if (!deletedDocument) {
//Questa risorsa non esiste più, quindi non si può cancellare
        res.status(404).send(); 
    }else{
        res.status(204).send();
    }
    } catch (error) {
        next(error);
    
    } 
});

export default userRouter;