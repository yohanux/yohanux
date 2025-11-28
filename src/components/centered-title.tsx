interface CenteredTitleProps {
  title: string;
}

export function CenteredTitle({ title }: CenteredTitleProps) {
  return (
    <main className="flex min-h-[calc(100vh-68px)] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-[var(--font-weight-700)] text-[var(--color-gray-900)]">
        {title}
      </h1>
    </main>
  );
}



