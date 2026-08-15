import { contactLinks } from "./contact";

const supportTopics = [
  {
    title: "Ingredients and allergens",
    text: "Each product page lists the main allergens. Please contact us before ordering if you have a serious allergy.",
  },
  {
    title: "Freshness",
    text: "Cookies are baked in small batches and are best enjoyed within the storage window listed on each product page.",
  },
  {
    title: "Gifting",
    text: "Gift notes can be added at checkout. Boxes are packed simply and carefully for local delivery.",
  },
  {
    title: "Order help",
    text: "For delivery, payment, or order changes, contact us as soon as possible after placing your order.",
  },
];

const policies = [
  "Delivery: local delivery details are confirmed after checkout.",
  "Refunds: contact us if your order arrives damaged or incorrect.",
  "Privacy: customer contact and delivery data should be used only for order fulfillment and support.",
  "Payments: FPS and PayMe are checked manually with your order number.",
  "Card and AlipayHK: coming after merchant setup.",
];

export function SupportPageContent() {
  return (
    <section className="page-content">
      <h1 className="text-4xl font-semibold">Terms and policies</h1>
      <p className="mt-4 max-w-2xl leading-7 text-[#6d5a4c]">
        Clear answers for confident cookie orders.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {supportTopics.map((topic) => (
          <article className="detail-panel" key={topic.title}>
            <h2 className="text-lg font-semibold">{topic.title}</h2>
            <p className="mt-3 leading-7 text-[#6d5a4c]">{topic.text}</p>
          </article>
        ))}
      </div>

      <div className="detail-panel mt-10">
        <h2 className="text-2xl font-semibold">Order support</h2>
        <ul className="mt-6 grid gap-3 text-sm leading-7 text-[#6d5a4c]">
          {policies.map((policy) => (
            <li key={policy}>{policy}</li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="detail-add inline-block" href={contactLinks.phoneHref}>
            Call {contactLinks.phoneDisplay}
          </a>
          <a
            className="product-card-add inline-block"
            href={contactLinks.instagram}
            rel="noreferrer"
            target="_blank"
          >
            Instagram
          </a>
          <a
            className="product-card-add inline-block"
            href={contactLinks.facebook}
            rel="noreferrer"
            target="_blank"
          >
            Facebook
          </a>
        </div>
      </div>
    </section>
  );
}
