import { ModeToggle } from "../../ui/mode-toggle";
import {
  Footer,
  FooterColumn,
  FooterBottom,
  FooterContent,
} from "../../ui/footer";
import LaunchUI from "../../logos/launch-ui";

export default function FooterSection({
  name = "WeStudy",

  columns = [
    {
      title: "Product",
      links: [{ text: "Documentation", href: "#" }],
    },
    {
      title: "Company",
      links: [
        { text: "About", href: "#" },
        { text: "Careers", href: "#" },
        { text: "Blog", href: "#" },
      ],
    },
    {
      title: "Contact",
      links: [
        { text: "LinkedIn", href: "#" },
        { text: "Twitter", href: "h#" },
        { text: "Github", href: "#" },
      ],
    },
  ],

  copyright = "© 2025 WeStudy. All rights reserved",

  policies = [
    { text: "Privacy Policy", href: "#" },
    { text: "Terms of Service", href: "#" },
  ],
}) {
  return (
    <footer className="bg-background w-full px-4">
      <div className="max-w-container mx-auto">
        <Footer>
          <FooterContent>
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">{name}</h3>
              </div>
            </FooterColumn>
            {columns.map((column, index) => (
              <FooterColumn key={index}>
                <h3 className="text-md pt-1 font-semibold">{column.title}</h3>
                {column.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.href}
                    className="text-muted-foreground text-sm"
                  >
                    {link.text}
                  </a>
                ))}
              </FooterColumn>
            ))}
          </FooterContent>
          <FooterBottom>
            <div>{copyright}</div>
            <div className="flex items-center gap-4">
              {policies.map((policy, index) => (
                <a key={index} href={policy.href}>
                  {policy.text}
                </a>
              ))}
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
