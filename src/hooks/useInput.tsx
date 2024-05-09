import React, { ChangeEvent, useCallback, useState } from 'react';

export const useInput = (setter: React.Dispatch<any>, setIsOpen: React.Dispatch<boolean>) => {
  const [value, setValue] = useState("")
  const [error, setError] = useState({ error: false, message: "" })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const cancel: () => void = () => {
    setIsOpen(false);
  }

  const onAction: () => void = () => {
    let text = value.trim()
    if (!text) {
      setError({ error: true, message: "No text inserted" })
      return;
    }
    if (!/[A-Za-z]/g.test(text[0])) {
      setError({ error: true, message: "First char must be letter" })
      return;
    }

    setter(text)
    cancel();
  }

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    setError({ error: false, message: "" })
    if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
      if (e.key === 'Escape') {
        cancel()
      }
      else if (e.key === 'Enter') {
        onAction()
      }
    }
  }, [setError, cancel, onAction])

  return {
    value,
    error,
    handleChange,
    onAction,
    onKeyDown
  }
}

