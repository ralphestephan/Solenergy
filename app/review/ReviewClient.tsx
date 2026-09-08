"use client";

import { useEffect, useState } from "react";

// The /review page — opened from a printed QR code, so it is one screen and one
// decision with no navigation to get lost in.
//
// It exists because the BDI dashboard builds this URL for every org with a
// domain and prints it beside a QR the owner is told to display. Nothing ever
// created the page, so the code led to a 404.
//
// Styling is inline variables plus one <style> tag: this page is dropped into
// several codebases with different Tailwind/styled-jsx setups and must not
// depend on any of them.

const ORG = "3041e8aa-1139-42c9-ba3c-ebf9f2d98b5d";
const FN = "https://uwhamhqmwduyzbyqkjod.supabase.co/functions/v1";

const C = {
  ink: "#0B1F2A",
  muted: "#5B7183",
  paper: "#F4F7F9",
  line: "#DCE5EB",
  action: "#0E7C86",
  actionInk: "#ffffff",
};

export default function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [contact, setContact] = useState("");
  const [hp, setHp] = useState("");                 // honeypot
  const [google, setGoogle] = useState("");
  const [note, setNote] = useState("");
  const [err, setErr] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  // A 5-star reviewer is worth more on Google than in our own table, so offer
  // that route when the org has a write-a-review link configured.
  useEffect(() => {
    let alive = true;
    fetch(FN + "/google-reviews?organization_id=" + encodeURIComponent(ORG))
      .then((r) => r.json())
      .then((d) => {
        if (alive && d && d.writereview_url) setGoogle(String(d.writereview_url));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (hp) return;                                  // trap filled: discard silently
    if (!rating) {
      setErr(true);
      setNote("Please tap a star rating.");
      return;
    }
    if (!name.trim()) {
      setErr(true);
      setNote("Please add your name.");
      return;
    }
    setErr(false);
    setNote("Sending\u2026");
    setSending(true);
    const c = contact.trim();
    try {
      const res = await fetch(FN + "/reviews-public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organization_id: ORG,
          rating,
          name: name.trim(),
          comment: comment.trim(),
          email: c.includes("@") ? c : "",
          phone: c && !c.includes("@") ? c : "",
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (body && body.success) {
        setDone(true);
        // Never "published" — it is queued for the owner to approve.
        setNote(
          rating >= 4 && google
            ? "Thank you. Would you post it on Google too?"
            : "Thank you \u2014 your feedback has reached us.",
        );
      } else {
        setSending(false);
        setErr(true);
        setNote(body && body.error ? String(body.error) : "Could not send that. Please try again.");
      }
    } catch {
      setSending(false);
      setErr(true);
      setNote("Could not send that. Please check your connection and try again.");
    }
  }

  const showGoogle = !!google && (!done || rating >= 4);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: C.paper,
        color: C.ink,
        fontFamily: "system-ui,-apple-system,'Segoe UI',Roboto,sans-serif",
        lineHeight: 1.55,
      }}
    >
      <style>{`
        .rv-card{width:min(460px,100%);background:#fff;border:1px solid ${C.line};border-radius:18px;
          padding:32px 26px;box-shadow:0 1px 2px rgba(0,0,0,.04),0 18px 40px rgba(0,0,0,.07);text-align:center}
        .rv-star{font-size:2.1rem;line-height:1;cursor:pointer;color:${C.line};background:none;border:0;padding:0 .15rem;
          transition:transform .12s ease,color .12s ease;-webkit-tap-highlight-color:transparent}
        .rv-star:hover{transform:scale(1.12)}
        .rv-star.on{color:#f4b400}
        .rv-star:focus-visible{outline:2px solid ${C.action};outline-offset:3px;border-radius:4px}
        .rv-label{display:block;text-align:left;font-size:.8rem;font-weight:600;margin:0 0 .35rem;color:${C.muted}}
        .rv-in{width:100%;padding:.7rem .8rem;border:1px solid ${C.line};border-radius:10px;font:inherit;
          color:inherit;background:#fff;margin-bottom:14px;resize:vertical}
        .rv-in:focus{outline:2px solid ${C.action};outline-offset:1px;border-color:transparent}
        .rv-btn{width:100%;padding:.85rem 1rem;border:0;border-radius:999px;background:${C.action};
          color:${C.actionInk};font:inherit;font-weight:700;cursor:pointer}
        .rv-btn:disabled{opacity:.6;cursor:default}
        .rv-g{display:flex;align-items:center;justify-content:center;gap:.5rem;width:100%;padding:.85rem 1rem;
          border-radius:999px;border:1px solid ${C.line};margin-bottom:14px;font-weight:600;
          text-decoration:none;color:${C.ink};background:#fff}
        .rv-hp{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}
        @media (prefers-reduced-motion:reduce){.rv-star{transition:none}}
      `}</style>

      <div className="rv-card">
        <h1 style={{ fontSize: "1.5rem", lineHeight: 1.25, marginBottom: 8, fontWeight: 700 }}>
          How did we do?
        </h1>
        <p style={{ color: C.muted, fontSize: ".95rem", marginBottom: 22 }}>
          Your review helps Solenergy &mdash; and anyone deciding whether to get in touch.
        </p>

        {showGoogle && (
          <a className="rv-g" href={google} target="_blank" rel="noopener noreferrer">
            <span style={{ color: "#f4b400", letterSpacing: 1 }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            Review us on Google
          </a>
        )}

        {!done && (
          <form onSubmit={submit} autoComplete="off" noValidate>
            <input
              className="rv-hp"
              name="hp"
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
            />
            <div
              role="radiogroup"
              aria-label="Rating out of five"
              style={{ display: "flex", justifyContent: "center", margin: "6px 0 18px" }}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={rating === n}
                  aria-label={n === 1 ? "1 star" : n + " stars"}
                  className={"rv-star" + (n <= rating ? " on" : "")}
                  onClick={() => setRating(n)}
                >
                  &#9733;
                </button>
              ))}
            </div>

            <label className="rv-label" htmlFor="rv-name">Your name</label>
            <input id="rv-name" className="rv-in" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />

            <label className="rv-label" htmlFor="rv-comment">A few words (optional)</label>
            <textarea id="rv-comment" className="rv-in" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="What stood out?" />

            <label className="rv-label" htmlFor="rv-contact">Email or phone (optional)</label>
            <input id="rv-contact" className="rv-in" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Only so we can thank you" />

            <button type="submit" className="rv-btn" disabled={sending}>
              {sending ? "Sending\u2026" : "Submit review"}
            </button>
          </form>
        )}

        <p
          role="status"
          aria-live="polite"
          style={{ marginTop: 12, fontSize: ".88rem", minHeight: "1.2em", color: err ? "#c0392b" : undefined }}
        >
          {note}
        </p>
      </div>
    </main>
  );
}
