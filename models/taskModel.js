import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default:""
    },
    status: {
      type: String,
      default:'in-progress'
    },
    priority: {
      type: String,
      enum:["Low","Medium",'High'],
      default:"Low"
    },
    dueDate: {
      type:Date
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
