import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border/50 py-8 mt-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-medium text-lg mb-3">
              <span className="text-primary">review</span>
              <span className="text-accent">o</span>
              <span className="text-primary">saur</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Your ultimate destination for honest and insightful movie reviews.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-3">Navigate</h4>
            <ul className="space-y-2">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/movies">Movies</FooterLink>
              <FooterLink to="/reviews">Reviews</FooterLink>
              <FooterLink to="/about">About</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3">Categories</h4>
            <ul className="space-y-2">
              <FooterLink to="/category/action">Action</FooterLink>
              <FooterLink to="/category/drama">Drama</FooterLink>
              <FooterLink to="/category/comedy">Comedy</FooterLink>
              <FooterLink to="/category/thriller">Thriller</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3">Connect</h4>
            <ul className="space-y-2">
              <FooterLink to="/contact">Contact Us</FooterLink>
              <FooterLink to="/newsletter">Newsletter</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-sm text-muted-foreground text-center">
          <p>© {new Date().getFullYear()} reviewosaur. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, children }) => {
  return (
    <li>
      <Link
        to={to}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-lift"
      >
        {children}
      </Link>
    </li>
  );
};

export default Footer;
