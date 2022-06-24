/* eslint-disable no-unused-vars */
import { ObjectId } from 'mongodb';
import { mongoConnect } from '../db/mongo.js';

export class Connector<T extends { id: number }> {
    constructor() {}

    async findAll(): Promise<Array<T>> {
        const { connect, collection } = await mongoConnect(
            'ISDI202205',
            'tasks'
        );
        const cursor = collection.find();
        const result = await (cursor.toArray() as unknown as Promise<Array<T>>);
        connect.close();
        return result;
    }
    async find(id: string): Promise<T | undefined> {
        const { connect, collection } = await mongoConnect(
            'ISDI202205',
            'tasks'
        );
        const dbId = new ObjectId(id);
        const result = (await collection.findOne({
            _id: dbId,
        })) as unknown as T;
        if (result === null) return undefined;
        connect.close();
        return result;
    }
    async create(data: Partial<T>): Promise<T> {
        const { connect, collection } = await mongoConnect(
            'ISDI202205',
            'tasks'
        );
        const result = (await collection.insertOne(
            data
        )) as unknown as Promise<T>;
        connect.close();
        return result;
    }
    async update(id: string, data: Partial<T>): Promise<T> {
        const { connect, collection } = await mongoConnect(
            'ISDI202205',
            'tasks'
        );
        const dbId = new ObjectId(id);
        const result = (await collection.findOneAndUpdate(
            { _id: dbId },
            { $set: { ...data } }
        )) as unknown as Promise<T>;
        connect.close();
        return result;
    }
    async delete(id: string) {
        const { connect, collection } = await mongoConnect(
            'ISDI202205',
            'tasks'
        );
        const dbId = new ObjectId(id);
        const result = await collection.findOneAndDelete({ _id: dbId });
        connect.close();
        if (!result.value) return { status: 404 };
        return { status: 202 };
    }
}
