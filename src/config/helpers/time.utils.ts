/**
 * Convierte una hora en formato "HH:mm" a un objeto Date del día actual.
 */
export const getTodayDateAtTime = (timeString: string): Date => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

/**
 * Calcula la diferencia entre dos fechas en minutos.
 */
export const getMinutesDiff = (a: Date, b: Date): number => {
  return (a.getTime() - b.getTime()) / (1000 * 60);
};


// funcion que traiga el dia de hoy 

export const getTodayName = (): string => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[new Date().getDay()];
};