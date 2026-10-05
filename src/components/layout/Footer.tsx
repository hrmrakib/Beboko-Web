import React from 'react';
import Link from 'next/link';
import { Container } from './Container';
import { FacebookIcon, TwitterIcon, InstagramIcon } from '../ui/Icons';
import { Button } from '../ui/Button';

export function Footer() {
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Contact Us', href: '#' },
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Food Delivery', href: '#' },
        { name: 'Grocery Delivery', href: '#' },
        { name: 'Partner with Us', href: '#' },
        { name: 'Become a Rider', href: '#' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'FAQs', href: '#' },
      ]
    }
  ];

  return (
    <footer className="bg-stone-900 text-stone-300 pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] -z-10"></div>
      
      <Container>
        {/* Top CTA */}
        <div className="bg-orange-500 rounded-3xl p-8 md:p-12 mb-20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[60px]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to start?</h2>
            <p className="text-orange-100 text-lg">Join thousands of satisfied customers today.</p>
          </div>
          <div className="flex gap-4 relative z-10">
            <Button variant="white" size="lg">Get Started</Button>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="bg-white p-2 inline-block rounded-xl mb-6">
              <img src="/logo.png" alt="Dar Dar Logo" className="h-[60px] w-auto object-contain bg-[#333333] rounded-xl px-2 py-1" />
            </div>
            <p className="text-stone-400 max-w-sm mb-6 leading-relaxed">
              Bringing your favorite food and daily groceries right to your doorstep. Fast, reliable, and convenient.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-orange-500 transition-colors text-white">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-orange-500 transition-colors text-white">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-orange-500 transition-colors text-white">
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {footerLinks.map((column, idx) => (
            <div key={idx}>
              <h4 className="text-white font-bold text-lg mb-6">{column.title}</h4>
              <ul className="space-y-4">
                {column.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link href={link.href} className="hover:text-orange-500 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-sm">
            &copy; {new Date().getFullYear()} Beboto. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-stone-500">
            <Link href="#" className="hover:text-orange-500">Terms</Link>
            <Link href="#" className="hover:text-orange-500">Privacy</Link>
            <Link href="#" className="hover:text-orange-500">Cookies</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
