import { RouteLineDecor } from '../flights/RouteLineDecor';
import styles from './ScheduleCard.module.css'

export const ScheduleCard = ({flight}) => {
    return (
        <div className={styles.flightCard}>
            <div className={styles.cardTopSection}>
                <div className={styles.flightInfo}>
                    <span className={styles.flightNumber}>{flight.Airplane.code}</span>
                    <span className={styles.aircraftType}>{flight.Airplane.type}</span>
                </div>
                <div className={styles.verticalDivider}></div>
                <div className={styles.routeInfo}>
                    <div className={styles.departure}>
                        <div>{new Date(flight.timeStart).toLocaleDateString()}</div>
                        <div>{new Date(flight.timeStart).toLocaleTimeString()}</div>
                        <div>{flight.beginAirport.city}</div>                        
                    </div>

                    <div className={styles.airportCode}>{flight.beginAirport.code}</div>
                    <RouteLineDecor />
                    <div className={styles.airportCode}>{flight.endAirport.code}</div>

                    <div className={styles.arrival}>
                        <div>{new Date(flight.timeEnd).toLocaleDateString()}</div>
                        <div>{new Date(flight.timeEnd).toLocaleTimeString()}</div>
                        <div>{flight.endAirport.city}</div>                        
                    </div>
                </div>
            </div>
            <div className={styles.horizontalDivider}></div>
            <div className={styles.cardBottomSection}>
                <div className={styles.classInfo}>
                    {flight.ClassFlights.map(classFlight => (
                        <span key={classFlight.idclassFlight} className={`${styles.classTag} ${styles[classFlight.class.toLowerCase()]}`}>
                            {classFlight.class}: {classFlight.seatAmount - classFlight.seatBooked}/{classFlight.seatAmount}
                        </span>
                    ))}
                </div>
                <button className={styles.viewButton}>View Details</button>
            </div>
        </div>
    );
};