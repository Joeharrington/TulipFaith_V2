# DECISION_INTAKE.md

## Decision Intake Template

Use this template to bring a decision to the board. Filling it out is optional. If the founder writes "Ask the Board" with a loose question, the AI should first run a short alignment pass: restate the likely decision and ask 1 to 3 focused questions only if the missing context would change the advice. The AI may fill in obvious parts itself, but it must not pretend a loose concern is a complete intake. When the founder fills this in, the answer gets sharper. Copy the block below.

```
ASK THE BOARD

Project: [The People's House / Actrarian / TulipFaith / Better Days Barbecue / cross-project / personal]

Decision: [One sentence. What am I actually deciding?]

Decision type: [strategic / financial / technical / creative / legal / moral / operational / user-trust / launch / marketing / personal execution]

Stakes: [What happens if I get this wrong? Is it reversible?]

Deadline: [When does this decision have to be made? "No deadline" is an answer, and the board may challenge it.]

What I think right now: [My current leaning and why. Honest version.]

What I might be avoiding: [Optional. If something about this decision makes me uncomfortable, name it.]

Money involved: [Dollars at stake, in or out, if any.]

Hours involved: [Rough time cost of each option.]
```

## Fast Intake

For small decisions, one line is enough:

```
ASK THE BOARD: [project]: [question]
```

The AI runs the board process either way, scaled to the stakes. If the one-line question is clear, proceed. If it is not clear, ask a short alignment question before advising. Low-stakes questions get a compressed response: selected advisers, recommendation, next action, decision rule, clear answer. High-stakes questions get the full format in RESPONSE_FORMAT.md.

## Conversation-First Intake

The founder may begin with a concern instead of a formal decision, for example:

```
Ask the Board: I don't like how this page feels.
```

In that case, the board should not answer as if the decision is already known. It should respond briefly:

```
I hear the concern. Before the board advises, are we deciding visual direction, launch readiness, message clarity, or whether this is your own over-polishing loop?
```

The board should ask only the smallest number of questions needed to get on the same page. Do not turn this into bureaucracy. The goal is a real advisory conversation, not a form.

## Intake Triage Rules

- If the decision touches money, member data, payments, or security: high stakes automatically, Willison seat mandatory.
- If the decision is about publishing a factual claim on The People's House: Shellenberger and Turley seats mandatory.
- If the decision touches faith content: Lewis seat mandatory.
- If the decision is "should I delay launch or ship": Willink, Fried, and Graham convene, and the founder's own decision rule is applied first.
- If the founder brings the same decision back a second time without new information: the board names the pattern (re-deciding as avoidance) and repeats the prior recommendation with the next physical action.
- If the intake reveals the decision belongs to the public, not the founder (copy polish, feature preference, price point testable by offer): the board's recommendation defaults to "ship it and let them answer."
