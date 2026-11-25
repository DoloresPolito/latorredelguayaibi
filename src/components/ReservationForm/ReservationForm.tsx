"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Minus, Plus, X } from "lucide-react";
import { differenceInCalendarDays, format, isAfter, startOfDay } from "date-fns";
import Calendar from "@/components/Calendar/Calendar";
import { COUNTRIES, DIAL_CODES, countryName } from "@/lib/countries";
import { whatsappUrl } from "@/config/site";
import { ROOM_PARAM } from "@/config/navigation";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import styles from "./ReservationForm.module.scss";

const MAX_GUESTS = 10;
const MAX_ROOMS = 6;

const DATE_LOCALES = { es: "es-AR", en: "en-US" };

type Errors = Partial<Record<"dates" | "name" | "email" | "phone", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ReservationFormProps = {
  lang: Locale;
  t: Dictionary["form"];
  /** Nombre de cada suite por su key, para mostrar la que viene en ?habitacion= */
  roomNames: Record<string, string>;
};

/** Encabezado de cada paso: número en itálica y título en versalitas */
function StepTitle({ n, children }: { n: number; children: ReactNode }) {
  return (
    <legend className={styles.stepTitle}>
      <span className={styles.stepNumber} aria-hidden="true">
        {String(n).padStart(2, "0")}
      </span>
      {children}
    </legend>
  );
}

