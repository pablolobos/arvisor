export default function Footer() {
  return (
    <footer className="border-gray-100 bg-gray-50 border-t">
      <div className="container">
        <div className="flex lg:flex-row flex-col items-center py-28">
          <h3 className="mb-10 lg:mb-0 lg:pr-4 lg:w-1/2 font-bold text-4xl text-center lg:text-left lg:text-5xl leading-tight tracking-tighter">
            Footer
          </h3>
          <div className="flex lg:flex-row flex-col justify-center items-center gap-3 lg:pl-4 lg:w-1/2">
            <a
              href="#"
              className="flex items-center gap-2 bg-black hover:bg-red-500 focus:bg-cyan-500 px-6 py-3 rounded-full text-white transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Link
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
