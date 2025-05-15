export interface QRCodeData {
  content: string;
  type: 'url' | 'email' | 'whatsapp' | 'sms' | 'wifi';
}

export interface QRCodeStyle {
  fgColor: string;
  bgColor: string;
  size: number;
  logo?: string;
  level: 'L' | 'M' | 'Q' | 'H';
}

export interface ContentValidation {
  isValid: boolean;
  error?: string;
}

export const CONTENT_VALIDATORS: Record<QRCodeData['type'], (content: string) => ContentValidation> = {
  url: (content: string) => {
    try {
      new URL(content);
      return { isValid: true };
    } catch {
      return { isValid: false, error: 'Please enter a valid URL' };
    }
  },
  email: (content: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
      isValid: emailRegex.test(content),
      error: emailRegex.test(content) ? undefined : 'Please enter a valid email address'
    };
  },
  whatsapp: (content: string) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return {
      isValid: phoneRegex.test(content),
      error: phoneRegex.test(content) ? undefined : 'Please enter a valid phone number'
    };
  },
  sms: (content: string) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return {
      isValid: phoneRegex.test(content),
      error: phoneRegex.test(content) ? undefined : 'Please enter a valid phone number'
    };
  },
  wifi: () => {
    return { isValid: true }; // WiFi QR codes can have any content
  }
};

export const formatContent = (type: QRCodeData['type'], content: string): string => {
  switch (type) {
    case 'whatsapp':
      return `https://wa.me/${content.replace(/[^0-9]/g, '')}`;
    case 'sms':
      return `sms:${content.replace(/[^0-9]/g, '')}`;
    case 'email':
      return `mailto:${content}`;
    case 'wifi':
      return `WIFI:S:${content};T:WPA;P:password;;`; // Basic WiFi format, can be enhanced
    default:
      return content;
  }
}; 