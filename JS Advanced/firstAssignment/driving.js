function drivingSecurity(speed, string) {
    switch (string) {
        case "residential":
            if (speed < 20) {
                return `Driving ${speed} km/h in a 20 zone`
            } else {
                let diff;
                diff = speed - 20;
                if (diff <= 20) {
                    return `The speed is ${diff} km/h faster than the allowed speed of 20 - speeding `;
                } else if (diff <= 40) {
                    return `The speed is ${diff} km/h faster than the allowed speed of 20 - excessive speeding  `;
                } else {
                    return `The speed is ${diff} km/h faster than the allowed speed of 20 - reckless driving   `;
                }
            }
            break;
        case "city":
            if (speed < 50) {
                return `Driving ${speed} km/h in a 50 zone`
            } else {
                let diff;
                diff = speed - 50;
                if (diff <= 20) {
                    return `The speed is ${diff} km/h faster than the allowed speed of 50 - speeding `;
                } else if (diff <= 40) {
                    return `The speed is ${diff} km/h faster than the allowed speed of 50 - excessive speeding  `;
                } else {
                    return `The speed is ${diff} km/h faster than the allowed speed of 50 - reckless driving   `;
                }
            }
            break;
        case "interstate":
            if (speed < 90) {
                return `Driving ${speed} km/h in a 90 zone`
            } else {
                let diff;
                diff = speed - 90;
                if (diff <= 20) {
                    return `The speed is ${diff} km/h faster than the allowed speed of 90 - speeding `;
                } else if (diff <= 40) {
                    return `The speed is ${diff} km/h faster than the allowed speed of 90 - excessive speeding  `;
                } else {
                    return `The speed is ${diff} km/h faster than the allowed speed of 90 - reckless driving   `;
                }
            }
            break;
        case "motorway":
            if (speed < 130) {
                return `Driving ${speed} km/h in a 130 zone`
            } else {
                let diff;
                diff = speed - 130;
                if (diff <= 20) {
                    return `The speed is ${diff} km/h faster than the allowed speed of 130 - speeding `;
                } else if (diff <= 40) {
                    return `The speed is ${diff} km/h faster than the allowed speed of 130 - excessive speeding  `;
                } else {
                    return `The speed is ${diff} km/h faster than the allowed speed of 130 - reckless driving   `;
                }
            }
            break;
    }
}

console.log(drivingSecurity(40, 'city'));
console.log(drivingSecurity(21, 'residential'));
console.log(drivingSecurity(120, 'interstate'));
console.log(drivingSecurity(200, 'motorway'));