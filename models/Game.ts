import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IGame extends Document {
  name: string
  slug: string
  openTime: string
  closeTime: string
  isActive: boolean
  color: string
  order: number
  createdAt: Date
  updatedAt: Date
}

const GameSchema = new Schema<IGame>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    openTime: { type: String, required: true },   // e.g. "05:00 AM"
    closeTime: { type: String, required: true },   // e.g. "06:00 AM"
    isActive: { type: Boolean, default: true },
    color: { type: String, default: '#f59e0b' },   // accent color for the card
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

GameSchema.index({ slug: 1 })
GameSchema.index({ order: 1 })

export const Game: Model<IGame> =
  mongoose.models.Game || mongoose.model<IGame>('Game', GameSchema)
