function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">

      <div className="max-w-7xl mx-auto py-10 px-6 text-center">

        <h2 className="text-xl font-bold">
          E-Commerce
        </h2>

        <p className="mt-3 text-gray-400">
          Built with React, Node.js, Express and MongoDB
        </p>

        <p className="mt-5 text-sm text-gray-500">
          © {new Date().getFullYear()} All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;