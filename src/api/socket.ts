import { WS_SOCKET_URL } from "../lib/constants";

/**
 * `BinanceTickerSocket` is a class that manages the WebSocket connection to Binance's ticker stream.
 * It handles connection management, subscribing to ticker updates, and broadcasting received messages to registered handlers.
 *
 * @class
 */
class BinanceTickerSocket {
	/** @private {WebSocket | null} socket - The WebSocket connection instance. */
	private socket: WebSocket | null = null;

	/** @private {boolean} isConnected - Tracks the WebSocket connection status. */
	private isConnected: boolean = false;

	/**
	 * @private {Array<Function>} messageHandlers - Stores the list of message handlers to call when a message is received.
	 * @type {Array<(data: any) => void>}
	 */
	private messageHandlers: Array<(data: any) => void> = [];

	/**
	 * Constructs the BinanceTickerSocket class and initiates the WebSocket connection.
	 * @constructor
	 */
	constructor() {
		this.connect();
	}

	/**
	 * Establishes the WebSocket connection and sets up event listeners for connection events.
	 * @private
	 * @returns {void}
	 */
	private connect() {
		this.socket = new WebSocket(WS_SOCKET_URL);

		this.socket.onopen = () => {
			console.log("WebSocket connected");
			this.isConnected = true;
			this.subscribeToTickerStream(); // Subscribe once connected
		};

		this.socket.onclose = (event: CloseEvent) => {
			console.log(`WebSocket disconnected: ${event.reason}`);
			this.isConnected = false;
			// Optionally, you can implement reconnection logic here
		};

		this.socket.onerror = (error: Event) => {
			console.error("WebSocket connection error:", error);
		};

		this.socket.onmessage = (event: MessageEvent) => {
			const data = JSON.parse(event.data);
			this.handleMessage(data);
		};
	}

	/**
	 * Subscribes to the Binance ticker stream for real-time updates.
	 * @private
	 * @returns {void}
	 */
	private subscribeToTickerStream() {
		if (this.isConnected && this.socket) {
			const subscribeMessage = {
				method: "SUBSCRIBE",
				params: ["!ticker@arr"],
				id: 1,
			};
			this.socket.send(JSON.stringify(subscribeMessage));
		}
	}

	/**
	 * Handles incoming WebSocket messages by passing the data to all registered handlers.
	 *
	 * @private
	 * @param {any} data - The data received from the WebSocket message event.
	 * @returns {void}
	 */
	private handleMessage(data: any) {
		// Call all registered message handlers
		this.messageHandlers.forEach((handler) => handler(data));
	}

	/**
	 * Registers a new message handler to be called when a message is received.
	 *
	 * @public
	 * @param {(data: any) => void} handler - The function to handle incoming WebSocket messages.
	 * @returns {void}
	 */
	public onMessage(handler: (data: any) => void) {
		this.messageHandlers.push(handler);
	}

	/**
	 * Unregisters a specific message handler so it will no longer be called.
	 *
	 * @public
	 * @param {(data: any) => void} handler - The handler function to remove.
	 * @returns {void}
	 */
	public offMessage(handler: (data: any) => void) {
		this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
	}

	/**
	 * Unsubscribes from the WebSocket connection by closing the connection.
	 *
	 * @public
	 * @returns {void}
	 */
	public unsubscribe() {
		if (this.isConnected && this.socket) {
			this.socket.close();
		}
	}
}

// Export an instance of the BinanceTickerSocket class
export const binanceTickerSocket = new BinanceTickerSocket();
