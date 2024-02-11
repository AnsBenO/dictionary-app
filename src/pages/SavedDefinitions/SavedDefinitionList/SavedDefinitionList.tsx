import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import { SavedDefinition } from '../../../types/SavedDefinitions.type';
import { Link } from 'react-router-dom';

interface SavedDefinitionsListProps {
    savedDefinitions: SavedDefinition[];
    searchInput: string;
    removeDefinition: (word: string) => void;
}

const SavedDefinitionsList: React.FC<SavedDefinitionsListProps> = ({
    savedDefinitions,
    searchInput,
    removeDefinition,
}: SavedDefinitionsListProps) => {
    const filteredDefinitions = savedDefinitions.filter((definition) =>
        definition.word.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <ul>
            {filteredDefinitions.length > 0 ? (
                filteredDefinitions.map((definition) => (
                    <li key={definition.word} className="definition-item">
                        {definition.word} - {new Date(definition.savedAt).toLocaleDateString()}
                        <div className="buttons">
                            <button className="word-search-button" >
                                <Link to={`/${definition.word}`}>
                                    <FontAwesomeIcon icon={faSearch} />
                                </Link>
                            </button>
                            <button className="remove-button" onClick={() => removeDefinition(definition.word)}>
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                    </li>
                ))
            ) : (
                <div className="no-saved-words">No Saved Definitions Found</div>
            )}
        </ul>
    );
};

export default SavedDefinitionsList;
