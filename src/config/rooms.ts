// Habitaciones de La Torre. Los textos (nombre, alt de la foto) están en los
// diccionarios, en habitaciones.rooms[key].
export type RoomBeds = "twoDoubles" | "threeSingles";

export const ROOMS = [
  // TODO: confirmar cuáles 2 suites con camas dobles admiten la cama single extra
  { key: "piedra", image: "/images/habitaciones/1.png", beds: "twoDoubles", guests: 4, extraBed: true },
  { key: "espejos", image: "/images/habitaciones/2.png", beds: "twoDoubles", guests: 4, extraBed: true },
  { key: "azul", image: "/images/habitaciones/3.png", beds: "twoDoubles", guests: 4, extraBed: false },
  { key: "verde", image: "/images/habitaciones/4.png", beds: "twoDoubles", guests: 4, extraBed: false },
  { key: "triple", image: "/images/habitaciones/5.png", beds: "threeSingles", guests: 3, extraBed: false },
] as const satisfies readonly {
  key: string;
  image: string;
  beds: RoomBeds;
  guests: number;
  extraBed: boolean;
}[];
