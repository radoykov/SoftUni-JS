function createAssemblyLine() {
    const car = {
        hasClima(object) {
            object.temp = 21;
            object.tempSettings = 21;
            object.adjustTemp = function () {
                if (object.temp < object.tempSettings) {
                    object.temp++;
                } else if (object.temp > object.tempSettings) {
                    object.temp--;
                }
            };
        },
        hasAudio(object2) {
            object2.currentTrack = {
                name: null,
                artist: null
            };

            object2.nowPlaying = function () {
                if (object2.currentTrack.name != null && object2.currentTrack.artist != null) {
                    console.log(`Now playing '${object2.currentTrack.name} by ${object2.currentTrack.artist}`);
                }
            }
        },
        hasParktronic(object3) {
            object3.checkDistance = function (distance) {
                if (distance < 0.1) {
                    console.log("Beep! Beep! Beep!");
                } else if (0.1 <= distance && distance < 0.25) {
                    console.log('Beep! Beep!');
                } else if (0.25 <= distance && distance < 0.5) {
                    console.log('Beep!');
                } else {
                    console.log('');
                }
            }

        }
    }
    return car;
}

const assemblyLine = createAssemblyLine();

const myCar = {
    make: 'Toyota',
    model: 'Avensis'
};

assemblyLine.hasClima(myCar);
console.log(myCar.temp);
myCar.tempSettings = 18;
myCar.adjustTemp();
console.log(myCar.temp);


assemblyLine.hasAudio(myCar);

myCar.currentTrack = {
    name: 'Never Gonna Give You Up',
    artist: 'Rick Astley'
};
   
myCar.nowPlaying();

assemblyLine.hasParktronic(myCar);
myCar.checkDistance(0.4);
myCar.checkDistance(0.2);

console.log(myCar);