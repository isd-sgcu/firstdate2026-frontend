import { cn } from "@lib/utils";
import { PinIcon } from "lucide-react";
import activities from "./activities.json";

const MONTHS: Record<number, string> = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

const activityImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/*",
  { eager: true },
);

function getActivityImageUrl(filename: string) {
  const entry = Object.entries(activityImages).find(([path]) =>
    path.endsWith(`/${filename}`),
  );
  return entry?.[1].default.src;
}

const activityByDate = new Map(activities.map((a) => [a.date, a.image]));
const pad = (n: number) => String(n).padStart(2, "0");

const getThaiToday = () => {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  return {
    year: Number(parts.find((p) => p.type === "year")!.value),
    month: Number(parts.find((p) => p.type === "month")!.value),
    day: Number(parts.find((p) => p.type === "day")!.value),
  };
};

const Calendar = () => {
  const { year, month, day: today } = getThaiToday();

  const firstWeekday = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = new Array(firstWeekday).fill(null);
  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  return (
    <>
      {/* Header */}
      <div className="flex justify-between">
        <h1 className="text-4xl text-primary whitespace-pre-line">{year}</h1>
        <h1 className="text-4xl text-primary whitespace-pre-line">
          {MONTHS[month]}
        </h1>
      </div>

      <table className="w-full table-fixed border-collapse">
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => (
                <td
                  key={dayIndex}
                  className={cn(
                    "h-16 border border-primary p-0 text-center",
                    weekIndex === 0 && "border-t-0",
                    weekIndex === weeks.length - 1 && "border-b-0",
                    dayIndex === 0 && "border-l-0",
                    dayIndex === week.length - 1 && "border-r-0",
                  )}
                >
                  {day &&
                    (() => {
                      const dateStr = `${year}-${pad(month)}-${pad(day)}`;
                      const filename = activityByDate.get(dateStr);
                      const imageUrl = filename
                        ? getActivityImageUrl(filename)
                        : undefined;

                      return (
                        <div
                          className={cn(
                            "flex h-full w-full font-bold flex-col items-end justify-center pr-1",
                            day === today
                              ? "bg-primary text-muted"
                              : "text-primary",
                          )}
                        >
                          {day}
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={filename}
                              className="size-[clamp(1.75rem,8vw,2.5rem)] object-contain"
                            />
                          ) : day == today ? (
                            <img
                              src="src/assets/images/flower_1.png"
                              alt="Today"
                              className="size-[clamp(1.4rem,6.4vw,2rem)] rotate-45 object-contain"
                            />
                          ) : (
                            <PinIcon className="size-[clamp(1.75rem,8vw,2.5rem)] opacity-0" />
                          )}
                        </div>
                      );
                    })()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Calendar;
