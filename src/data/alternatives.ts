import { eulerGuide } from "@/data/euler-alternatives";
import { kifloGuide } from "@/data/kiflo-alternatives";
import { kifloPublication } from "@/data/navigation";

export type AlternativeArticle = {
  slug: string; title: string; description: string; image: string;
  wordCount: number; author?: {name: string; role?: string; photo?: string};
  publishedAt?: string; updatedAt?: string;
};
export const readingMinutes = (wordCount: number) => Math.max(1, Math.ceil(wordCount / 225));
export const partnerstackGuide: AlternativeArticle = {
  slug: "partnerstack-alternatives",
  title: "Best PartnerStack Alternatives in 2026",
  description: "Here is a list of the top PartnerStack alternatives worth considering, compared by their top features, who they’re best suited for, and what you can expect to pay.",
  image: "/buyers-guide/partnerstack/jazzhq.png",
  // Actual rendered article text, including headings, lists, tables and FAQs.
  // Recount when editorial copy changes; no author or publication history supplied.
  wordCount: 3409,
};
export const alternativeArticles = [
  partnerstackGuide,
  eulerGuide,
  ...(kifloPublication.listed ? [kifloGuide] : []),
];
