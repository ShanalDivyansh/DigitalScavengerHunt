import mongoose from "mongoose";

const scavengerSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: [true, "A Scavenger must have a topic"],
    enum: ["Time-Travelers", "Famous-Figures", "Time-Period", "general"],
    default: "general",
  },
  scavengerName: {
    type: String,
    trim: true,
    required: [true, "A scavenger must have a name"],
    unique: true,
  },
  startLocation: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: [Number],
    description: String,
  },
  scavengerStops: [
    {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      scavengerName: {
        type: String,
        trim: true,
        required: [true, "A scavenger must have a name"],
        unique: true,
      },
      coordinates: [Number],
      clue: {
        type: String,
        required: [true, "A scavenger must have a clue"],
      },
      solution: {
        type: String,
        required: [true, "A scavenger must have a solution"],
      },
    },
  ],
  rewards: Number,
});

const scavengerModel = mongoose.model("ScavengerHunt", scavengerSchema);

export { scavengerModel };
