import { ObjectId } from "mongodb";
import client from "../common/db.js";
import { Actor } from "./actor.js";
import { peliculaCollection } from "../pelicula/controller.js"

const actorCollection = client.db('cine-db').collection('actores')

async function handleInsertActorRequest(req, res) {

    let data = req.body;

    try {

        let actor = Actor

        actor.idPelicula = data.nombrePelicula,
        actor.nombre = data.nombre,
        actor.edad = data.edad,
        actor.estaRetirado = data.estaRetirado,
        actor.premios = data.premios

        await actorCollection.insertOne(actor)

        let pelicula = await peliculaCollection.findOne({ nombre:data.nombre})

        if(!pelicula) {
            return res.status(400).send({ error: 'El id proporcionado no existe dentro de la colección'})
        }

        actor.idPelicula = pelicula._id

        return res.status(201).send(actor)

    }catch(e){
        return res.status(500).send({ error: e.code})
    }
} 

async function handleGetActoresRequest(req, res) {
    await actorCollection.find({}).toArray()
    .then((data) => { return res.status(200).send(data) })
    .catch((e) => { return res.status(500).send({ error:e }) })
}

async function handleGetActorByIdRequest(req, res) {
    let id = req.params.id

    try{
        let oid = ObjectId.createFromHexString(id)

        await actorCollection.findOne({ _id: oid})
        .then((data) => {
            if(data === null) return res.status(404).send(data)

            return res.status(200).send(data)
        })
        .catch((e) => {
            return res.status(500).send({error: e.code})
        })

    }catch(e){
         return res.status(400).send('Id mal formado')   
    }
}

async function handleGetActoresByPeliculaIdRequest(req,res) {

    let peliculaId = req.params.id;

    try {
        // Convertimos el id de la película a ObjectId
        let oid = ObjectId.createFromHexString(peliculaId);

        // Se buscan los actores que tienen el id de la película
        await actorCollection.find({ idPelicula: oid }).toArray()
            .then((data) => {
                if (data.length === 0) {
                    return res.status(404).send({ error: 'No se encontraron actores para esta película' });
                }
                return res.status(200).send(data);
            })
            .catch((e) => {
                return res.status(500).send({ error: e.message });
            });

    } catch (e) {
        return res.status(400).send({ error: 'Id mal formado' });
    }
}


async function handleDeleteActorRequest(req, res) {
    let id = req.params.id
    
    try{
        let oid = ObjectId.createFromHexString(id)

        await actorCollection.deleteOne({ _id: oid})
        .then((data) => { return res.status(200).send(data) })
        .catch((e) => { return res.status(500).send({ code: e.code }) })

    }catch (e) {
        return res.status(400).send('Id mal formado')
    }

}


export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest,
    handleDeleteActorRequest
}