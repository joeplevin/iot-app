import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI ?? "");
mongoose.Promise = global.Promise;

const HSRecordSchema = new Schema(
  {
    _id: String,
    createdAt: String,
    title: String,
    description: String,
    category: String,
    priority: Number,
    progress: Number,
    status: String,
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

const HSRecord =
  mongoose.models.HSRecord || mongoose.model("HSRecord", HSRecordSchema);
export default HSRecord;
