import { useEffect, useState } from "react";

const list = "list;";

export default function useLocalStorage(value: any) {
  const initValue = localStorage.getItem(list);

  if (!initValue) {
    setState(value);
  }

  const state = JSON.parse(localStorage.getItem(list) ?? "null");

  return [state, setState];
}

function getSavedValue(key: string, initValue: unknown) {
  const savedValue = JSON.parse(localStorage.getItem(key) ?? "");
  if (savedValue) {
    return savedValue;
  }

  if (initValue instanceof Function) {
    return initValue();
  }

  return initValue;
}

function setState(state: any[]) {
  localStorage.setItem(list, JSON.stringify(state));
}
