"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY  = "tulipfaith_journal";
const PENDING_KEY  = "tulipfaith_journal_pending";

export default function HighlightToJournal() {
  const router = useRouter();
  const [popover, setPopover] = useState(null); // { x, y, text }

  const handleMouseUp = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setPopover(null);
      return;
    }
    const text = selection.toString().trim();
    if (text.length < 5) { setPopover(null); return; }

    const range = selection.getRangeAt(0);
    const rect  = range.getBoundingClientRect();

    setPopover({
      x:    rect.left + rect.width / 2 + window.scrollX,
      y:    rect.top  + window.scrollY - 12,
      text,
    });
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseUp]);

  function addToJournal() {
    if (!popover) return;
    const entry = {
      id:        crypto.randomUUID(),
      title:     null,
      scripture: popover.text.length < 120 ? popover.text : null,
      body:      popover.text.length >= 120 ? popover.text : "",
      createdAt: new Date().toISOString(),
      fromStory: window.location.pathname,
    };
    // Store as pending — journal page will pick it up and pre-fill the form
    try { sessionStorage.setItem(PENDING_KEY, JSON.stringify(entry)); } catch { /* ignore */ }
    setPopover(null);
    window.getSelection()?.removeAllRanges();
    router.push("/journal?prefill=1");
  }

  if (!popover) return null;

  return (
    <div
      style={{
        position:     "absolute",
        left:         popover.x,
        top:          popover.y,
        transform:    "translate(-50%, -100%)",
        zIndex:       1000,
        background:   "var(--color-violet-deep)",
        color:        "white",
        borderRadius: "9999px",
        padding:      "0.4rem 1rem",
        fontSize:     "0.75rem",
        fontWeight:   600,
        letterSpacing:"0.1em",
        cursor:       "pointer",
        boxShadow:    "0 4px 16px rgba(0,0,0,0.25)",
        whiteSpace:   "nowrap",
        userSelect:   "none",
      }}
      onMouseDown={e => e.preventDefault()}
      onClick={addToJournal}
    >
      📖 Add to Journal
    </div>
  );
}
