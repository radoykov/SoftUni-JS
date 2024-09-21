function cardsProducer(face, suit) {
    const validFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suitsToString = {
        'S': '\u2660',
        'H': '\u2665',
        'D': '\u2666',
        'C': '\u2663'
    };

    if (validFaces.includes(face) == false) {
        throw new Error('Invalid face');
    } else if (Object.keys(suitsToString).includes(suit) == false) {
        throw new Error('Invalid suit');
    }

    return {
        face,
        suit,
        toString() {
            return `${this.face}${suitsToString[this.suit]}`
        }
    };
}

export default cardsProducer;