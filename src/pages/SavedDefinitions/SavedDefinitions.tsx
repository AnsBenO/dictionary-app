// SavedDefinitionsContainer.tsx
import { useState, useEffect } from 'react';
import { SavedDefinition } from '../../types/SavedDefinitions.type';
import SavedDefinitionsList from './SavedDefinitionList/SavedDefinitionList';
import "./SavedDefinitions.css"

const SavedDefinitionsContainer = () => {
    const [savedDefinitions, setSavedDefinitions] = useState<SavedDefinition[]>([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        loadSavedDefinitions();
    }, []);

    const loadSavedDefinitions = () => {
        const savedDefinitionsString = localStorage.getItem('savedDefinitions');
        if (savedDefinitionsString) {
            const definitions = (JSON.parse(savedDefinitionsString) as SavedDefinition[]).sort((a, b) =>
                a.word.localeCompare(b.word)
            );
            setSavedDefinitions(definitions);
        }
    };




    const removeDefinition = (word: string) => {
        const updatedDefinitions = savedDefinitions.filter(
            (definition) => definition.word.toLowerCase() !== word.toLowerCase()
        );

        setSavedDefinitions(updatedDefinitions);
        localStorage.setItem('savedDefinitions', JSON.stringify(updatedDefinitions));
    };


    return (
        <div className="saved-definitions-container">
            <h2 className="saved-definitions-title">Saved Definitions</h2>
            <form onSubmit={(e) => { e.preventDefault(); }}>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search for a word"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </form>
            <SavedDefinitionsList
                savedDefinitions={savedDefinitions}
                searchInput={searchInput}
                removeDefinition={removeDefinition}
            />
        </div>
    );
};

export default SavedDefinitionsContainer;
