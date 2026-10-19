import { NextRequest, NextResponse } from "next/server";

const MOCK_BUSINESS_CATEGORIES = {
  status: "ok" as const,
  list: [
    {
      id: 1,
      name: "Gaming",
      icon: "/static/images/business/categories/gaming.svg",
      slug: "gaming",
      description: "Gaming brands",
    },
    {
      id: 2,
      name: "E-commerce",
      icon: "/static/images/business/categories/ecommerce.svg",
      slug: "ecommerce",
      description: "Online stores",
    },
    {
      id: 3,
      name: "Finance",
      icon: "/static/images/business/categories/finance.svg",
      slug: "finance",
      description: "Finance & fintech",
    },
    {
      id: 4,
      name: "Tech",
      icon: "/static/images/business/categories/tech.svg",
      slug: "tech",
      description: "Technology",
    },
    {
      id: 5,
      name: "Lifestyle",
      icon: "/static/images/business/categories/lifestyle.svg",
      slug: "lifestyle",
      description: "Lifestyle brands",
    },
  ],
};

const MOCK_LANGUAGES = {
  status: "ok" as const,
  list: [
    { id: 1, name: "English", icon: "", slug: "en" },
    { id: 2, name: "Spanish", icon: "", slug: "es" },
    { id: 3, name: "Russian", icon: "", slug: "ru" },
  ],
};

const MOCK_MEDIA_CHANNEL_CATEGORIES = {
  status: "ok" as const,
  list: [
    { id: 1, name: "Entertainment", icon: "", slug: "entertainment" },
    { id: 2, name: "Education", icon: "", slug: "education" },
  ],
};

function joinPath(path: string[] | undefined): string {
  return (path ?? []).join("/");
}

function ok(data: Record<string, unknown> = {}) {
  return NextResponse.json({ status: "ok", ...data });
}

function handleMock(method: string, path: string, body?: unknown) {
  // Dictionaries used on business landing contact form
  if (path === "dictionaries/business-categories") {
    return NextResponse.json(MOCK_BUSINESS_CATEGORIES);
  }
  if (path === "dictionaries/languages") {
    return NextResponse.json(MOCK_LANGUAGES);
  }
  if (path === "dictionaries/media-channel-categories") {
    return NextResponse.json(MOCK_MEDIA_CHANNEL_CATEGORIES);
  }

  // Contact form on business landing
  if (path === "brand-contact-requests" && method === "POST") {
    const payload = (body ?? {}) as Record<string, unknown>;
    return NextResponse.json({
      status: "ok",
      detail: {
        business_category_ids: payload.business_category_ids ?? [],
        request: {
          about: payload.about ?? "",
          brand_name: payload.brand_name ?? "",
          created_at: new Date().toISOString(),
          email: payload.email ?? "",
          id: 1,
          phone: payload.phone ?? "",
          processed_at: "",
        },
      },
    });
  }

  // Auth / user — guest mode without backend (no 401 to avoid login redirects)
  if (path === "users/me") {
    return NextResponse.json({
      status: "ok",
      user: null,
      feature_flags: {
        influencer_welcome_bonus: {
          available: false,
          earned: false,
          current_state: null,
        },
      },
    });
  }

  // Notifications / wallet / etc. — empty stubs
  if (path.startsWith("notifications")) {
    return ok({
      notifications: [],
      unreads_count: 0,
      pagination: {
        has_next: false,
        has_prev: false,
        page: 1,
        per_page: 10,
        total_count: 0,
        total_pages: 0,
      },
    });
  }

  if (path.startsWith("wallet") || path.startsWith("wallets")) {
    return ok({
      wallet: { balance: 0, currency: "usd" },
    });
  }

  // Generic success for any other backend call
  console.info(`[mock-api] ${method} /v1/${path}`);
  if (method === "GET") {
    return ok({ list: [], data: null, items: [] });
  }
  return ok({ detail: "mocked" });
}

async function parseBody(request: NextRequest) {
  try {
    return await request.json();
  } catch {
    return undefined;
  }
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return handleMock("GET", joinPath(path));
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const body = await parseBody(request);
  return handleMock("POST", joinPath(path), body);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const body = await parseBody(request);
  return handleMock("PUT", joinPath(path), body);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const body = await parseBody(request);
  return handleMock("PATCH", joinPath(path), body);
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return handleMock("DELETE", joinPath(path));
}
