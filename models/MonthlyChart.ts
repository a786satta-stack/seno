import mongoose, { Schema, Document, Model } from 'mongoose'

/**
 * Pre-aggregated monthly chart data per game.
 * Stores a 2D array of results for the entire month.
 * Updated automatically when a new result is published.
 */
export interface IDayEntry {
  day: number           // 1–31
  result: string | null // "45" or null if not yet available
}

export interface IMonthlyChart extends Document {
  gameId: mongoose.Types.ObjectId
  gameSlug: string
  gameName: string
  year: number          // e.g. 2024
  month: number         // 1–12
  entries: IDayEntry[]
  createdAt: Date
  updatedAt: Date
}

const DayEntrySchema = new Schema<IDayEntry>(
  {
    day: { type: Number, required: true },
    result: { type: String, default: null },
  },
  { _id: false }
)

const MonthlyChartSchema = new Schema<IMonthlyChart>(
  {
    gameId: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
    gameSlug: { type: String, required: true },
    gameName: { type: String, required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true, min: 1, max: 12 },
    entries: { type: [DayEntrySchema], default: [] },
  },
  { timestamps: true }
)

MonthlyChartSchema.index({ gameSlug: 1, year: -1, month: -1 }, { unique: true })

export const MonthlyChart: Model<IMonthlyChart> =
  mongoose.models.MonthlyChart ||
  mongoose.model<IMonthlyChart>('MonthlyChart', MonthlyChartSchema)
