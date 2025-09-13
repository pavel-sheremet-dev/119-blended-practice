interface Settings {
  darkMode: boolean;
  fontSize: number;
  language: string;
}

const settings: Settings = {
  darkMode: true,
  fontSize: 16,
  language: "en",
};

type Settings2 = {
  darkMode: boolean;
  fontSize: number;
  language: string;
};

const settings2: Settings2 = {
  darkMode: true,
  fontSize: 16,
  language: "en",
};

console.log(settings, settings2);
