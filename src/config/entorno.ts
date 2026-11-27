import fs from "node:fs/promises";
import path from "node:path";
import { connection } from "next/server";

/**
 * Fotos de la página Entorno: se leen solas de public/images/entorno/.
 *
 * Cada archivo se llama "NN-nombre.jpg" (ej. "07-galeria-habitaciones.jpg").
 * El número decide el orden: para mover una foto, se le cambia el número.
 * - Las primeras DEPTH_COUNT (01–13) flotan en el viaje del principio.
 * - La siguiente (14) es la que se abre a pantalla completa con la frase.
 * - El resto va a las columnas, de izquierda a derecha y fila por fila.
 *
 * El "nombre" (lo que va después del número) busca la descripción de la
 * foto en entorno.images del diccionario, así que se puede cambiar el número
 * sin tocar nada más. Una foto nueva sin descripción usa entorno.imageFallback.
 */

export const DEPTH_COUNT = 13;

export type EntornoPhoto = {
  src: string;
  /** Lo que va después del número: clave de la descripción en el diccionario */
  name: string;
  width: number;
  height: number;
};

const DIR = path.join(process.cwd(), "public", "images", "entorno");
const FILE = /^(\d+)-([a-z0-9-]+)\.(jpe?g|png)$/i;

/** Ancho y alto leyendo solo la cabecera del archivo (JPEG o PNG). */
function readSize(buf: Buffer): { width: number; height: number } | null {
  // PNG: el bloque IHDR empieza en el byte 16
  if (buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  // JPEG: recorrer los segmentos hasta el SOF (0xC0–0xCF salvo C4, C8, CC)
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let i = 2;
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) return null;
    const marker = buf[i + 1];
    const length = buf.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    i += 2 + length;
  }
  return null;
}

/** Los primeros 64 KB del archivo: alcanzan para encontrar el tamaño. */
async function readHead(file: string): Promise<Buffer> {
  const handle = await fs.open(file, "r");
  try {
    const buf = Buffer.alloc(64 * 1024);
    const { bytesRead } = await handle.read(buf, 0, buf.length, 0);
    return buf.subarray(0, bytesRead);
  } finally {
    await handle.close();
  }
}

/**
 * Todas las fotos de la carpeta, ordenadas por número. En producción se lee
 * una sola vez al publicar (queda en caché); en desarrollo, en cada visita,
 * así al renombrar una foto alcanza con recargar la página.
 */
export async function getEntornoPhotos(): Promise<EntornoPhoto[]> {
  if (process.env.NODE_ENV === "development") {
    await connection();
    return readPhotos();
  }
  return readPhotosCached();
}

async function readPhotosCached(): Promise<EntornoPhoto[]> {
  "use cache";
  return readPhotos();
}

async function readPhotos(): Promise<EntornoPhoto[]> {
  const files = (await fs.readdir(DIR))
    .map((file) => ({ file, match: FILE.exec(file) }))
    .filter((f): f is { file: string; match: RegExpExecArray } => f.match !== null)
    .sort((a, b) => Number(a.match[1]) - Number(b.match[1]) || a.file.localeCompare(b.file));

  const photos = await Promise.all(
    files.map(async ({ file, match }) => {
      const size = readSize(await readHead(path.join(DIR, file)));
      return size ? { src: `/images/entorno/${file}`, name: match[2].toLowerCase(), ...size } : null;
    }),
  );
  return photos.filter((p): p is EntornoPhoto => p !== null);
}

/** Descripción (alt) de una foto según su nombre. */
export function photoAlt(
  images: Record<string, string>,
  fallback: string,
  photo: EntornoPhoto,
): string {
  return images[photo.name] ?? fallback;
}
