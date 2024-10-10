// import { Typography } from "@material-tailwind/react";
const links = ["Company", "About Us", "Team", "Products", "Blog", "Pricing"];
// const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="px-8 py-28 bg-[#003b46]">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex flex-wrap items-center justify-center gap-8 pb-8">
          {links.map((link, index) => (
            <ul key={index}>
              <li>
                <p
                  // href="#"
                  color="white"
                  className="font-medium !text-gray-500 transition-colors hover:!text-gray-900"
                >
                  {link}
                </p>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </footer>
  );
}
