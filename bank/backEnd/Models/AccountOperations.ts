import { Document, Schema, model } from "mongoose";

export interface IAccountModel extends Document {
    accountNumber: Number; 
    type: String; 
    withdrawal?: { 
        amount: Number;
        date: Date;
    };
    deposit?: { 
        amount: Number;
        date: Date;
    };
    loan?: { 
        amount: Number;
        interest: Number;
        numberOfPayments: Number;
        loanDate: Date;
    };
};

const accountOperationsSchema = new Schema<IAccountModel>({
    accountNumber: { type: Number, required: true },
    type: { type: String, enum: ['withdrawal', 'deposit', 'loan'], required: true },
    withdrawal: {
        amount: { type: Number },
        date: { type: Date }
    },
    deposit: {
        amount: { type: Number },
        date: { type: Date }
    },
    loan: {
        amount: { type: Number },
        interest: { type: Number },
        numberOfPayments: { type: Number },
        loanDate: { type: Date }
    }
});

export const AccountModel = model<IAccountModel>('AccountModel', accountOperationsSchema);

