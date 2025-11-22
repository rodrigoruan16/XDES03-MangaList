import React from "react";
import Header from "../components/Header";
import MangaCard from "../components/MangaCard";
import "../css/Mangas.css";
import { getMangas } from "../services/mangaService";

function Home() {
	const [mangas, setMangas] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [loading, setLoading] = React.useState(false);
	const [mangaName, setMangaName] = React.useState("");

	function buscaMangas() {
		setLoading(true);
		getMangas(mangaName, page)
			.then((data) => setMangas(data))
			.finally(() => setLoading(false));
	}

	React.useEffect(() => {
		buscaMangas();
	}, [page]);

	return (
		<>
			<Header />
			<div className="main-container">
				<div className="mangas-section">
					<div className="search-bar-container">
						<input
							id="search-anime-bar"
							type="text"
							placeholder="Pesquisar"
							onChange={(e) => setMangaName(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && buscaMangas()}
						/>
						<button onClick={buscaMangas}>
							<img src="https://img.icons8.com/?size=100&id=e4NkZ7kWAD7f&format=png&color=ffffff" />
						</button>
					</div>
					<div className="mangas-container">
						{loading ? (
							<p id="loading-msg">Carregando...</p>
						) : (
							mangas.map((manga) => {
								const { attributes, relationships, id, type } = manga;
								const cover = relationships.find(({ type }) => type === "cover_art")?.attributes
									?.fileName;
								const mangaData = { ...attributes, id, type, relationships, cover };
								return <MangaCard key={id} attributes={mangaData} />;
							})
						)}
					</div>
				</div>
				<div className="navigate-container">
					<button className="arrow-button" onClick={() => setPage(Math.max(0, page - 1))}>
						<img src="https://img.icons8.com/?size=100&id=39944&format=png&color=ffffff"></img>
					</button>
					<input value={page + 1} type="text" disabled></input>
					<button className="arrow-button" onClick={() => setPage(page + 1)}>
						<img src="https://img.icons8.com/?size=100&id=8OOIdPe6NXVi&format=png&color=ffffff"></img>
					</button>
				</div>
			</div>
		</>
	);
}

export default Home;
