import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-gray-100 bg-gray-50 border-t">
      <div className="container">
        <div className="flex lg:flex-row flex-col justify-center items-center py-28">
          <Logo className="mx-auto lg:mx-0" />

        </div>
      </div>
    </footer>
  );
}
