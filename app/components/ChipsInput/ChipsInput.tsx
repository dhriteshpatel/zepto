import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';

export interface Chip {
  id: number;
  label: string;
  email: string;
  icon: string;
}

interface ChipsInputProps {
    initialItemsprop: Chip[];
    filteredItemsprop: Chip[];
  }

  const ChipsInput: React.FC<ChipsInputProps> = ({ initialItemsprop, filteredItemsprop }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedChips, setSelectedChips] = useState<Chip[]>([]);
  const [initialItems, setInitialItems] = useState<Chip[]>(initialItemsprop);
  const [filteredItems, setFilteredItems] = useState<Chip[]>(filteredItemsprop);
  const inputRef = useRef<HTMLInputElement>(null);


  const resetFilteredItems = () => {
    setFilteredItems([...initialItems]);
  };

  const filterItems = (value: string) => {
    const filtered = initialItems
      .filter(
        (item) =>
          item.label.toLowerCase().includes(value.toLowerCase()) &&
          !selectedChips.find((chip) => chip.id === item.id)
      );

    setFilteredItems(filtered);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    filterItems(value);
  };

  const handleItemClick = (item: Chip) => {
    setSelectedChips((prevChips) => [...prevChips, item]);
    setInputValue('');
    filterItems('');
  };

  const handleChipRemove = (id: number) => {
    const removedChip = selectedChips.find((chip) => chip.id === id);
    if (removedChip) {
      setSelectedChips((prevChips) => prevChips.filter((chip) => chip.id !== id));
      filterItems(inputValue); // Update filtered items after chip removal
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && inputValue === '' && selectedChips.length > 0) {
      // Highlight and remove the last chip on backspace
      const lastChip = selectedChips[selectedChips.length - 1];
      handleChipRemove(lastChip.id);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [selectedChips]);

  return (
    <div className="max-w-xl mx-auto mt-8 relative"> {/* Increase the width of the outer box */}
      <div className="flex flex-wrap items-center gap-2 border-b border-blue-500 p-2 rounded">
        {selectedChips.map((chip) => (
          <div key={chip.id} className="flex items-center bg-gray-500 text-white p-2 rounded-2xl">
            {chip.icon && <span className="mr-2"><img src={chip.icon} alt="Profile"  className="w-7 h-7 rounded-full"/></span>}
            {chip.label} {' '}
            <button
              className="ml-2 font-bold"
              onClick={() => handleChipRemove(chip.id)}
            >
              X
            </button>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          placeholder='Enter Name for selecting'
          className="border-none outline-none flex-grow p-2"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {inputValue && (
          <div className="absolute w-1000 border border-gray-300 mt-2 left-2 top-10 z-10 max-h-40 overflow-y-auto scrollbar">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex cursor-pointer p-2 z-20"
              onClick={() => handleItemClick(item)}
            >
              {item.icon && (
                <span className="mr-2">
                  <img src={item.icon} alt="Profile" className="w-7 h-7 rounded-full" />
                </span>
              )}
              {item.label} ({item.email})
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default ChipsInput;
