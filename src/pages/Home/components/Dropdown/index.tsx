import { useCallback, useEffect, useRef, useState } from "react";
import "./index.scss";
import { handleKeyDown } from "./handleKeyDown";
import { CloseIcon } from "@/icons/Close";
import { ChevronDownIcon } from "@/icons/ChevronDown";

interface IDropdownItem {
  value: string | number;
  label: string;
}

type DropdownPropsType<T> = {
  value: T | null;
  onChange: (value: T | undefined) => void;
  items: Array<T>;
  itemLabel?: (item: T) => string;
  itemValue?: (item: T) => string | number;
  placeholder?: string;
};

export const Dropdown = <T,>({
  value,
  onChange,
  items,
  itemLabel = (item) => String(item),
  itemValue = (item) => String(item),
  placeholder = "Selecione uma opção",
}: DropdownPropsType<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      menuRef.current &&
      isOpen &&
      !buttonRef.current?.contains(e.target as Node) &&
      !menuRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleItemSelect = async (item: T) => {
    onChange(item);
    setIsOpen(false);
  };

  const clearSelection = () => onChange(undefined);

  useEffect(() => {
    const dropdown = buttonRef.current;

    if (isOpen && dropdown) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="dropdown_container">
      <div
        className="dropdown_opener"
        tabIndex={0}
        role="button"
        ref={buttonRef}
        onClick={toggleDropdown}
      >
        <button className="dropdown_openerButton" tabIndex={-1}>
          {value ? (
            itemLabel(value)
          ) : (
            <>
              {placeholder}
              <ChevronDownIcon className="dropdown_openerIcon" />
            </>
          )}
        </button>
        {value && (
          <button
            onClick={clearSelection}
            className="dropdown_openerClear"
            aria-label="Clear selection"
          >
            <CloseIcon className="dropdown_openerClearIcon" />
          </button>
        )}
      </div>
      {isOpen && (
        <div className="dropdown_menu" ref={menuRef}>
          <ul
            role="listbox"
            aria-label="Lista de regiões"
            className="dropdown_list"
          >
            {items.map((item) => {
              return (
                <li role="none" className="dropdown_item" key={itemValue(item)}>
                  <button
                    role="option"
                    type="button"
                    tabIndex={-1}
                    aria-label={itemLabel(item)}
                    className="dropdown_itemButton"
                    onClick={() => handleItemSelect(item)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {itemLabel(item)}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
