import { useState, useEffect } from "react";
import Symbol from "@/types/crypto";
import { PRICE_FORMATTING, VOLUME_FORMATTING } from "../../utils/formattings";

/* 
    Single Table Item for Representation of Single Crypto
*/
export default function SingleTableItem({ data }: { data: Symbol }) {
	const [icon, setIcon] = useState<string | null>(null);

	useEffect(() => {
		const loadIcon = async () => {
			try {
				const iconModule = await import(
					`../../../node_modules/cryptocurrency-icons/svg/color/${data?.baseAsset?.toLowerCase()}.svg`
				);
				setIcon(iconModule.default);
			} catch (error) {
				const generic = await import(`../../../node_modules/cryptocurrency-icons/svg/color/generic.svg`);
				setIcon(generic.default); // You can set a fallback image or keep it null
			}
		};

		loadIcon();
	}, [data.baseAsset]);

	return (
		<tr className="crypto-item">
			<td className="symbol">
				<span className="symbol-img">
					{icon ? (
						<img className="crypto-icon" src={icon} alt={`${data?.baseAsset} icon`} loading="eager" />
					) : (
						<img
							className="crypto-icon"
							src="path/to/fallback/icon.svg" // Optional fallback icon
							alt="fallback icon"
							loading="eager"
						/>
					)}
				</span>
				<span className="symbol-info">
					{data.baseAsset}
					<span className="text-sm text-zinc-400 tracking-wider">/USDT</span>
				</span>
			</td>
			<td>
				{PRICE_FORMATTING(data.lastPrice)} <span className="text-sm text-zinc-400 tracking-wider">USDT</span>
			</td>
			<td>
				{VOLUME_FORMATTING(data.quoteVolume)} <span className="text-sm text-zinc-400 tracking-wider">USDT</span>
			</td>
			<td>{data.priceChangePercent}%</td>
			<td></td>
		</tr>
	);
}
