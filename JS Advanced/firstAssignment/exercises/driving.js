function drivingSecurity(speed, string) {
    switch (string) {
        case "residential":
            console.log(drive(speed, 20));
            break;
        case "city":
            console.log(drive(speed, 50));
            break;
        case "interstate":
            console.log(drive(speed, 90));
            break;
        case "motorway":
            console.log(drive(speed, 130));
            break;
    }
}

function drive(speed, speedInZOne) {
    if (speed < speedInZOne) {
        return `Driving ${speed} km/h in a ${speedInZOne} zone`
    } else {
        let diff;
        diff = speed - speedInZOne;
        if (diff <= 20) {
            return `The speed is ${diff} km/h faster than the allowed speed of ${speedInZOne} - speeding `;
        } else if (diff <= 40) {
            return `The speed is ${diff} km/h faster than the allowed speed of ${speedInZOne} - excessive speeding  `;
        } else {
            return `The speed is ${diff} km/h faster than the allowed speed of ${speedInZOne} - reckless driving   `;
        }
    }
}

drivingSecurity(40, 'city');
drivingSecurity(21, 'residential');
drivingSecurity(120, 'interstate');
drivingSecurity(200, 'motorway');