import CounterModel from "../models/counter";

export async function getNextSequenceValue(modelName: string) {
    const sequenceDocument = await CounterModel.findOneAndUpdate(
        { model_name: modelName },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    );

    return String(sequenceDocument.sequence_value).padStart(5, '0'); // Pads the number with zeros
}