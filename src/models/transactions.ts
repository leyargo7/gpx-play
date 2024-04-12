import { Schema, model, models } from "mongoose";

const transactionSchema = new Schema({
    transaction: {
        type: Schema.Types.Mixed,
    }
},{
    timestamps: true,
    versionKey: false,
    strict: false
});

const Transaction = models.Transaction || model('Transaction', transactionSchema);
export default Transaction;