import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { dbConnect } from '@/lib/db'
import { Result } from '@/models/Result'

// PATCH /api/results/[id] — toggle published
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await dbConnect()
  const body = await req.json()
  const result = await Result.findByIdAndUpdate(
    params.id,
    { isPublished: body.isPublished, publishedAt: body.isPublished ? new Date() : undefined },
    { new: true }
  )
  if (!result) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true, data: result })
}

// DELETE /api/results/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await dbConnect()
  await Result.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}
