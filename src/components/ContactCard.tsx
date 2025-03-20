
import React from 'react';
import { Phone } from 'lucide-react';

interface ContactCardProps {
  imageSrc?: string;
  name?: string;
  title?: string;
}

const ContactCard = ({
  imageSrc = "/placeholder.svg",
  name = "Sarah Johnson",
  title = "Relationship Manager"
}: ContactCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-fade-in">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
            <img 
              src={imageSrc} 
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">{name}</h4>
            <p className="text-xs text-gray-500">{title}</p>
            <button className="mt-2 flex items-center text-xs font-medium text-bank-accent">
              <Phone className="h-3 w-3 mr-1" />
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
