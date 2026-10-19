import { FieldErrors } from "react-hook-form";
import { RefObject } from "react";

export const useFormErrorScroll = <T extends object>(formRef: RefObject<HTMLFormElement | null>) => {
  const scrollToError = (errors: FieldErrors<T>) => {
    const findFirstErrorField = (errorObj: Record<string, unknown>, prefix = ""): string | null => {
      for (const [key, value] of Object.entries(errorObj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        
        if (value && typeof value === "object") {
          if ("message" in value) {
            // Это поле с ошибкой
            return fullKey;
          } else if (Array.isArray(value)) {
            // Это массив полей (например, dynamicLinks)
            for (let i = 0; i < value.length; i++) {
              const arrayItem = value[i];
              if (arrayItem && typeof arrayItem === "object") {
                const nestedError = findFirstErrorField(arrayItem, `${fullKey}.${i}`);
                if (nestedError) return nestedError;
              }
            }
          } else {
            // Это вложенный объект
            const nestedError = findFirstErrorField(value as Record<string, unknown>, fullKey);
            if (nestedError) return nestedError;
          }
        }
      }
      return null;
    };

    const firstErrorField = findFirstErrorField(errors);
    
    if (firstErrorField) {
      // Для динамических полей ищем по частичному совпадению
      let errorElement = formRef.current?.querySelector(
        `[data-field-name="${firstErrorField}"]`
      );
      
      // Если не найдено точное совпадение, ищем по частичному совпадению
      if (!errorElement) {
        const fieldParts = firstErrorField.split('.');
        const baseField = fieldParts[0];
        errorElement = formRef.current?.querySelector(
          `[data-field-name="${baseField}"]`
        );
      }
      
      if (errorElement) {
        errorElement.scrollIntoView({ 
          behavior: "smooth",
          block: "center",
        });
        // Пытаемся сфокусироваться на элементе, если это возможно
        if ('focus' in errorElement && typeof (errorElement as HTMLElement).focus === 'function') {
          (errorElement as HTMLElement).focus();
        }
      }
    }
  };

  return scrollToError;
}; 