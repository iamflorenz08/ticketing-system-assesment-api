import { model, Schema } from "mongoose";

const CounterSchema = new Schema({
    model_name: {
        type: String,
        required: true,
        unique: true
    },
    sequence_value: {
        type: Number,
        default: 0
    }
})

const CounterModel = model('counter', CounterSchema)

export default CounterModel