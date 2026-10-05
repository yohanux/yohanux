import { getAllWorks } from "@/lib/work";
import { WorkList } from "./work-list";

export default async function WorkPage() {
  const works = await getAllWorks();
  return <WorkList works={works} />;
}
