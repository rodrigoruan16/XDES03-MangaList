import React from "react";

import "../css/MangaCard.css";

function capitalize(word) {
	if (!word) return "";

	return word.charAt(0).toUpperCase() + word.slice(1);
}

function MangaCard({ attributes }) {
	return (
		<div className="manga-card">
			<div className="manga-card-img-container">
				<img
					src={`https://uploads.mangadex.org/covers/${attributes.id}/${attributes.cover}.256.jpg`}
				></img>
			</div>

			<div className="manga-attributes">
				<p className="manga-title">
					{Object.values(attributes.title)[0]}
				</p>
				<div className="manga-info">
					<p>
						<img
							id="calendar"
							src="https://img.icons8.com/?size=100&id=10053&format=png&color=ffffff"
						></img>
						{attributes.year}
					</p>
					<p>{capitalize(attributes?.publicationDemographic)} </p>
					<p className="manga-card-status">
						<span className={`${attributes?.status}-status`}>
							&#9679;
						</span>
						{capitalize(attributes?.status)}
					</p>
				</div>
				<div className="tags-container">
					{attributes.tags.slice(0, 4).map((tag, idx) => {
						return <p key={idx}>{tag?.attributes?.name?.en}</p>;
					})}
				</div>
				<p className="manga-desc">
					{attributes?.description?.en
						? attributes?.description?.en
						: Object.values(attributes.description)[0]}
				</p>
			</div>
		</div>
	);
}

export default MangaCard;
