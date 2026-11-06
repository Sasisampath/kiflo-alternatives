import type { Metadata } from "next";
import { Fragment } from "react";
import { ArticleBreadcrumb, ArticleMetadata } from "@/components/alternatives/article-editorial";
import { ArticleText, ComparisonTable, DetailCard, SectionHeading } from "@/components/alternatives/guide-sections";
import { Footer } from "@/components/layout/footer";
import { GridBackground } from "@/components/layout/grid-background";
import { Header } from "@/components/layout/header";
import { TopBanner } from "@/components/layout/top-banner";
import { kifloPublication } from "@/data/navigation";
import {
  bookCallLabel,
  buyingCriteria,
  categories,
  comparison,
  faq,
  intro,
  kifloGuide,
  metaTitle,
  takeaways,
  verdict,
} from "@/data/kiflo-alternatives";
import { pageSeo } from "@/lib/seo";
import styles from "../partnerstack-alternatives/page.module.css";
import { ReadingProgress } from "../partnerstack-alternatives/reading-progress";

const path = `/alternatives/${kifloGuide.slug}`;
const productCount = categories.reduce((count, category) => count + category.products.length, 0);
const bookingRequest = "mailto:contact@jazzhq.ai?subject=Book%20a%20Quick%20Call";

export const metadata: Metadata = {
  ...pageSeo({
    title: metaTitle,
    description: kifloGuide.description,
    path,
    indexable: kifloPublication.listed,
  }),
  openGraph: {
    type: "article",
    title: metaTitle,
    description: kifloGuide.description,
    url: path,
  },
};

