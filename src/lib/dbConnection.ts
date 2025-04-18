import { MongoClient, ServerApiVersion } from 'mongodb';

export default function dbConnect (collectionName:string){
    const uri =process.env.NEXT_PUBLIC_MONGODB_URL;
    const client = new MongoClient(uri as string, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    return client.db(process.env.DB_NAME).collection(collectionName)
}
