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
  /** Llegada y salida elegidas (se pintan los extremos y la banda del medio) */
  from?: Date;
  to?: Date;
  /** Día tocado; la lógica de llegada / salida la decide el formulario */
  onDayClick: (date: Date) => void;
  month: Date;
  onMonthChange: (month: Date) => void;
  disabled?: Matcher | Matcher[];
  startMonth?: Date;
};

/** Calendario de un mes para elegir la estadía (llegada → salida). */
export default function Calendar({
  lang,
  from,
  to,
  onDayClick,
  month,
  onMonthChange,
  disabled,
  startMonth,
}: CalendarProps) {
  return (
    <div className={styles.calendar}>
      <DayPicker
        locale={DAY_PICKER_LOCALES[lang]}
        weekStartsOn={1}
        month={month}
        onMonthChange={onMonthChange}
        startMonth={startMonth}
        disabled={disabled}
        onDayClick={(day, modifiers) => {
          if (!modifiers.disabled) onDayClick(day);
        }}
        modifiers={{
          edge: [from, to].filter((d): d is Date => Boolean(d)),
          between: from && to ? { after: from, before: to } : [],
        }}
        modifiersClassNames={{ edge: styles.edge, between: styles.between }}
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
