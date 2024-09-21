function printDeckOfCards(cards) {
    function createCard(face, suit) {
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

 
    const result = [];
    for (const cardData of cards) {
        try {
            const obj = createCard(cardData.slice(0, cardData.length - 1), cardData.slice(-1));
            result.push(obj.toString());
        } catch {
            return `Invalid card: ${cardData}`;
        }
    }
    
    return result.join(' ');
}

printDeckOfCards(['AS', '10D', 'KH', '2C']);
export default printDeckOfCards;