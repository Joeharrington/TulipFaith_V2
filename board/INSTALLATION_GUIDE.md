# INSTALLATION_GUIDE.md

## Installing the Board Across AI Platforms

The system is the board folder. The board works on any AI that can read these files. The core files, in load order:

1. FOUNDER_CONTEXT.md (ground truth about the founder)
2. MASTER_BOARD.md (the fourteen seats and writing lenses)
3. PROJECT_BENCHES.md (project specialists)
4. ANSWER_ENGINE.md (answer-quality and evidence rules)
5. ASK_THE_BOARD.md (the sixteen-step process)
6. DECISION_INTAKE.md (how to bring a decision)
7. RESPONSE_FORMAT.md (how answers are structured)
8. INSTALLATION_GUIDE.md (this file)

Keep the master copies in one folder, in one place you control (a GitHub repo is ideal: versioned, portable, and every platform below can read from it). When you update a file, update it there, then re-sync platforms. Never let platform copies drift from the master.

After changing any board process file, sync the updated master board folder into each active repo's board folder before trusting project-local adapters.

**Why this works without uploading books:** modern AI models have already been trained on the public work of every adviser on the board. The files do not need to contain Hormozi's books or Lewis's essays. They need to do exactly what they do: name the adviser, name the source material, and instruct the AI to ground every piece of advice in that documented work, name the framework being applied, and admit when the corpus is silent. That instruction set is what makes the thinking accurate and keeps it from drifting into impersonation.

---

## 1. Claude Code

Best installation of the five, because Claude Code reads project files natively.

1. Create a folder, for example `~/board/`, and put all seven files in it. If your projects live in a repo, put the folder at the repo root as `board/`.
2. Create or edit `CLAUDE.md` at the root of any project where you want the board available. Add:

```
# Advisory Board
When I write "Ask the Board", load and follow these files in order:
- board/FOUNDER_CONTEXT.md
- board/MASTER_BOARD.md
- board/PROJECT_BENCHES.md
- board/ANSWER_ENGINE.md
- board/ASK_THE_BOARD.md
- board/RESPONSE_FORMAT.md
Run the conversational Ask the Board process in ASK_THE_BOARD.md. If the
decision is not clear, use the alignment format before advising. Once aligned,
answer in the format defined in RESPONSE_FORMAT.md. FOUNDER_CONTEXT.md is
ground truth.
```

3. Optional but better: create a slash command. Make the file `.claude/commands/board.md` containing:

```
Load board/FOUNDER_CONTEXT.md, board/MASTER_BOARD.md, board/PROJECT_BENCHES.md,
board/ANSWER_ENGINE.md, board/ASK_THE_BOARD.md, board/DECISION_INTAKE.md, and
board/RESPONSE_FORMAT.md. Then run the conversational Ask the Board process on
the following decision. If the decision is not clear, ask a short alignment
question before advising: $ARGUMENTS
```

Then `/board should I launch Friday or wait for the payment slice` convenes the board in one command.

4. Because your projects (Next.js, Django) live in repos, put the `board/` folder in each repo or in a shared parent folder both can reference.

## 2. Codex (OpenAI)

1. Codex reads an `AGENTS.md` file at the repo root the way Claude Code reads `CLAUDE.md`. Put the `board/` folder in the repo, then add to `AGENTS.md`:

```
# Advisory Board
When the user writes "Ask the Board", read board/FOUNDER_CONTEXT.md,
board/MASTER_BOARD.md, board/PROJECT_BENCHES.md, board/ANSWER_ENGINE.md,
board/ASK_THE_BOARD.md, board/DECISION_INTAKE.md, and board/RESPONSE_FORMAT.md,
then follow the conversational board process exactly. Clarify before advising
when the decision is not clear.
```

2. In Codex chat or CLI sessions without repo context, paste FOUNDER_CONTEXT.md, MASTER_BOARD.md, and ASK_THE_BOARD.md at the start of the session, then ask.

## 3. ChatGPT

Two options, use both.

**Option A, Custom GPT (best):**
1. Create a Custom GPT (Explore GPTs, then Create).
2. Upload all seven files to its Knowledge section.
3. In Instructions, paste:

```
You run the user's advisory board. FOUNDER_CONTEXT.md in your knowledge files
is ground truth about the user. When the user writes "Ask the Board", follow
the conversational process in ASK_THE_BOARD.md. If the decision is unclear,
first restate the likely decision and ask 1 to 3 focused alignment questions.
Once aligned, convene 3 to 5 advisers from MASTER_BOARD.md, activate benches
from PROJECT_BENCHES.md when the decision is project-specific, and answer in
the RESPONSE_FORMAT.md structure. Advisers are thinking lenses on documented
public work, never impersonations. Ground every piece of advice in the named
source material, name frameworks, and say when a corpus is silent. No em dashes
anywhere. No flattery, no filler. End final board answers with a direct answer.
```

4. Name it, keep it private, use it for every board session.

**Option B, Projects:** Create a ChatGPT Project, add the seven files as project files, and put the same instruction block in the project's custom instructions. Conversations inside the project inherit the board.

## 4. Gemini

1. Create a **Gem** (Gemini's custom assistant feature). Paste the instruction block from the ChatGPT section into the Gem's instructions and attach the seven files as knowledge.
2. Alternative for long working sessions: Gemini's large context window lets you paste all seven files directly at the start of a chat. Paste, then write "Confirm the board is loaded, list the fourteen seats," and verify before asking anything.
3. In Google AI Studio, save the combined files plus the instruction block as a system instruction for a reusable setup.

## 5. Grok / SuperGrok

1. Grok supports file attachments and custom instructions in its workspace settings. Attach the seven files, or paste the three core files (FOUNDER_CONTEXT, MASTER_BOARD, ASK_THE_BOARD) at session start.
2. Put the short instruction block in Grok's custom instructions field so "Ask the Board" triggers the process.
3. Grok's context handling is the least predictable of the five for long documents. Verify with the same check: "List the fourteen seats and my two financial targets." If it cannot, re-paste the files.

---

## Verification Check (run on every platform after install)

Ask: **"Ask the Board: quick check. List the fourteen seats, my two subscriber targets, and my standing decision rule."**

Correct answers: the fourteen names in MASTER_BOARD.md; roughly 110 and 190 subscribers (the $2,000 and $3,500 targets); and "if the public can answer this question faster than my analysis can, ship it and let them answer." If any platform fails, the files did not load. Fix that before trusting its advice.

## Maintenance Rules

- FOUNDER_CONTEXT.md is a living document. Update it when the facts change: first revenue, subscriber counts, capacity changes, a project activating or parking. Stale context produces confident wrong advice.
- Review the board quarterly. A seat that has stayed silent for three months is a candidate for removal. A recurring decision type with no owning seat is a candidate for addition.
- When a parked project activates, build its bench in PROJECT_BENCHES.md before asking the board about it.
- One master copy. Platforms sync from it. Never edit a platform copy directly.

## Board files

* FOUNDER_CONTEXT.md
* MASTER_BOARD.md
* PROJECT_BENCHES.md
* ANSWER_ENGINE.md
* ASK_THE_BOARD.md
* DECISION_INTAKE.md
* RESPONSE_FORMAT.md
* BOARD_LEARNING_LOG.md
* INSTALLATION_GUIDE.md
