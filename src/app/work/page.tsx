import { getAllWorks } from "@/lib/work";
import { WorkList } from "./work-list";
import { WorkClosed } from "./work-closed";

// Flip to true to show the work page again; while false visitors see the "under renovation" screen.
const WORK_PAGE_OPEN = false;

export default async function WorkPage() {
  if (!WORK_PAGE_OPEN) return <WorkClosed />;

  const works = await getAllWorks();
  return <WorkList works={works} />;
}
