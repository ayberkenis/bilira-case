import "../assets/css/home.layout.css";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	return <div className="home">{children}</div>;
}
