"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { addDays, differenceInCalendarDays, format, isAfter, startOfDay } from "date-fns";
import Calendar from "@/components/Calendar/Calendar";
import Icon from "@/components/Icon/Icon";
import { COUNTRIES, DIAL_CODES } from "@/lib/countries";
import { SITE, whatsappUrl } from "@/config/site";
import styles from "./ReservationForm.module.scss";

const GUESTS = Array.from({ length: 10 }, (_, i) => i + 1);
const ROOMS = Array.from({ length: 6 }, (_, i) => i + 1);

type Errors = Partial<Record<"checkIn" | "checkOut" | "name" | "email" | "phone", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ReservationForm() {
  const id = useId();
  const today = startOfDay(new Date());

  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [inMonth, setInMonth] = useState(today);
  const [outMonth, setOutMonth] = useState(today);

  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("Argentina");
  const [email, setEmail] = useState("");
  const [dial, setDial] = useState("+54");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const nights = checkIn && checkOut ? differenceInCalendarDays(checkOut, checkIn) : 0;

  const handleCheckIn = (date: Date | undefined) => {
    setCheckIn(date);
    setErrors((e) => ({ ...e, checkIn: undefined }));
    if (!date) return;
    // Si la salida quedó antes de la nueva llegada, se borra
    if (checkOut && !isAfter(checkOut, date)) setCheckOut(undefined);
    // El calendario de salida salta al mes de la llegada
    if (!checkOut || !isAfter(checkOut, date)) setOutMonth(date);
  };

  const handleCheckOut = (date: Date | undefined) => {
    setCheckOut(date);
    setErrors((e) => ({ ...e, checkOut: undefined }));
  };

  const handleCountry = (value: string) => {
    setCountry(value);
    const match = COUNTRIES.find((c) => c.name === value);
    if (match?.dial) setDial(match.dial);
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!checkIn) e.checkIn = "Elegí la fecha de llegada.";
    if (!checkOut) e.checkOut = "Elegí la fecha de salida.";
    if (!name.trim()) e.name = "Ingresá tu nombre.";
    if (!EMAIL_RE.test(email.trim())) e.email = "Ingresá un correo válido.";
    if (phone.replace(/\D/g, "").length < 6) e.phone = "Ingresá un teléfono válido.";
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

    const fmt = (d: Date) => format(d, "dd/MM/yyyy");
    const lines = [
      `Hola! Quisiera consultar disponibilidad en ${SITE.name}.`,
      "",
      `*Llegada:* ${fmt(checkIn!)}`,
      `*Salida:* ${fmt(checkOut!)} (${nights} ${nights === 1 ? "noche" : "noches"})`,
      `*Huéspedes:* ${guests}`,
      `*Habitaciones:* ${rooms}`,
      "",
      `*Nombre:* ${name.trim()}`,
      `*País:* ${country}`,
      `*Email:* ${email.trim()}`,
      `*Teléfono:* ${dial} ${phone.trim()}`,
    ];
    if (message.trim()) lines.push("", `*Comentarios:* ${message.trim()}`);

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

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* ─── 1. Fechas ─── */}
      <fieldset className={styles.step}>
        <legend className={styles.stepTitle}>1. Elegí tus fechas</legend>

        <div className={styles.grid}>
          <div className={styles.field} {...errorProps("checkIn")} tabIndex={-1}>
            <span className={styles.label}>Fecha de llegada</span>
            <Calendar
              selected={checkIn}
              onSelect={handleCheckIn}
              month={inMonth}
              onMonthChange={setInMonth}
              startMonth={today}
              disabled={{ before: today }}
              stay={{ from: checkIn, to: checkOut }}
            />
            {errorText("checkIn")}
          </div>

          <div className={styles.field} {...errorProps("checkOut")} tabIndex={-1}>
            <span className={styles.label}>Fecha de salida</span>
            <Calendar
              selected={checkOut}
              onSelect={handleCheckOut}
              month={outMonth}
              onMonthChange={setOutMonth}
              startMonth={checkIn ?? today}
              disabled={{ before: addDays(checkIn ?? today, 1) }}
              stay={{ from: checkIn, to: checkOut }}
            />
            {errorText("checkOut")}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={field("guests")}>
              Cantidad de huéspedes
            </label>
            <select
              id={field("guests")}
              className={styles.select}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            >
              {GUESTS.map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "huésped" : "huéspedes"}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={field("rooms")}>
              Cantidad de habitaciones
            </label>
            <select
              id={field("rooms")}
              className={styles.select}
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
            >
              {ROOMS.map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "habitación" : "habitaciones"}
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <hr className={styles.divider} />

      {/* ─── 2. Datos ─── */}
      <fieldset className={styles.step}>
        <legend className={styles.stepTitle}>2. Tus datos</legend>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor={field("name")}>
              Nombre y apellido
            </label>
            <input
              id={field("name")}
              className={styles.input}
              placeholder="Ej. María González"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              {...errorProps("name")}
            />
            {errorText("name")}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={field("country")}>
              País de residencia
            </label>
            <select
              id={field("country")}
              className={styles.select}
              value={country}
              onChange={(e) => handleCountry(e.target.value)}
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={field("email")}>
              Correo electrónico
            </label>
            <input
              id={field("email")}
              type="email"
              className={styles.input}
              placeholder="Ej. maria@email.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              {...errorProps("email")}
            />
            {errorText("email")}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={field("phone")}>
              Teléfono / WhatsApp
            </label>
            <div className={styles.phone}>
              <select
                aria-label="Código de país"
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
                placeholder="Ej. 11 1234-5678"
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
              ¿Hay algo que te gustaría contarnos sobre tu visita? (opcional)
            </label>
            <textarea
              id={field("message")}
              className={styles.textarea}
              placeholder="Ej. Motivo de la visita, preferencias, consultas especiales…"
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
      </fieldset>

      <div className={styles.submitRow}>
        <button type="submit" className={styles.submit}>
          Consultar disponibilidad
          <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <p className={styles.note}>
          <Icon name="candado" size={22} className={styles.noteIcon} />
          Tu consulta se enviará por WhatsApp directamente a nuestro equipo.
        </p>
      </div>

      {sent && (
        <p className={styles.sent} role="status">
          ¡Gracias! Se abrió WhatsApp con tu consulta lista para enviar. Si no se abrió,{" "}
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            escribinos acá
          </a>
          .
        </p>
      )}
    </form>
  );
}
