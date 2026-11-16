"use client";

import { DayPicker, type Matcher } from "react-day-picker";
import { enUS, es } from "react-day-picker/locale";
import type { Locale } from "@/i18n/config";
import "react-day-picker/style.css";
import styles from "./Calendar.module.scss";

const DAY_PICKER_LOCALES = { es, en: enUS };
const DATE_LOCALES = { es: "es-AR", en: "en-US" };

type CalendarProps = {
  lang: Locale;
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
  month: Date;
  onMonthChange: (month: Date) => void;
  disabled?: Matcher | Matcher[];
  /** Estadía a pintar con la banda verde suave (llegada → salida) */
  stay?: { from?: Date; to?: Date };
  startMonth?: Date;
};

export default function Calendar({
  lang,
  selected,
  onSelect,
  month,
  onMonthChange,
  disabled,
  stay,
  startMonth,
}: CalendarProps) {
  const hasStay = Boolean(stay?.from && stay?.to);
  return (
    <div className={styles.calendar}>
      <DayPicker
        mode="single"
        locale={DAY_PICKER_LOCALES[lang]}
        weekStartsOn={1}
        showOutsideDays
        selected={selected}
        onSelect={onSelect}
        month={month}
        onMonthChange={onMonthChange}
        startMonth={startMonth}
        disabled={disabled}
        modifiers={{
          stay: hasStay ? { from: stay!.from!, to: stay!.to! } : [],
          stayStart: hasStay ? stay!.from! : [],
          stayEnd: hasStay ? stay!.to! : [],
        }}
        modifiersClassNames={{
          stay: styles.stay,
          stayStart: styles.stayStart,
          stayEnd: styles.stayEnd,
        }}
        formatters={{
          // "noviembre de 2026" → "Noviembre 2026" / "November 2026"
          formatCaption: (date) => {
            const label = date.toLocaleDateString(DATE_LOCALES[lang], { month: "long", year: "numeric" });
            return label.charAt(0).toUpperCase() + label.slice(1).replace(" de ", " ");
          },
          // "lun" → "L" / "Mon" → "M"
          formatWeekdayName: (date) =>
            date.toLocaleDateString(DATE_LOCALES[lang], { weekday: "narrow" }).toUpperCase(),
        }}
      />
    </div>
  );
}
