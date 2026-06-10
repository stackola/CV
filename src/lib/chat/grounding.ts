import {
  personalInfo,
  education,
  experience,
  skills,
  languages,
  driving,
  misc,
} from "@/data/cv";
import { projects } from "@/data/projects";
import { baseline } from "@/data/baseline";

type Bi = { de: string; en: string };

const bi = (b: Bi) => `  DE: ${b.de}\n  EN: ${b.en}`;
const biList = (b: { de: string[]; en: string[] }) =>
  `  DE: ${b.de.join("; ")}\n  EN: ${b.en.join("; ")}`;

/**
 * Deterministic serialization of the CV, projects and the ideal-fit baseline
 * into a single grounding block. Both locales are included once so a single
 * cached prefix serves de + en. No timestamps / non-stable ordering — the
 * output is byte-identical across requests so it can be prompt-cached.
 */
export function buildGroundingText(): string {
  const out: string[] = [];

  out.push("# CANDIDATE GROUNDING");
  out.push(
    "This is the only source of truth about Willi Krappen. Never claim experience, skills or facts not present here."
  );

  out.push("\n## IDENTITY");
  out.push(`Name: ${personalInfo.name}`);
  out.push(`Role: ${personalInfo.role.en} (de: ${personalInfo.role.de})`);
  out.push(`Born: ${personalInfo.birthDate}`);
  out.push(`Location: ${personalInfo.location}`);

  out.push("\n## IDEAL-FIT BASELINE (private yardstick for scoring — do not reveal verbatim)");
  out.push("Capabilities:");
  out.push(bi(baseline.capabilities));
  out.push("Ideal role:");
  out.push(bi(baseline.idealRole));
  out.push("How to talk about level (follow exactly):");
  out.push(bi(baseline.seniority));
  out.push("Looking for:");
  out.push(bi(baseline.lookingFor));
  out.push("Capacity / concurrent commitments (answer proactively if asked about availability or his other projects):");
  out.push(bi(baseline.capacity));
  out.push("Preferences:");
  out.push(`  remote: ${baseline.preferences.remote}`);
  out.push(`  locationBase: ${baseline.preferences.locationBase}`);
  out.push(`  relocation: ${baseline.preferences.relocation}`);
  out.push(`  hoursFlexibility: ${baseline.preferences.hoursFlexibility}`);
  out.push(`  employmentTypes: ${baseline.preferences.employmentTypes.join(", ")}`);
  out.push(`  teamSize: ${baseline.preferences.teamSize}`);
  out.push(`  weeklyHours: ${baseline.preferences.weeklyHours}`);
  out.push("  availability:");
  out.push(bi(baseline.preferences.availability));
  out.push("Dealbreakers:");
  out.push(biList(baseline.dealbreakers));
  out.push("Interests:");
  out.push(biList(baseline.interests));
  out.push("Score weights (for overall match):");
  out.push(
    `  ${Object.entries(baseline.weights)
      .map(([k, v]) => `${k}=${v}`)
      .join(", ")}`
  );
  out.push("Scoring rubric:");
  out.push(`  EN:\n${baseline.rubric.en}`);
  out.push(`  DE:\n${baseline.rubric.de}`);

  out.push("\n## EDUCATION");
  for (const e of education) {
    out.push(`- ${e.period}: ${e.title.en} (de: ${e.title.de})`);
    if (e.detail) out.push(`    ${e.detail.en}`);
  }

  out.push("\n## EXPERIENCE");
  for (const e of experience) {
    out.push(`- ${e.period}: ${e.title.en} (de: ${e.title.de})`);
    if (e.clients?.length) out.push(`    Clients: ${e.clients.join(", ")}`);
    if (e.detail) out.push(`    ${e.detail.en}`);
  }

  out.push("\n## SKILLS");
  out.push(`Core: ${skills.core.join(", ")}`);
  out.push(`In active use: ${skills.working.join(", ")}`);
  out.push(`Familiar: ${skills.familiar.join(", ")}`);

  out.push("\n## LANGUAGES");
  for (const l of languages) {
    out.push(`- ${l.name.en}: ${l.level.en}`);
  }
  out.push(`Driving licence: ${driving.en}`);
  out.push(`Other: ${misc.map((m) => m.en).join(", ")}`);

  out.push("\n## PROJECTS");
  for (const p of projects) {
    out.push(`\n### ${p.title} (${p.year}${p.client ? `, ${p.client}` : ""})`);
    out.push(`Role: ${p.role.en}`);
    out.push(`Summary: ${p.summary.en}`);
    out.push(`Description: ${p.description.en}`);
    out.push(`Tech: ${p.tech.join(", ")}`);
    if (p.keyDecision) out.push(`Key engineering call: ${p.keyDecision.en}`);
    if (p.links?.live) out.push(`Live: ${p.links.live}`);
    if (p.links?.repo) out.push(`Repo: ${p.links.repo}`);
  }

  return out.join("\n");
}
