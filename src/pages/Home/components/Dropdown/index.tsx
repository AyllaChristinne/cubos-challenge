import { useCallback, useEffect, useRef, useState } from "react";

import { CloseIcon } from "@/components/icons/Close";
import { ChevronDownIcon } from "@/components/icons/ChevronDown";
import "./index.scss";
import { handleKeyDown } from "./handleKeyDown";

type DropdownPropsType<T> = {
  value: T | null;
  onChange: (value: T | undefined) => void;
  items: Array<T>;
  itemLabel?: (item: T) => string;
  itemValue?: (item: T) => string | number;
  placeholder?: string;
};

export function Dropdown<T>({
  value,
  onChange,
  items,
  itemLabel = (item) => String(item),
  itemValue = (item) => String(item),
  placeholder = "Selecione uma opção",
}: DropdownPropsType<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const keyDown = useCallback(
    (event: KeyboardEvent) => {
      handleKeyDown(event, setIsOpen, menuRef);
    },
    [setIsOpen]
  );

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

    if (isOpen && dropdown) {
      dropdown?.addEventListener("keydown", keyDown);
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      dropdown?.removeEventListener("keydown", keyDown);
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
        onKeyDown={(e: React.KeyboardEvent | undefined) => {
          if (e?.key === "Enter") {
            setIsOpen(true);
          }
        }}
      >
        <button
          className="dropdown_openerButton"
          tabIndex={-1}
          data-testid="dropdown_openerButton"
        >
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
        <div className="dropdown_menu" ref={menuRef} aria-label="Menu dropdown">
          <ul
            role="listbox"
            aria-label="Lista de itens"
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
                    data-item="dropdown_item"
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
}
