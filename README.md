### BiLira Case

The application fetches data from the Binance API and updates it in real-time using WebSockets. It also features infinite scrolling, sparkline charts for quick trend visualization, and dynamic icon loading for each cryptocurrency.

Features

1. Real-Time Data Updates: Leverages WebSockets to provide live updates for cryptocurrency prices and other metrics.
2. Infinite Scrolling: Loads more cryptocurrency data as the user scrolls down the table.
3. Dynamic Icons: Loads SVG icons for each cryptocurrency dynamically.
4. Sparkline Charts: Displays a mini chart showing the price trends over time for each cryptocurrency.
5. Responsive Design: Fully responsive and works across a variety of devices.

Tech Stack

- React: Frontend library for building user interfaces.
- TypeScript: Type-safe JavaScript with powerful tooling.
- React Query (@tanstack/react-query): Data-fetching library that simplifies server state management.
- Jest: Testing framework for unit tests.
- React Testing Library: Utility for testing React components.
- Axios: Promise-based HTTP client for the browser.
- WebSocket: Real-time data fetching.
- JSDoc: Used for generating documentation from comments in the code.

---

### How did I overcome challenges in this project?

#### Live Data Problem:

> My goal was to maybe use infinite query to every 1 second, and i decided not to use that for performance reasons. And I have implemented my own Binance WebSocket Stream wrapper which can be found [here](https://github.com/ayberkenis/bilira-case/blob/main/src/api/socket.ts).

#### Infinite Scrolling:

> I have added both `Load More` button and infinite scrolling for ease of use. I decided to [get all available pairs](https://api.binance.com/api/v3/exchangeInfo) from the Binance API and paginate the results on my behalf by using limit pagination [which can be seen here.](https://github.com/ayberkenis/bilira-case/blob/main/src/components/table/mainTable.tsx)

#### Performance:

> To handle processing big amounts of data, I decided to subscribe to all 24h ticker from the [Binance WebSocket Streams API](https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams) and make use of the symbols I decided to show on the table.

> > The project still has some performance issues and many ways to improve the performance and response times, project deadline was a great limitation for me to improve it greatly. I'd just subscribe to pairs that currently show up on the table, get only the symbols we're going to show etc.
> > I'm not all completely OK with the performance but I think that the current implementation is pretty good enough to push to the production.

---

### Finally

Thank you for your interest and time,
I'd be happy to discuss the details of the case.
I'm also interested in your comments and suggestions that **will** make my work and code quality much better.

Regards,

Ayberk.
