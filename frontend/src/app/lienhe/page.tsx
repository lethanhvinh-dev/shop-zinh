// đây là file src/app/lienhe/page.tsx

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormState, string | null>>;

const STORAGE_KEY = "contact_form_draft_v1";

/** Basic validators */
function validateAll(form: FormState) {
  const errors: FieldErrors = {};
  if (!form.name || form.name.trim().length < 2)
    errors.name = "Vui lòng nhập tên (>=2 ký tự).";
  if (
    !form.email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(form.email).trim())
  )
    errors.email = "Email không hợp lệ.";
  if (form.phone && !/^[\d\s()+-]{7,20}$/.test(form.phone))
    errors.phone = "Số điện thoại không hợp lệ.";
  if (!form.message || form.message.trim().length < 5)
    errors.message = "Nội dung quá ngắn (>=5 ký tự).";
  return errors;
}



export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load draft
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<FormState>;
        setForm((s) => ({ ...s, ...saved }));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Autosave
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
      } catch {}
    }, 600);
    return () => clearTimeout(t);
  }, [form]);

  const isValid = useMemo(() => {
    const e = validateAll(form);
    return Object.keys(e).length === 0;
  }, [form]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((s) => ({ ...s, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: null }));
    setErrorMsg(null);
    setSuccessMsg(null);
  }

  function formatPhoneForDisplay(raw: string) {
    const d = raw.replace(/\D/g, "");
    if (d.length <= 3) return d;
    if (d.length <= 7) return `${d.slice(0, 3)} ${d.slice(3)}`;
    return `${d.slice(0, 3)} ${d.slice(3, 7)} ${d.slice(7, 11)}`;
  }

  function onPhoneInput(v: string) {
    const allowed = v.replace(/[^\d+() -]/g, "");
    update("phone", allowed);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const errors = validateAll(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setErrorMsg("Vui lòng sửa các trường có lỗi.");
      return;
    }

    setLoading(true);
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      // Gửi đến Netlify Forms (application/x-www-form-urlencoded)
      const body = new URLSearchParams({
        "form-name": "contact",
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
      }).toString();

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        setErrorMsg(`Lỗi khi gửi: ${res.status}. Vui lòng thử lại.`);
        return;
      }

      setSuccessMsg(
        "Gửi liên hệ thành công! Cảm ơn bạn — chúng tôi sẽ liên hệ sớm."
      );
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        setErrorMsg("Kết nối chậm — vui lòng thử lại.");
      } else if (err instanceof Error) {
        setErrorMsg(err.message || "Có lỗi khi gửi.");
      } else {
        setErrorMsg("Có lỗi không xác định.");
      }
    } finally {
      setLoading(false);
    }
  }

  /**
   * DESIGN CHANGES for inputs:
   * - input text color: text-black
   * - input background: light warm (bg-[#fff7f0])
   * - input border (brown light): border-[#b78a57]
   * - focus: ring with brown tint
   *
   * Tailwind arbitrary colors are used. If your Tailwind config blocks arbitrary colors,
   * replace with CSS variables or add these colors to tailwind.config.js.
   */
  const baseInputCls =
    "w-full rounded px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 text-black bg-[#fff7f0] border-[#b78a57]";

  const baseInputFocus =
    "focus:outline-none focus:ring-2 focus:ring-[#ead2bf] focus:border-[#b78a57]";

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-orange-500">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-orange-500">Liên hệ</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
          {/* Left info */}
          <aside className="lg:col-span-1">
            <h2 className="mb-2 text-3xl font-bold tracking-wide text-(--color-brand-primary)">
              INK ZÍNH®
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              INK ZÍNH® - Cung cấp mẫu in HOT nhất thị trường
            </p>

            <div className="prose mb-6 max-w-none text-sm text-gray-700">
              <p className="font-semibold">Trụ sở chính</p>
              <p>18/28/8 CMT8, KP4, Phường Trung Dũng, TP.Biên Hòa, Đồng Nai</p>

              <p className="mt-4 font-semibold">Thông tin liên lạc</p>
              <p>Email: lethanhvinh.dev@gmail.com</p>
              <p>Số điện thoại: 0834016499 - 0941056340</p>
            </div>

            {/* Map placeholder - replace embed src with your real embed */}
            <div className="mt-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3917.2134856763187!2d106.819847!3d10.94724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDU2JzUwLjEiTiAxMDbCsDQ5JzExLjUiRQ!5e0!3m2!1svi!2s!4v1762359007792!5m2!1svi!2s"
                width="600"
                height="450"
                className="w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </aside>

          {/* Form */}
          <main className="lg:col-span-2">
            <div className="bg-gray-100 p-6 shadow-sm">
              <h3 className="mb-1 text-2xl font-semibold text-gray-800">
                Form Liên hệ
              </h3>
              <p className="mb-6 text-sm text-gray-600">
                Nhập thông tin và nội dung — chúng tôi sẽ phản hồi sớm.
              </p>

              {errorMsg && (
                <div
                  role="alert"
                  className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700"
                >
                  {errorMsg}
                </div>
              )}
              {successMsg && (
                <div
                  role="status"
                  className="mb-4 rounded border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700"
                >
                  {successMsg}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                name="contact"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                className="space-y-4"
                noValidate
              >
                {/* Hidden inputs bắt buộc cho Netlify Forms */}
                <input type="hidden" name="form-name" value="contact" />
                <p hidden>
                  <label>
                    Không điền vào đây:{" "}
                    <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Tên
                  </label>
                  <input
                    id="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Họ và tên"
                    aria-invalid={!!fieldErrors.name}
                    aria-describedby={
                      fieldErrors.name ? "name-error" : undefined
                    }
                    className={`${baseInputCls} ${baseInputFocus} ${
                      fieldErrors.name ? "border-red-300" : ""
                    }`}
                  />
                  {fieldErrors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="email@domain.com"
                    aria-invalid={!!fieldErrors.email}
                    aria-describedby={
                      fieldErrors.email ? "email-error" : undefined
                    }
                    className={`${baseInputCls} ${baseInputFocus} ${
                      fieldErrors.email ? "border-red-300" : ""
                    }`}
                  />
                  {fieldErrors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Điện thoại
                  </label>
                  <input
                    id="phone"
                    value={formatPhoneForDisplay(form.phone)}
                    onChange={(e) => onPhoneInput(e.target.value)}
                    placeholder="083 401 6499"
                    aria-invalid={!!fieldErrors.phone}
                    aria-describedby={
                      fieldErrors.phone ? "phone-error" : undefined
                    }
                    className={`${baseInputCls} ${baseInputFocus} ${
                      fieldErrors.phone ? "border-red-300" : ""
                    }`}
                  />
                  {fieldErrors.phone && (
                    <p id="phone-error" className="mt-1 text-sm text-red-600">
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Tiêu đề
                  </label>
                  <input
                    id="subject"
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    placeholder="Ví dụ: Báo giá in namecard"
                    className={`${baseInputCls} ${baseInputFocus}`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Nội dung
                  </label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Mô tả yêu cầu của bạn..."
                    rows={6}
                    aria-invalid={!!fieldErrors.message}
                    aria-describedby={
                      fieldErrors.message ? "message-error" : undefined
                    }
                    className={`${baseInputCls} ${baseInputFocus} resize-vertical min-h-[140px] ${
                      fieldErrors.message ? "border-red-300" : ""
                    }`}
                  />
                  {fieldErrors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-600">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded bg-(--color-brand-primary) px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
                    aria-busy={loading}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        Đang gửi...
                      </>
                    ) : (
                      "Gửi"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "",
                        message: "",
                      });
                      setFieldErrors({});
                      setErrorMsg(null);
                      setSuccessMsg(null);
                      try {
                        localStorage.removeItem(STORAGE_KEY);
                      } catch {}
                    }}
                    className="inline-flex items-center gap-2 rounded bg-(--color-brand-primary) px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    Xóa
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>

      {/* ✅ Floating quick buttons */}
      <div
        aria-hidden="true"
        className="fixed bottom-8 right-4 z-50 flex flex-col gap-4"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {/* Gọi điện */}
        <a
          href="tel:0834016499"
          aria-label="Gọi 0834016499"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow transition hover:scale-105"
        >
          📞
        </a>

        {/* Zalo — icon đúng như hình */}
        <a
          href="https://zalo.me/0834016499"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Chat Zalo 0834016499"
          className="flex h-12 w-12 items-center justify-center rounded-full shadow transition hover:scale-105 bg-white"
        >
          <Image
            src="/zalo-crop.png"
            alt="Zalo"
            width={40}
            height={40}
            className="object-contain"
          />
        </a>

        {/* Chat nội bộ */}
        <a
          href="/lienhe"
          aria-label="Mở chat"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white shadow transition hover:scale-105"
        >
          💬
        </a>
      </div>
    </div>
  );
}
