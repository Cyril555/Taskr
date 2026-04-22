import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  LayoutGrid,
  Layers,
  Search,
  BarChart3,
  FileStack,
  FileDown,
} from "lucide-react";
import taskrLogo from "@/assets/taskr-logo.png";

const features = [
  {
    icon: LayoutGrid,
    title: "Patient-first board",
    description:
      "See every open job grouped by patient and bed so ward work stays tied to the right person.",
  },
  {
    icon: Layers,
    title: "Jobs by type",
    description:
      "Switch between practical tasks, prescribing, referrals, and discharge work without losing context.",
  },
  {
    icon: Search,
    title: "Fast lookup",
    description:
      "Search across patients, beds, tags, and notes to find what you need during a busy round.",
  },
  {
    icon: BarChart3,
    title: "At-a-glance stats",
    description:
      "Track status, priority, and workload mix so the team shares the same picture of the ward.",
  },
  {
    icon: FileStack,
    title: "Templates",
    description:
      "Start common jobs from reusable templates to reduce repetition and missed steps.",
  },
  {
    icon: FileDown,
    title: "Export",
    description:
      "Generate PDFs from the board when you need a printable handoff or archive snapshot.",
  },
];

const Landing = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground antialiased selection:bg-medical-blue/20">
      {/* ambient */}
      <div
        className="pointer-events-none fixed inset-0"
        aria-hidden
      >
        <div className="absolute -top-48 left-1/2 h-[min(560px,80vw)] w-[min(900px,120vw)] -translate-x-1/2 rounded-full bg-medical-blue/[0.10] blur-[100px]" />
        <div className="absolute bottom-0 right-[-10%] h-72 w-72 rounded-full bg-medical-light-blue/[0.18] blur-[90px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,hsl(var(--background))_85%)]" />
      </div>

      <div className="relative z-10">
        <header className="sticky top-0 z-20 border-b border-border bg-white/95 backdrop-blur-xl">
          <div className="container flex items-center justify-between py-4 px-4 md:px-6 max-w-6xl">
            <Link to="/" className="transition-opacity hover:opacity-90">
              <img src={taskrLogo} alt="TASKR" className="h-9 md:h-11 w-auto" />
            </Link>
            <Button
              asChild
              className="rounded-full bg-medical-blue px-5 font-medium text-white shadow-lg shadow-medical-blue/25 transition hover:bg-medical-light-blue hover:text-medical-dark-blue"
            >
              <Link to="/dashboard">Try demo</Link>
            </Button>
          </div>
        </header>

        <main>
          <section className="container px-4 md:px-6 pt-20 pb-16 md:pt-28 md:pb-24 max-w-4xl mx-auto text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-medical-blue mb-6">
              Ward task coordination
            </p>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground mb-6 text-balance leading-[1.1]">
              Keep ward rounds visible,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-blue to-medical-dark-blue">
                patient by patient
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground/90 max-w-2xl mx-auto mb-12 leading-relaxed text-pretty font-light">
              TASKR is a lightweight board for inpatient teams: one place to capture practical jobs,
              prescribing follow-ups, referrals, and discharge work—without losing who it belongs to.
            </p>
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-medical-blue px-8 text-base font-medium text-white shadow-lg shadow-medical-blue/30 transition hover:bg-medical-light-blue hover:text-medical-dark-blue"
            >
              <Link to="/dashboard">Try demo</Link>
            </Button>
          </section>

          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <Separator className="bg-border" />
          </div>

          <section className="container px-4 md:px-6 py-20 md:py-28 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-start">
              <div className="space-y-4">
                <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                  The problem
                </h2>
                <p className="text-lg text-foreground/90 leading-relaxed font-light">
                  Ward rounds generate a mix of jobs that cut across disciplines—bloods, scripts,
                  specialty referrals, discharge paperwork. When those live on scraps of paper,
                  scattered chats, or mental checklists, it is easy for work to slip between handoffs
                  or get duplicated.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Teams need a shared view that stays organized by{" "}
                  <span className="text-foreground font-normal">patient</span> and by{" "}
                  <span className="text-foreground font-normal">type of work</span>, so nothing
                  important gets lost in the noise.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                  How TASKR helps
                </h2>
                <p className="text-lg text-foreground/90 leading-relaxed font-light">
                  TASKR gives you a single ward-oriented surface: add and track tasks with priorities
                  and due dates, filter by category, and see progress at a glance—built for the rhythm
                  of ward work, not generic project management.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This deployment ships with{" "}
                  <span className="text-foreground font-normal">demo</span> sample patients and tasks
                  so you can explore the flow without connecting to a live system.
                </p>
              </div>
            </div>
          </section>

          <section className="border-y border-border bg-slate-50/70 py-20 md:py-24">
            <div className="container px-4 md:px-6 max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
                What you can try
              </h2>
              <p className="text-center text-muted-foreground text-sm md:text-base max-w-xl mx-auto mb-14 font-light">
                Everything below is available in the interactive demo.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {features.map(({ icon: Icon, title, description }) => (
                  <Card
                    key={title}
                    className="group rounded-2xl border border-border bg-card shadow-sm transition-colors hover:border-medical-light-blue/50 hover:shadow-md"
                  >
                    <CardHeader className="pb-2 pt-6 px-6">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-medical-blue/10 text-medical-blue ring-1 ring-border transition group-hover:bg-medical-blue/20">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <CardTitle className="text-base font-medium tracking-tight">{title}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <CardDescription className="text-muted-foreground/90 text-sm leading-relaxed font-light">
                        {description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-center mt-14">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-medical-blue px-8 text-base font-medium text-white shadow-lg shadow-medical-blue/25 transition hover:bg-medical-light-blue hover:text-medical-dark-blue"
                >
                  <Link to="/dashboard">Try demo</Link>
                </Button>
              </div>
            </div>
          </section>

          <footer className="container px-4 md:px-6 py-14 max-w-2xl mx-auto">
            <p className="text-center text-xs md:text-sm text-muted-foreground/80 leading-relaxed font-light">
              TASKR is a demonstration prototype with synthetic data. It is not intended for clinical
              decision-making, diagnosis, or treatment, and is not a medical device.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Landing;
