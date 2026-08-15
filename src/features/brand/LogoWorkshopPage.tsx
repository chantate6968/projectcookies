"use client";

import Link from "next/link";
import { useMemo, useState, type ChangeEvent } from "react";
import { LamsumsumLogo } from "./LamsumsumLogo";
import {
  canvaLinks,
  logoDesignBrief,
  logoExportFiles,
  logoPreviewStorageKey,
} from "./logo-config";
import { useLogoPreview, useLogoPreviewActions } from "./useLogoPreview";

export function LogoWorkshopPage() {
  const activePreview = useLogoPreview();
  const { clearPreview, savePreview } = useLogoPreviewActions();
  const [draftPreview, setDraftPreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState("");

  const previewSrc = draftPreview ?? activePreview;
  const isDraftPending = Boolean(draftPreview && draftPreview !== activePreview);

  const statusMessage = useMemo(() => {
    if (draftPreview && draftPreview !== activePreview) {
      return "Preview ready. Apply it to see your logo across the site header.";
    }

    if (activePreview) {
      return "Your Canva upload is live in the header on this device.";
    }

    return "Using the built-in logo until you upload your own design.";
  }, [activePreview, draftPreview]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    setUploadError("");
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload a PNG, JPG, or SVG image.");
      event.target.value = "";
      return;
    }

    if (file.size > 2_000_000) {
      setUploadError("Please keep the file under 2 MB for browser preview.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setDraftPreview(reader.result);
      }
    };

    reader.onerror = () => {
      setUploadError("We could not read that file. Try exporting again from Canva.");
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  }

  function applyPreview() {
    if (!draftPreview) {
      return;
    }

    savePreview(draftPreview);
    setDraftPreview(null);
  }

  function resetPreview() {
    clearPreview();
    setDraftPreview(null);
    setUploadError("");
  }

  return (
    <section className="page-content logo-workshop">
      <div className="logo-workshop-intro">
        <p className="logo-workshop-eyebrow">Brand workshop</p>
        <h1>Design your logo in Canva, then preview it here</h1>
        <p className="logo-workshop-lead">
          This page is your logo workspace. Open Canva to design, export your
          artwork, upload it below, and tell me what to tweak. I cannot edit
          Canva directly, but I can apply your exported file across the site.
        </p>
      </div>

      <article className="detail-panel logo-workshop-panel logo-workshop-panel-wide logo-workshop-downloads">
        <h2>Current logo — download for Canva</h2>
        <p className="logo-workshop-copy">
          Export the existing site logo and upload it into Canva to redesign it.
          Use the PNG for the easiest Canva import.
        </p>
        <div className="logo-workshop-preview-card logo-workshop-download-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Current Lamsumsum logo export"
            className="brand-logo-image brand-logo-image-large"
            src={logoExportFiles.png}
          />
        </div>
        <div className="logo-workshop-actions">
          <a className="detail-add" download href={logoExportFiles.png}>
            Download PNG (800px)
          </a>
          <a className="product-card-add" download href={logoExportFiles.png2x}>
            Download PNG (1600px)
          </a>
          <a className="product-card-add" download href={logoExportFiles.svg}>
            Download SVG
          </a>
          <a
            className="product-card-add"
            href={canvaLinks.createLogo}
            rel="noreferrer"
            target="_blank"
          >
            Open Canva to import
          </a>
        </div>
        <ol className="logo-workshop-list logo-workshop-list-tight">
          <li>Download <strong>lamsumsum-logo.png</strong> above.</li>
          <li>In Canva, open the logo maker and click <strong>Uploads</strong>.</li>
          <li>Upload the PNG and drag it onto your canvas.</li>
          <li>Edit the design, export from Canva, then upload your new version below.</li>
        </ol>
      </article>

      <div className="logo-workshop-grid">
        <article className="detail-panel logo-workshop-panel">
          <h2>Step 1 — Open Canva</h2>
          <p className="logo-workshop-copy">
            Start a new logo design in Canva. Use the bakery or cookie templates
            if you want a quick starting point.
          </p>
          <div className="logo-workshop-actions">
            <a
              className="detail-add"
              href={canvaLinks.createLogo}
              rel="noreferrer"
              target="_blank"
            >
              Open Canva logo maker
            </a>
            <a
              className="product-card-add"
              href={canvaLinks.bakeryTemplates}
              rel="noreferrer"
              target="_blank"
            >
              Bakery logo templates
            </a>
            <a
              className="product-card-add"
              href={canvaLinks.cookieTemplates}
              rel="noreferrer"
              target="_blank"
            >
              Cookie logo templates
            </a>
          </div>
        </article>

        <article className="detail-panel logo-workshop-panel">
          <h2>Step 2 — Design brief</h2>
          <ul className="logo-workshop-list">
            <li>
              <strong>Brand:</strong> {logoDesignBrief.brandName}
            </li>
            <li>
              <strong>Tagline:</strong> {logoDesignBrief.tagline}
            </li>
          </ul>
          <div className="logo-workshop-swatches">
            {logoDesignBrief.colors.map((color) => (
              <div className="logo-workshop-swatch" key={color.hex}>
                <span
                  aria-hidden="true"
                  className="logo-workshop-swatch-chip"
                  style={{ backgroundColor: color.hex }}
                />
                <span>
                  {color.name} · {color.hex}
                </span>
              </div>
            ))}
          </div>
          <ul className="logo-workshop-list logo-workshop-list-tight">
            {logoDesignBrief.exportTips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </article>

        <article className="detail-panel logo-workshop-panel logo-workshop-panel-wide">
          <h2>Step 3 — Upload and preview</h2>
          <p className="logo-workshop-copy">{statusMessage}</p>

          <label className="logo-workshop-upload">
            <span>Upload PNG, JPG, or SVG from Canva</span>
            <input accept="image/png,image/jpeg,image/svg+xml,image/webp" onChange={handleFileChange} type="file" />
          </label>

          {uploadError ? <p className="logo-workshop-error">{uploadError}</p> : null}

          <div className="logo-workshop-preview-grid">
            <div className="logo-workshop-preview-card">
              <p className="logo-workshop-preview-label">Header preview</p>
              <div className="logo-workshop-header-mock">
                {previewSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img alt="Logo preview" className="brand-logo-image" src={previewSrc} />
                ) : (
                  <LamsumsumLogo compact />
                )}
              </div>
            </div>

            <div className="logo-workshop-preview-card">
              <p className="logo-workshop-preview-label">Large preview</p>
              <div className="logo-workshop-large-mock">
                {previewSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img alt="Logo preview large" className="brand-logo-image brand-logo-image-large" src={previewSrc} />
                ) : (
                  <LamsumsumLogo />
                )}
              </div>
            </div>
          </div>

          <div className="logo-workshop-actions">
            <button
              className="detail-add"
              disabled={!isDraftPending}
              onClick={applyPreview}
              type="button"
            >
              Apply logo to site header
            </button>
            <button className="product-card-add" disabled={!previewSrc} onClick={resetPreview} type="button">
              Reset to built-in logo
            </button>
            <Link className="product-card-add" href="/">
              View homepage
            </Link>
          </div>

          <p className="logo-workshop-note">
            Preview is saved in your browser as{" "}
            <code>{logoPreviewStorageKey}</code>. When you are happy, tell me
            your Canva instructions or send the final file and I will wire it
            into the project permanently.
          </p>
        </article>
      </div>
    </section>
  );
}
