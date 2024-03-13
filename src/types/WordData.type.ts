export type WordData = {
    word: string;
    phonetic: string;
    phonetics: Phonetic[];
    meanings: Meaning[];
    license: License;
    sourceUrls: string[];
};

type License = {
    name: string;
    url: string;
};

type Meaning = {
    partOfSpeech: string;
    definitions: Definition[];
    synonyms: string[];
    antonyms: string[];
};

type Definition = {
    definition: string;
    synonyms: string[];
    antonyms: string[];
};

type Phonetic = {
    text: string;
    audio: string;
    sourceUrl: string;
    license: License;
};
