import Logo from "./Logo";
import Newsletter from "./Newsletter";
export default function Footer() {
  return (
    <footer className="bg-brand-purpleLightest">
      <div className="container">
        <div className="flex lg:flex-row flex-col justify-start md:justify-between items-start md:gap-20 pt-12 pb-28">
          <Newsletter />
          <Logo className="md:mx-auto lg:mx-0 ml-4 md:px-0" />
        </div>
      </div>
    </footer>
  );
}
