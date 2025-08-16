import type { Show } from "../types/show";
import ShowCard from "./ShowCard";

interface ShowSectionProps {
    title: string;
    shows: Show[];
}

const ShowSection = ({ title, shows }: ShowSectionProps) => {
    if (!shows || shows.length === 0) return null;

    return (
        <section>
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <div className="flex overflow-x-auto overflow-y-hidden gap-4 p-2 scrollbar-hide">
                {shows.map((show) => (
                    <ShowCard key={show.id} show={show} />
                ))}
            </div>
        </section>
    )
}

export default ShowSection;