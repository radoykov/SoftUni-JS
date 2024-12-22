class Ticket {
    constructor(destinationName, price, status) {
        this.destinationName = destinationName;
        this.price = price;
        this.status = status;
    }
};

function tickets(arr, sortStr) {
    const result = [];
    for (let ticket of arr) {
        let [destinationName, price, status] = ticket.split('|');
        const newTicket = new Ticket(destinationName, price, status);
        result.push(newTicket);
    }
    return result.sort((a, b) => {
        if (sortStr === 'destination') {
            return a.destinationName.localeCompare(b.destinationName);
        } else if (sortStr === 'price') {
            return a.price - b.price;
        } else if (sortStr === 'status') {
            return a.status.localeCompare(b.status);
        }
    });
}

console.log(tickets(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'],
   'destination'
));

console.log(tickets(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'],
   'status'
));