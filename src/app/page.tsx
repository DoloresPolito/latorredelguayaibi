// Página temporal para previsualizar el design system.
// Se reemplaza cuando armemos el hero y la navbar.
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.page}>
      <p className="eyebrow">Design system</p>
      <h1>La Torre del Guayaibí</h1>
      <h2>Un hotel boutique rodeado de naturaleza</h2>
      <p className="text-editorial">
        Párrafo editorial en EB Garamond 19px. La web debe sentirse luminosa,
        sofisticada, cálida y editorial.
      </p>
      <p className="text-small">Texto descriptivo pequeño en EB Garamond 14px.</p>

      <hr className="divider" />

      <div className={styles.row}>
        <button className="btn-primary">Consultar disponibilidad</button>
        <button className="btn-secondary">Ver habitaciones</button>
      </div>

      <div className={styles.form}>
        <label className="label" htmlFor="name">Nombre</label>
        <input className="input" id="name" placeholder="Tu nombre" />
        <label className="label" htmlFor="msg">Mensaje</label>
        <textarea className="textarea" id="msg" placeholder="Escribinos…" />
      </div>
    </main>
  );
}
