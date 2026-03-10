// Đây là file hiện tại  src/app/api/contact/route.ts
// Temporary debug: comment out edge runtime to improve Netlify compatibility.
// Re-enable if you need edge runtime later.
// export const runtime = "edge";

import { NextResponse } from "next/server";

type FormState = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
};

type ValidationErrors = Partial<Record<keyof FormState, string>>;

function validate(form: Partial<FormState>): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!form.name || form.name.trim().length < 2) {
    errors.name = "Tên không hợp lệ (>=2 ký tự).";
  }
  if (
    !form.email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(form.email).trim())
  ) {
    errors.email = "Email không hợp lệ.";
  }
  if (!form.message || form.message.trim().length < 5) {
    errors.message = "Nội dung quá ngắn (>=5 ký tự).";
  }
  if (form.phone && !/^[\d\s()+-]{7,20}$/.test(String(form.phone))) {
    errors.phone = "Số điện thoại không hợp lệ.";
  }
  return errors;
}

function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildPlainText(form: FormState) {
  return [
    `Tên: ${form.name}`,
    `Email: ${form.email}`,
    `Điện thoại: ${form.phone ?? ""}`,
    `Tiêu đề: ${form.subject ?? ""}`,
    "",
    `Nội dung:\n${form.message}`,
  ].join("\n");
}

function buildHtml(form: FormState) {
  return `
    <h2>Liên hệ mới từ website</h2>
    <p><strong>Tên:</strong> ${escapeHtml(form.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(form.email)}</p>
    <p><strong>Điện thoại:</strong> ${escapeHtml(form.phone ?? "")}</p>
    <p><strong>Tiêu đề:</strong> ${escapeHtml(form.subject ?? "")}</p>
    <hr />
    <p><strong>Nội dung:</strong></p>
    <p>${escapeHtml(form.message).replace(/\n/g, "<br/>")}</p>
  `;
}

/** Send with SendGrid (same as yours) */
async function sendWithSendGrid(form: FormState) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const from = process.env.SENDGRID_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    throw new Error("Missing SendGrid env vars: SENDGRID_API_KEY, SENDGRID_FROM_EMAIL, CONTACT_TO_EMAIL");
  }

  const payload = {
    personalizations: [
      {
        to: [{ email: to }],
        subject: `[Liên hệ] ${form.subject ?? "Yêu cầu mới"}`,
      },
    ],
    from: { email: from },
    content: [
      { type: "text/plain", value: buildPlainText(form) },
      { type: "text/html", value: buildHtml(form) },
    ],
  };

  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`SendGrid error: ${res.status} ${txt}`);
  }
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Basic in-memory rate limiting (dev only) */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 8;
const ipMap = new Map<string, { count: number; firstTs: number }>();

/** DEBUG: add GET so we can verify the route exists on production */
export function GET() {
  return NextResponse.json({ ok: true, message: "contact route present" });
}

export async function POST(req: Request) {
  try {
    const raw = await req.json().catch(() => null);
    if (!isPlainObject(raw)) {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
    }

    const form: Partial<FormState> = {
      name: typeof raw.name === "string" ? raw.name.trim() : "",
      email: typeof raw.email === "string" ? raw.email.trim() : "",
      phone: typeof raw.phone === "string" ? raw.phone.trim() : "",
      subject: typeof raw.subject === "string" ? raw.subject.trim() : "",
      message: typeof raw.message === "string" ? raw.message.trim() : "",
    };

    // Rate limit
    const ipHeader = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const ip = String(ipHeader).split(",")[0].trim();
    const now = Date.now();
    const prev = ipMap.get(ip) ?? { count: 0, firstTs: now };
    if (now - prev.firstTs > RATE_LIMIT_WINDOW_MS) {
      prev.count = 0;
      prev.firstTs = now;
    }
    prev.count += 1;
    ipMap.set(ip, prev);
    if (prev.count > RATE_LIMIT_MAX) {
      return NextResponse.json({ error: "Bạn gửi quá nhiều yêu cầu. Vui lòng thử lại sau." }, { status: 429 });
    }

    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: "Validation failed.", details: errors }, { status: 400 });
    }

    await sendWithSendGrid(form as FormState);

    return NextResponse.json({ ok: true, message: "Gửi liên hệ thành công." });
  } catch (err) {
    console.error("Contact API error:", err);
    const msg = err instanceof Error ? err.message : "Lỗi máy chủ.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}