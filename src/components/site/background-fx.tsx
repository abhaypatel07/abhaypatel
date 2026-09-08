export function BackgroundFx({ grid = true }: { grid?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      {grid ? (
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_75%)]" />
      ) : null}
      <div className="animate-float-slow absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full bg-primary/25 blur-[140px]" />
      <div className="animate-float-slower absolute -top-24 right-[-10rem] h-[32rem] w-[32rem] rounded-full bg-violet/25 blur-[150px]" />
      <div className="animate-float-slower absolute bottom-[-14rem] left-1/3 h-[30rem] w-[30rem] rounded-full bg-violet/15 blur-[160px]" />
    </div>
  );
}
