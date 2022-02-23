export interface IItem {
	id: string;
	title: string;
	tag: string;
	links: string[];
	place: string;
}

export interface IPlace {
	id: string;
	title: string;
	emoji: string;
	countryCode: string;
	user: string;
}

export interface ITag {
	id: string;
	name: string;
	emoji: string;
}

export interface ICountry {
	name: {
		common: string;
		official: string;
	};
	cca3: string;
	unMember: boolean;
	currencies: {
		[key: string]: {
			name: string;
			symbol: string;
		};
	};
	capital: string[];
	region: string;
	subregion: string;
	languages: {
		[key: string]: string;
	};
	latlng: number[];
	area: number;
	flag: string;
	maps: {
		googleMaps: string;
		openStreetMaps: string;
	};
	population: number;
	timezones: string[];
	continents: string[];
}
