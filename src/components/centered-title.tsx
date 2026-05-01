import styles from "./centered-title.module.css";

interface CenteredTitleProps {
  title: string;
}

export function CenteredTitle({ title }: CenteredTitleProps) {
  return (
    <main className={styles.main}>
      <h1 className="typo-1 font-700 text-gray-900">
        {title}
      </h1>
    </main>
  );
}
