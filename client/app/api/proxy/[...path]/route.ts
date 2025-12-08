import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  const path = resolvedParams.path.join("/");
  const url = new URL(request.url);
  const searchParams = url.searchParams.toString();
  const backendUrl = `${BACKEND_URL}/api/${path}${
    searchParams ? `?${searchParams}` : ""
  }`;

  try {
    console.log(`[PROXY] Fetching: ${backendUrl}`);
    const response = await fetch(backendUrl, {
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log(`[PROXY] Response status: ${response.status}`);
    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error) {
    console.error(`[PROXY ERROR] URL: ${backendUrl}`);
    console.error(`[PROXY ERROR] Error:`, error);
    console.error(`[PROXY ERROR] BACKEND_URL env:`, BACKEND_URL);
    return NextResponse.json(
      {
        error: "Failed to fetch from backend",
        details: String(error),
        backendUrl: backendUrl,
        envUrl: BACKEND_URL
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  const path = resolvedParams.path.join("/");
  const body = await request.text();
  const backendUrl = `${BACKEND_URL}/api/${path}`;

  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type":
          request.headers.get("Content-Type") || "application/json",
      },
      body,
    });

    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "text/plain",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch from backend" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  const path = resolvedParams.path.join("/");
  const body = await request.text();
  const backendUrl = `${BACKEND_URL}/api/${path}`;

  try {
    const response = await fetch(backendUrl, {
      method: "PUT",
      headers: {
        "Content-Type":
          request.headers.get("Content-Type") || "application/json",
      },
      body,
    });

    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "text/plain",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch from backend" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  const path = resolvedParams.path.join("/");
  const backendUrl = `${BACKEND_URL}/api/${path}`;

  try {
    const response = await fetch(backendUrl, {
      method: "DELETE",
    });

    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "text/plain",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch from backend" },
      { status: 500 }
    );
  }
}
