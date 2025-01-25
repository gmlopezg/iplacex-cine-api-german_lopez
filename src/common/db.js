import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = 'mongodb+srv://gmlopezg:uq7LQtQuQjk5OlRl@eva-u3-express.3fvdd.mongodb.net/?retryWrites=true&w=majority&appName=eva-u3-express'

const client = new MongoClient(uri, {
    serverApi:{
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

export default client