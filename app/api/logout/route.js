import { NextResponse } from 'next/server';

export async function GET(request) {
    const response=NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
    response.cookies.delete('token'); // Delete the token cookie
    return response;
}