// src/app/api/contact/route.ts
// Gửi email qua Nodemailer + Gmail SMTP (App Password)
// Biến môi trường cần thiết trên Netlify:
//   GMAIL_USER   = lethanhvinh.dev@gmail.com
//   GMAIL_PASS   = (App Password 16 ký tự từ Google Account)
//   CONTACT_TO   = lethanhvinh.dev@gmail.com  (hộp nhận mail)

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type FormState = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
};

type ValidationErrors = Partial<Record<keyof FormState, string>>;

/* ─── Validation ──────────────────────────────────────────── */
function validate(form: Partial<FormState>): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!form.name || form.name.trim().length < 2)
    errors.name = "Tên không hợp lệ (>=2 ký tự).";
  if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = "Email không hợp lệ.";
  if (!form.message || form.message.trim().length < 5)
    errors.message = "Nội dung quá ngắn (>=5 ký tự).";
  if (form.phone && !/^[\d\s()+-]{7,20}$/.test(form.phone))
    errors.phone = "Số điện thoại không hợp lệ.";
  return errors;
}

/* ─── HTML helpers ────────────────────────────────────────── */
function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildHtml(form: FormState) {
  return `
<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8" /></head>
<body style="font-family:sans-serif;color:#333;max-width:600px;margin:auto;padding:24px">
  <h2 style="color:#e65c00;border-bottom:2px solid #e65c00;padding-bottom:8px">
    📬 Liên hệ mới từ INK ZÍNH®
  </h2>
  <table style="width:100%;border-collapse:collapse;margin-top:16px">
    <tr><td style="padding:8px 0;font-weight:bold;width:130px">Tên</td><td>${escapeHtml(form.name)}</td></tr>
    <tr><td style="padding:8px 0;font-weight:bold">Email</td><td><a href="mailto:${escapeHtml(form.email)}">${escapeHtml(form.email)}</a></td></tr>
    <tr><td style="padding:8px 0;font-weight:bold">Điện thoại</td><td>${escapeHtml(form.phone ?? "(không có)")}</td></tr>
    <tr><td style="padding:8px 0;font-weight:bold">Tiêu đề</td><td>${escapeHtml(form.subject ?? "(không có)")}</td></tr>
  </table>
  <div style="margin-top:16px;background:#f9f9f9;border-left:4px solid #e65c00;padding:12px 16px;border-radius:4px">
    <strong>Nội dung:</strong><br/>
    <p style="white-space:pre-wrap;margin-top:8px">${escapeHtml(form.message)}</p>
  </div>
  <p style="margin-top:24px;font-size:12px;color:#888">Email được gửi tự động từ website inkzinh.netlify.app</p>
</body>
</html>`;
}

function buildPlainText(form: FormState) {
  return [
    `Liên hệ mới từ INK ZÍNH®`,
    `=========================`,
    `Tên: ${form.name}`,
    `Email: ${form.email}`,
    `Điện thoại: ${form.phone ?? ""}`,
    `Tiêu đề: ${form.subject ?? ""}`,
    ``,
    `Nội dung:`,
    form.message,
  ].join("\n");
}

/* ─── Nodemailer (Gmail SMTP) ─────────────────────────────── */
async function sendEmail(form: FormState) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_PASS;
  const to   = process.env.CONTACT_TO ?? "lethanhvinh.dev@gmail.com";

  if (!user || !pass) {
    throw new Error(
      "Thiếu biến môi trường: GMAIL_USER hoặc GMAIL_PASS. " +
      "Vui lòng thêm vào Netlify Environment Variables."
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"INK ZÍNH® Website" <${user}>`,
    to,
    replyTo: form.email,       // Click "Reply" trong Gmail sẽ trả lời thẳng cho khách
    subject: `[Liên hệ] ${form.subject?.trim() || "Yêu cầu mới"} — ${form.name}`,
    text: buildPlainText(form),
    html: buildHtml(form),
  });
}

/* ─── Rate limiting cơ bản ────────────────────────────────── */
const WINDOW_MS  = 60_000;
const MAX_PER_IP = 8;
const ipMap      = new Map<string, { count: number; firstTs: number }>();

function checkRateLimit(req: Request): boolean {
  const ipHeader = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const ip  = String(ipHeader).split(",")[0].trim();
  const now = Date.now();
  const rec = ipMap.get(ip) ?? { count: 0, firstTs: now };

  if (now - rec.firstTs > WINDOW_MS) { rec.count = 0; rec.firstTs = now; }
  rec.count += 1;
  ipMap.set(ip, rec);
  return rec.count <= MAX_PER_IP;
}

/* ─── Route handlers ──────────────────────────────────────── */
export function GET() {
  return NextResponse.json({ ok: true, message: "contact route present" });
}

export async function POST(req: Request) {
  try {
    const raw = await req.json().catch(() => null);
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
    }

    const form: Partial<FormState> = {
      name:    typeof raw.name    === "string" ? raw.name.trim()    : "",
      email:   typeof raw.email   === "string" ? raw.email.trim()   : "",
      phone:   typeof raw.phone   === "string" ? raw.phone.trim()   : "",
      subject: typeof raw.subject === "string" ? raw.subject.trim() : "",
      message: typeof raw.message === "string" ? raw.message.trim() : "",
    };

    if (!checkRateLimit(req)) {
      return NextResponse.json(
        { error: "Bạn gửi quá nhiều yêu cầu. Vui lòng thử lại sau 1 phút." },
        { status: 429 }
      );
    }

    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: "Validation failed.", details: errors }, { status: 400 });
    }

    await sendEmail(form as FormState);

    return NextResponse.json({ ok: true, message: "Gửi liên hệ thành công." });
  } catch (err) {
    console.error("Contact API error:", err);
    const msg = err instanceof Error ? err.message : "Lỗi máy chủ.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}