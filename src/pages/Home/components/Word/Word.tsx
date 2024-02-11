import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faVolumeHigh,
    faVolumeXmark,
    faBookmark as solidFaBookmark,
} from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularFaBookmark } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { WordData } from '../../../../types/WordData.type';
import { SavedDefinition } from '../../../../types/SavedDefinitions.type';
import "./Word.css"

const Word = ({ definitionsData }: { definitionsData: WordData[] }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isSaved, setIsSaved] = useState<boolean>()
    const volumeXmark = faVolumeXmark;
    const volumeHigh = faVolumeHigh;
    const solidSave = solidFaBookmark;
    const regularSave = regularFaBookmark as IconProp;

    const toggleAudio = () => {
        setIsPlaying(!isPlaying);
    };



    const saveToLocalStorage = (definition: string) => {
        const savedDefinitionsString = localStorage.getItem('savedDefinitions');
        const savedDefinitions = savedDefinitionsString
            ? JSON.parse(savedDefinitionsString) as SavedDefinition[]
            : [];

        const existingIndex = savedDefinitions.findIndex(
            (def) => def.word === definition
        );

        if (existingIndex !== -1) {
            savedDefinitions.splice(existingIndex, 1);
            setIsSaved(false);
        } else {
            const savedDefinition = {
                word: definition,
                savedAt: new Date(),
            };
            savedDefinitions.push(savedDefinition);
            setIsSaved(true);
        }

        localStorage.setItem('savedDefinitions', JSON.stringify(savedDefinitions));
    };
    useEffect(
        () => {
            const isWordSaved = (word: string) => {
                const savedDefinitionsString = localStorage.getItem('savedDefinitions');
                const savedDefinitions = savedDefinitionsString
                    ? JSON.parse(savedDefinitionsString) as SavedDefinition[]
                    : [];

                return savedDefinitions.map((definition) => definition.word).includes(word);
            };

            if (definitionsData.length > 0) {
                setIsSaved(isWordSaved(definitionsData[0].word));
            }
        }, [definitionsData]
    );


    return (
        <div className="container">
            {definitionsData.length > 0 && (
                <div>
                    {definitionsData.map((definition, index) => (
                        <div key={index} className="word-details">
                            <h2 className="word">{definition.word}</h2>
                            <button
                                onClick={() => saveToLocalStorage(definition.word)}
                                className="save-button"
                            >
                                {
                                    (isSaved)
                                        ? <FontAwesomeIcon
                                            icon={solidSave}
                                        />
                                        : <FontAwesomeIcon
                                            icon={regularSave}
                                        />

                                }
                            </button>

                            {definition.phonetics.length > 0 && (
                                <div>
                                    <p className="phonetic">{definition.phonetics[0].text}</p>
                                    {definition.phonetics[0]?.audio !== '' && (
                                        <div>
                                            <button
                                                onClick={toggleAudio}
                                                className="audio-button"
                                                title={isPlaying ? 'Pause' : 'Play'}
                                            >
                                                {isPlaying ? (
                                                    <FontAwesomeIcon className="volume-icon" icon={volumeXmark} />
                                                ) : (
                                                    <FontAwesomeIcon className="volume-icon" icon={volumeHigh} />
                                                )}
                                            </button>
                                            {isPlaying && (
                                                <audio
                                                    src={definition.phonetics[0].audio}
                                                    autoPlay
                                                    preload="auto"
                                                    onEnded={toggleAudio}
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="meanings">
                                <p>Meanings:</p>
                                {definition.meanings.map((meaning, index) => (
                                    <div key={index} className="meanings">
                                        {meaning.partOfSpeech && (
                                            <ul className="definition">
                                                <li>
                                                    <strong>
                                                        {index + 1}- {meaning.partOfSpeech}
                                                    </strong>
                                                    <ul className="definitions-list">
                                                        {meaning.definitions.map((def, defIndex) => (
                                                            <li key={defIndex}>{def.definition}</li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            </ul>
                                        )}

                                        <ul className="synonyms">
                                            Synonyms:
                                            {meaning.synonyms.length > 0 ? (
                                                <ul className="definition">
                                                    {meaning.synonyms.map((syn, synIndex) => (
                                                        <li key={synIndex}>{syn}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                'N/A'
                                            )}
                                        </ul>

                                        <ul className="antonyms">
                                            Antonyms:
                                            {meaning.antonyms.length > 0 ? (
                                                <ul className="definition">
                                                    {meaning.antonyms.map((ant, antIndex) => (
                                                        <li key={antIndex}>{ant}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                'N/A'
                                            )}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <p className="source">
                                Source: <a className='word-link' href={definition.sourceUrls[0]}>Wiktionary</a>
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Word;
