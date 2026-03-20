import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IResult extends Document {
  gameId: mongoose.Types.ObjectId
  gameName: string
  gameSlug: string
  resultNumber: string       // 2-digit winning number e.g. "45"
  resultDate: Date           // date only, no time
  publishedAt: Date
  isPublished: boolean
  createdBy: string          // admin user id
  createdAt: Date
  updatedAt: Date
}

const ResultSchema = new Schema<IResult>(
  {
    gameId: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
    gameName: { type: String, required: true },
    gameSlug: { type: String, required: true },
    resultNumber: {
      type: String,
      required: true,
      match: /^\d{2}$/,       // exactly 2 digits
    },
    resultDate: { type: Date, required: true },
    publishedAt: { type: Date },
    isPublished: { type: Boolean, default: false },
    createdBy: { type: String },
  },
  { timestamps: true }
)

ResultSchema.index({ gameSlug: 1, resultDate: -1 })
ResultSchema.index({ resultDate: -1 })
ResultSchema.index({ isPublished: 1 })

export const Result: Model<IResult> =
  mongoose.models.Result || mongoose.model<IResult>('Result', ResultSchema)
