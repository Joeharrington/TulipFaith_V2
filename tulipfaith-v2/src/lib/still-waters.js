export const STILL_WATERS = [
  {
    slug:    "the-danger-of-small-things",
    title:   "The Danger of Small Things",
    excerpt: "Life does not unravel because of one terrible decision nearly as often as it frays because of a thousand unnoticed compromises.",
    date:    "2026-05-22",
    body: [
      "A man rarely wakes one morning to discover that his life has collapsed in a single night. The soul is not usually destroyed by catastrophe. It is worn down quietly, almost politely, by small permissions granted over many years. A neglected prayer here, a postponed kindness there, a truth softened for convenience, a duty avoided because one is tired. These things seem harmless precisely because they are small. Yet the danger of small things is that they seldom remain small.",
      "Life does not unravel because of one terrible decision nearly as often as it frays because of a thousand unnoticed compromises.",
      "The tragedy is that most people never recognize the process while it is happening. Human beings possess a remarkable ability to normalize slow decay. We adjust to spiritual hunger the way a man living beside a train track eventually stops hearing the trains. What once startled the conscience gradually becomes ordinary. One does not suddenly cease to pray, cease to love well, cease to pursue truth. One merely becomes distracted, then delayed, then indifferent. The soul drifts long before it rebels.",
      "This is why the smallest disciplines matter far more than modern people believe. We live in an age obsessed with dramatic transformation while neglecting the quiet habits that actually shape a human being. Most virtue is not forged in grand moments; it is built in ordinary Tuesday afternoons when nobody is watching and nothing appears to be at stake.",
      "A marriage, for example, does not usually fail because love vanished in a single season. More often, affection is starved slowly. A husband and wife stop noticing one another. Gratitude becomes assumed rather than spoken. Familiarity quietly replaces wonder. Two people who once could not wait to speak, begin sharing only logistics, until one day they look at each other with the strange grief of strangers who accidentally remained in the same house.",
      "The same is true of faith.",
      "Few people consciously decide to abandon God. Most simply become too occupied to seek Him earnestly. The world rarely asks us to renounce heaven outright. It merely asks us to postpone it. We are encouraged to tend first to our careers, our entertainments, our schedules, our ambitions, and then, if any strength remains, to offer God whatever fragments are left over. Yet the soul cannot survive indefinitely on leftovers.",
      "One of the cleverest deceptions of modern life is the belief that urgency is the same thing as importance. A ringing phone feels important. An email feels important. Endless obligations feel important. Meanwhile the truly essential things — prayer, family, truth, friendship, quiet reflection — often make no demand at all. They wait patiently while louder things consume us. Then one day we discover we have become strangers to the very people and principles that once anchored us.",
      "And still, there is mercy in this.",
      "For the conscience, though often ignored, is difficult to kill entirely. Somewhere within every person remains the faint awareness that life was meant for more than mere consumption and distraction. There remains the uneasy feeling, usually strongest in silence, that something sacred has been neglected. This discomfort is not cruelty from God. It is kindness. It is the Father refusing to allow His children complete peace while walking away from the life they were created for.",
      "The great danger, then, is not weakness. Weakness can be confessed. Failure can be repaired. The real danger is drifting so gradually that one no longer notices the distance between who they are and who they were meant to become.",
      "A wise life requires periodic stillness. One must stop long enough to ask difficult questions. Is my faith deeper this year or merely more convenient? Have I become more loving or merely more efficient? Do the people closest to me receive the best of my heart or only what remains after the world has exhausted me? Am I becoming more truthful, more humble, more courageous, more eternal in my thinking — or merely more distracted?",
      "These questions matter because eternity is not merely something awaiting us after death. Eternity is shaping us now. Every choice, however small, is forming a creature who is becoming either more aligned with truth, beauty, and goodness — or less capable of recognizing them altogether.",
      "In the end, a meaningful life is rarely the result of dramatic genius. It is usually the result of daily faithfulness in small things. A man becomes wise by choosing truth repeatedly. A marriage becomes strong by repeated acts of sacrifice. A soul becomes steady by returning again and again to what is eternal, even while the world screams for attention elsewhere.",
      "For life is built quietly long before it is tested publicly. And the person who learns to guard the small things will often discover that, when the great storms finally arrive, there remains within them something solid enough to endure.",
    ],
  },
];

export function getPost(slug) {
  return STILL_WATERS.find(p => p.slug === slug) || null;
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
