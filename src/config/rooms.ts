// Habitaciones de La Torre. Los textos (nombre, alt de la foto) están en los
// diccionarios, en habitaciones.rooms[key].
// Fotos provisorias: reemplazar por las de cada habitación.
export type RoomBeds = "twoDoubles" | "threeSingles";

export const ROOMS = [
  // TODO: confirmar cuáles 2 suites con camas dobles admiten la cama single extra
  { key: "piedra", image: "/images/piedra.png", beds: "twoDoubles", guests: 4, extraBed: true },
  { key: "espejos", image: "/images/hab-home.png", beds: "twoDoubles", guests: 4, extraBed: true },
  { key: "triple", image: "/images/libros.png", beds: "threeSingles", guests: 3, extraBed: false },
  { key: "azul", image: "/images/hotel.png", beds: "twoDoubles", guests: 4, extraBed: false },
  { key: "verde", image: "/images/imagen.png", beds: "twoDoubles", guests: 4, extraBed: false },
] as const satisfies readonly {
  key: string;
  image: string;
  beds: RoomBeds;
  guests: number;
  extraBed: boolean;
}[];
