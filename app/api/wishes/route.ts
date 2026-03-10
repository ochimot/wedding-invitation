import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import GuestWish from '@/models/GuestWish';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const invitationId = searchParams.get('invitationId');

    await connectDB();

    const query = invitationId ? { invitationId } : {};
    const wishes = await GuestWish.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: wishes });
  } catch (error) {
    console.error('Error fetching wishes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch guest wishes' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { invitationId, name, message, attendance } = body;

    if (!invitationId || !name || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();

    const wish = await GuestWish.create({
      invitationId,
      name,
      message,
      attendance: attendance || 'maybe',
    });

    return NextResponse.json({ success: true, data: wish }, { status: 201 });
  } catch (error) {
    console.error('Error creating wish:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create guest wish' },
      { status: 500 }
    );
  }
}
