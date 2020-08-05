export default function convertHourToMinutes(time: string) {
    // O horário vem nesse formato: 07:00
    const [hour, minutes] = time.split(':').map(Number);
    const timeInMinutes = (hour * 60) + minutes;

    return timeInMinutes;
}
