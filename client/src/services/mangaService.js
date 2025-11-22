import axios from "axios";

const MANGA_ENDPOINT = {
	BASE_URL: "https://api.mangadex.org/manga?includes[]=cover_art",
	FAVORITE_MANGAS: "http://localhost:3001/manga/favorite",
	COMMENT: "http://localhost:3001/manga/comment",
};

const deleteMangaComment = async (comment_id) => {
	return await axios({
		method: "DELETE",
		url: "http://localhost:3001/manga/comment",
		data: {
			comment_id,
		},
		withCredentials: true,
	});
};

const updateMangaComment = async (comment_id, comment) => {
	return await axios({
		method: "PUT",
		url: MANGA_ENDPOINT.COMMENT,
		data: {
			comment_id,
			comment,
		},
		withCredentials: true,
	});
};

const addMangaComment = async (manga_id, comment) => {
	return await axios({
		method: "POST",
		url: "http://localhost:3001/manga/comment",
		data: {
			manga_id,
			comment,
		},
		withCredentials: true,
	});
};

const getFavoritesMangadex = async (favorites) => {
	let favorites_url = MANGA_ENDPOINT.BASE_URL;
	favorites.forEach((favorite) => (favorites_url += `&ids[]=${favorite.manga_id}`));

	return await axios({
		method: "GET",
		url: favorites_url,
	});
};

const getFavoriteMangas = async () => {
	return await axios({
		method: "GET",
		url: "http://localhost:3001/manga/favorite",
		withCredentials: true,
	});
};

const getMangas = async (mangaName, page) => {
	try {
		const response = await axios({
			method: "GET",
			url: MANGA_ENDPOINT.BASE_URL,
			params: {
				title: mangaName,
				limit: 20,
				offset: page * 20,
				order: {
					rating: "desc",
					followedCount: "desc",
				},
			},
		});

		return response?.data?.data;
	} catch (err) {
		err["error"] = true;
		return err;
	}
};

export { getMangas, getFavoriteMangas, getFavoritesMangadex, addMangaComment, updateMangaComment, deleteMangaComment };
