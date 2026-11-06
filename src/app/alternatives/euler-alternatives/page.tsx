import type { Metadata } from "next";
import { ArticleText, ComparisonTable, DetailCard, SectionHeading } from "@/components/alternatives/guide-sections";
import { ArticleBreadcrumb, ArticleMetadata } from "@/components/alternatives/article-editorial";
import { Footer } from "@/components/layout/footer";
import { GridBackground } from "@/components/layout/grid-background";
import { Header } from "@/components/layout/header";
import { TopBanner } from "@/components/layout/top-banner";
import {
  bookCallLabel,
  buyingCriteria,
  comparison,
  eulerGuide,
  faq,
  intro,
  metaTitle,
  products,
  productsTitle,
  takeaways,
  verdict,
} from "@/data/euler-alternatives";
import { pageSeo } from "@/lib/seo";
import styles from "../partnerstack-alternatives/page.module.css";
import { ReadingProgress } from "../partnerstack-alternatives/reading-progress";

const path = `/alternatives/${eulerGuide.slug}`;

export const metadata: Metadata = {
  ...pageSeo({
    title: metaTitle,
    description: eulerGuide.description,
    path,
    indexable: false,
  }),
  openGraph: {
    type: "article",
    title: metaTitle,
    description: eulerGuide.description,
    url: path,
  },
};

const bookingRequest = "mailto:contact@jazzhq.ai?subject=Book%20a%20Quick%20Call";

export default function EulerAlternativesPage() {
  return (
    <GridBackground>
      <a className={styles.skipLink} href="#guide-content">Skip to guide</a>
      <TopBanner />
      <Header />
      <main className={styles.page} id="guide-content">
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <ArticleBreadcrumb title={eulerGuide.title} path={path} />
            <div className={styles.eyebrow}>BUYER&apos;S GUIDE <span>2026</span></div>
            <h1>{eulerGuide.title}</h1>
            <ArticleMetadata article={eulerGuide} />
            <p>{intro[0]}</p>
            <div className={styles.heroMeta}>
              <span>{products.length} alternatives compared</span>
              <span aria-hidden="true">•</span>
              <span>Features, best fit &amp; pricing</span>
              <span aria-hidden="true">•</span>
              <span>2026 buyer guide</span>
            </div>
          </div>

          <aside className={styles.heroCard} aria-label="Why look beyond Euler?">
            <div className={styles.heroCardTop}>
              <span className={styles.heroCardKicker}>Why look beyond Euler?</span>
            </div>
            <p className="mt-4">{intro[1]}</p>
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
          <article className={styles.article} aria-label={eulerGuide.title}>
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

            <section id="picks" className={styles.section}>
              <SectionHeading number="02" label="THE SHORTLIST" title={productsTitle} />
              <div className={styles.jumpGrid}>
                {products.map((product, index) => (
                  <a href={`#${product.slug}`} key={product.slug} className={styles.jumpCard}>
                    <span className={styles.jumpNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <div className={styles.jumpCopy}>
                      <div className={styles.jumpTitle}>
                        <strong>{product.name}</strong>
                        {index === 0 && <span className={styles.cardBadge}>Our platform</span>}
                      </div>
                      <span className={styles.jumpDescription}>Best for {product.bestFor}</span>
                    </div>
                    <span className={styles.jumpArrow} aria-hidden="true">→</span>
                  </a>
                ))}
              </div>
            </section>

            {products.map((product, index) => (
              <section id={product.slug} className={styles.toolSection} key={product.slug} aria-labelledby={`${product.slug}-heading`}>
                <div className={styles.toolTopline}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className={styles.toolTitleRow}>
                  <h2 id={`${product.slug}-heading`}>{product.name}</h2>
                  {index === 0 && <span className={styles.ourPick}>OUR PLATFORM</span>}
                </div>
                <div className={styles.toolIntro}><p><ArticleText copy={product.intro} /></p></div>
                <div className={styles.toolImageWrap}>
                  {/* Use the source dimensions and native lazy loading, as in the approved guide. */}
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
                  <DetailCard title="Key features" items={product.features} check />
                  <DetailCard title="Pricing" items={product.pricing} className={styles.pricingBlock} />
                  <DetailCard title={product.prosTitle} items={product.pros} className={styles.prosBlock} check />
                  <DetailCard title={product.considerationsTitle} items={product.considerations} className={styles.consBlock} />
                </div>
                {index === 0 && (
                  <div className={styles.jazzCta}>
                    <a href={bookingRequest} className={styles.contextualLink}>{bookCallLabel} <span aria-hidden="true">↗</span></a>
                  </div>
                )}
              </section>
            ))}

            <section id="comparison" className={styles.section}>
              <SectionHeading number="03" label="SIDE BY SIDE" title={comparison.title} id="comparison-heading" />
              <ComparisonTable table={comparison.table} labelledBy="comparison-heading" />
            </section>

            <section id="how-to-choose" className={styles.section}>
              <SectionHeading number="04" label="BUYING CRITERIA" title={buyingCriteria.title} />
              {buyingCriteria.intro.map((paragraph) => <p key={paragraph} className={styles.sectionIntro}>{paragraph}</p>)}
              <div className={styles.criteriaGrid}>
                {buyingCriteria.items.map(({ title, text }, index) => (
                  <div key={title} className={styles.criteriaCard}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="verdict" className={styles.verdict}>
              <SectionHeading number="05" label="WHICH ONE FITS?" title={verdict.title} />
              <div className={styles.verdictCopy}>
                <p>{verdict.intro}</p>
                {verdict.choices.map((choice, index) => <p key={index}><ArticleText copy={choice} /></p>)}
              </div>
              <p className={styles.verdictCloser}>{verdict.conclusion}</p>
            </section>

            <section id="faq" className={styles.section}>
              <SectionHeading number="06" label="FAQS" title={faq.title} />
              <div className={styles.faqList}>
                {faq.items.map(({ question, answer }, index) => (
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
