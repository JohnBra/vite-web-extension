import { useState } from 'react';
import { MenuOptionsTypes } from './types';
import { TRANSLATE_MODE, WRITE_MODE } from './constants';
import { Container, Option, OptionsList, SelectedOption } from './styled';

const OPTIONS: string[] = [TRANSLATE_MODE, WRITE_MODE];

function MenuOptions({ onSelect }: MenuOptionsTypes): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('Select option');

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <Container>
      <SelectedOption onClick={toggleDropdown}>
        {selectedOption}
      </SelectedOption>
      {isOpen && (
        <OptionsList>
          {OPTIONS.map((option, index) => (
            <Option
              key={index}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              {option}
            </Option>
          ))}
        </OptionsList>
      )}
    </Container>
  );
};

export default MenuOptions;
