"use client";

import { useCallback, useSyncExternalStore } from "react";
import { logoPreviewStorageKey } from "./logo-config";

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === logoPreviewStorageKey) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener("lamsumsum-logo-preview-change", onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("lamsumsum-logo-preview-change", onStoreChange);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(logoPreviewStorageKey);
}

function getServerSnapshot() {
  return null;
}

export function useLogoPreview() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setLogoPreview(dataUrl: string | null) {
  if (dataUrl) {
    window.localStorage.setItem(logoPreviewStorageKey, dataUrl);
  } else {
    window.localStorage.removeItem(logoPreviewStorageKey);
  }

  window.dispatchEvent(new Event("lamsumsum-logo-preview-change"));
}

export function useLogoPreviewActions() {
  const clearPreview = useCallback(() => {
    setLogoPreview(null);
  }, []);

  const savePreview = useCallback((dataUrl: string) => {
    setLogoPreview(dataUrl);
  }, []);

  return { clearPreview, savePreview };
}
