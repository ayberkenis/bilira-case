import "../assets/css/home.layout.css";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="home">
			{children}
			<a
				href="https://github.com/ayberkenis"
				target="_blank"
				rel="noopener noreferrer"
				className="text-xs text-zinc-400 tracking-wider my-20"
			>
				presented by ayberkenis
			</a>
		</div>
	);
}
