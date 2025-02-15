import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true, select: false},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date}
})

const user = mongoose.model("user", userSchema);

export { user, userSchema };