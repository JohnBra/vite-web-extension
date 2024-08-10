import { useState } from 'react';
import { QUESTION_LABEL, QUESTION_MODE, SPELLING_LABEL, SPELLING_MODE, TRANSLATE_LABEL, TRANSLATE_MODE, WRITE_LABEL, WRITE_MODE } from './constants';
import { Container, Option, OptionsList, SelectedOption } from './styled';
import { MenuOptionsTypes, OptionType } from './types';

const OPTIONS: OptionType[] = [
  { action: TRANSLATE_MODE, label: TRANSLATE_LABEL },
  { action: WRITE_MODE, label: WRITE_LABEL },
  { action: SPELLING_MODE, label: SPELLING_LABEL },
  { action: QUESTION_MODE, label: QUESTION_LABEL },
];

function MenuOptions({ onSelect }: MenuOptionsTypes): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen)

  const getLabelByAction = (actionToFind: string) => {
    const option = OPTIONS.find(option => option.action === actionToFind);
    return option ? option.label : null;
  }

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <Container>
      <SelectedOption onClick={toggleDropdown}>
        {selectedOption !== null ? getLabelByAction(selectedOption) : "Seleccionar"}
      </SelectedOption>
      {isOpen && (
        <OptionsList>
          {OPTIONS.map((option, index) => (
            <Option
              key={index}
              onClick={() => handleOptionClick(option.action)}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              {option.label}
            </Option>
          ))}
        </OptionsList>
      )}
    </Container>
  );
};

export default MenuOptions;
