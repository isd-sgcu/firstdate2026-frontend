import { cn } from "@lib/utils";
import { Flower2 } from "lucide-react";

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
                {day === today ? (
                  <div className="flex h-full w-full flex-col items-end justify-center bg-primary pr-1 text-muted">
                    {day}
                    <Flower2 className="size-6" />
                  </div>
                ) : (
                  <div className="flex h-full w-full flex-col items-end justify-center pr-1 text-primary">
                    {day}
                    <Flower2 className="size-6 opacity-0" />
                  </div>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Calendar;
