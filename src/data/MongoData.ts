import { MongoClient, Db, InsertOneResult, WithId } from 'mongodb';

async function connectToMongoDB(): Promise<Db> {
    const url = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB connection URL
    const client = new MongoClient(url);
  
    try {
      await client.connect();
      console.log('Connected to MongoDB');
      const db = client.db("MAC_BOT"); // Replace with your database name
      return db;
    } 
    catch (error) {
      console.error('Error connecting to MongoDB', error);
      throw error;
    }
}

export async function addProject(proj:String) {
    try{
        const data: InsertOneResult<Document> = await (await connectToMongoDB()).collection('MAC_BOT_PROJECTS').insertOne({name:proj});
        console.log('Project inserted:', data.insertedId);
    }
    catch(error){
        console.error('Error inserting document', error);
        throw error;
    }
}

export async function listProjectNames(): Promise<string[]>{
    try{
        const data = await (await connectToMongoDB()).collection('MAC_BOT_PROJECTS').find().toArray();
        const arr: string[] = []
        data.forEach(
            ele=>{
                arr.push(ele.name);
            }
        )
        return arr;
    }
    catch(error){
        console.error('Error inserting document', error);
        throw error;
    }
}

export async function addUsers(user:String) {
    try{
        const data: InsertOneResult<Document> = await (await connectToMongoDB()).collection('MAC_BOT_PROJECTS').insertOne({name:user});
        console.log('Project inserted:', data.insertedId);
    }
    catch(error){
        console.error('Error inserting document', error);
        throw error;
    }
}

export async function listUsers(): Promise<WithId<Document>[]> {
    try{
        const data = await (await connectToMongoDB()).collection('MAC_BOT_PROJECTS').find().toArray();
        console.log(data);
        return data as WithId<Document>[];
    }
    catch(error){
        console.error('Error inserting document', error);
        throw error;
    }
}