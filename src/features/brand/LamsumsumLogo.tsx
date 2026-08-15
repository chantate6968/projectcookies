"use client";

import { CookieLetterU } from "./CookieLetterU";
import { customLogoAlt, customLogoPath } from "./logo-config";
import { useLogoPreview } from "./useLogoPreview";

type LamsumsumLogoProps = {
  compact?: boolean;
};

export function LamsumsumLogo({ compact = false }: LamsumsumLogoProps) {
  const previewSrc = useLogoPreview();
  const imageSrc = previewSrc ?? customLogoPath;

  if (imageSrc) {
    return (
      <span
        className={`brand-logo-image-wrap ${compact ? "brand-logo-image-wrap-compact" : ""}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={customLogoAlt}
          className="brand-logo-image"
          src={imageSrc}
        />
      </span>
    );
  }

  return (
    <span
      className={`brand-logo brand-logo-dark ${compact ? "brand-logo-compact" : ""}`}
      aria-hidden="true"
    >
      <span className="brand-logo-plate">
        <span className="brand-logo-word">
          Lamsums
          <span className="brand-logo-cookie-letter" title="cookie letter u">
            <CookieLetterU className="brand-logo-cookie-u" />
          </span>
          m
        </span>
        <span className="brand-logo-subtitle">
          <span className="brand-logo-subtitle-text">cookies</span>
        </span>
      </span>
    </span>
  );
}

export function LamsumsumLogoLarge() {
  return <LamsumsumLogo compact={false} />;
}
