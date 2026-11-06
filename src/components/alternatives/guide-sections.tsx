import { Fragment, type ReactNode } from "react";
import styles from "@/app/alternatives/partnerstack-alternatives/page.module.css";

type Copy = string | { text: string; href?: string; bold?: boolean }[];

export function ArticleText({ copy }: { copy: Copy }) {
  if (typeof copy === "string") return copy;

  return copy.map(({ text, href, bold }, index) => {
    let content: ReactNode = text;
    if (bold) content = <strong>{content}</strong>;
    if (href) content = <a href={href} className="text-[var(--purple)] underline">{content}</a>;
    return <Fragment key={index}>{content}</Fragment>;
  });
}

export function SectionHeading({ number, label, title, id }: {
  number: string;
  label: string;
  title: string;
  id?: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <span className={styles.sectionNumber} aria-hidden="true">{number}</span>
      <div>
        <p>{label}</p>
        <h2 id={id}>{title}</h2>
      </div>
    </div>
  );
}

export function ComparisonTable({ table, labelledBy, overview = false }: {
  table: string[][];
  labelledBy: string;
  overview?: boolean;
}) {
  const [headers, ...rows] = table;

  return (
    <div
      className={`${styles.tableShell} ${overview ? styles.quickTable : ""}`}
      role={overview ? undefined : "region"}
      aria-labelledby={overview ? undefined : labelledBy}
      tabIndex={overview ? undefined : 0}
    >
      <table aria-labelledby={labelledBy}>
        <thead>
          <tr>{headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map(([name, ...values]) => (
            <tr key={name}>
              <td><strong>{name}</strong></td>
              {values.map((value, index) => (
                <td key={headers[index + 1]} data-label={headers[index + 1]}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DetailCard({ title, items, className, check = false, heading: Heading = "h3" }: {
  title: string;
  items: Copy[];
  className?: string;
  check?: boolean;
  heading?: "h3" | "h4";
}) {
  return (
    <div className={`${styles.detailBlock} ${className ?? ""}`}>
      <Heading>{title}</Heading>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <span aria-hidden="true" className={check ? styles.check : styles.dot}>{check ? "✓" : "•"}</span>
            <span><ArticleText copy={item} /></span>
          </li>
        ))}
      </ul>
    </div>
  );
}
