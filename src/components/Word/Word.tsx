import React from "react";
import { WordData } from "../../types/WordData.type";
import "./Word.css";

interface WordProps {
    wordData: WordData;
}

const Word: React.FC<WordProps> = ({ wordData }) => {
    const { word, phonetics, meanings, sourceUrls } = wordData;
    return (
        <div className="container">
            <div className="word-details">
                <h2 className="word">{word}</h2>
                {phonetics.length > 0 &&
                    <p className="phonetic">{phonetics[0].text}</p>
                }
                {phonetics.length > 0 && phonetics[0].audio !== "" &&
                    <audio className="audio" controls key={phonetics[0].audio}>
                        <source src="" type="audio/mpeg" />
                        <source src={phonetics[0].audio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                }
                <div className="meanings">
                    <p>Meanings:</p>
                    {meanings.map((meaning, index) => {
                        return (
                            <div className="meaning" key={index}>
                                <ul className="definition">
                                    <li>
                                        <strong>{`${index + 1}- ${meaning.partOfSpeech}`}</strong>
                                        <ul className="definition">
                                            {meaning.definitions.map((def, index) => (
                                                <li key={index}>{def.definition}</li>
                                            ))}
                                        </ul>
                                    </li>
                                </ul>
                                <ul className="synonyms">
                                    Synonyms:
                                    {meaning.synonyms.length > 0 ? (
                                        <ul className="definition">
                                            {meaning.synonyms.map((syn, index) => (
                                                <li key={index}>{syn}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        " N/A"
                                    )}
                                </ul>

                                <ul className="antonyms">
                                    Antonyms:
                                    {meaning.antonyms.length > 0 ? (
                                        <ul className="definition">
                                            {meaning.antonyms.map((ant, index) => (
                                                <li key={index}>{ant}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        " N/A"
                                    )}
                                </ul>
                            </div>
                        )

                    })}
                </div>

                <p className="source">
                    Source: <a href={sourceUrls[0]}>Wiktionary</a>
                </p>
            </div>
        </div>
    );
};

export default Word;
