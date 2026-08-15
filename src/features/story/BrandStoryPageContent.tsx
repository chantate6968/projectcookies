import Link from "next/link";

const storyValues = [
  {
    title: "Small batches",
    text: "We keep each batch small so the cookies stay simple, fresh, and consistent.",
  },
  {
    title: "Hong Kong gifting",
    text: "Boxes are made for local delivery, friendly gifting, and easy sharing.",
  },
  {
    title: "Comfort first",
    text: "Our cookies are meant to feel warm, casual, and good to receive.",
  },
];

export function BrandStoryPageContent() {
  return (
    <section className="page-content">
      <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
        A warmer way to gift something sweet.
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-[#6d5a4c]">
        Lamsumsum is a small online bakery making chunky cookies for local
        delivery, simple gifting, and everyday sweet cravings.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="detail-panel">
          <h2 className="text-2xl font-semibold">Our story</h2>
          <p className="mt-5 leading-8 text-[#6d5a4c]">
            We started Lamsumsum with the kind of cookie box we wanted to receive
            ourselves: simple, chunky, fresh, and easy to order for someone else.
          </p>
          <p className="mt-4 leading-8 text-[#6d5a4c]">
            Every box is baked in small batches for Hong Kong customers who want
            something sweet without making it complicated.
          </p>
        </article>

        <div className="grid gap-4">
          {storyValues.map((value) => (
            <article className="detail-panel" key={value.title}>
              <h3 className="text-lg font-semibold">{value.title}</h3>
              <p className="mt-3 leading-7 text-[#6d5a4c]">{value.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <Link className="product-card-add inline-block text-center" href="/#shop">
          Shop cookie boxes
        </Link>
      </div>
    </section>
  );
}
