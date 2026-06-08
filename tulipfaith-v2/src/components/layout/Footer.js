import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="w-full mt-auto py-12 px-6"
      style={{
        background:   'var(--color-violet-deep)',
        borderTop:    '1px solid rgba(201,168,212,0.2)',
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 text-center">

        {/* Memorial line */}
        <p
          className="text-sm italic"
          style={{ color: 'var(--color-lavender)', fontFamily: 'var(--font-display)' }}
        >
          In loving memory of Susan Harrington — who lives in Christ.
        </p>

        {/* Scripture */}
        <p
          className="text-xs"
          style={{ color: 'rgba(201,168,212,0.6)', letterSpacing: '0.1em' }}
        >
          "I am the resurrection and the life." — John 11:25
        </p>

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {[
            { href: "/our-story",        label: "Our Story"      },
            { href: "/stories/adult",    label: "Adult Stories"  },
            { href: "/stories/teen",     label: "Teen Stories"   },
            { href: "/stories/children", label: "Children"       },
            { href: "/still-waters",     label: "Still Waters"   },
            { href: "/about",            label: "About"          },
            { href: "/prayer-wall",      label: "Prayer Wall"    },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xs transition-colors duration-150"
              style={{ color: 'rgba(201,168,212,0.7)' }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <p
          className="text-xs"
          style={{ color: 'rgba(201,168,212,0.4)' }}
        >
          © {new Date().getFullYear()} Tulip Faith. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