export default function KifloAlternativesPage() {
  return (
    <GridBackground>
      <a className={styles.skipLink} href="#guide-content">Skip to guide</a>
      <TopBanner />
      <Header />
      <main className={styles.page} id="guide-content">
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <ArticleBreadcrumb title={kifloGuide.title} path={path} />
            <div className={styles.eyebrow}>BUYER&apos;S GUIDE <span>2026</span></div>
            <h1>{kifloGuide.title}</h1>
            <ArticleMetadata article={kifloGuide} />
            <p>{intro.paragraphs[0]}</p>
            <div className={styles.heroMeta}>
              <span>{productCount} alternatives compared</span>
              <span aria-hidden="true">•</span>
              <span>Features, best fit &amp; pricing</span>
              <span aria-hidden="true">•</span>
              <span>2026 buyer guide</span>
            </div>
          </div>

          <aside className={styles.heroCard} aria-label="Why look beyond Kiflo?">
            <div className={styles.heroCardTop}>
              <span className={styles.heroCardKicker}>Why look beyond Kiflo?</span>
            </div>
            <p className="mt-4">{intro.paragraphs[1]}</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
              {intro.categories.map((category) => <li key={category}>{category}</li>)}
            </ul>
            <a href="#key-takeaways" className={styles.inlineArrow}>See the alternatives <span aria-hidden="true">↓</span></a>
          </aside>
        </section>

        <section className={styles.quickBand}>
          <div>
            <strong>What this guide covers</strong>
            <span>Top features · who each tool is best suited for · what you can expect to pay</span>
          </div>
        </section>

        <div className={styles.layout}>
          <ReadingProgress />
          <article className={styles.article} aria-label={kifloGuide.title}>
            <section id="key-takeaways" className={styles.section}>
              <SectionHeading number="01" label="KEY TAKEAWAYS" title={takeaways.title} id="takeaways-heading" />
              <div className={styles.noteCard}>
                <strong>{takeaways.note}</strong>
                <p>{takeaways.copy}</p>
              </div>
              <p className={styles.listIntro}>{takeaways.listIntro}</p>
              <div className={styles.criteriaMiniGrid} role="list">
                {takeaways.criteria.map((item) => (
                  <div key={item} role="listitem"><span aria-hidden="true" className={styles.check}>✓</span> {item}</div>
                ))}
              </div>
              <ComparisonTable table={takeaways.table} labelledBy="takeaways-heading" overview />
            </section>

            {categories.map((category, categoryIndex) => {
              const precedingProducts = categories.slice(0, categoryIndex)
                .reduce((count, group) => count + group.products.length, 0);
              return (
                <Fragment key={category.number}>
                  <section id={`category-${category.number.toLowerCase()}`} className={styles.section}>
                    <SectionHeading number={category.number} label={`CATEGORY ${category.number}`} title={category.title} />
                    <p className={styles.sectionIntro}>{category.intro}</p>
                  </section>

                  {category.products.map((product, index) => (
                    <section id={product.slug} className={styles.toolSection} key={product.slug} aria-labelledby={`${product.slug}-heading`}>
                      <div className={styles.toolTopline}>
                        <span aria-hidden="true">{String(precedingProducts + index + 1).padStart(2, "0")}</span>
                      </div>
                      <div className={styles.toolTitleRow}>
                        <h3 id={`${product.slug}-heading`}>{product.heading}</h3>
                        {product.slug === "jazzhq" && <span className={styles.ourPick}>OUR PLATFORM</span>}
                      </div>
                      <div className={styles.toolIntro}><p><ArticleText copy={product.intro} /></p></div>
                      <div className={styles.toolImageWrap}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.image.src}
                          alt={product.image.alt}
                          width={product.image.width}
                          height={product.image.height}
                          className={styles.toolImage}
                          loading="lazy"
                        />
                      </div>
                      <div className={styles.bestForLong}>
                        <span>BEST FOR</span>
                        <p>{product.bestFor}</p>
                      </div>
                      <div className={styles.detailGrid}>
                        <DetailCard heading="h4" title="Key features" items={product.features} check />
                        <DetailCard heading="h4" title="Pricing" items={product.pricing} className={styles.pricingBlock} />
                        <DetailCard heading="h4" title={product.prosTitle} items={product.pros} className={styles.prosBlock} check />
                        <DetailCard heading="h4" title="Things to Consider" items={product.considerations} className={styles.consBlock} />
                      </div>
                      {product.slug === "jazzhq" && (
                        <div className={styles.jazzCta}>
                          <a href={bookingRequest} className={styles.contextualLink}>{bookCallLabel} <span aria-hidden="true">↗</span></a>
                        </div>
                      )}
                    </section>
                  ))}
                </Fragment>
              );
            })}

            <section id="comparison" className={styles.section}>
              <SectionHeading number="03" label="SIDE BY SIDE" title={comparison.title} id="comparison-heading" />
              <ComparisonTable table={comparison.table} labelledBy="comparison-heading" />
            </section>

            <section id="how-to-choose" className={styles.section}>
              <SectionHeading number="04" label="BUYING CRITERIA" title={buyingCriteria.title} />
              <p className={styles.sectionIntro}>{buyingCriteria.intro}</p>
              <div className={styles.criteriaGrid}>
                {buyingCriteria.items.map(({ title, text }, index) => (
                  <div key={title} className={styles.criteriaCard}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{title}</h3>
                    <div className="space-y-4">
                      {text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="verdict" className={styles.verdict}>
              <SectionHeading number="05" label="WHICH ONE FITS?" title={verdict.title} />
              <h3 className="mb-3 text-xl font-semibold">{verdict.subhead}</h3>
              <div className={styles.verdictCopy}>
                <p>{verdict.intro}</p>
                {verdict.choices.map((choice) => <p key={choice}>{choice}</p>)}
              </div>
              <p className={styles.verdictCloser}>{verdict.conclusion}</p>
            </section>

            <section id="faq" className={styles.section}>
              <SectionHeading number="06" label="FAQS" title="FAQs" />
              <div className={styles.faqList}>
                {faq.map(({ question, answer }, index) => (
                  <details key={question} className={styles.faqItem} open={index === 0}>
                    <summary><span>{question}</span><b aria-hidden="true">+</b></summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section id="guide-cta" className={styles.endCta} aria-labelledby="guide-cta-title">
              <div>
                <p className={styles.ctaEyebrow}>BUILD YOUR PARTNER PROGRAM</p>
                <h2 id="guide-cta-title">Find partners, design the program, and run it in one place.</h2>
              </div>
              <a href="https://www.jazzhq.ai/" className={styles.primaryButton}>Explore JazzHQ <span aria-hidden="true">→</span></a>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </GridBackground>
  );
}
