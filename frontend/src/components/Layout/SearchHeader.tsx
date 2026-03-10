// src/app/components/layout/SearchHeader.tsx
"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { mockProducts, allCategories } from "@/data/products";

/** Search icon (inline SVG) */
const SearchIcon = () => (
  <svg
    className="h-5 w-5 text-gray-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-4.35-4.35"
    />
    <circle
      cx="11"
      cy="11"
      r="6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function SearchHeader() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const blurTimeoutRef = useRef<number | null>(null);
  const debounceTimeoutRef = useRef<number | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
        blurTimeoutRef.current = null;
      }
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
        debounceTimeoutRef.current = null;
      }
    };
  }, []);

  // debounce input
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = null;
    }
    debounceTimeoutRef.current = window.setTimeout(() => {
      if (isMountedRef.current) setDebouncedQuery(query.trim());
    }, 120);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
        debounceTimeoutRef.current = null;
      }
    };
  }, [query]);

  // filtered product results
  const productResults = useMemo(() => {
    const q = debouncedQuery.toLowerCase();
    if (!q) return [] as typeof mockProducts;
    return mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q)
    );
  }, [debouncedQuery]);

  // filtered category results (so we can show "TEM NHÃN (bao gồm tất cả tem nhãn)")
  const categoryResults = useMemo(() => {
    const q = debouncedQuery.toLowerCase();
    if (!q) return [] as typeof allCategories;
    return allCategories.filter(
      (c) =>
        c.title.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)
    );
  }, [debouncedQuery]);

  // navigate helper for product (closes dropdown first)
  const navigateToProduct = useCallback(
    async (p: (typeof mockProducts)[number]) => {
      try {
        if (blurTimeoutRef.current) {
          clearTimeout(blurTimeoutRef.current);
          blurTimeoutRef.current = null;
        }
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
          debounceTimeoutRef.current = null;
        }

        if (isMountedRef.current) {
          setOpen(false);
          setQuery("");
          setDebouncedQuery("");
          setHighlight(0);
          inputRef.current?.blur();
        }
        await router.push(`/sanpham/${p.id}`); // match your route
      } catch {
        try {
          window.location.assign(`/sanpham/${p.id}`);
        } catch {
          // noop
        }
      }
    },
    [router]
  );

  // navigate helper for category (closes dropdown first)
  const navigateToCategory = useCallback(
    async (c: (typeof allCategories)[number]) => {
      try {
        if (blurTimeoutRef.current) {
          clearTimeout(blurTimeoutRef.current);
          blurTimeoutRef.current = null;
        }
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
          debounceTimeoutRef.current = null;
        }

        if (isMountedRef.current) {
          setOpen(false);
          setQuery("");
          setDebouncedQuery("");
          setHighlight(0);
          inputRef.current?.blur();
        }
        await router.push(`/sanpham/category/${c.slug}`);
      } catch {
        try {
          window.location.assign(`/sanpham/category/${c.slug}`);
        } catch {
          // noop
        }
      }
    },
    [router]
  );

  // show/hide dropdown when debouncedQuery changes
  const shouldShowResults = debouncedQuery.length > 0;
  useEffect(() => {
    if (!isMountedRef.current) return;
    requestAnimationFrame(() => {
      if (isMountedRef.current) {
        setOpen(shouldShowResults);
        setHighlight(0);
      }
    });
  }, [shouldShowResults]);

  // ensure highlighted item visible
  function scrollIntoViewSafe(index: number) {
    const ul = listRef.current;
    if (!ul) return;
    if (!ul.children || ul.children.length === 0) return;
    let i = index;
    if (i < 0) i = 0;
    if (i >= ul.children.length) i = ul.children.length - 1;
    const el = ul.children[i] as HTMLElement | undefined;
    if (!el) return;
    requestAnimationFrame(() => {
      try {
        el.scrollIntoView({ block: "nearest", inline: "nearest" });
      } catch {
        /* ignore */
      }
    });
  }

  // keyboard navigation (we treat categories first, then products)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;

      const total = categoryResults.length + productResults.length;
      if (total === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.min(highlight + 1, Math.max(0, total - 1));
        if (isMountedRef.current) setHighlight(next);
        requestAnimationFrame(() => scrollIntoViewSafe(next));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const next = Math.max(highlight - 1, 0);
        if (isMountedRef.current) setHighlight(next);
        requestAnimationFrame(() => scrollIntoViewSafe(next));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const idx = highlight;
        if (idx < categoryResults.length) {
          const c = categoryResults[idx];
          if (c) navigateToCategory(c);
        } else {
          const p = productResults[idx - categoryResults.length];
          if (p) navigateToProduct(p);
        }
      } else if (e.key === "Escape") {
        if (isMountedRef.current) setOpen(false);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [
    open,
    highlight,
    categoryResults,
    productResults,
    navigateToCategory,
    navigateToProduct,
  ]);

  // focus / blur
  function handleBlur() {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
    blurTimeoutRef.current = window.setTimeout(() => {
      if (isMountedRef.current) setOpen(false);
      blurTimeoutRef.current = null;
    }, 150);
  }
  function handleFocus() {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
    if (debouncedQuery.length > 0 && isMountedRef.current) setOpen(true);
  }

  // click handlers
  async function onImageClick(
    e: React.MouseEvent,
    p: (typeof mockProducts)[number]
  ) {
    e.preventDefault();
    e.stopPropagation();
    await navigateToProduct(p);
  }
  async function onCategoryClick(
    e: React.MouseEvent,
    c: (typeof allCategories)[number]
  ) {
    e.preventDefault();
    e.stopPropagation();
    await navigateToCategory(c);
  }

  return (
    <div className="bg-[#f3e9e2]">
      <div className="container mx-auto flex max-w-7xl items-center justify-center px-4 py-3">
        <div className="relative w-full md:w-2/3 lg:w-1/2">
          <div className="relative">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Tìm sản phẩm..."
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-black placeholder:text-gray-500 focus:border-orange-500 focus:outline-none"
              aria-label="Tìm kiếm sản phẩm"
            />

            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <SearchIcon />
            </div>
          </div>

          {open && (
            <div
              className="absolute left-0 right-0 z-50 mt-2 max-h-72 w-full overflow-auto rounded-md border border-white/20 bg-[#7a4427] text-white shadow-lg"
              role="listbox"
              aria-activedescendant={`search-item-${highlight}`}
            >
              <ul ref={listRef} className="divide-y divide-white/10">
                {/* 1) Categories section (if any) */}
                {categoryResults.length > 0 && (
                  <>
                    {categoryResults.map((c, idx) => {
                      const isActive = idx === highlight;
                      return (
                        <li
                          key={`cat-${c.id}`}
                          data-id={`cat-${c.id}`}
                          id={`search-item-${idx}`}
                          role="option"
                          aria-selected={isActive}
                        >
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              navigateToCategory(c);
                            }}
                            onMouseEnter={() => {
                              if (isMountedRef.current) setHighlight(idx);
                              requestAnimationFrame(() =>
                                scrollIntoViewSafe(idx)
                              );
                            }}
                            className={`flex w-full items-center gap-3 px-3 py-3 text-sm hover:bg-white/10 ${
                              isActive ? "bg-white/10" : ""
                            }`}
                          >
                            <button
                              type="button"
                              onClick={(e) => onCategoryClick(e, c)}
                              aria-label={`Mở danh mục ${c.title}`}
                              className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-white/20 focus:outline-none"
                            >
                              <Image
                                src={c.imageUrl}
                                alt={c.title}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </button>

                            <div className="min-w-0">
                              <div className="truncate font-semibold text-white uppercase">
                                {c.title}
                              </div>
                              <div className="truncate text-xs text-white/80">
                                Bao gồm tất cả {c.title.toLowerCase()}
                              </div>
                            </div>

                            <div className="ml-auto text-xs text-white/90">
                              DANH MỤC
                            </div>
                          </a>
                        </li>
                      );
                    })}
                    {/* divider between categories and products */}
                    <li aria-hidden className="h-px bg-white/10" />
                  </>
                )}

                {/* 2) Product results */}
                {productResults.length === 0 ? (
                  categoryResults.length === 0 ? (
                    <li className="p-3 text-sm text-white/90">
                      Không tìm thấy sản phẩm.
                    </li>
                  ) : null
                ) : (
                  productResults.map((p, idx) => {
                    const listIndex = idx + categoryResults.length; // offset
                    const isActive = listIndex === highlight;
                    const cat = allCategories.find(
                      (c) => c.id === p.categoryId
                    );
                    return (
                      <li
                        key={p.id}
                        data-id={p.id}
                        id={`search-item-${listIndex}`}
                        role="option"
                        aria-selected={isActive}
                      >
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigateToProduct(p);
                          }}
                          onMouseEnter={() => {
                            if (isMountedRef.current) setHighlight(listIndex);
                            requestAnimationFrame(() =>
                              scrollIntoViewSafe(listIndex)
                            );
                          }}
                          className={`flex w-full items-center gap-3 px-3 py-2 text-sm hover:bg-white/10 ${
                            isActive ? "bg-white/10" : ""
                          }`}
                        >
                          <button
                            type="button"
                            onClick={(e) => onImageClick(e, p)}
                            aria-label={`Mở ${p.name}`}
                            className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-white/20 focus:outline-none"
                          >
                            <Image
                              src={p.imageUrl}
                              alt={p.name}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          </button>

                          <div className="min-w-0">
                            <div className="truncate font-medium text-white uppercase">
                              {p.name}
                            </div>
                            <div className="truncate text-xs text-white/80">
                              {p.description}
                            </div>
                          </div>

                          <div className="ml-auto text-xs text-white/90">
                            {cat?.title ?? ""}
                          </div>
                        </a>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
