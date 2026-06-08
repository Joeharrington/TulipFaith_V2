"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

const NAV_LINKS = [
  { href: "/our-story",          label: "Our Story"        },
  { href: "/stories/adult",      label: "Adult Stories"    },
  { href: "/stories/teen",       label: "Teen Stories"     },
  { href: "/stories/children",   label: "Children"         },
  { href: "/still-waters",       label: "Still Waters"     },
  { href: "/journal",            label: "Journal"          },
  { href: "/prayer-wall",        label: "Prayer Wall"      },
  { href: "/about",              label: "About"            },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{
        background:     'rgba(250,248,245,0.92)',
        backdropFilter: 'blur(10px)',
        borderBottom:   '1px solid var(--color-lavender-pale)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center shrink-0 overflow-hidden"
          style={{ height: '85px' }}
        >
          <img
            src="/images/Tulip_Faith_Logo.png"
            alt="Tulip Faith"
            style={{
              height:       '140px',
              width:        'auto',
              mixBlendMode: 'darken',
              objectFit:    'contain',
            }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm transition-colors duration-150"
              style={{ color: 'var(--color-warm-gray)', fontFamily: 'var(--font-body)' }}
              onMouseEnter={e => e.target.style.color = 'var(--color-violet-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--color-warm-gray)'}
            >
              {label}
            </Link>
          ))}

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-3 ml-2">
              <span className="text-xs" style={{ color: 'var(--color-warm-gray)' }}>
                {user.display_name || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                style={{
                  background:  'var(--color-lavender-pale)',
                  color:       'var(--color-violet-deep)',
                  fontFamily:  'var(--font-body)',
                  border:      'none',
                  cursor:      'pointer',
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-xs px-4 py-2 rounded-lg ml-2 transition-colors"
              style={{
                background: 'var(--color-violet-primary)',
                color:      'white',
                fontFamily: 'var(--font-body)',
              }}
            >
              Sign In
            </Link>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
          style={{ color: 'var(--color-violet-deep)' }}
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            {open
              ? <><line x1="4" y1="4" x2="20" y2="20"/><line x1="20" y1="4" x2="4" y2="20"/></>
              : <><line x1="3" y1="7"  x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          className="md:hidden px-6 pb-4 flex flex-col gap-4"
          style={{ borderTop: '1px solid var(--color-lavender-pale)' }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-sm py-1"
              style={{ color: 'var(--color-warm-gray)', fontFamily: 'var(--font-body)' }}
            >
              {label}
            </Link>
          ))}

          {user ? (
            <>
              <span className="text-xs pt-1" style={{ color: 'var(--color-warm-gray)' }}>
                Signed in as {user.display_name || user.email}
              </span>
              <button
                onClick={() => { setOpen(false); handleLogout(); }}
                className="text-sm py-1 text-left"
                style={{ color: 'var(--color-violet-primary)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="text-sm py-1"
              style={{ color: 'var(--color-violet-primary)', fontFamily: 'var(--font-body)' }}
            >
              Sign In
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
