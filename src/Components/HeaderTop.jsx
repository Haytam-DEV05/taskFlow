export default function HeaderTop({ title, description }) {
  return (
    <div className="text-center max-w-3xl mx-auto pt-24 px-6" data-aos="fade-up">
      <h2 className="text-3xl md:text-5xl font-bold text-(--text) leading-tight">
        {title}
      </h2>

      <p className="mt-6 text-lg text-(--text)/70">
        {description}
      </p>
    </div>
  );
}