export default function ReservationForm({ lang, t, roomNames }: ReservationFormProps) {
  const id = useId();
  const today = startOfDay(new Date());

  // Suite elegida en /habitaciones (?habitacion=azul). Si la key no existe, nada.
  // Next guarda la página con su estado al irse (Cache Components): al volver
  // con otra suite el formulario no se monta de nuevo, así que la suite se
  // vuelve a tomar de la URL cada vez que cambia el parámetro.
  const roomParam = useSearchParams().get(ROOM_PARAM);
  const validRoom = (key: string | null) => (key && roomNames[key] ? key : null);
  const [room, setRoom] = useState(() => validRoom(roomParam));
  const [lastParam, setLastParam] = useState(roomParam);
  if (roomParam !== lastParam) {
    setLastParam(roomParam);
    setRoom(validRoom(roomParam));
  }

  const clearRoom = () => {
    setRoom(null);
    // Saca el parámetro de la URL, así al recargar no vuelve a aparecer
    const url = new URL(window.location.href);
    url.searchParams.delete(ROOM_PARAM);
    window.history.replaceState(window.history.state, "", url);
  };

  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [month, setMonth] = useState(today);

  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("AR");
  const [email, setEmail] = useState("");
  const [dial, setDial] = useState("+54");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const nights = checkIn && checkOut ? differenceInCalendarDays(checkOut, checkIn) : 0;

  // Primer toque: llegada. Segundo (posterior): salida. Si ya estaban las dos,
  // o se toca un día anterior a la llegada, empieza de nuevo.
  const handleDay = (date: Date) => {
    setErrors((e) => ({ ...e, dates: undefined }));
    if (checkIn && !checkOut && isAfter(date, checkIn)) {
      setCheckOut(date);
    } else {
      setCheckIn(date);
      setCheckOut(undefined);
    }
  };

  const handleCountry = (value: string) => {
    setCountry(value);
    const match = COUNTRIES.find((c) => c.code === value);
    if (match?.dial) setDial(match.dial);
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!checkIn) e.dates = t.errors.checkIn;
    else if (!checkOut) e.dates = t.errors.checkOut;
    if (!name.trim()) e.name = t.errors.name;
    if (!EMAIL_RE.test(email.trim())) e.email = t.errors.email;
    if (phone.replace(/\D/g, "").length < 6) e.phone = t.errors.phone;
    return e;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      // Lleva al primer campo con error
      const first = event.currentTarget.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      first?.focus({ preventScroll: true });
      return;
    }

    // El mensaje sale en el idioma de la página (lo envía el huésped)
    const w = t.whatsapp;
    const fmt = (d: Date) => format(d, lang === "en" ? "MM/dd/yyyy" : "dd/MM/yyyy");
    const lines = [
      w.intro,
      "",
      ...(room ? [`*${w.room}:* ${roomNames[room]}`] : []),
      `*${w.checkIn}:* ${fmt(checkIn!)}`,
      `*${w.checkOut}:* ${fmt(checkOut!)} (${nights} ${nights === 1 ? w.night : w.nights})`,
      `*${w.guests}:* ${guests}`,
      `*${w.rooms}:* ${rooms}`,
      "",
      `*${w.name}:* ${name.trim()}`,
      `*${w.country}:* ${countryName(country, lang, t.otherCountry)}`,
      `*${w.email}:* ${email.trim()}`,
      `*${w.phone}:* ${dial} ${phone.trim()}`,
    ];
    if (message.trim()) lines.push("", `*${w.comments}:* ${message.trim()}`);

    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const field = (key: string) => `${id}-${key}`;
  const errorProps = (key: keyof Errors) =>
    errors[key]
      ? { "aria-invalid": true as const, "aria-describedby": field(`${key}-error`) }
      : {};
  const errorText = (key: keyof Errors) =>
    errors[key] ? (
      <p id={field(`${key}-error`)} className={styles.error}>
        {errors[key]}
      </p>
    ) : null;

  // "vie 27 nov" / "Fri, Nov 27"
  const shortDate = (d?: Date) =>
    d
      ? d
          .toLocaleDateString(DATE_LOCALES[lang], { weekday: "short", day: "numeric", month: "short" })
          .replace(/\./g, "")
          .replace(/,(?= \d)/, "")
      : "—";

  const stepper = (
    key: "guests" | "rooms",
    value: number,
    set: (n: number) => void,
    max: number,
    label: string,
    hint: string,
  ) => (
    <div className={styles.counter}>
      <div>
        <p className={styles.counterLabel} id={field(key)}>
          {label}
        </p>
        <p className={styles.counterHint}>{hint}</p>
      </div>
      <div className={styles.counterControls} role="group" aria-labelledby={field(key)}>
        <button
          type="button"
          className={styles.counterButton}
          onClick={() => set(Math.max(1, value - 1))}
          disabled={value <= 1}
          aria-label={`${t.decrease} ${label.toLowerCase()}`}
        >
          <Minus size={14} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <output className={styles.counterValue} aria-live="polite">
          {value}
        </output>
        <button
          type="button"
          className={styles.counterButton}
          onClick={() => set(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`${t.increase} ${label.toLowerCase()}`}
        >
          <Plus size={14} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {room && (
        <div className={styles.room}>
          <p className={styles.roomText}>
            <span className={styles.roomLabel}>{t.selectedRoom}</span>
            <span className={styles.roomName}>{roomNames[room]}</span>
          </p>
          <button type="button" className={styles.roomRemove} onClick={clearRoom} aria-label={t.removeRoom}>
            <X size={16} strokeWidth={1.25} aria-hidden="true" />
          </button>
        </div>
      )}

      {/* ─── 01. Fechas ─── */}
      <fieldset className={styles.step}>
        <StepTitle n={1}>{t.step1}</StepTitle>

        <div className={styles.dates} {...errorProps("dates")} tabIndex={-1}>
          <Calendar
            lang={lang}
            from={checkIn}
            to={checkOut}
            onDayClick={handleDay}
            month={month}
            onMonthChange={setMonth}
            startMonth={today}
            disabled={{ before: today }}
          />
          <p className={styles.hint}>{t.calendarHint}</p>
          {errorText("dates")}
        </div>

        <dl className={styles.summary} aria-live="polite">
          <div>
            <dt>{t.checkIn}</dt>
            <dd>{shortDate(checkIn)}</dd>
          </div>
          <div>
            <dt>{t.checkOut}</dt>
            <dd>{shortDate(checkOut)}</dd>
          </div>
          <div>
            <dt>{t.nights}</dt>
            <dd>{nights || "—"}</dd>
          </div>
        </dl>
      </fieldset>

      {/* ─── 02. Huéspedes y habitaciones ─── */}
      <fieldset className={styles.step}>
        <StepTitle n={2}>{t.step2}</StepTitle>
        <div className={styles.counters}>
          {stepper("guests", guests, setGuests, MAX_GUESTS, t.guests, t.guestsHint)}
          {stepper("rooms", rooms, setRooms, MAX_ROOMS, t.rooms, t.roomsHint)}
        </div>
      </fieldset>

      {/* ─── 03. Datos ─── */}
      <fieldset className={styles.step}>
        <StepTitle n={3}>{t.step3}</StepTitle>

        <div className={styles.grid}>
          <div className={`${styles.field} ${styles.full}`}>
            <label className={styles.label} htmlFor={field("name")}>
              {t.name}
            </label>
            <input
              id={field("name")}
              className={styles.input}
              placeholder={t.namePlaceholder || undefined}
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              {...errorProps("name")}
            />
            {errorText("name")}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={field("email")}>
              {t.email}
            </label>
            <input
              id={field("email")}
              type="email"
              className={styles.input}
              placeholder={t.emailPlaceholder || undefined}
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              {...errorProps("email")}
            />
            {errorText("email")}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={field("country")}>
              {t.country}
            </label>
            <select
              id={field("country")}
              className={styles.select}
              value={country}
              onChange={(e) => handleCountry(e.target.value)}
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {countryName(c.code, lang, t.otherCountry)}
                </option>
              ))}
            </select>
          </div>

          <div className={`${styles.field} ${styles.full}`}>
            <label className={styles.label} htmlFor={field("phone")}>
              {t.phone}
            </label>
            <div className={styles.phone}>
              <select
                aria-label={t.dialCode}
                className={styles.select}
                value={dial}
                onChange={(e) => setDial(e.target.value)}
              >
                {DIAL_CODES.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
              <input
                id={field("phone")}
                type="tel"
                className={styles.input}
                placeholder={t.phonePlaceholder || undefined}
                autoComplete="tel-national"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                {...errorProps("phone")}
              />
            </div>
            {errorText("phone")}
          </div>

          <div className={`${styles.field} ${styles.full}`}>
            <label className={styles.label} htmlFor={field("message")}>
              {t.message} <span className={styles.optional}>{t.optional}</span>
            </label>
            <textarea
              id={field("message")}
              className={styles.textarea}
              placeholder={t.messagePlaceholder}
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
      </fieldset>

      <div className={styles.submitRow}>
        <button type="submit" className={styles.submit}>
          {t.submit}
          <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <p className={styles.note}>{t.note}</p>
      </div>

      {sent && (
        <p className={styles.sent} role="status">
          {t.sent}{" "}
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            {t.sentLink}
          </a>
          .
        </p>
      )}
    </form>
  );
}
