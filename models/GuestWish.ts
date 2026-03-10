import { Schema, model, models } from "mongoose";

export interface IGuestWish {
  _id?: string;
  invitationId: string;
  name: string;
  message: string;
  attendance?: "yes" | "no" | "maybe";
  createdAt?: Date;
}

const GuestWishSchema = new Schema<IGuestWish>(
  {
    invitationId: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    attendance: {
      type: String,
      enum: ["yes", "no", "maybe"],
      default: "maybe",
    },
  },
  {
    timestamps: true,
  },
);

const GuestWish =
  models.GuestWish || model<IGuestWish>("GuestWish", GuestWishSchema);

export default GuestWish;
